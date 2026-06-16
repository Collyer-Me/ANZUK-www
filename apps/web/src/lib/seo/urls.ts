import { pageUrl } from '../../config/markets';
import { INTERNATIONAL_MARKET } from '../../config/markets';
import type { RegionPath } from '../../config/regions';
import { getSiteUrl } from '../../config/site';

export function absolutePageUrl(region: RegionPath, slug: string): string {
  const normalizedSlug = !slug || slug === 'home' ? 'home' : slug;
  return `${getSiteUrl()}${pageUrl(region, normalizedSlug)}`;
}

export function absoluteInternationalPageUrl(slug: string): string {
  const path = pageUrl(INTERNATIONAL_MARKET, slug);
  return `${getSiteUrl()}${path}`;
}

export function xDefaultUrl(): string {
  return `${getSiteUrl()}/`;
}

export function buildCanonicalUrl(
  region: RegionPath,
  slug: string,
  override?: string | null,
): string {
  if (override) return override.replace(/\/$/, '') + '/';
  return absolutePageUrl(region, slug);
}
