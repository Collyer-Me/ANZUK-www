import { DEFAULT_REGION } from './regions';

export const siteConfig = {
  name: 'ANZUK Education',
  tagline: 'International expertise in education. Local understanding.',
  defaultRegion: DEFAULT_REGION,
  organizationId: '#organization',
  websiteId: '#website',
} as const;

export function getSiteUrl(): string {
  return (import.meta.env.SITE_URL ?? process.env.SITE_URL ?? 'http://localhost:4321').replace(
    /\/$/,
    '',
  );
}
