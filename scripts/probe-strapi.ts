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

async function probe(label: string, path: string, params: Record<string, string> = {}) {
  const baseUrl = process.env.STRAPI_URL!;
  const token = process.env.STRAPI_API_CURSOR ?? process.env.STRAPI_API_TOKEN!;
  const url = new URL(`/api/${path}`, baseUrl);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  console.log(`${label}: ${res.status} ${(await res.text()).slice(0, 120)}`);
}

async function main() {
  loadEnvFile(resolve(process.cwd(), 'apps/web/.env'));
  await probe('site-setting GET', 'site-setting', { locale: 'en-AU' });
  await probe('market-navigations GET', 'market-navigations', { 'pagination[pageSize]': '1' });
  await probe('localized-pages GET', 'localized-pages', { locale: 'en-AU', 'pagination[pageSize]': '1' });
  await probe('articles GET', 'articles', { locale: 'en-AU', 'pagination[pageSize]': '1' });
}

main().catch(console.error);
