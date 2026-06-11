import { fetchStrapi, shouldUseMockData } from '../client';
import { MOCK_SITE_SETTINGS } from '../mock-data';
import type { SiteSettings, StrapiSingleResponse } from '../types';

export async function getSiteSettings(strapiLocale: string): Promise<SiteSettings> {
  if (shouldUseMockData()) {
    return MOCK_SITE_SETTINGS;
  }

  const response = await fetchStrapi<StrapiSingleResponse<Record<string, unknown>>>(
    'site-setting',
    { locale: strapiLocale },
  );

  if (!response.data) {
    return MOCK_SITE_SETTINGS;
  }

  const raw = response.data;
  return {
    siteName: String(raw.siteName),
    tagline: raw.tagline ? String(raw.tagline) : null,
    organizationUrl: raw.organizationUrl ? String(raw.organizationUrl) : null,
    contactEmail: raw.contactEmail ? String(raw.contactEmail) : null,
    defaultLocale: String(raw.defaultLocale ?? 'en-AU'),
  };
}
