import { fetchStrapiOptional, shouldUseMockData } from '../client';
import { getRegionByCode } from './regions';
import { MOCK_GLOBAL_SETTINGS } from '../mock-data';
import type {
  AffiliateBrand,
  GlobalSettings,
  SocialLink,
  StrapiSingleResponse,
} from '../types';

function normalizeAffiliateBrand(raw: Record<string, unknown>): AffiliateBrand {
  return {
    name: String(raw.name),
    url: String(raw.url),
    logo: raw.logo as AffiliateBrand['logo'],
  };
}

function normalizeGlobalSettings(raw: Record<string, unknown>): GlobalSettings {
  return {
    organizationName: String(raw.organizationName ?? raw.siteName ?? 'ANZUK Education'),
    tagline: raw.tagline ? String(raw.tagline) : null,
    organizationUrl: raw.organizationUrl ? String(raw.organizationUrl) : null,
    defaultOgImage: raw.defaultOgImage as GlobalSettings['defaultOgImage'],
    socialLinks: Array.isArray(raw.socialLinks)
      ? raw.socialLinks.map((s: Record<string, unknown>) => ({
          platform: String(s.platform),
          url: String(s.url),
        }) satisfies SocialLink)
      : undefined,
    affiliateBrands: Array.isArray(raw.affiliateBrands)
      ? raw.affiliateBrands.map((b: Record<string, unknown>) => normalizeAffiliateBrand(b))
      : undefined,
    scootUrl: raw.scootUrl ? String(raw.scootUrl) : null,
    executiveUrl: raw.executiveUrl ? String(raw.executiveUrl) : null,
    ketchEnabled: raw.ketchEnabled === true,
    ketchOrganizationCode: raw.ketchOrganizationCode ? String(raw.ketchOrganizationCode) : null,
    ketchPropertyCode: raw.ketchPropertyCode ? String(raw.ketchPropertyCode) : null,
    rudderStackEnabled: raw.rudderStackEnabled === true,
    rudderStackWriteKey: raw.rudderStackWriteKey ? String(raw.rudderStackWriteKey) : null,
    rudderStackDataPlaneUrl: raw.rudderStackDataPlaneUrl
      ? String(raw.rudderStackDataPlaneUrl)
      : null,
    optionalGtmContainerId: raw.optionalGtmContainerId
      ? String(raw.optionalGtmContainerId)
      : null,
  };
}

async function fetchGlobalSettingsFromApi(locale = 'en'): Promise<GlobalSettings | null> {
  for (const endpoint of ['global-setting', 'global-settings', 'site-setting', 'site-settings'] as const) {
    const response = await fetchStrapiOptional<StrapiSingleResponse<Record<string, unknown>>>(
      endpoint,
      {
        locale,
        'populate[affiliateBrands][populate]': 'logo',
        'populate[socialLinks][populate]': '*',
        'populate[defaultOgImage][populate]': '*',
      },
    );
    if (response?.data) {
      return normalizeGlobalSettings(response.data);
    }
  }
  return null;
}

export async function getGlobalSettings(locale = 'en'): Promise<GlobalSettings> {
  if (shouldUseMockData()) return MOCK_GLOBAL_SETTINGS;

  const fromApi = await fetchGlobalSettingsFromApi(locale);
  if (fromApi) return fromApi;

  console.warn('[strapi] No Global Settings found — using defaults.');
  return MOCK_GLOBAL_SETTINGS;
}

export function ketchConfigFromSettings(settings: GlobalSettings): {
  enabled: boolean;
  organizationCode: string | null;
  propertyCode: string | null;
} {
  const org =
    settings.ketchOrganizationCode ??
    import.meta.env.PUBLIC_KETCH_ORG ??
    null;
  const property =
    settings.ketchPropertyCode ??
    import.meta.env.PUBLIC_KETCH_PROPERTY ??
    null;

  return {
    enabled: settings.ketchEnabled || Boolean(org && property),
    organizationCode: org,
    propertyCode: property,
  };
}

export function rudderStackConfigFromSettings(settings: GlobalSettings): {
  enabled: boolean;
  writeKey: string | null;
  dataPlaneUrl: string | null;
} {
  const writeKey =
    settings.rudderStackWriteKey ??
    import.meta.env.PUBLIC_RUDDERSTACK_WRITE_KEY ??
    null;
  const dataPlaneUrl =
    settings.rudderStackDataPlaneUrl ??
    import.meta.env.PUBLIC_RUDDERSTACK_DATA_PLANE_URL ??
    null;

  return {
    enabled: settings.rudderStackEnabled || Boolean(writeKey && dataPlaneUrl),
    writeKey,
    dataPlaneUrl,
  };
}

/** @deprecated Use getGlobalSettings */
export async function getSiteSettings(_strapiLocale?: string): Promise<GlobalSettings & {
  siteName: string;
  contactEmail?: string | null;
  defaultLocale: string;
  geoSuggestEnabled?: boolean;
}> {
  const settings = await getGlobalSettings('en');
  const au = await getRegionByCode('au');

  return {
    ...settings,
    siteName: settings.organizationName,
    contactEmail: au?.contactEmail ?? null,
    defaultLocale: 'en',
    geoSuggestEnabled: au?.geoSuggestEnabled ?? true,
  };
}
