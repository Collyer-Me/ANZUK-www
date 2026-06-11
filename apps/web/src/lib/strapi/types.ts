export interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

export interface SeoComponent {
  metaTitle: string;
  metaDescription?: string | null;
  ogImage?: StrapiMedia | null;
}

export interface HeroBlock {
  __component: 'blocks.hero';
  id: number;
  heading: string;
  subheading?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  variant?: 'default' | 'dark';
}

export interface FeatureItem {
  id: number;
  title: string;
  description?: string | null;
  icon?: 'teaching' | 'support' | 'global' | 'community';
}

export interface FeatureGridBlock {
  __component: 'blocks.feature-grid';
  id: number;
  heading?: string | null;
  features?: FeatureItem[];
}

export interface CtaBlock {
  __component: 'blocks.cta';
  id: number;
  heading: string;
  body?: string | null;
  buttonLabel: string;
  buttonUrl: string;
  variant?: 'primary' | 'dark';
}

export interface TestimonialBlock {
  __component: 'blocks.testimonial';
  id: number;
  quote: string;
  authorName: string;
  authorRole?: string | null;
}

export type ContentBlock = HeroBlock | FeatureGridBlock | CtaBlock | TestimonialBlock;

export interface PageLocalization {
  locale: string;
  slug: string;
  documentId: string;
}

export interface LocalizedPage {
  documentId: string;
  title: string;
  slug: string;
  canonicalUrl?: string | null;
  noIndex?: boolean;
  seo?: SeoComponent | null;
  body?: ContentBlock[];
  localizations?: PageLocalization[];
}

export interface SiteSettings {
  siteName: string;
  tagline?: string | null;
  organizationUrl?: string | null;
  contactEmail?: string | null;
  defaultLocale: string;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T | null;
}
