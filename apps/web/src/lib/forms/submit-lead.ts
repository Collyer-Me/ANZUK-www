import type { Market } from '../../config/markets';
import { AnalyticsEvents } from '../analytics/events';
import { trackEvent } from '../analytics/rudderstack';
import { readStoredCampaign, type MarketingContext } from '../marketing-identity';

export interface LeadFormPayload {
  formType: 'expression-of-interest';
  regionCode: Market;
  pagePath: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  currentLocation?: string;
  roleType?: string;
  experienceLevel?: string;
  preferredDestinations?: string[];
  message?: string;
  consentContact: boolean;
  website?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  landingPage?: string;
}

function strapiPublicUrl(override?: string): string {
  if (typeof override === 'string' && override.trim()) {
    return override.replace(/\/$/, '');
  }
  const fromPublic = import.meta.env.PUBLIC_STRAPI_URL;
  if (typeof fromPublic === 'string' && fromPublic.trim()) {
    return fromPublic.replace(/\/$/, '');
  }
  return '';
}

export function isLeadFormConfigured(baseUrl?: string): boolean {
  return Boolean(strapiPublicUrl(baseUrl));
}

export function buildLeadPayload(
  form: HTMLFormElement,
  context: MarketingContext,
  formType: LeadFormPayload['formType'],
): LeadFormPayload {
  const data = new FormData(form);
  const destinations = data.getAll('preferredDestinations').filter((v): v is string => typeof v === 'string');

  return {
    formType,
    regionCode: context.region as Market,
    pagePath: context.pagePath,
    firstName: String(data.get('firstName') ?? '').trim(),
    lastName: String(data.get('lastName') ?? '').trim(),
    email: String(data.get('email') ?? '').trim(),
    phone: String(data.get('phone') ?? '').trim() || undefined,
    currentLocation: String(data.get('currentLocation') ?? '').trim() || undefined,
    roleType: String(data.get('roleType') ?? '').trim() || undefined,
    experienceLevel: String(data.get('experienceLevel') ?? '').trim() || undefined,
    preferredDestinations: destinations.length ? destinations : undefined,
    message: String(data.get('message') ?? '').trim() || undefined,
    consentContact: data.get('consentContact') === 'on',
    website: String(data.get('website') ?? '').trim() || undefined,
    utmSource: context.utmSource,
    utmMedium: context.utmMedium,
    utmCampaign: context.utmCampaign,
    utmTerm: context.utmTerm,
    utmContent: context.utmContent,
    landingPage: context.landingPage,
  };
}

export async function submitLeadForm(
  payload: LeadFormPayload,
  baseUrlOverride?: string,
): Promise<{ documentId?: string }> {
  const baseUrl = strapiPublicUrl(baseUrlOverride);
  if (!baseUrl) {
    throw new Error('Lead form backend is not configured (PUBLIC_STRAPI_URL).');
  }

  const response = await fetch(`${baseUrl}/api/leads/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = 'Submission failed. Please try again.';
    try {
      const errorBody = (await response.json()) as { error?: { message?: string } };
      if (errorBody.error?.message) message = errorBody.error.message;
    } catch {
      // use default message
    }
    throw new Error(message);
  }

  const result = (await response.json()) as { data?: { documentId?: string } };
  return { documentId: result.data?.documentId };
}

export function trackLeadFormViewed(properties: {
  region: string;
  pagePath: string;
  formType: string;
}): void {
  trackEvent(AnalyticsEvents.FORM_VIEWED, properties);
}

export function trackLeadFormSubmitted(properties: {
  region: string;
  pagePath: string;
  formType: string;
  documentId?: string;
}): void {
  trackEvent(AnalyticsEvents.FORM_SUBMITTED, properties);
}

export function leadFormMarketingContext(
  regionCode: Market,
  pagePath: string,
): MarketingContext {
  return {
    region: regionCode,
    locale: 'en',
    pageType: 'form-landing',
    pagePath,
    landingPage: pagePath,
    ...readStoredCampaign(),
  };
}
