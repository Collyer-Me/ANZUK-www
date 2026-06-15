import type { ConsentState } from './consent';

/** Ketch consent payload keys that are not purpose codes. */
const CONSENT_META_KEYS = new Set([
  'purposes',
  'identities',
  'identity',
  'jurisdiction',
  'jurisdictionCode',
  'environment',
  'environmentCode',
  'property',
  'propertyCode',
  'timestamp',
  'collectedAt',
  'updatedAt',
  'version',
]);

/** Whether a Ketch purpose value represents granted consent. */
export function isKetchPurposeGranted(value: unknown): boolean {
  if (value === true) return true;
  if (value === false || value == null) return false;
  if (value === 'granted' || value === 'true' || value === 'yes') return true;
  if (value === 'denied' || value === 'false' || value === 'no') return false;

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    if ('allowed' in record) return isKetchPurposeGranted(record.allowed);
    if ('status' in record) return isKetchPurposeGranted(record.status);
    if ('consent' in record) return isKetchPurposeGranted(record.consent);
  }

  return false;
}

/** Extract purpose map from a Ketch `consent` event payload. */
export function extractKetchPurposeMap(consent: unknown): Record<string, unknown> {
  if (!consent || typeof consent !== 'object') return {};

  const record = consent as Record<string, unknown>;
  if (
    record.purposes &&
    typeof record.purposes === 'object' &&
    !Array.isArray(record.purposes)
  ) {
    return record.purposes as Record<string, unknown>;
  }

  const purposes: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if (!CONSENT_META_KEYS.has(key)) {
      purposes[key] = value;
    }
  }
  return purposes;
}

function anyPurposeGranted(purposes: Record<string, unknown>, codes: string[]): boolean {
  return codes.some((code) => isKetchPurposeGranted(purposes[code]));
}

/** Map Ketch purpose codes to internal consent categories. */
export function mapKetchPurposes(purposeMap: Record<string, unknown>): ConsentState {
  return {
    essential: true,
    functional: anyPurposeGranted(purposeMap, [
      'functional',
      'preferences',
      'personalization',
      'personalisation',
    ]),
    analytics: anyPurposeGranted(purposeMap, [
      'analytics',
      'analytics_storage',
      'performance',
      'performance_cookies',
      'statistics',
    ]),
    marketing: anyPurposeGranted(purposeMap, [
      'marketing',
      'advertising',
      'ad_storage',
      'ads',
      'target_advertising',
      'targeting',
    ]),
  };
}

/** Parse a raw Ketch consent event into internal consent state. */
export function consentStateFromKetch(consent: unknown): ConsentState {
  return mapKetchPurposes(extractKetchPurposeMap(consent));
}
