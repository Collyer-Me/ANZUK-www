/**
 * Seed Strapi Cloud from prototype mock data.
 *
 * Usage:
 *   1. Create a Full access API token in Strapi admin
 *   2. Add STRAPI_API_CURSOR (full access) to apps/web/.env
 *   3. npm run seed:strapi
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { INTERNATIONAL_MARKET, type Market } from '../apps/web/src/config/markets';
import { REGIONS } from '../apps/web/src/config/regions';
import {
  MOCK_ARTICLES,
  MOCK_PAGES,
  MOCK_SITE_SETTINGS,
} from '../apps/web/src/lib/strapi/mock-data';
import type { Article, ContentBlock, LocalizedPage, NavItem } from '../apps/web/src/lib/strapi/types';
import { toStrapiSlug } from '../apps/web/src/lib/strapi/slugs';
import { StrapiAdminClient } from './lib/strapi-admin';

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
    // .env optional if vars set in shell
  }
}

function localeForMarket(market: Market): string {
  if (market === INTERNATIONAL_MARKET) return 'en-AU';
  return REGIONS.find((r) => r.path === market)?.strapiLocale ?? 'en-AU';
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

function serializeSeo(seo: LocalizedPage['seo'] | Article['seo']) {
  if (!seo) return undefined;
  return {
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription ?? undefined,
  };
}

function serializePage(page: LocalizedPage, locale: string) {
  const data: Record<string, unknown> = {
    title: page.title,
    slug: toStrapiSlug(page.market, page.slug),
    market: page.market,
    pageTemplate: page.pageTemplate,
    noIndex: page.noIndex ?? false,
    seo: serializeSeo(page.seo),
    body: serializeBlocks(page.body),
  };

  if (page.canonicalUrl) data.canonicalUrl = page.canonicalUrl;
  if (page.jobBoardConfig) {
    data.jobBoardConfig = {
      jobAdderBoardId: page.jobBoardConfig.jobAdderBoardId,
      featuredOnly: page.jobBoardConfig.featuredOnly ?? false,
      externalApply: page.jobBoardConfig.externalApply ?? true,
    };
  }

  return { locale, data };
}

function serializeArticle(article: Article, locale: string) {
  return {
    locale,
    data: {
      title: article.title,
      slug: article.slug,
      market: article.market,
      excerpt: article.excerpt ?? undefined,
      body: article.body ?? undefined,
      publishedAt: article.publishedAt ?? new Date().toISOString(),
      seo: serializeSeo(article.seo),
    },
  };
}

function serializeNavItem(item: NavItem): Record<string, unknown> {
  return {
    label: item.label,
    url: item.url,
    openInNewTab: item.openInNewTab ?? false,
    ...(item.children?.length
      ? { children: item.children.map(serializeNavItem) }
      : {}),
  };
}

function serializeSiteSettings(locale: string) {
  return {
    locale,
    data: {
      siteName: MOCK_SITE_SETTINGS.siteName,
      tagline: MOCK_SITE_SETTINGS.tagline,
      defaultLocale: MOCK_SITE_SETTINGS.defaultLocale,
      organizationUrl: MOCK_SITE_SETTINGS.organizationUrl,
      contactEmail: MOCK_SITE_SETTINGS.contactEmail,
      scootUrl: MOCK_SITE_SETTINGS.scootUrl,
      executiveUrl: MOCK_SITE_SETTINGS.executiveUrl,
      geoSuggestEnabled: MOCK_SITE_SETTINGS.geoSuggestEnabled,
      affiliateBrands: MOCK_SITE_SETTINGS.affiliateBrands?.map((b) => ({
        name: b.name,
        url: b.url,
      })),
      marketNavigations: MOCK_SITE_SETTINGS.marketNavigations?.map((nav) => ({
        market: nav.market,
        items: nav.items?.map(serializeNavItem),
      })),
    },
  };
}

async function main(): Promise<void> {
  loadEnvFile(resolve(process.cwd(), 'apps/web/.env'));

  const baseUrl = process.env.STRAPI_URL;
  const token =
    process.env.STRAPI_API_CURSOR ??
    process.env.STRAPI_SEED_TOKEN ??
    process.env.STRAPI_API_TOKEN;

  if (!baseUrl || !token) {
    console.error(
      'Missing STRAPI_URL and STRAPI_API_CURSOR (full access token).\n' +
        'Add them to apps/web/.env',
    );
    process.exit(1);
  }

  if (!process.env.STRAPI_API_CURSOR && !process.env.STRAPI_SEED_TOKEN) {
    console.warn(
      'Warning: STRAPI_API_CURSOR not set — using STRAPI_API_TOKEN.\n' +
        'Seeding requires a Full access API token (Read-only will return 403).\n',
    );
  }

  const client = new StrapiAdminClient(baseUrl, token);
  const locales = ['en-AU', 'en-GB', 'en-CA', 'en-NZ'] as const;

  console.log(`Seeding Strapi at ${baseUrl}\n`);

  console.log('→ Site Settings');
  for (const locale of locales) {
    const { data } = serializeSiteSettings(locale);
    await client.upsertSingleType('site-setting', locale, data);
    console.log(`  ✓ site-setting (${locale})`);
  }

  console.log('\n→ Localized Pages');
  for (const page of MOCK_PAGES) {
    const locale = localeForMarket(page.market);
    const { data } = serializePage(page, locale);
    await client.upsertCollection(
      'localized-pages',
      locale,
      { slug: toStrapiSlug(page.market, page.slug), market: page.market },
      data,
    );
    console.log(`  ✓ ${page.market}/${page.slug} (${locale})`);
  }

  console.log('\n→ Articles');
  for (const article of MOCK_ARTICLES) {
    const locale = localeForMarket(article.market);
    const { data } = serializeArticle(article, locale);
    await client.upsertCollection(
      'articles',
      locale,
      { slug: article.slug, market: article.market },
      data,
    );
    console.log(`  ✓ ${article.market}/blog/${article.slug} (${locale})`);
  }

  console.log('\nDone.');
  console.log('Set USE_MOCK_DATA=false in apps/web/.env and run: npm run build -w @anzuk/web');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
