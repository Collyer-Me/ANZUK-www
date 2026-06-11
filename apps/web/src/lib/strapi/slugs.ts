import { INTERNATIONAL_MARKET, type Market } from '../../config/markets';

/** Strapi uid slugs are unique per locale; prefix by market to avoid collisions (e.g. intl vs au on en-AU). */
export function toStrapiSlug(market: Market, slug: string): string {
  const prefix = market === INTERNATIONAL_MARKET ? 'intl' : market;
  return `${prefix}-${slug}`;
}

export function fromStrapiSlug(market: Market, strapiSlug: string): string {
  const prefix = market === INTERNATIONAL_MARKET ? 'intl' : market;
  const expected = `${prefix}-`;
  return strapiSlug.startsWith(expected) ? strapiSlug.slice(expected.length) : strapiSlug;
}
