import type { StrapiMedia } from './types';

export function strapiMediaUrl(media?: StrapiMedia | null): string | undefined {
  if (!media?.url) return undefined;
  if (media.url.startsWith('http')) return media.url;

  const base = (
    import.meta.env.STRAPI_URL ??
    process.env.STRAPI_URL ??
    import.meta.env.PUBLIC_STRAPI_URL ??
    ''
  ).replace(/\/$/, '');

  if (!base) return media.url;
  return `${base}${media.url.startsWith('/') ? '' : '/'}${media.url}`;
}
