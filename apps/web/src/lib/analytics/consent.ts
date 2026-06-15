/** Consent purposes aligned with Ketch policy configuration. */
export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  essential: boolean;
}

export const DEFAULT_DENIED_CONSENT: ConsentState = {
  analytics: false,
  marketing: false,
  functional: false,
  essential: true,
};

const CONSENT_EVENT = 'anzuk:consent-updated';

export function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem('anzuk_consent_state');
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

export function storeConsent(state: ConsentState): void {
  try {
    sessionStorage.setItem('anzuk_consent_state', JSON.stringify(state));
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

export function onConsentUpdated(callback: (state: ConsentState) => void): () => void {
  const handler = (event: Event) => {
    callback((event as CustomEvent<ConsentState>).detail);
  };
  window.addEventListener(CONSENT_EVENT, handler);

  const existing = getStoredConsent();
  if (existing) callback(existing);

  return () => window.removeEventListener(CONSENT_EVENT, handler);
}

export {
  consentStateFromKetch,
  extractKetchPurposeMap,
  isKetchPurposeGranted,
  mapKetchPurposes,
} from './ketch-purposes';

declare global {
  interface Window {
    ketch?: (...args: unknown[]) => void;
    __anzukConsentRequired?: boolean;
    __anzukRudderLoaded?: boolean;
    __anzukRudderLoadStarted?: boolean;
    __anzukTrackFlushRegistered?: boolean;
  }
}
