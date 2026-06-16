import type { StrapiMedia } from './types';

export function cmsMediaUrl(media?: StrapiMedia | null): string | undefined {
  if (!media?.url) return undefined;
  if (media.url.startsWith('http')) return media.url;
  return media.url.startsWith('/') ? media.url : `/${media.url}`;
}

/** @deprecated Use cmsMediaUrl */
export const strapiMediaUrl = cmsMediaUrl;
