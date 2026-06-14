import { INTERNATIONAL_MARKET, type Market } from '../../../config/markets';
import type { RegionPath } from '../../../config/regions';
import { fetchStrapiOptional, shouldUseMockData } from '../client';
import { MOCK_PAGES, getMockPageByRegionAndPath } from '../mock-data';
import { resolvePathFromTree } from '../urls';
import type { CmsPage, ContentBlock, PageEquivalent, StrapiListResponse } from '../types';

const PAGE_POPULATE = {
  'populate[region][populate]': '*',
  'populate[parent][fields][0]': 'documentId',
  'populate[parent][fields][1]': 'slug',
  'populate[seo][populate]': '*',
  'populate[jobBoardConfig][populate]': '*',
  'populate[equivalents][populate][region][fields][0]': 'code',
  'populate[equivalents][populate][region][fields][1]': 'hreflang',
  'populate[equivalents][fields][0]': 'slug',
  'populate[equivalents][fields][1]': 'documentId',
  'populate[body][on][blocks.hero][populate]': '*',
  'populate[body][on][blocks.feature-grid][populate][features]': '*',
  'populate[body][on][blocks.cta][populate]': '*',
  'populate[body][on][blocks.cta-band][populate][primary][populate]': 'page',
  'populate[body][on][blocks.cta-band][populate][secondary][populate]': 'page',
  'populate[body][on][blocks.testimonial][populate]': '*',
  'populate[body][on][blocks.testimonials][populate][items]': '*',
  'populate[body][on][blocks.region-grid][populate][regions]': '*',
  'populate[body][on][blocks.values-grid][populate][values]': '*',
  'populate[body][on][blocks.value-tabs][populate][values]': '*',
  'populate[body][on][blocks.form-embed][populate]': '*',
  'populate[body][on][blocks.lead-form][populate]': '*',
  'populate[body][on][blocks.rich-text][populate]': '*',
  'populate[body][on][blocks.stats-row][populate][stats]': '*',
  'populate[body][on][blocks.stats-band][populate][stats]': '*',
  'populate[body][on][blocks.persona-cards][populate][cards][populate][cta][populate]': 'page',
  'populate[body][on][blocks.steps-row][populate][steps]': '*',
  'populate[body][on][blocks.logo-marquee][populate][logos][populate]': 'image',
  'populate[body][on][blocks.shared-section][populate][section][populate][body][on][blocks.hero][populate]': '*',
  'populate[body][on][blocks.shared-section][populate][section][populate][body][on][blocks.cta][populate]': '*',
  'populate[body][on][blocks.shared-section][populate][section][populate][body][on][blocks.feature-grid][populate][features]': '*',
};

function expandSharedSections(blocks: ContentBlock[] | undefined): ContentBlock[] {
  if (!blocks?.length) return [];
  const expanded: ContentBlock[] = [];

  for (const block of blocks) {
    if (block.__component === 'blocks.shared-section' && block.section?.body?.length) {
      expanded.push(...block.section.body);
    } else {
      expanded.push(block);
    }
  }

  return expanded;
}

function normalizePage(raw: Record<string, unknown>, allRaw: Record<string, unknown>[]): CmsPage {
  const regionRaw = raw.region as Record<string, unknown> | undefined;
  const regionCode = String(regionRaw?.code ?? 'au') as Market;
  const parentRaw = raw.parent as Record<string, unknown> | null | undefined;

  const treeNodes = allRaw.map((p) => ({
    documentId: String(p.documentId),
    slug: String(p.slug),
    parentDocumentId: (p.parent as Record<string, unknown> | null)?.documentId
      ? String((p.parent as Record<string, unknown>).documentId)
      : null,
  }));

  const path = resolvePathFromTree(
    {
      documentId: String(raw.documentId),
      slug: String(raw.slug),
      parentDocumentId: parentRaw?.documentId ? String(parentRaw.documentId) : null,
    },
    treeNodes,
    regionCode,
  );

  const equivalents: PageEquivalent[] = Array.isArray(raw.equivalents)
    ? raw.equivalents.map((eq: Record<string, unknown>) => {
        const eqRegion = eq.region as Record<string, unknown> | undefined;
        const eqRegionCode = String(eqRegion?.code ?? 'au') as Market;
        const eqPath = resolvePathFromTree(
          {
            documentId: String(eq.documentId),
            slug: String(eq.slug),
            parentDocumentId: (eq.parent as Record<string, unknown> | null)?.documentId
              ? String((eq.parent as Record<string, unknown>).documentId)
              : null,
          },
          allRaw.map((p) => ({
            documentId: String(p.documentId),
            slug: String(p.slug),
            parentDocumentId: (p.parent as Record<string, unknown> | null)?.documentId
              ? String((p.parent as Record<string, unknown>).documentId)
              : null,
          })),
          eqRegionCode,
        );
        return {
          documentId: String(eq.documentId),
          path: eqPath,
          regionCode: String(eqRegion?.code ?? 'au') as Market,
          hreflang: String(eqRegion?.hreflang ?? 'en'),
        };
      })
    : [];

  return {
    documentId: String(raw.documentId),
    title: String(raw.title),
    slug: String(raw.slug),
    path,
    regionCode,
    pageType: String(raw.pageType) as CmsPage['pageType'],
    parentDocumentId: parentRaw?.documentId ? String(parentRaw.documentId) : null,
    navLabel: raw.navLabel ? String(raw.navLabel) : null,
    noIndex: Boolean(raw.noIndex),
    seo: raw.seo as CmsPage['seo'],
    jobBoardConfig: raw.jobBoardConfig as CmsPage['jobBoardConfig'],
    body: expandSharedSections(raw.body as ContentBlock[] | undefined),
    equivalents,
  };
}

async function fetchAllPagesRaw(): Promise<Record<string, unknown>[]> {
  const response = await fetchStrapiOptional<StrapiListResponse<Record<string, unknown>>>('pages', {
    locale: 'en',
    'pagination[pageSize]': '200',
    status: 'published',
    ...PAGE_POPULATE,
  });
  return response?.data ?? [];
}

export async function getPagesByRegion(regionCode: Market): Promise<CmsPage[]> {
  if (shouldUseMockData()) {
    return MOCK_PAGES.filter((p) => p.regionCode === regionCode);
  }

  const allRaw = await fetchAllPagesRaw();
  if (!allRaw.length) {
    return MOCK_PAGES.filter((p) => p.regionCode === regionCode);
  }

  return allRaw
    .filter((p) => String((p.region as Record<string, unknown>)?.code) === regionCode)
    .map((p) => normalizePage(p, allRaw));
}

export async function getPageByRegionAndPath(
  regionCode: Market,
  path: string,
): Promise<CmsPage | undefined> {
  if (shouldUseMockData()) {
    return getMockPageByRegionAndPath(regionCode, path);
  }

  const pages = await getPagesByRegion(regionCode);
  return pages.find((p) => p.path === path);
}

/** @deprecated Use getPageByRegionAndPath */
export async function getPageByMarketAndSlug(
  market: Market,
  slug: string,
): Promise<CmsPage | undefined> {
  return getPageByRegionAndPath(market, slug);
}

/** @deprecated Use getPagesByRegion */
export async function getPagesByMarket(market: Market): Promise<CmsPage[]> {
  return getPagesByRegion(market);
}

export async function getAllInternationalPages(): Promise<CmsPage[]> {
  return getPagesByRegion(INTERNATIONAL_MARKET);
}

export async function getAllRegionalPages(): Promise<Array<{ region: RegionPath; slug: string }>> {
  if (shouldUseMockData()) {
    return MOCK_PAGES.filter((p) => p.regionCode !== INTERNATIONAL_MARKET).map((page) => ({
      region: page.regionCode as RegionPath,
      slug: page.path,
    }));
  }

  const allRaw = await fetchAllPagesRaw();
  if (!allRaw.length) {
    return MOCK_PAGES.filter((p) => p.regionCode !== INTERNATIONAL_MARKET).map((page) => ({
      region: page.regionCode as RegionPath,
      slug: page.path,
    }));
  }

  const paths: Array<{ region: RegionPath; slug: string }> = [];

  for (const raw of allRaw) {
    const regionCode = String((raw.region as Record<string, unknown>)?.code);
    if (regionCode === INTERNATIONAL_MARKET) continue;
    const page = normalizePage(raw, allRaw);
    paths.push({ region: regionCode as RegionPath, slug: page.path });
  }

  return paths;
}

export function buildAlternates(
  page: CmsPage,
  currentRegion: RegionPath,
): Array<{ path: RegionPath; hreflang: string; slug: string }> {
  if (page.equivalents?.length) {
    return page.equivalents.map((eq) => ({
      path: eq.regionCode as RegionPath,
      hreflang: eq.hreflang,
      slug: eq.path,
    }));
  }

  return [{ path: currentRegion, hreflang: 'en', slug: page.path }];
}

export function pagePathForSlug(slug: string): string {
  return slug === 'home' ? '' : `${slug}/`;
}
