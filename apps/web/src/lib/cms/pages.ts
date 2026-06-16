import { INTERNATIONAL_MARKET, type Market } from '../../config/markets';
import type { RegionPath } from '../../config/regions';
import { MOCK_PAGES, getMockPageByRegionAndPath } from './mock-data';
import type { CmsPage } from './types';

export async function getPagesByRegion(regionCode: Market): Promise<CmsPage[]> {
  return MOCK_PAGES.filter((p) => p.regionCode === regionCode);
}

export async function getPageByRegionAndPath(
  regionCode: Market,
  path: string,
): Promise<CmsPage | undefined> {
  return getMockPageByRegionAndPath(regionCode, path);
}

/** @deprecated Use getPageByRegionAndPath */
export async function getPageByMarketAndSlug(
  market: Market,
  slug: string,
): Promise<CmsPage | undefined> {
  return getPageByRegionAndPath(market, slug);
}

export async function getAllInternationalPages(): Promise<CmsPage[]> {
  return getPagesByRegion(INTERNATIONAL_MARKET);
}

export async function getAllRegionalPages(): Promise<Array<{ region: RegionPath; slug: string }>> {
  return MOCK_PAGES.filter((p) => p.regionCode !== INTERNATIONAL_MARKET).map((page) => ({
    region: page.regionCode as RegionPath,
    slug: page.path,
  }));
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
