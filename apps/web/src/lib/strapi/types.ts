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

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SharedLink {
  label: string;
  url?: string | null;
  page?: { documentId: string; path?: string } | null;
  variant?: 'primary' | 'secondary' | 'light' | 'outline';
  openInNewTab?: boolean;
}

export interface NavItem {
  id: number;
  label: string;
  url: string;
  openInNewTab?: boolean;
  children?: NavLink[];
}

export interface NavLink {
  id: number;
  label: string;
  url: string;
  openInNewTab?: boolean;
}

export interface RegionEntity {
  documentId: string;
  code: Market;
  name: string;
  hreflang: string;
  isDefault: boolean;
  isGlobalHub: boolean;
  contactEmail?: string | null;
  contactPhone?: string | null;
  jobAdderBoardId?: string | null;
  geoSuggestEnabled: boolean;
  cookiePolicyUrl?: string | null;
  header?: { items?: Array<{ link: SharedLink; children?: Array<{ link: SharedLink }> }> };
  footer?: { columns?: Array<{ heading?: string; links?: SharedLink[] }> };
  defaultSeo?: SeoComponent | null;
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

export interface CtaBandBlock {
  __component: 'blocks.cta-band';
  id: number;
  heading: string;
  body?: string | null;
  primary?: SharedLink | null;
  secondary?: SharedLink | null;
}

export interface TestimonialBlock {
  __component: 'blocks.testimonial';
  id: number;
  quote: string;
  authorName: string;
  authorRole?: string | null;
}

export interface TestimonialItem {
  id: number;
  quote: string;
  name: string;
  role?: string | null;
}

export interface TestimonialsBlock {
  __component: 'blocks.testimonials';
  id: number;
  eyebrow?: string | null;
  title?: string | null;
  items?: TestimonialItem[];
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
  iconKey?: string | null;
}

export interface ValuesGridBlock {
  __component: 'blocks.values-grid';
  id: number;
  heading?: string | null;
  description?: string | null;
  values?: ValueItem[];
}

export interface ValueTabsBlock {
  __component: 'blocks.value-tabs';
  id: number;
  heading?: string | null;
  description?: string | null;
  autoAdvance?: boolean;
  values?: ValueItem[];
}

export interface FormEmbedBlock {
  __component: 'blocks.form-embed';
  id: number;
  heading?: string | null;
  description?: string | null;
  jotformId: string;
  height?: number;
  trackingParams?: Record<string, string> | null;
}

export interface LeadFormBlock {
  __component: 'blocks.lead-form';
  id: number;
  heading?: string | null;
  description?: string | null;
  formType: 'expression-of-interest';
  successMessage?: string | null;
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
  suffix?: string | null;
}

export interface StatsRowBlock {
  __component: 'blocks.stats-row';
  id: number;
  stats?: StatItem[];
}

export interface StatsBandBlock {
  __component: 'blocks.stats-band';
  id: number;
  heading?: string | null;
  footnote?: string | null;
  stats?: StatItem[];
}

export interface StepsRowBlock {
  __component: 'blocks.steps-row';
  id: number;
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  steps?: Array<{ id: number; title: string; description?: string | null }>;
}

export interface PersonaCardsBlock {
  __component: 'blocks.persona-cards';
  id: number;
  cards?: Array<{
    id: number;
    title: string;
    description?: string | null;
    needs?: string[];
    iconKey?: string;
    accent?: string;
    featured?: boolean;
    cta?: SharedLink | null;
  }>;
}

export interface LogoMarqueeBlock {
  __component: 'blocks.logo-marquee';
  id: number;
  heading?: string | null;
  logos?: Array<{ id: number; alt?: string; image?: StrapiMedia | null }>;
}

export interface SharedSectionBlock {
  __component: 'blocks.shared-section';
  id: number;
  section?: { body?: ContentBlock[] };
}

export type ContentBlock =
  | HeroBlock
  | FeatureGridBlock
  | CtaBlock
  | CtaBandBlock
  | TestimonialBlock
  | TestimonialsBlock
  | RegionGridBlock
  | ValuesGridBlock
  | ValueTabsBlock
  | FormEmbedBlock
  | LeadFormBlock
  | RichTextBlock
  | StatsRowBlock
  | StatsBandBlock
  | StepsRowBlock
  | PersonaCardsBlock
  | LogoMarqueeBlock
  | SharedSectionBlock;

export interface PageEquivalent {
  documentId: string;
  path: string;
  regionCode: Market;
  hreflang: string;
}

export interface CmsPage {
  documentId: string;
  title: string;
  slug: string;
  path: string;
  regionCode: Market;
  pageType: PageTemplate;
  parentDocumentId?: string | null;
  navLabel?: string | null;
  noIndex?: boolean;
  seo?: SeoComponent | null;
  jobBoardConfig?: JobBoardConfigComponent | null;
  body?: ContentBlock[];
  equivalents?: PageEquivalent[];
}

/** @deprecated Use CmsPage — alias for migration */
export type LocalizedPage = CmsPage & {
  market: Market;
  pageTemplate: PageTemplate;
};

export interface Article {
  documentId: string;
  title: string;
  slug: string;
  regionCode: RegionalMarket;
  excerpt?: string | null;
  body?: string | null;
  featuredImage?: StrapiMedia | null;
  seo?: SeoComponent | null;
  publishedAt?: string | null;
  /** @deprecated Use regionCode */
  market?: RegionalMarket;
}

export interface GlobalSettings {
  organizationName: string;
  tagline?: string | null;
  organizationUrl?: string | null;
  defaultOgImage?: StrapiMedia | null;
  socialLinks?: SocialLink[];
  affiliateBrands?: AffiliateBrand[];
  scootUrl?: string | null;
  executiveUrl?: string | null;
  ketchEnabled: boolean;
  ketchOrganizationCode?: string | null;
  ketchPropertyCode?: string | null;
  rudderStackEnabled: boolean;
  rudderStackWriteKey?: string | null;
  rudderStackDataPlaneUrl?: string | null;
  optionalGtmContainerId?: string | null;
}

/** @deprecated Use GlobalSettings */
export type SiteSettings = GlobalSettings & {
  siteName: string;
  contactEmail?: string | null;
  defaultLocale: string;
  geoSuggestEnabled?: boolean;
};

export interface MarketNavigation {
  documentId: string;
  market: Market;
  items?: NavItem[];
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

export function toLegacyPage(page: CmsPage): LocalizedPage {
  return {
    ...page,
    market: page.regionCode,
    pageTemplate: page.pageType,
    slug: page.path,
  };
}
