/** Pilot stories managed in Storyblok (folder au/). */
export const PILOT_STORY_SLUGS = {
  'au/home': { region: 'au' as const, path: 'home' },
  'au/who-we-are': { region: 'au' as const, path: 'who-we-are' },
} as const;

export type PilotStorySlug = keyof typeof PILOT_STORY_SLUGS;

export function isStoryblokEnabled(): boolean {
  return Boolean(import.meta.env.STORYBLOK_DELIVERY_API_TOKEN?.trim());
}

export function storyblokVersion(): 'draft' | 'published' {
  // Visual Editor always serves draft content; production builds use published.
  return import.meta.env.PROD ? 'published' : 'draft';
}

export function storyblokApiRegion(): string {
  return import.meta.env.STORYBLOK_REGION ?? 'eu';
}
