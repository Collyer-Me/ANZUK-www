import { fetchStrapi, shouldUseMockData } from '../client';
import { MOCK_SITE_SETTINGS } from '../mock-data';
import type { AffiliateBrand, SiteSettings, StrapiSingleResponse } from '../types';

function normalizeAffiliateBrand(raw: Record<string, unknown>): AffiliateBrand {
  return {
    name: String(raw.name),
    url: String(raw.url),
    logo: raw.logo as AffiliateBrand['logo'],
  };
}

export async function getSiteSettings(strapiLocale: string): Promise<SiteSettings> {
  if (shouldUseMockData()) {
    return MOCK_SITE_SETTINGS;
  }

  const response = await fetchStrapi<StrapiSingleResponse<Record<string, unknown>>>(
    'site-setting',
    {
      locale: strapiLocale,
      'populate[affiliateBrands][populate]': 'logo',
    },
  );

  if (!response.data) {
    return MOCK_SITE_SETTINGS;
  }

  const raw = response.data;
  const affiliateBrands = Array.isArray(raw.affiliateBrands)
    ? raw.affiliateBrands.map((b: Record<string, unknown>) => normalizeAffiliateBrand(b))
    : undefined;

  return {
    siteName: String(raw.siteName),
    tagline: raw.tagline ? String(raw.tagline) : null,
    organizationUrl: raw.organizationUrl ? String(raw.organizationUrl) : null,
    contactEmail: raw.contactEmail ? String(raw.contactEmail) : null,
    defaultLocale: String(raw.defaultLocale ?? 'en-AU'),
    scootUrl: raw.scootUrl ? String(raw.scootUrl) : null,
    executiveUrl: raw.executiveUrl ? String(raw.executiveUrl) : null,
    geoSuggestEnabled: raw.geoSuggestEnabled !== false,
    affiliateBrands,
  };
}
