/**
 * Remove duplicate international localized-pages from the first seed run
 * (slugs without the intl- prefix).
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { StrapiAdminClient, type StrapiDocument } from './lib/strapi-admin';

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

async function listInternationalPages(
  client: StrapiAdminClient,
  status: 'published' | 'draft',
): Promise<StrapiDocument[]> {
  return client.list('localized-pages', {
    locale: 'en-AU',
    status,
    'filters[market][$eq]': 'international',
    'pagination[pageSize]': '100',
  });
}

async function main(): Promise<void> {
  loadEnvFile(resolve(process.cwd(), 'apps/web/.env'));

  const baseUrl = process.env.STRAPI_URL;
  const token =
    process.env.STRAPI_API_CURSOR ??
    process.env.STRAPI_SEED_TOKEN ??
    process.env.STRAPI_API_TOKEN;

  if (!baseUrl || !token) {
    console.error('Missing STRAPI_URL and STRAPI_API_CURSOR in apps/web/.env');
    process.exit(1);
  }

  const client = new StrapiAdminClient(baseUrl, token);
  const published = await listInternationalPages(client, 'published');
  const drafts = await listInternationalPages(client, 'draft');

  const byId = new Map<string, StrapiDocument>();
  for (const doc of [...published, ...drafts]) {
    byId.set(doc.documentId, doc);
  }

  const legacy = [...byId.values()].filter((doc) => !String(doc.slug).startsWith('intl-'));

  if (!legacy.length) {
    console.log('No legacy international pages to delete.');
    return;
  }

  console.log(`Deleting ${legacy.length} legacy international page(s):\n`);
  for (const doc of legacy) {
    console.log(`  - ${doc.slug} (${doc.documentId})`);
    await client.delete('localized-pages', doc.documentId, 'en-AU');
  }

  console.log('\nDone.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
