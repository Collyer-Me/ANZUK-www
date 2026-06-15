import { AnalyticsEvents } from './events';
import { getStoredConsent, type ConsentState } from './consent';
import { getRudderSdk, loadRudderSdk } from './rudder-client';

export interface RudderBootstrapConfig {
  writeKey: string;
  dataPlaneUrl: string;
  regionCode: string;
  locale: string;
  pageType: string;
  pagePath: string;
}

function canLoadRudder(consent: ConsentState): boolean {
  return Boolean(consent.analytics || consent.marketing);
}

function firePageView(config: RudderBootstrapConfig): void {
  getRudderSdk()?.page({
    region: config.regionCode,
    locale: config.locale,
    pageType: config.pageType,
    pagePath: config.pagePath,
    event: AnalyticsEvents.PAGE_VIEWED,
  });
}

async function loadRudder(config: RudderBootstrapConfig): Promise<void> {
  if (window.__anzukRudderLoaded) {
    firePageView(config);
    return;
  }

  if (window.__anzukRudderLoadStarted) return;
  window.__anzukRudderLoadStarted = true;

  try {
    await loadRudderSdk(config.writeKey, config.dataPlaneUrl);
    firePageView(config);
  } catch (error) {
    window.__anzukRudderLoadStarted = false;
    console.warn('[rudderstack] SDK failed to load', error);
  }
}

function tryInit(config: RudderBootstrapConfig, consent: ConsentState | null): void {
  if (!consent || !canLoadRudder(consent)) return;
  void loadRudder(config);
}

/** Wire RudderStack load + page view to Ketch consent (called once per page from layout head). */
export function mountRudderStackHead(config: RudderBootstrapConfig): void {
  window.addEventListener('anzuk:consent-updated', (event) => {
    tryInit(config, (event as CustomEvent<ConsentState>).detail);
  });

  tryInit(config, getStoredConsent());

  if (!window.__anzukConsentRequired) {
    tryInit(config, {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
  }
}
