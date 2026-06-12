import type { Market } from '../config/markets';
import { INTERNATIONAL_MARKET, pageUrl } from '../config/markets';

/** Resolve a CMS nav URL to a site href (handles relative slugs and external links). */
export function resolveNavHref(market: Market, url: string): string {
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  const slug = trimmed.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!slug || slug === 'home') {
    return pageUrl(market, 'home');
  }

  return pageUrl(market, slug);
}

export function marketForRegion(region: string): Market {
  if (region === INTERNATIONAL_MARKET) return INTERNATIONAL_MARKET;
  return region as Market;
}
