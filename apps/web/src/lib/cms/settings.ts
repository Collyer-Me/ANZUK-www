import { MOCK_GLOBAL_SETTINGS } from './mock-data';
import { getRegionByCode } from './regions';
import type { GlobalSettings } from './types';

export async function getGlobalSettings(_locale = 'en'): Promise<GlobalSettings> {
  return MOCK_GLOBAL_SETTINGS;
}

export function ketchConfigFromSettings(settings: GlobalSettings): {
  enabled: boolean;
  organizationCode: string | null;
  propertyCode: string | null;
} {
  const org = settings.ketchOrganizationCode ?? import.meta.env.PUBLIC_KETCH_ORG ?? null;
  const property = settings.ketchPropertyCode ?? import.meta.env.PUBLIC_KETCH_PROPERTY ?? null;

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
    settings.rudderStackWriteKey ?? import.meta.env.PUBLIC_RUDDERSTACK_WRITE_KEY ?? null;
  const dataPlaneUrl =
    settings.rudderStackDataPlaneUrl ?? import.meta.env.PUBLIC_RUDDERSTACK_DATA_PLANE_URL ?? null;

  return {
    enabled: settings.rudderStackEnabled || Boolean(writeKey && dataPlaneUrl),
    writeKey,
    dataPlaneUrl,
  };
}

/** @deprecated Use getGlobalSettings */
export async function getSiteSettings(_locale?: string): Promise<
  GlobalSettings & {
    siteName: string;
    contactEmail?: string | null;
    defaultLocale: string;
    geoSuggestEnabled?: boolean;
  }
> {
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
