import type { Market } from '../../../config/markets';
import { fetchStrapiOptional, shouldUseMockData } from '../client';
import { MOCK_MARKET_NAVIGATIONS } from '../mock-navigation';
import type { MarketNavigation, NavItem, NavLink, StrapiListResponse } from '../types';

function normalizeNavLink(raw: Record<string, unknown>): NavLink {
  return {
    id: Number(raw.id ?? 0),
    label: String(raw.label),
    url: String(raw.url),
    openInNewTab: raw.openInNewTab === true,
  };
}

function normalizeNavItem(raw: Record<string, unknown>): NavItem {
  const children = Array.isArray(raw.children)
    ? raw.children.map((child: Record<string, unknown>) => normalizeNavLink(child))
    : undefined;

  return {
    id: Number(raw.id ?? 0),
    label: String(raw.label),
    url: String(raw.url),
    openInNewTab: raw.openInNewTab === true,
    children,
  };
}

function normalizeMarketNavigation(raw: Record<string, unknown>): MarketNavigation {
  const items = Array.isArray(raw.items)
    ? raw.items.map((item: Record<string, unknown>) => normalizeNavItem(item))
    : undefined;

  return {
    documentId: String(raw.documentId),
    market: String(raw.market) as MarketNavigation['market'],
    items,
  };
}

export async function getMarketNavigations(): Promise<MarketNavigation[]> {
  if (shouldUseMockData()) {
    return MOCK_MARKET_NAVIGATIONS;
  }

  const response = await fetchStrapiOptional<StrapiListResponse<Record<string, unknown>>>(
    'market-navigations',
    {
      'pagination[pageSize]': '10',
      'populate[items][populate][children]': '*',
    },
  );

  if (!response?.data?.length) {
    console.warn('[strapi] No Market Navigation entries — using mock navigation.');
    return MOCK_MARKET_NAVIGATIONS;
  }

  return response.data.map(normalizeMarketNavigation);
}

export async function getNavigationForMarket(market: Market): Promise<NavItem[]> {
  const navigations = await getMarketNavigations();
  return navigations.find((nav) => nav.market === market)?.items ?? [];
}
