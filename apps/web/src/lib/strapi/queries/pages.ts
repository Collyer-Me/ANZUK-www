import { REGIONS, getRegionByPath, getRegionByStrapiLocale, type RegionPath } from '../../../config/regions';
import { fetchStrapi, shouldUseMockData } from '../client';
import { getMockPageBySlug, getMockPagesByLocale, MOCK_PAGES } from '../mock-data';
import type { LocalizedPage, StrapiListResponse } from '../types';

const PAGE_POPULATE = {
  'populate[seo][populate]': '*',
  'populate[body][on][blocks.hero][populate]': '*',
  'populate[body][on][blocks.feature-grid][populate][features]': '*',
  'populate[body][on][blocks.cta][populate]': '*',
  'populate[body][on][blocks.testimonial][populate]': '*',
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

  return {
    documentId: String(raw.documentId),
    title: String(raw.title),
    slug: String(raw.slug),
    canonicalUrl: raw.canonicalUrl ? String(raw.canonicalUrl) : null,
    noIndex: Boolean(raw.noIndex),
    seo: raw.seo as LocalizedPage['seo'],
    body: raw.body as LocalizedPage['body'],
    localizations,
  };
}

export async function getPagesByLocale(strapiLocale: string): Promise<LocalizedPage[]> {
  if (shouldUseMockData()) {
    return getMockPagesByLocale(strapiLocale);
  }

  const response = await fetchStrapi<StrapiListResponse<Record<string, unknown>>>(
    'localized-pages',
    {
      locale: strapiLocale,
      'pagination[pageSize]': '100',
      status: 'published',
      ...PAGE_POPULATE,
    },
  );

  return response.data.map(normalizePage);
}

export async function getPageBySlug(
  strapiLocale: string,
  slug: string,
): Promise<LocalizedPage | undefined> {
  if (shouldUseMockData()) {
    return getMockPageBySlug(strapiLocale, slug);
  }

  const response = await fetchStrapi<StrapiListResponse<Record<string, unknown>>>(
    'localized-pages',
    {
      locale: strapiLocale,
      'filters[slug][$eq]': slug,
      status: 'published',
      ...PAGE_POPULATE,
    },
  );

  const raw = response.data[0];
  return raw ? normalizePage(raw) : undefined;
}

export async function getAllRegionalPages(): Promise<Array<{ region: RegionPath; slug: string }>> {
  if (shouldUseMockData()) {
    return MOCK_PAGES.map((page) => {
      const region = REGIONS.find((r) => page.documentId === `mock-home-${r.path}`)!;
      return { region: region.path, slug: page.slug };
    });
  }

  const paths: Array<{ region: RegionPath; slug: string }> = [];

  for (const region of REGIONS) {
    const pages = await getPagesByLocale(region.strapiLocale);
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

  for (const loc of page.localizations ?? []) {
    const region = getRegionByStrapiLocale(loc.locale);
    if (region) {
      alternates.push({ path: region.path, hreflang: region.hreflang, slug: loc.slug });
    }
  }

  // Ensure all regions are represented for hreflang reciprocity
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
