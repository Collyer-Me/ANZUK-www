/**
 * CMS market scoping — drives URL prefix and page trees.
 * See docs/ia/strapi-mapping.md and ADR 007.
 */

export type Market = 'international' | 'au' | 'uk' | 'ca' | 'nz';

export type RegionalMarket = Exclude<Market, 'international'>;

export const INTERNATIONAL_MARKET: Market = 'international';

export const REGIONAL_MARKETS: readonly RegionalMarket[] = ['au', 'uk', 'ca', 'nz'] as const;

export type PageTemplate =
  | 'home-international'
  | 'home-regional'
  | 'service-educators'
  | 'service-schools'
  | 'service-leadership'
  | 'sector'
  | 'job-listing'
  | 'blog-listing'
  | 'blog-article'
  | 'about'
  | 'team-listing'
  | 'contact'
  | 'faq'
  | 'form-landing'
  | 'policy'
  | 'product'
  | 'process'
  | 'cross-market'
  | 'generic';

/** US market — Scoot Education on a separate domain (not a Strapi market). */
export const SCOOT_US = {
  label: 'United States',
  url: 'https://scoot.education',
  hreflang: 'en-US',
  htmlLang: 'en-US',
  flag: '🇺🇸',
} as const;

export function isRegionalMarket(market: string): market is RegionalMarket {
  return (REGIONAL_MARKETS as readonly string[]).includes(market);
}

export function marketUrlPrefix(market: Market): string {
  return market === INTERNATIONAL_MARKET ? '' : `/${market}`;
}

export function pageUrl(market: Market, slug: string): string {
  if (market === INTERNATIONAL_MARKET) {
    return slug === 'home' ? '/' : `/${slug}/`;
  }
  return slug === 'home' ? `/${market}/` : `/${market}/${slug}/`;
}

export function articleUrl(market: RegionalMarket, slug: string): string {
  return `/${market}/blog/${slug}/`;
}
