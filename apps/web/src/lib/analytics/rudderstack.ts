import type { AnalyticsEventName } from './events';
import { getStoredConsent, onConsentUpdated, type ConsentState } from './consent';

interface RudderAnalytics {
  load: (writeKey: string, dataPlaneUrl: string, options?: Record<string, unknown>) => void;
  page: (category?: string, name?: string, properties?: Record<string, unknown>) => void;
  track: (event: string, properties?: Record<string, unknown>, options?: Record<string, unknown>) => void;
  identify: (userId: string, traits?: Record<string, unknown>) => void;
  ready: (callback: () => void) => void;
  consent?: (options: Record<string, unknown>) => void;
}

function getRudder(): RudderAnalytics | undefined {
  return window.rudderanalytics as unknown as RudderAnalytics | undefined;
}

let initAttempted = false;

function canTrackAnalytics(consent: ConsentState | null): boolean {
  return consent?.analytics === true || consent?.marketing === true;
}

function applyConsentToRudder(consent: ConsentState): void {
  getRudder()?.consent?.({
    consentManagement: {
      enabled: true,
      provider: 'custom',
    },
    trackConsent: consent.analytics,
    storage: {
      strategy: consent.analytics ? 'persistent' : 'none',
    },
  });
}

export function initRudderStack(
  writeKey: string,
  dataPlaneUrl: string,
  consent: ConsentState,
): void {
  if (typeof window === 'undefined' || !writeKey || !dataPlaneUrl) return;
  if (window.__anzukRudderLoaded) {
    applyConsentToRudder(consent);
    return;
  }
  if (initAttempted) return;
  initAttempted = true;

  const rudder = getRudder();
  if (!rudder?.load) {
    console.warn('[rudderstack] SDK not loaded — check RudderStackHead snippet');
    return;
  }

  rudder.load(writeKey, dataPlaneUrl, {
    configUrl: 'https://api.rudderstack.com',
  });
  applyConsentToRudder(consent);
  window.__anzukRudderLoaded = true;
}

export function trackEvent(
  event: AnalyticsEventName,
  properties: Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined') return;
  const consent = getStoredConsent();
  if (!canTrackAnalytics(consent)) return;

  getRudder()?.track(event, {
    ...properties,
    consent_analytics: consent?.analytics ?? false,
    consent_marketing: consent?.marketing ?? false,
  });
}

export function trackPage(properties: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  const consent = getStoredConsent();
  if (!canTrackAnalytics(consent)) return;

  getRudder()?.page(undefined, undefined, {
    ...properties,
    consent_analytics: consent?.analytics ?? false,
    consent_marketing: consent?.marketing ?? false,
  });
}

export function setupRudderStackWithConsent(
  writeKey: string,
  dataPlaneUrl: string,
): () => void {
  return onConsentUpdated((consent) => {
    if (canTrackAnalytics(consent)) {
      initRudderStack(writeKey, dataPlaneUrl, consent);
    }
  });
}
