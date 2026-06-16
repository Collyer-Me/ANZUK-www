import type { GlobalSettings, SeoComponent, StrapiMedia } from '../cms/types';
import { strapiMediaUrl } from '../cms/media-url';

export function resolveOgImageUrl(
  seo?: SeoComponent | null,
  ...fallbacks: Array<StrapiMedia | null | undefined>
): string | undefined {
  for (const source of [seo?.ogImage, ...fallbacks]) {
    const url = strapiMediaUrl(source ?? undefined);
    if (url) return url;
  }
  return undefined;
}

export function resolveOgImageAlt(
  seo?: SeoComponent | null,
  ...fallbacks: Array<StrapiMedia | null | undefined>
): string | undefined {
  for (const source of [seo?.ogImage, ...fallbacks]) {
    if (source?.alternativeText) return source.alternativeText;
  }
  return undefined;
}

export function resolvePageOgImageUrl(
  page: { seo?: SeoComponent | null },
  settings?: GlobalSettings | null,
  ogImageFallback?: StrapiMedia | null,
): string | undefined {
  return resolveOgImageUrl(page.seo, ogImageFallback, settings?.defaultOgImage);
}

export function resolvePageOgImageAlt(
  page: { seo?: SeoComponent | null; title?: string },
  settings?: GlobalSettings | null,
  ogImageFallback?: StrapiMedia | null,
): string | undefined {
  return (
    resolveOgImageAlt(page.seo, ogImageFallback, settings?.defaultOgImage) ?? page.title ?? undefined
  );
}
