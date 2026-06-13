import type { Market } from '../../../config/markets';
import { fetchStrapiOptional, shouldUseMockData } from '../client';
import { MOCK_REGIONS } from '../mock-regions';
import type { NavItem, RegionEntity, StrapiListResponse } from '../types';
import { resolveLinkUrl } from '../urls';

const REGION_POPULATE = {
  'populate[header][populate][items][populate][link][populate]': 'page',
  'populate[header][populate][items][populate][children][populate][link][populate]': 'page',
  'populate[footer][populate][columns][populate][links][populate]': 'page',
  'populate[defaultSeo][populate]': '*',
};

function normalizeRegion(raw: Record<string, unknown>): RegionEntity {
  return {
    documentId: String(raw.documentId),
    code: String(raw.code) as Market,
    name: String(raw.name),
    hreflang: String(raw.hreflang),
    isDefault: raw.isDefault === true,
    isGlobalHub: raw.isGlobalHub === true,
    contactEmail: raw.contactEmail ? String(raw.contactEmail) : null,
    contactPhone: raw.contactPhone ? String(raw.contactPhone) : null,
    jobAdderBoardId: raw.jobAdderBoardId ? String(raw.jobAdderBoardId) : null,
    geoSuggestEnabled: raw.geoSuggestEnabled !== false,
    cookiePolicyUrl: raw.cookiePolicyUrl ? String(raw.cookiePolicyUrl) : null,
    header: raw.header as RegionEntity['header'],
    footer: raw.footer as RegionEntity['footer'],
    defaultSeo: raw.defaultSeo as RegionEntity['defaultSeo'],
  };
}

export async function getAllRegions(): Promise<RegionEntity[]> {
  if (shouldUseMockData()) return MOCK_REGIONS;

  const response = await fetchStrapiOptional<StrapiListResponse<Record<string, unknown>>>('regions', {
    'pagination[pageSize]': '20',
    ...REGION_POPULATE,
  });

  if (!response?.data) return MOCK_REGIONS;
  return response.data.map(normalizeRegion);
}

export async function getRegionByCode(code: Market): Promise<RegionEntity | undefined> {
  if (shouldUseMockData()) {
    return MOCK_REGIONS.find((r) => r.code === code);
  }

  const response = await fetchStrapiOptional<StrapiListResponse<Record<string, unknown>>>('regions', {
    'filters[code][$eq]': code,
    ...REGION_POPULATE,
  });

  if (!response?.data[0]) {
    return MOCK_REGIONS.find((r) => r.code === code);
  }

  const raw = response.data[0];
  return raw ? normalizeRegion(raw) : undefined;
}

function linkToNavItem(
  link: { label: string; url?: string | null; page?: { path?: string } | null; openInNewTab?: boolean },
  id: number,
  regionCode: Market,
): NavItem {
  return {
    id,
    label: link.label,
    url: resolveLinkUrl(link, regionCode).replace(/^\//, '').replace(/\/$/, '') || 'home',
    openInNewTab: link.openInNewTab,
  };
}

export function navItemsFromRegion(region: RegionEntity): NavItem[] {
  const items = region.header?.items ?? [];
  return items.map((item, index) => {
    const link = item.link;
    const navItem = linkToNavItem(link, index + 1, region.code);
    if (item.children?.length) {
      navItem.children = item.children.map((child, childIndex) => {
        const childLink = child.link ?? child;
        return {
          id: (index + 1) * 100 + childIndex,
          label: childLink.label,
          url: resolveLinkUrl(childLink, region.code).replace(/^\//, '').replace(/\/$/, ''),
          openInNewTab: childLink.openInNewTab,
        };
      });
    }
    return navItem;
  });
}

export async function getNavigationForRegion(code: Market): Promise<NavItem[]> {
  const region = await getRegionByCode(code);
  if (region?.header?.items?.length) {
    return navItemsFromRegion(region);
  }

  const { getMockMarketNav } = await import('../mock-navigation');
  return getMockMarketNav(code);
}

/** @deprecated Use getNavigationForRegion */
export async function getNavigationForMarket(market: Market): Promise<NavItem[]> {
  return getNavigationForRegion(market);
}
