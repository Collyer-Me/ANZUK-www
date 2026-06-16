/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL?: string;
  readonly BASE_PATH?: string;
  readonly STORYBLOK_DELIVERY_API_TOKEN?: string;
  readonly STORYBLOK_REGION?: string;
  readonly PUBLIC_KETCH_ORG?: string;
  readonly PUBLIC_KETCH_PROPERTY?: string;
  readonly PUBLIC_RUDDERSTACK_WRITE_KEY?: string;
  readonly PUBLIC_RUDDERSTACK_DATA_PLANE_URL?: string;
  readonly PUBLIC_FORM_ENDPOINT?: string;
  /** Optional — marketing widgets only, not primary tracking */
  readonly PUBLIC_GTM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface AnzukRudderAnalytics {
    load: (writeKey: string, dataPlaneUrl: string, options?: Record<string, unknown>) => void;
    page: (category?: string, name?: string, properties?: Record<string, unknown>) => void;
    track: (event: string, properties?: Record<string, unknown>) => void;
    ready: (callback: () => void) => void;
  }

  interface Window {
    /** Ketch smart tag command queue (pre-boot). */
    semaphore?: unknown[][];
    ketch?: (...args: unknown[]) => void;
    rudderanalytics?: AnzukRudderAnalytics;
    __anzukRudderLoaded?: boolean;
    __anzukRudderLoadStarted?: boolean;
    __anzukTrackFlushRegistered?: boolean;
    __anzukConsentRequired?: boolean;
  }
}

export {};
