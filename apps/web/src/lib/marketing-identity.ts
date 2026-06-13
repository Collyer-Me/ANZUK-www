import { AnalyticsEvents } from './analytics/events';
import { trackEvent } from './analytics/rudderstack';

export interface MarketingContext {
  region: string;
  locale: string;
  pageType: string;
  pagePath: string;
  landingPage: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const STORAGE_KEY = 'anzuk_campaign';

export function captureCampaignParams(search: string): Partial<MarketingContext> {
  const params = new URLSearchParams(search);
  const captured: Partial<MarketingContext> = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      const camel = key.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase()) as keyof MarketingContext;
      captured[camel] = value;
    }
  }

  if (Object.keys(captured).length > 0) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
    } catch {
      // sessionStorage unavailable
    }
  }

  return captured;
}

export function readStoredCampaign(): Partial<MarketingContext> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<MarketingContext>) : {};
  } catch {
    return {};
  }
}

export function buildMarketingContext(
  base: Pick<MarketingContext, 'region' | 'locale' | 'pageType' | 'pagePath'>,
): MarketingContext {
  const stored = readStoredCampaign();
  return {
    landingPage: base.pagePath,
    ...stored,
    ...base,
  };
}

export function buildTrackedUrl(baseUrl: string, context: MarketingContext): string {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set('utm_source', context.utmSource ?? 'anzuk');
    url.searchParams.set('utm_medium', context.utmMedium ?? 'cta');
    url.searchParams.set(
      'utm_campaign',
      context.utmCampaign ?? `${context.region}-${context.pageType}`,
    );
    url.searchParams.set('region', context.region);
    return url.toString();
  } catch {
    return baseUrl;
  }
}

export function buildJotformEmbedUrl(
  jotformId: string,
  context: MarketingContext,
  customParams?: Record<string, string> | null,
): string {
  const url = new URL(`https://form.jotform.com/${jotformId}`);
  const prefill: Record<string, string> = {
    region: context.region,
    landing_page: context.landingPage,
    ...(context.utmSource ? { utm_source: context.utmSource } : {}),
    ...(context.utmMedium ? { utm_medium: context.utmMedium } : {}),
    ...(context.utmCampaign ? { utm_campaign: context.utmCampaign } : {}),
    ...customParams,
  };

  for (const [key, value] of Object.entries(prefill)) {
    if (value) url.searchParams.set(key, value);
  }

  return url.toString();
}

export function trackMarketingEvent(
  event: string,
  payload: Record<string, unknown>,
): void {
  trackEvent(event as typeof AnalyticsEvents[keyof typeof AnalyticsEvents], payload);
}

/** @deprecated Use trackMarketingEvent — kept for transitional call sites */
export function pushDataLayerEvent(
  event: string,
  payload: Record<string, unknown>,
): void {
  trackMarketingEvent(event, payload);
}
