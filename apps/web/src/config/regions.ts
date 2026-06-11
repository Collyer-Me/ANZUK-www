import type { RegionalMarket } from './markets';

export type RegionPath = RegionalMarket;

export interface Region {
  path: RegionPath;
  hreflang: string;
  strapiLocale: string;
  htmlLang: string;
  label: string;
  flag: string;
}

export const REGIONS: readonly Region[] = [
  {
    path: 'au',
    hreflang: 'en-AU',
    strapiLocale: 'en-AU',
    htmlLang: 'en-AU',
    label: 'Australia',
    flag: '🇦🇺',
  },
  {
    path: 'uk',
    hreflang: 'en-GB',
    strapiLocale: 'en-GB',
    htmlLang: 'en-GB',
    label: 'United Kingdom',
    flag: '🇬🇧',
  },
  {
    path: 'ca',
    hreflang: 'en-CA',
    strapiLocale: 'en-CA',
    htmlLang: 'en-CA',
    label: 'Canada',
    flag: '🇨🇦',
  },
  {
    path: 'nz',
    hreflang: 'en-NZ',
    strapiLocale: 'en-NZ',
    htmlLang: 'en-NZ',
    label: 'New Zealand',
    flag: '🇳🇿',
  },
] as const;

export const DEFAULT_REGION: RegionPath = 'au';

export const REGION_PATHS = REGIONS.map((r) => r.path);

export function getRegionByPath(path: string): Region | undefined {
  return REGIONS.find((r) => r.path === path);
}

export function getRegionByStrapiLocale(locale: string): Region | undefined {
  return REGIONS.find((r) => r.strapiLocale === locale);
}

export function isValidRegion(path: string): path is RegionPath {
  return REGION_PATHS.includes(path as RegionPath);
}
