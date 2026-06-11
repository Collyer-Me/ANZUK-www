import { INTERNATIONAL_MARKET } from '../../config/markets';
import type { Market, PageTemplate, RegionalMarket } from '../../config/markets';
import { REGIONS } from '../../config/regions';
import type { Article, ContentBlock, LocalizedPage, SiteSettings } from './types';

function seo(title: string, description: string) {
  return { metaTitle: title, metaDescription: description, ogImage: null };
}

function hero(
  id: number,
  heading: string,
  subheading: string,
  ctaLabel?: string,
  ctaUrl?: string,
): ContentBlock {
  return {
    __component: 'blocks.hero',
    id,
    heading,
    subheading,
    ctaLabel: ctaLabel ?? null,
    ctaUrl: ctaUrl ?? null,
    variant: 'default',
  };
}

function page(
  market: Market,
  slug: string,
  title: string,
  pageTemplate: PageTemplate,
  blocks: ContentBlock[],
  extras?: Partial<LocalizedPage>,
): LocalizedPage {
  return {
    documentId: `mock-${market}-${slug}`,
    title,
    slug,
    market,
    pageTemplate,
    canonicalUrl: null,
    noIndex: false,
    seo: seo(`${title} - ANZUK Education`, `ANZUK Education — ${title}`),
    body: blocks,
    ...extras,
  };
}

const homeBlocks = (regionLabel: string): ContentBlock[] => [
  hero(
    1,
    `Welcome to ANZUK ${regionLabel}`,
    'Connecting passionate educators with schools across the globe. Local expertise, international reach.',
    'Browse jobs',
    'browse-jobs',
  ),
  {
    __component: 'blocks.feature-grid',
    id: 2,
    heading: 'Why ANZUK?',
    features: [
      {
        id: 1,
        title: 'Expert placement',
        description: 'Dedicated consultants who understand your local education market.',
        icon: 'teaching',
      },
      {
        id: 2,
        title: 'Ongoing support',
        description: 'We stay with you from application through placement and beyond.',
        icon: 'support',
      },
      {
        id: 3,
        title: 'Global network',
        description: 'Part of an international group with deep roots in each region we serve.',
        icon: 'global',
      },
    ],
  },
  {
    __component: 'blocks.cta',
    id: 3,
    heading: 'Ready to take the next step?',
    body: 'Register with ANZUK and discover opportunities matched to your skills and goals.',
    buttonLabel: 'Get started',
    buttonUrl: 'register-to-teach',
    variant: 'primary',
  },
];

const internationalHomeBlocks: ContentBlock[] = [
  hero(
    1,
    'Experience exceptional',
    'International expertise in education. Local understanding.',
    'Search jobs',
    'browse-jobs',
  ),
  {
    __component: 'blocks.feature-grid',
    id: 2,
    heading: 'Local recruitment teams, distributed globally',
    features: [
      { id: 1, title: 'Australia', description: 'Full-service education recruitment.', icon: 'global' },
      { id: 2, title: 'United Kingdom', description: 'Supply, permanent, and SEN specialists.', icon: 'global' },
      { id: 3, title: 'Canada', description: 'Cross-market teaching opportunities.', icon: 'global' },
      { id: 4, title: 'New Zealand', description: 'Local and international educator support.', icon: 'global' },
    ],
  },
  {
    __component: 'blocks.cta',
    id: 3,
    heading: 'Exceptional educators for global classrooms',
    body: 'We help international schools connect with passionate, high-quality educators.',
    buttonLabel: 'School enquiries',
    buttonUrl: 'teacher-recruitment-for-school',
    variant: 'primary',
  },
];

function innerPageBlocks(heading: string, body: string): ContentBlock[] {
  return [
    hero(1, heading, body),
    {
      __component: 'blocks.testimonial',
      id: 2,
      quote: 'Prototype placeholder content mapped from production as-is IA.',
      authorName: 'ANZUK Education',
      authorRole: 'Marketing',
    },
  ];
}

function buildMockPages(): LocalizedPage[] {
  const pages: LocalizedPage[] = [];

  pages.push(
    page(INTERNATIONAL_MARKET, 'home', 'Home - ANZUK Education', 'home-international', internationalHomeBlocks),
    page(
      INTERNATIONAL_MARKET,
      'international-teaching-jobs',
      'International teaching jobs',
      'service-educators',
      innerPageBlocks(
        'The international teaching experience',
        'Employment opportunities in international schools worldwide.',
      ),
    ),
    page(
      INTERNATIONAL_MARKET,
      'browse-jobs',
      'Search international teaching jobs',
      'job-listing',
      innerPageBlocks('Search jobs', 'Featured international roles from JobAdder.'),
      {
        jobBoardConfig: { jobAdderBoardId: 'international', featuredOnly: false, externalApply: true },
      },
    ),
    page(
      INTERNATIONAL_MARKET,
      'teacher-recruitment-for-school',
      'Teacher recruitment for school',
      'service-schools',
      innerPageBlocks('Trusted partners to schools', 'Recruitment for international schools for more than 20 years.'),
    ),
    page(
      INTERNATIONAL_MARKET,
      'school-leadership-search',
      'School leadership search',
      'service-leadership',
      innerPageBlocks('School leadership search', 'Executive and leadership recruitment for international schools.'),
    ),
  );

  const regionalSamples: Array<{
    market: RegionalMarket;
    slug: string;
    title: string;
    pageTemplate: PageTemplate;
    heading: string;
    subheading: string;
  }> = [
    { market: 'au', slug: 'home', title: 'ANZUK Education — Australia', pageTemplate: 'home-regional', heading: '', subheading: '' },
    { market: 'au', slug: 'who-we-are', title: 'Who we are', pageTemplate: 'about', heading: 'Making a global impact since 2004', subheading: 'The ANZUK story.' },
    { market: 'au', slug: 'browse-jobs', title: 'Browse Jobs', pageTemplate: 'job-listing', heading: 'Browse education jobs', subheading: 'Roles sourced from JobAdder.' },
    { market: 'au', slug: 'casual-opportunities', title: 'Casual Educator Jobs', pageTemplate: 'service-educators', heading: 'Teach your way', subheading: 'Casual relief teaching opportunities.' },
    { market: 'uk', slug: 'home', title: 'ANZUK Education — United Kingdom', pageTemplate: 'home-regional', heading: '', subheading: '' },
    { market: 'uk', slug: 'teach-with-us', title: 'Teach with us', pageTemplate: 'service-educators', heading: 'Teach with us', subheading: 'Start your UK teaching journey with ANZUK.' },
    { market: 'uk', slug: 'featured-jobs', title: 'Featured jobs', pageTemplate: 'job-listing', heading: 'Featured jobs', subheading: 'Curated UK roles from JobAdder.' },
    { market: 'ca', slug: 'home', title: 'ANZUK Education — Canada', pageTemplate: 'home-regional', heading: '', subheading: '' },
    { market: 'ca', slug: 'teach-in-australia', title: 'Teach in Australia', pageTemplate: 'cross-market', heading: 'Teach in Australia', subheading: 'Plan your move from Canada to Australia.' },
    { market: 'ca', slug: 'browse-jobs', title: 'Browse Jobs', pageTemplate: 'job-listing', heading: 'Browse jobs', subheading: 'Canadian job board via JobAdder.' },
    { market: 'nz', slug: 'home', title: 'ANZUK Education — New Zealand', pageTemplate: 'home-regional', heading: '', subheading: '' },
    { market: 'nz', slug: 'four-step-process', title: 'Four Agency Process', pageTemplate: 'process', heading: 'Four-step process', subheading: 'Your path to teaching in New Zealand.' },
    { market: 'nz', slug: 'refer-earn', title: 'Refer & Earn', pageTemplate: 'form-landing', heading: 'Refer & Earn', subheading: 'Refer educators and earn rewards.' },
    { market: 'nz', slug: 'partner-with-us', title: 'Partner with ANZUK Education', pageTemplate: 'form-landing', heading: 'Partner with us', subheading: 'School recruitment enquiries.' },
  ];

  for (const sample of regionalSamples) {
    const blocks =
      sample.slug === 'home'
        ? homeBlocks(REGIONS.find((r) => r.path === sample.market)!.label)
        : innerPageBlocks(sample.heading, sample.subheading);

    const extras: Partial<LocalizedPage> = {};
    if (sample.pageTemplate === 'job-listing') {
      extras.jobBoardConfig = {
        jobAdderBoardId: sample.market,
        featuredOnly: sample.market === 'uk',
        externalApply: true,
      };
    }

    pages.push(page(sample.market, sample.slug, sample.title, sample.pageTemplate, blocks, extras));
  }

  return pages;
}

function buildMockArticles(): Article[] {
  const samples: Array<{ market: RegionalMarket; slug: string; title: string; excerpt: string }> = [
    {
      market: 'au',
      slug: 'anzuk-values-the-power-of-belief',
      title: 'ANZUK values: The power of belief',
      excerpt: 'How belief shapes our work with educators and schools.',
    },
    {
      market: 'au',
      slug: 'from-london-to-sydney-sids-journey-with-anzuk',
      title: "From London to Sydney: Sid's journey with ANZUK",
      excerpt: 'An educator story about relocating to teach in Australia.',
    },
    {
      market: 'uk',
      slug: 'supporting-mental-health-in-the-classroom',
      title: 'Supporting mental health in the classroom',
      excerpt: 'Practical approaches for UK educators.',
    },
    {
      market: 'uk',
      slug: 'teaching-in-send-settings-an-introduction',
      title: 'Teaching in SEND settings: an introduction',
      excerpt: 'Getting started with special educational needs teaching.',
    },
    {
      market: 'ca',
      slug: 'teach-in-australia-webinar',
      title: 'Teach in Australia webinar',
      excerpt: 'Watch our webinar on making the move to Australia.',
    },
    {
      market: 'ca',
      slug: 'when-to-start-planning-your-journey-to-australia',
      title: 'When to start planning your journey to Australia',
      excerpt: 'Timeline tips for Canadian educators.',
    },
    {
      market: 'nz',
      slug: '5-reasons-teach-nz',
      title: '5 great reasons to teach in New Zealand now',
      excerpt: 'Why New Zealand is a top destination for educators.',
    },
    {
      market: 'nz',
      slug: 'teachers-guide-to-aewv',
      title: "Teachers' guide to AEWV",
      excerpt: 'Understanding the Accredited Employer Work Visa.',
    },
  ];

  return samples.map((s) => ({
    documentId: `mock-article-${s.market}-${s.slug}`,
    title: s.title,
    slug: s.slug,
    market: s.market,
    excerpt: s.excerpt,
    body: `<p>${s.excerpt}</p><p>Prototype article body — production content to be migrated from WordPress regional blog.</p>`,
    featuredImage: null,
    seo: seo(`${s.title} - ANZUK Education`, s.excerpt),
    publishedAt: '2026-01-15T00:00:00.000Z',
  }));
}

export const MOCK_PAGES = buildMockPages();
export const MOCK_ARTICLES = buildMockArticles();

export const MOCK_SITE_SETTINGS: SiteSettings = {
  siteName: 'ANZUK Education',
  tagline: 'International expertise in education. Local understanding.',
  organizationUrl: 'https://www.anzuk.education',
  contactEmail: 'info@anzuk.education',
  defaultLocale: 'en-AU',
  scootUrl: 'https://scoot.education',
  executiveUrl: 'https://www.anzukexecutive.com',
  geoSuggestEnabled: true,
  affiliateBrands: [
    { name: 'Scoot Education', url: 'https://scoot.education', logo: null },
    { name: 'ANZUK Executive', url: 'https://www.anzukexecutive.com', logo: null },
  ],
};

export function getMockPagesByMarket(market: Market): LocalizedPage[] {
  return MOCK_PAGES.filter((p) => p.market === market);
}

export function getMockPageByMarketAndSlug(
  market: Market,
  slug: string,
): LocalizedPage | undefined {
  return MOCK_PAGES.find((p) => p.market === market && p.slug === slug);
}

/** @deprecated Use getMockPageByMarketAndSlug */
export function getMockPagesByLocale(locale: string): LocalizedPage[] {
  const region = REGIONS.find((r) => r.strapiLocale === locale);
  if (!region) return [];
  return getMockPagesByMarket(region.path);
}

/** @deprecated Use getMockPageByMarketAndSlug */
export function getMockPageBySlug(locale: string, slug: string): LocalizedPage | undefined {
  const region = REGIONS.find((r) => r.strapiLocale === locale);
  if (!region) return undefined;
  return getMockPageByMarketAndSlug(region.path, slug);
}

export function getMockArticlesByMarket(market: RegionalMarket): Article[] {
  return MOCK_ARTICLES.filter((a) => a.market === market);
}

export function getMockArticleBySlug(
  market: RegionalMarket,
  slug: string,
): Article | undefined {
  return MOCK_ARTICLES.find((a) => a.market === market && a.slug === slug);
}
