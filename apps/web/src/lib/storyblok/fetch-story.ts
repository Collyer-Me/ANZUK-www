import type { Market } from '../../config/markets';
import { isStoryblokEnabled, storyblokVersion } from './config';
import type { StoryblokStory } from './story-page';

export async function fetchPilotStory(
  slug: string,
  locals?: App.Locals,
): Promise<StoryblokStory | null> {
  if (!isStoryblokEnabled()) return null;

  try {
    const { getPayload, useStoryblokApi } = await import('@storyblok/astro');
    const payload = await getPayload({ locals: locals ?? {} });
    if (payload?.story) {
      return payload.story as StoryblokStory;
    }

    const storyblokApi = useStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: storyblokVersion(),
    });
    return data.story as StoryblokStory;
  } catch (error) {
    console.warn(`[storyblok] Could not fetch story "${slug}":`, error);
    return null;
  }
}

export function regionHref(url: string | undefined | null, regionCode: Market): string {
  if (!url) return '#';
  if (url.startsWith('http') || url.startsWith('mailto:')) return url;
  if (url.startsWith('/')) return url.endsWith('/') ? url : `${url}/`;
  return regionCode === 'international' ? `/${url}/` : `/${regionCode}/${url}/`;
}
