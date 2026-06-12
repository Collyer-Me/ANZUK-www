import { INTERNATIONAL_MARKET } from '../../../config/markets';
import type { Market } from '../../../config/markets';
import { REGIONS, getRegionByPath, type RegionPath } from '../../../config/regions';
import { fetchStrapi, shouldUseMockData } from '../client';
import {
  getMockPageByMarketAndSlug,
  getMockPagesByMarket,
  MOCK_PAGES,
} from '../mock-data';
import { fromStrapiSlug, toStrapiSlug } from '../slugs';
import type { LocalizedPage, StrapiListResponse } from '../types';

const PAGE_POPULATE = {
  'populate[seo][populate]': '*',
  'populate[jobBoardConfig][populate]': '*',
  'populate[body][on][blocks.hero][populate]': '*',
  'populate[body][on][blocks.feature-grid][populate][features]': '*',
  'populate[body][on][blocks.cta][populate]': '*',
  'populate[body][on][blocks.testimonial][populate]': '*',
  'populate[body][on][blocks.region-grid][populate][regions]': '*',
  'populate[body][on][blocks.values-grid][populate][values]': '*',
  'populate[body][on][blocks.form-embed][populate]': '*',
  'populate[body][on][blocks.rich-text][populate]': '*',
  'populate[body][on][blocks.stats-row][populate][stats]': '*',
  'populate[localizations][fields][0]': 'slug',
  'populate[localizations][fields][1]': 'locale',
  'populate[localizations][fields][2]': 'documentId',
};

function normalizePage(raw: Record<string, unknown>): LocalizedPage {
  const localizations = Array.isArray(raw.localizations)
    ? raw.localizations.map((loc: Record<string, unknown>) => ({
        locale: String(loc.locale),
        slug: String(loc.slug),
        documentId: String(loc.documentId),
      }))
    : [];

  const market = String(raw.market) as LocalizedPage['market'];

  return {
    documentId: String(raw.documentId),
    title: String(raw.title),
    slug: fromStrapiSlug(market, String(raw.slug)),
    market,
    pageTemplate: String(raw.pageTemplate) as LocalizedPage['pageTemplate'],
    canonicalUrl: raw.canonicalUrl ? String(raw.canonicalUrl) : null,
    noIndex: Boolean(raw.noIndex),
    showInNav: raw.showInNav === true,
    navLabel: raw.navLabel ? String(raw.navLabel) : null,
    navOrder: typeof raw.navOrder === 'number' ? raw.navOrder : 0,
    seo: raw.seo as LocalizedPage['seo'],
    jobBoardConfig: raw.jobBoardConfig as LocalizedPage['jobBoardConfig'],
    body: raw.body as LocalizedPage['body'],
    localizations,
  };
}

export async function getPagesByMarket(market: Market): Promise<LocalizedPage[]> {
  if (shouldUseMockData()) {
    return getMockPagesByMarket(market);
  }

  const region = REGIONS.find((r) => r.path === market);
  const locale = market === INTERNATIONAL_MARKET ? 'en-AU' : region?.strapiLocale ?? 'en-AU';

  const response = await fetchStrapi<StrapiListResponse<Record<string, unknown>>>(
    'localized-pages',
    {
      locale,
      'filters[market][$eq]': market,
      'pagination[pageSize]': '100',
      status: 'published',
      ...PAGE_POPULATE,
    },
  );

  return response.data.map(normalizePage);
}

export async function getPageByMarketAndSlug(
  market: Market,
  slug: string,
): Promise<LocalizedPage | undefined> {
  if (shouldUseMockData()) {
    return getMockPageByMarketAndSlug(market, slug);
  }

  const region = REGIONS.find((r) => r.path === market);
  const locale = market === INTERNATIONAL_MARKET ? 'en-AU' : region?.strapiLocale ?? 'en-AU';

  const response = await fetchStrapi<StrapiListResponse<Record<string, unknown>>>(
    'localized-pages',
    {
      locale,
      'filters[market][$eq]': market,
      'filters[slug][$eq]': toStrapiSlug(market, slug),
      status: 'published',
      ...PAGE_POPULATE,
    },
  );

  const raw = response.data[0];
  return raw ? normalizePage(raw) : undefined;
}

/** @deprecated Use getPageByMarketAndSlug with the region path as market */
export async function getPageBySlug(
  strapiLocale: string,
  slug: string,
): Promise<LocalizedPage | undefined> {
  const region = REGIONS.find((r) => r.strapiLocale === strapiLocale);
  if (!region) return undefined;
  return getPageByMarketAndSlug(region.path, slug);
}

/** @deprecated Use getPagesByMarket */
export async function getPagesByLocale(strapiLocale: string): Promise<LocalizedPage[]> {
  const region = REGIONS.find((r) => r.strapiLocale === strapiLocale);
  if (!region) return [];
  return getPagesByMarket(region.path);
}

export async function getAllInternationalPages(): Promise<LocalizedPage[]> {
  return getPagesByMarket(INTERNATIONAL_MARKET);
}

export async function getAllRegionalPages(): Promise<Array<{ region: RegionPath; slug: string }>> {
  if (shouldUseMockData()) {
    return MOCK_PAGES.filter((p) => p.market !== INTERNATIONAL_MARKET).map((page) => ({
      region: page.market as RegionPath,
      slug: page.slug,
    }));
  }

  const paths: Array<{ region: RegionPath; slug: string }> = [];

  for (const region of REGIONS) {
    const pages = await getPagesByMarket(region.path);
    for (const page of pages) {
      paths.push({ region: region.path, slug: page.slug });
    }
  }

  return paths;
}

export function buildAlternates(
  page: LocalizedPage,
  currentRegion: RegionPath,
): Array<{ path: RegionPath; hreflang: string; slug: string }> {
  const current = getRegionByPath(currentRegion)!;
  const alternates: Array<{ path: RegionPath; hreflang: string; slug: string }> = [
    { path: currentRegion, hreflang: current.hreflang, slug: page.slug },
  ];

  for (const region of REGIONS) {
    if (!alternates.some((a) => a.path === region.path)) {
      alternates.push({ path: region.path, hreflang: region.hreflang, slug: page.slug });
    }
  }

  return alternates;
}

export function pagePathForSlug(slug: string): string {
  return slug === 'home' ? '' : `${slug}/`;
}
