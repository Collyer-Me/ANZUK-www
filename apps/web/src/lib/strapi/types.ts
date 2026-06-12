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

export interface RegionItem {
  id: number;
  name: string;
  description?: string | null;
  url: string;
  flagKey: 'aus' | 'uk' | 'can' | 'nz' | 'usa';
  external?: boolean;
}

export interface RegionGridBlock {
  __component: 'blocks.region-grid';
  id: number;
  heading?: string | null;
  subheading?: string | null;
  regions?: RegionItem[];
}

export interface ValueItem {
  id: number;
  letter: string;
  word: string;
  summary: string;
}

export interface ValuesGridBlock {
  __component: 'blocks.values-grid';
  id: number;
  heading?: string | null;
  description?: string | null;
  values?: ValueItem[];
}

export interface FormEmbedBlock {
  __component: 'blocks.form-embed';
  id: number;
  heading?: string | null;
  description?: string | null;
  jotformId: string;
  height?: number;
}

export interface RichTextBlock {
  __component: 'blocks.rich-text';
  id: number;
  content: string;
}

export interface StatItem {
  id: number;
  value: string;
  label: string;
}

export interface StatsRowBlock {
  __component: 'blocks.stats-row';
  id: number;
  stats?: StatItem[];
}

export type ContentBlock =
  | HeroBlock
  | FeatureGridBlock
  | CtaBlock
  | TestimonialBlock
  | RegionGridBlock
  | ValuesGridBlock
  | FormEmbedBlock
  | RichTextBlock
  | StatsRowBlock;

export interface NavItem {
  id: number;
  label: string;
  url: string;
  openInNewTab?: boolean;
  children?: NavItem[];
}

export interface MarketNavigation {
  id: number;
  market: Market;
  items?: NavItem[];
}

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
  showInNav?: boolean;
  navLabel?: string | null;
  navOrder?: number;
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
  marketNavigations?: MarketNavigation[];
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
