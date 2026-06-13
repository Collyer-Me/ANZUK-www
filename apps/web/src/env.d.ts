/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL?: string;
  readonly BASE_PATH?: string;
  readonly STRAPI_URL?: string;
  readonly STRAPI_API_TOKEN?: string;
  readonly USE_MOCK_DATA?: string;
  readonly PUBLIC_KETCH_ORG?: string;
  readonly PUBLIC_KETCH_PROPERTY?: string;
  readonly PUBLIC_RUDDERSTACK_WRITE_KEY?: string;
  readonly PUBLIC_RUDDERSTACK_DATA_PLANE_URL?: string;
  /** Optional — marketing widgets only, not primary tracking */
  readonly PUBLIC_GTM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    /** Ketch smart tag command queue (pre-boot). */
    semaphore?: unknown[][];
    ketch?: (...args: unknown[]) => void;
    rudderanalytics?: unknown[];
    __anzukRudderLoaded?: boolean;
    __anzukConsentRequired?: boolean;
  }
}

export {};
