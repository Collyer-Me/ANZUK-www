/**
 * Seed Strapi Cloud from V2 prototype mock data (regions, pages, articles, global settings).
 *
 * Usage:
 *   1. Create a Full access API token in Strapi admin
 *   2. Add STRAPI_API_CURSOR to apps/web/.env
 *   3. npm run seed:strapi
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Market } from '../apps/web/src/config/markets';
import type { Article, CmsPage, ContentBlock, NavItem, NavLink } from '../apps/web/src/lib/strapi/types';
import { StrapiAdminClient } from './lib/strapi-admin';

const DEFAULT_LOCALE = 'en';

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

function stripComponentIds(obj: Record<string, unknown>): Record<string, unknown> {
  const { id: _id, ...rest } = obj;
  const result: Record<string, unknown> = { ...rest };
  for (const [key, value] of Object.entries(result)) {
    if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === 'object' && item !== null
          ? stripComponentIds(item as Record<string, unknown>)
          : item,
      );
    }
  }
  return result;
}

function serializeBlocks(blocks: ContentBlock[] | undefined): Record<string, unknown>[] {
  if (!blocks?.length) return [];
  return blocks.map((block) => stripComponentIds(block as unknown as Record<string, unknown>));
}

function serializeSeo(seo: CmsPage['seo'] | Article['seo']) {
  if (!seo) return undefined;
  return {
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription ?? undefined,
  };
}

function serializeNavLink(item: NavLink): Record<string, unknown> {
  return {
    link: {
      label: item.label,
      url: item.url,
      openInNewTab: item.openInNewTab ?? false,
    },
  };
}

function serializeNavItem(item: NavItem): Record<string, unknown> {
  return {
    link: {
      label: item.label,
      url: item.url,
      openInNewTab: item.openInNewTab ?? false,
    },
    ...(item.children?.length
      ? { children: item.children.map(serializeNavLink) }
      : {}),
  };
}

function shortError(error: unknown): string {
  if (!(error instanceof Error)) return String(error);
  return error.message.split('\n')[0];
}

async function main(): Promise<void> {
  loadEnvFile(resolve(process.cwd(), 'apps/web/.env'));

  const { MOCK_ARTICLES, MOCK_GLOBAL_SETTINGS, MOCK_PAGES } = await import(
    '../apps/web/src/lib/strapi/mock-data'
  );
  const { MOCK_REGIONS } = await import('../apps/web/src/lib/strapi/mock-regions');
  const { MOCK_MARKET_NAVIGATIONS } = await import('../apps/web/src/lib/strapi/mock-navigation');

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
  console.log(`Seeding Strapi V2 at ${baseUrl}\n`);

  const regionIds = new Map<Market, string>();
  let failures = 0;

  console.log('→ Regions');
  for (const region of MOCK_REGIONS) {
    const nav = MOCK_MARKET_NAVIGATIONS.find((n) => n.market === region.code);
    try {
      const doc = await client.upsertCollection(
        'regions',
        undefined,
        { code: region.code },
        {
          code: region.code,
          name: region.name,
          hreflang: region.hreflang,
          isDefault: region.isDefault,
          isGlobalHub: region.isGlobalHub,
          contactEmail: region.contactEmail,
          geoSuggestEnabled: region.geoSuggestEnabled,
          cookiePolicyUrl: region.cookiePolicyUrl,
          jobAdderBoardId: region.jobAdderBoardId,
          ...(nav?.items?.length
            ? { header: { items: nav.items.map(serializeNavItem) } }
            : {}),
        },
        { draftAndPublish: false },
      );
      regionIds.set(region.code, doc.documentId);
      console.log(`  ✓ region/${region.code}`);
    } catch (error) {
      failures += 1;
      console.warn(`  ✗ region/${region.code} — ${shortError(error)}`);
    }
  }

  console.log('\n→ Global Settings');
  try {
    await client.upsertSingleType('global-setting', DEFAULT_LOCALE, {
      organizationName: MOCK_GLOBAL_SETTINGS.organizationName,
      tagline: MOCK_GLOBAL_SETTINGS.tagline,
      organizationUrl: MOCK_GLOBAL_SETTINGS.organizationUrl,
      scootUrl: MOCK_GLOBAL_SETTINGS.scootUrl,
      executiveUrl: MOCK_GLOBAL_SETTINGS.executiveUrl,
      ketchEnabled: MOCK_GLOBAL_SETTINGS.ketchEnabled,
      ketchOrganizationCode: MOCK_GLOBAL_SETTINGS.ketchOrganizationCode,
      ketchPropertyCode: MOCK_GLOBAL_SETTINGS.ketchPropertyCode,
      rudderStackEnabled: MOCK_GLOBAL_SETTINGS.rudderStackEnabled,
      rudderStackWriteKey: MOCK_GLOBAL_SETTINGS.rudderStackWriteKey,
      rudderStackDataPlaneUrl: MOCK_GLOBAL_SETTINGS.rudderStackDataPlaneUrl,
      optionalGtmContainerId: MOCK_GLOBAL_SETTINGS.optionalGtmContainerId,
      affiliateBrands: MOCK_GLOBAL_SETTINGS.affiliateBrands?.map((b) => ({
        name: b.name,
        url: b.url,
      })),
    });
    console.log('  ✓ global-setting');
  } catch (error) {
    failures += 1;
    console.warn(`  ✗ global-setting — ${shortError(error)}`);
  }

  const pageIds = new Map<string, string>();

  console.log('\n→ Pages (pass 1 — top level)');
  const topLevel = MOCK_PAGES.filter((p) => !p.path.includes('/'));
  for (const page of topLevel) {
    const regionId = regionIds.get(page.regionCode);
    if (!regionId) continue;
    try {
      const doc = await client.upsertCollection(
        'pages',
        DEFAULT_LOCALE,
        { slug: page.slug, 'region.code': page.regionCode },
        {
          title: page.title,
          slug: page.slug,
          pageType: page.pageType,
          region: regionId,
          noIndex: page.noIndex ?? false,
          seo: serializeSeo(page.seo),
          body: serializeBlocks(page.body),
          ...(page.jobBoardConfig
            ? {
                jobBoardConfig: {
                  jobAdderBoardId: page.jobBoardConfig.jobAdderBoardId,
                  featuredOnly: page.jobBoardConfig.featuredOnly ?? false,
                  externalApply: page.jobBoardConfig.externalApply ?? true,
                },
              }
            : {}),
        },
      );
      pageIds.set(`${page.regionCode}:${page.path}`, doc.documentId);
      console.log(`  ✓ ${page.regionCode}/${page.path}`);
    } catch (error) {
      failures += 1;
      console.warn(`  ✗ ${page.regionCode}/${page.path} — ${shortError(error)}`);
    }
  }

  console.log('\n→ Pages (pass 2 — nested)');
  const nested = MOCK_PAGES.filter((p) => p.path.includes('/'));
  for (const page of nested) {
    const regionId = regionIds.get(page.regionCode);
    if (!regionId) continue;
    const parentPath = page.path.split('/').slice(0, -1).join('/');
    const parentId = pageIds.get(`${page.regionCode}:${parentPath}`);
    try {
      const doc = await client.upsertCollection(
        'pages',
        DEFAULT_LOCALE,
        { slug: page.slug, 'region.code': page.regionCode },
        {
          title: page.title,
          slug: page.slug,
          pageType: page.pageType,
          region: regionId,
          ...(parentId ? { parent: parentId } : {}),
          noIndex: page.noIndex ?? false,
          seo: serializeSeo(page.seo),
          body: serializeBlocks(page.body),
        },
      );
      pageIds.set(`${page.regionCode}:${page.path}`, doc.documentId);
      console.log(`  ✓ ${page.regionCode}/${page.path}`);
    } catch (error) {
      failures += 1;
      console.warn(`  ✗ ${page.regionCode}/${page.path} — ${shortError(error)}`);
    }
  }

  console.log('\n→ Articles');
  for (const article of MOCK_ARTICLES) {
    const regionId = regionIds.get(article.regionCode);
    if (!regionId) continue;
    try {
      await client.upsertCollection(
        'articles',
        DEFAULT_LOCALE,
        { slug: article.slug, 'region.code': article.regionCode },
        {
          title: article.title,
          slug: article.slug,
          region: regionId,
          excerpt: article.excerpt ?? undefined,
          body: article.body ?? undefined,
          publishedAt: article.publishedAt ?? new Date().toISOString(),
          seo: serializeSeo(article.seo),
        },
      );
      console.log(`  ✓ ${article.regionCode}/blog/${article.slug}`);
    } catch (error) {
      failures += 1;
      console.warn(`  ✗ ${article.regionCode}/blog/${article.slug} — ${shortError(error)}`);
    }
  }

  console.log('\nDone.');
  if (failures > 0) {
    console.log('Some content failed — run npm run probe:strapi to check endpoint health.');
  } else {
    console.log('Set USE_MOCK_DATA=false and run: npm run build -w @anzuk/web');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
