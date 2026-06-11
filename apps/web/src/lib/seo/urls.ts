import { getAbsoluteLocaleUrl } from 'astro:i18n';
import { DEFAULT_REGION, type RegionPath } from '../../config/regions';
import { getSiteUrl } from '../../config/site';
import { pagePathForSlug } from '../strapi/queries/pages';

export function absolutePageUrl(region: RegionPath, slug: string): string {
  const path = pagePathForSlug(slug);
  return getAbsoluteLocaleUrl(region, path || '/');
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
