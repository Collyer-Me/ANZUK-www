import { fetchStrapiOptional, shouldUseMockData } from '../client';
import { MOCK_SITE_SETTINGS } from '../mock-data';
import type { AffiliateBrand, SiteSettings, StrapiSingleResponse } from '../types';

function normalizeAffiliateBrand(raw: Record<string, unknown>): AffiliateBrand {
  return {
    name: String(raw.name),
    url: String(raw.url),
    logo: raw.logo as AffiliateBrand['logo'],
  };
}

function normalizeSiteSettings(raw: Record<string, unknown>): SiteSettings {
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

async function fetchSiteSettingsFromApi(
  strapiLocale: string,
): Promise<SiteSettings | null> {
  const params = {
    locale: strapiLocale,
    'populate[affiliateBrands][populate]': 'logo',
  };

  // Strapi single-type UID is site-setting; try plural alias if needed
  for (const endpoint of ['site-setting', 'site-settings'] as const) {
    const response = await fetchStrapiOptional<StrapiSingleResponse<Record<string, unknown>>>(
      endpoint,
      params,
    );
    if (response?.data) {
      return normalizeSiteSettings(response.data);
    }
  }

  return null;
}

export async function getSiteSettings(strapiLocale: string): Promise<SiteSettings> {
  if (shouldUseMockData()) {
    return MOCK_SITE_SETTINGS;
  }

  const fromApi = await fetchSiteSettingsFromApi(strapiLocale);
  if (fromApi) {
    return fromApi;
  }

  // Single types return 404 until the first entry is saved in Content Manager
  console.warn(
    `[strapi] No Site Settings for locale "${strapiLocale}" — using defaults. ` +
      'Create and save Site Settings in Strapi Content Manager.',
  );
  return MOCK_SITE_SETTINGS;
}
