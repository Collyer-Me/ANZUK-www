import type { Market, PageTemplate } from '../../config/markets';
import type { CmsPage } from '../cms/types';

export interface StoryblokStory {
  uuid: string;
  name: string;
  slug: string;
  full_slug: string;
  content: Record<string, unknown>;
}

export function uidToId(uid: string | undefined): number {
  if (!uid) return 1;
  const parsed = Number.parseInt(uid.replace(/-/g, '').slice(0, 8), 16);
  return Number.isFinite(parsed) ? parsed : 1;
}

export function cmsPageFromStory(story: StoryblokStory, regionCode: Market): CmsPage {
  const content = story.content;
  const seoRaw = content.seo as Record<string, unknown> | undefined;
  const pathFromSlug =
    story.full_slug.replace(new RegExp(`^${regionCode}/`), '').replace(/\/$/, '') || 'home';

  return {
    documentId: story.uuid,
    title: String(content.title ?? story.name),
    slug: story.slug,
    path: pathFromSlug,
    regionCode,
    pageType: String(content.page_type ?? 'page') as PageTemplate,
    noIndex: false,
    seo: {
      metaTitle: String(
        seoRaw?.meta_title ?? content.meta_title ?? content.title ?? story.name,
      ),
      metaDescription:
        seoRaw?.meta_description ?? content.meta_description
          ? String(seoRaw?.meta_description ?? content.meta_description)
          : null,
      ogImage: null,
    },
    body: [],
  };
}
