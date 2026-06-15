import type { RudderAnalytics } from '@rudderstack/analytics-js';

let sdk: RudderAnalytics | null = null;
let sdkPromise: Promise<RudderAnalytics> | null = null;

/** Load the RudderStack SDK from the npm bundle (same-origin — avoids CDN blocks). */
export async function ensureRudderSdk(): Promise<RudderAnalytics> {
  if (sdk) return sdk;

  if (!sdkPromise) {
    sdkPromise = import('@rudderstack/analytics-js/bundled').then(({ RudderAnalytics: RudderAnalyticsCtor }) => {
      sdk = new RudderAnalyticsCtor();
      window.rudderanalytics = sdk as unknown as Window['rudderanalytics'];
      return sdk;
    });
  }

  return sdkPromise;
}

export async function loadRudderSdk(writeKey: string, dataPlaneUrl: string): Promise<RudderAnalytics> {
  const analytics = await ensureRudderSdk();

  if (window.__anzukRudderLoaded) return analytics;

  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      reject(new Error('RudderStack SDK ready() timed out after 15s'));
    }, 15_000);

    try {
      analytics.load(writeKey, dataPlaneUrl);
      analytics.ready(() => {
        window.clearTimeout(timeout);
        window.__anzukRudderLoaded = true;
        window.dispatchEvent(new CustomEvent('anzuk:rudder-ready'));
        resolve();
      });
    } catch (error) {
      window.clearTimeout(timeout);
      reject(error);
    }
  });

  return analytics;
}

export function getRudderSdk(): RudderAnalytics | undefined {
  return sdk ?? (window.rudderanalytics as RudderAnalytics | undefined);
}