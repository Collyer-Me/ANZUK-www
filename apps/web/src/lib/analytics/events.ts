/**
 * Canonical RudderStack event names — single source of truth.
 * Destinations map these events in RudderStack Cloud (GA4, Meta, JobAdder, etc.).
 */
export const AnalyticsEvents = {
  PAGE_VIEWED: 'Page Viewed',
  FORM_VIEWED: 'Form Viewed',
  FORM_SUBMITTED: 'Form Submitted',
  JOB_VIEWED: 'Job Viewed',
  APPLICATION_STARTED: 'Application Started',
  APPLICATION_SUBMITTED: 'Application Submitted',
  BOOKING_CONFIRMED: 'Booking Confirmed',
  CTA_CLICKED: 'CTA Clicked',
} as const;

export type AnalyticsEventName = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

export interface PageViewedProperties {
  region: string;
  locale: string;
  pageType: string;
  pagePath: string;
  pageTitle?: string;
}

export interface FormViewedProperties {
  region: string;
  jotformId: string;
  pagePath: string;
}

export interface JobEventProperties {
  region: string;
  jobId: string;
  source?: string;
}
