import type { Market } from '../../config/markets';
import type { RegionEntity } from './types';

export const MOCK_REGIONS: RegionEntity[] = [
  {
    documentId: 'mock-region-international',
    code: 'international',
    name: 'International',
    hreflang: 'x-default',
    isDefault: false,
    isGlobalHub: true,
    contactEmail: 'info@anzuk.education',
    geoSuggestEnabled: true,
    cookiePolicyUrl: '/policy/privacy-policy/',
  },
  {
    documentId: 'mock-region-au',
    code: 'au',
    name: 'Australia',
    hreflang: 'en-AU',
    isDefault: true,
    isGlobalHub: false,
    contactEmail: 'info@anzuk.education',
    jobAdderBoardId: 'au',
    geoSuggestEnabled: true,
    cookiePolicyUrl: '/au/policy/privacy-policy/',
  },
  {
    documentId: 'mock-region-uk',
    code: 'uk',
    name: 'United Kingdom',
    hreflang: 'en-GB',
    isDefault: false,
    isGlobalHub: false,
    contactEmail: 'info@anzuk.education',
    jobAdderBoardId: 'uk',
    geoSuggestEnabled: true,
    cookiePolicyUrl: '/uk/policy/privacy-policy/',
  },
  {
    documentId: 'mock-region-ca',
    code: 'ca',
    name: 'Canada',
    hreflang: 'en-CA',
    isDefault: false,
    isGlobalHub: false,
    contactEmail: 'info@anzuk.education',
    jobAdderBoardId: 'ca',
    geoSuggestEnabled: true,
    cookiePolicyUrl: '/ca/policy/privacy-policy/',
  },
  {
    documentId: 'mock-region-nz',
    code: 'nz',
    name: 'New Zealand',
    hreflang: 'en-NZ',
    isDefault: false,
    isGlobalHub: false,
    contactEmail: 'info@anzuk.education',
    jobAdderBoardId: 'nz',
    geoSuggestEnabled: true,
    cookiePolicyUrl: '/nz/policy/privacy-policy/',
  },
];

export function getMockRegion(code: Market): RegionEntity | undefined {
  return MOCK_REGIONS.find((r) => r.code === code);
}
