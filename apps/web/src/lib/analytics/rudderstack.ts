import type { AnalyticsEventName } from './events';
import { getStoredConsent, onConsentUpdated, type ConsentState } from './consent';
import { getRudderSdk, loadRudderSdk } from './rudder-client';

interface PendingTrack {
  event: AnalyticsEventName;
  properties: Record<string, unknown>;
}

let initAttempted = false;
const pendingTracks: PendingTrack[] = [];
const MAX_PENDING_TRACKS = 32;

function canTrackAnalytics(consent: ConsentState | null): boolean {
  return Boolean(consent?.analytics || consent?.marketing);
}

function isRudderReady(): boolean {
  return window.__anzukRudderLoaded === true;
}

function sendTrack(event: AnalyticsEventName, properties: Record<string, unknown>): void {
  const consent = getStoredConsent();
  getRudderSdk()?.track(event, {
    ...properties,
    consent_analytics: consent?.analytics ?? false,
    consent_marketing: consent?.marketing ?? false,
  });
}

function flushPendingTracks(): void {
  if (!canTrackAnalytics(getStoredConsent()) || !isRudderReady()) return;

  while (pendingTracks.length > 0) {
    const next = pendingTracks.shift();
    if (next) sendTrack(next.event, next.properties);
  }
}

function queueTrack(event: AnalyticsEventName, properties: Record<string, unknown>): void {
  if (pendingTracks.length >= MAX_PENDING_TRACKS) pendingTracks.shift();
  pendingTracks.push({ event, properties });
}

function registerTrackFlushListeners(): void {
  if (typeof window === 'undefined' || window.__anzukTrackFlushRegistered) return;
  window.__anzukTrackFlushRegistered = true;

  onConsentUpdated(() => flushPendingTracks());
  window.addEventListener('anzuk:rudder-ready', flushPendingTracks);
}

registerTrackFlushListeners();

export function initRudderStack(
  writeKey: string,
  dataPlaneUrl: string,
  consent: ConsentState,
): void {
  if (typeof window === 'undefined' || !writeKey || !dataPlaneUrl) return;
  if (!canTrackAnalytics(consent)) return;
  if (window.__anzukRudderLoaded) {
    flushPendingTracks();
    return;
  }
  if (initAttempted) return;
  initAttempted = true;

  void loadRudderSdk(writeKey, dataPlaneUrl)
    .then(() => flushPendingTracks())
    .catch((error) => {
      initAttempted = false;
      console.warn('[rudderstack] SDK failed to load', error);
    });
}

export function trackEvent(
  event: AnalyticsEventName,
  properties: Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined') return;

  const consent = getStoredConsent();
  if (!canTrackAnalytics(consent) || !isRudderReady()) {
    queueTrack(event, properties);
    return;
  }

  sendTrack(event, properties);
}

export function trackPage(properties: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  const consent = getStoredConsent();
  if (!canTrackAnalytics(consent)) return;

  getRudderSdk()?.page({
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
