import type { Market, PageTemplate, RegionalMarket } from '../../config/markets';

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

export interface JobBoardConfigComponent {
  jobAdderBoardId?: string | null;
  featuredOnly?: boolean;
  externalApply?: boolean;
}

export interface AffiliateBrand {
  name: string;
  url: string;
  logo?: StrapiMedia | null;
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
  market: Market;
  pageTemplate: PageTemplate;
  canonicalUrl?: string | null;
  noIndex?: boolean;
  seo?: SeoComponent | null;
  jobBoardConfig?: JobBoardConfigComponent | null;
  body?: ContentBlock[];
  localizations?: PageLocalization[];
}

export interface Article {
  documentId: string;
  title: string;
  slug: string;
  market: RegionalMarket;
  excerpt?: string | null;
  body?: string | null;
  featuredImage?: StrapiMedia | null;
  seo?: SeoComponent | null;
  publishedAt?: string | null;
}

export interface SiteSettings {
  siteName: string;
  tagline?: string | null;
  organizationUrl?: string | null;
  contactEmail?: string | null;
  defaultLocale: string;
  scootUrl?: string | null;
  executiveUrl?: string | null;
  geoSuggestEnabled?: boolean;
  affiliateBrands?: AffiliateBrand[];
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
