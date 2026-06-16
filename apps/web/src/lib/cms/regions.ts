import type { Market } from '../../config/markets';
import { MOCK_REGIONS } from './mock-regions';
import type { NavItem, RegionEntity } from './types';
import { resolveLinkUrl } from './urls';

export async function getAllRegions(): Promise<RegionEntity[]> {
  return MOCK_REGIONS;
}

export async function getRegionByCode(code: Market): Promise<RegionEntity | undefined> {
  return MOCK_REGIONS.find((r) => r.code === code);
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

  const { getMockMarketNav } = await import('./mock-navigation');
  return getMockMarketNav(code);
}

/** @deprecated Use getNavigationForRegion */
export async function getNavigationForMarket(market: Market): Promise<NavItem[]> {
  return getNavigationForRegion(market);
}
