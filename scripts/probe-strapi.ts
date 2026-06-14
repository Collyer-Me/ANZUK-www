import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadEnvFile(filePath: string): void {
  try {
    const content = readFileSync(filePath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // optional
  }
}

type ProbeResult = { label: string; status: number; ok: boolean; snippet: string };

async function probe(
  label: string,
  path: string,
  params: Record<string, string> = {},
): Promise<ProbeResult> {
  const baseUrl = process.env.STRAPI_URL!;
  const token = process.env.STRAPI_API_CURSOR ?? process.env.STRAPI_API_TOKEN!;
  const url = new URL(`/api/${path}`, baseUrl);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const text = await res.text();
  const ok = res.status >= 200 && res.status < 300;

  return {
    label,
    status: res.status,
    ok,
    snippet: text.slice(0, 120).replace(/\s+/g, ' '),
  };
}

function printSection(title: string, results: ProbeResult[]): void {
  console.log(`\n${title}`);
  for (const r of results) {
    const mark = r.ok ? 'OK' : 'FAIL';
    console.log(`  [${mark}] ${r.label}: ${r.status} ${r.snippet}`);
  }
}

async function main() {
  loadEnvFile(resolve(process.cwd(), 'apps/web/.env'));

  if (!process.env.STRAPI_URL) {
    console.error('STRAPI_URL not set — add it to apps/web/.env');
    process.exit(1);
  }

  const token = process.env.STRAPI_API_CURSOR ?? process.env.STRAPI_API_TOKEN;
  if (!token) {
    console.error('STRAPI_API_TOKEN (or STRAPI_API_CURSOR) not set');
    process.exit(1);
  }

  console.log(`Probing ${process.env.STRAPI_URL}`);

  const v2 = await Promise.all([
    probe('global-setting', 'global-setting', { locale: 'en' }),
    probe('regions', 'regions', { 'pagination[pageSize]': '5' }),
    probe('pages', 'pages', {
      locale: 'en',
      'pagination[pageSize]': '1',
      status: 'published',
    }),
    probe('sections', 'sections', { 'pagination[pageSize]': '1' }),
    probe('articles (V2)', 'articles', { locale: 'en', 'pagination[pageSize]': '1' }),
    probe('form-submissions', 'form-submissions', { 'pagination[pageSize]': '1' }),
  ]);

  const v1 = await Promise.all([
    probe('site-setting (legacy)', 'site-setting', { locale: 'en-AU' }),
    probe('localized-pages (legacy)', 'localized-pages', {
      locale: 'en-AU',
      'pagination[pageSize]': '1',
    }),
    probe('market-navigations (legacy)', 'market-navigations', { 'pagination[pageSize]': '1' }),
  ]);

  printSection('V2 (target schema — ADR 009)', v2);
  printSection('V1 (legacy — fallback until fully migrated)', v1);

  const v2Healthy = v2.filter((r) => r.label !== 'sections').every((r) => r.ok);
  const v2Partial = v2.some((r) => r.ok);

  console.log('\nSummary');
  if (v2Healthy) {
    console.log('  V2 ready — set USE_MOCK_DATA=false and run npm run seed:strapi if content is empty.');
  } else if (v2Partial) {
    console.log('  V2 partial — check FAIL rows above (permissions, seed, or Strapi logs).');
  } else {
    console.log('  V2 unavailable — Astro will fall back to mock data for missing endpoints.');
  }

  process.exit(v2Healthy ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
