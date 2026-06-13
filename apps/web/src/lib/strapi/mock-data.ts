import { INTERNATIONAL_MARKET } from '../../config/markets';
import type { Market, PageTemplate, RegionalMarket } from '../../config/markets';
import { REGIONS } from '../../config/regions';
import { beGreatValues } from '@anzuk/brand';
import type { Article, CmsPage, ContentBlock, GlobalSettings } from './types';

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
  regionCode: Market,
  path: string,
  title: string,
  pageType: PageTemplate,
  blocks: ContentBlock[],
  extras?: Partial<CmsPage>,
): CmsPage {
  const slug = path.includes('/') ? path.split('/').pop()! : path;
  return {
    documentId: `mock-${regionCode}-${path.replace(/\//g, '-')}`,
    title,
    slug,
    path,
    regionCode,
    pageType,
    noIndex: false,
    seo: seo(`${title} - ANZUK Education`, `ANZUK Education — ${title}`),
    body: blocks,
    ...extras,
  };
}

const internationalRegionGrid: ContentBlock = {
  __component: 'blocks.region-grid',
  id: 2,
  heading: 'Local teams, global reach',
  subheading: 'International expertise in education. Local understanding.',
  regions: [
    { id: 1, name: 'Australia', description: 'Full-service education recruitment.', url: '/au/', flagKey: 'aus', external: false },
    { id: 2, name: 'United Kingdom', description: 'Supply, permanent, and SEN specialists.', url: '/uk/', flagKey: 'uk', external: false },
    { id: 3, name: 'Canada', description: 'Cross-market teaching opportunities.', url: '/ca/', flagKey: 'can', external: false },
    { id: 4, name: 'United States', description: 'Scoot Education — US recruitment.', url: 'https://scoot.education', flagKey: 'usa', external: true },
    { id: 5, name: 'New Zealand', description: 'Local and international educator support.', url: '/nz/', flagKey: 'nz', external: false },
  ],
};

const internationalValuesGrid: ContentBlock = {
  __component: 'blocks.values-grid',
  id: 4,
  heading: 'We live BE GREAT',
  description: 'Seven values guide every conversation, shortlist, and placement we make.',
  values: beGreatValues.map((value, index) => ({
    id: index + 1,
    letter: value.letter,
    word: value.word,
    summary: value.summary,
  })),
};

const internationalHomeBlocks: ContentBlock[] = [
  hero(
    1,
    'Experience exceptional',
    'International expertise in education. Local understanding.',
    'Search jobs',
    'browse-jobs',
  ),
  internationalRegionGrid,
  {
    __component: 'blocks.cta',
    id: 3,
    heading: 'Exceptional educators for global classrooms',
    body: 'We help international schools connect with passionate, high-quality educators.',
    buttonLabel: 'School enquiries',
    buttonUrl: 'teacher-recruitment-for-school',
    variant: 'primary',
  },
  internationalValuesGrid,
];

const regionalStatsRow: ContentBlock = {
  __component: 'blocks.stats-row',
  id: 10,
  stats: [
    { id: 1, value: '20+', label: 'Years in education' },
    { id: 2, value: '5', label: 'Markets worldwide' },
    { id: 3, value: '1000s', label: 'Educators placed' },
    { id: 4, value: '24/7', label: 'Consultant support' },
  ],
};

const homeBlocks = (regionLabel: string): ContentBlock[] => [
  hero(
    1,
    `Welcome to ANZUK ${regionLabel}`,
    'Connecting passionate educators with schools across the globe. Local expertise, international reach.',
    'Browse jobs',
    'browse-jobs',
  ),
  regionalStatsRow,
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

function richTextPageBlocks(heading: string, subheading: string, html: string): ContentBlock[] {
  return [hero(1, heading, subheading), { __component: 'blocks.rich-text', id: 2, content: html }];
}

function formPageBlocks(
  heading: string,
  subheading: string,
  jotformId: string,
): ContentBlock[] {
  return [
    hero(1, heading, subheading),
    {
      __component: 'blocks.form-embed',
      id: 2,
      heading: 'Complete the form',
      description: 'Our team will be in touch shortly.',
      jotformId,
      height: 600,
    },
  ];
}

function buildMockPages(): CmsPage[] {
  const pages: CmsPage[] = [];

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
    path: string;
    title: string;
    pageType: PageTemplate;
    heading: string;
    subheading: string;
    blocks?: ContentBlock[];
  }> = [
    { market: 'au', path: 'home', title: 'ANZUK Education — Australia', pageType: 'home-regional', heading: '', subheading: '' },
    {
      market: 'au',
      path: 'who-we-are',
      title: 'Who we are',
      pageType: 'about',
      heading: 'Making a global impact since 2004',
      subheading: 'The ANZUK story.',
      blocks: richTextPageBlocks(
        'Making a global impact since 2004',
        'The ANZUK story.',
        '<p>ANZUK Education connects passionate educators with schools across Australia and around the world. Since 2004, we have built lasting relationships with educators and school leaders.</p><p>Our consultants understand local education markets and provide support from first enquiry through placement and beyond.</p>',
      ),
    },
    {
      market: 'au',
      path: 'who-we-are/meet-the-team',
      title: 'Meet the Team',
      pageType: 'team-listing',
      heading: 'Meet the team',
      subheading: 'The people behind ANZUK Australia.',
    },
    { market: 'au', path: 'browse-jobs', title: 'Browse Jobs', pageType: 'job-listing', heading: 'Browse education jobs', subheading: 'Roles sourced from JobAdder.' },
    { market: 'au', path: 'casual-opportunities', title: 'Casual Educator Jobs', pageType: 'service-educators', heading: 'Teach your way', subheading: 'Casual relief teaching opportunities.' },
    { market: 'uk', path: 'home', title: 'ANZUK Education — United Kingdom', pageType: 'home-regional', heading: '', subheading: '' },
    { market: 'uk', path: 'teach-with-us', title: 'Teach with us', pageType: 'service-educators', heading: 'Teach with us', subheading: 'Start your UK teaching journey with ANZUK.', blocks: formPageBlocks('Teach with us', 'Start your UK teaching journey with ANZUK.', '251698770470871') },
    { market: 'uk', path: 'featured-jobs', title: 'Featured jobs', pageType: 'job-listing', heading: 'Featured jobs', subheading: 'Curated UK roles from JobAdder.' },
    { market: 'ca', path: 'home', title: 'ANZUK Education — Canada', pageType: 'home-regional', heading: '', subheading: '' },
    { market: 'ca', path: 'teach-in-australia', title: 'Teach in Australia', pageType: 'cross-market', heading: 'Teach in Australia', subheading: 'Plan your move from Canada to Australia.' },
    { market: 'ca', path: 'browse-jobs', title: 'Browse Jobs', pageType: 'job-listing', heading: 'Browse jobs', subheading: 'Canadian job board via JobAdder.' },
    { market: 'nz', path: 'home', title: 'ANZUK Education — New Zealand', pageType: 'home-regional', heading: '', subheading: '' },
    {
      market: 'nz',
      path: 'four-step-process',
      title: 'Four Agency Process',
      pageType: 'process',
      heading: 'Four-step process',
      subheading: 'Your path to teaching in New Zealand.',
      blocks: richTextPageBlocks(
        'Four-step process',
        'Your path to teaching in New Zealand.',
        '<ol><li><strong>Register</strong> — Tell us about your experience and goals.</li><li><strong>Consult</strong> — Meet your dedicated consultant.</li><li><strong>Match</strong> — We shortlist roles suited to you.</li><li><strong>Place</strong> — Start teaching with ongoing support.</li></ol>',
      ),
    },
    {
      market: 'nz',
      path: 'refer-earn',
      title: 'Refer & Earn',
      pageType: 'form-landing',
      heading: 'Refer & Earn',
      subheading: 'Refer educators and earn rewards.',
      blocks: formPageBlocks('Refer & Earn', 'Refer educators and earn rewards.', '251698770470871'),
    },
    {
      market: 'nz',
      path: 'partner-with-us',
      title: 'Partner with ANZUK Education',
      pageType: 'form-landing',
      heading: 'Partner with us',
      subheading: 'School recruitment enquiries.',
      blocks: formPageBlocks('Partner with us', 'School recruitment enquiries.', '251698159691877'),
    },
  ];

  for (const sample of regionalSamples) {
    const blocks =
      sample.blocks ??
      (sample.path === 'home'
        ? homeBlocks(REGIONS.find((r) => r.path === sample.market)!.label)
        : innerPageBlocks(sample.heading, sample.subheading));

    const extras: Partial<CmsPage> = {};
    if (sample.pageType === 'job-listing') {
      extras.jobBoardConfig = {
        jobAdderBoardId: sample.market,
        featuredOnly: sample.market === 'uk',
        externalApply: true,
      };
    }

    pages.push(page(sample.market, sample.path, sample.title, sample.pageType, blocks, extras));
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
    regionCode: s.market,
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

export const MOCK_GLOBAL_SETTINGS: GlobalSettings = {
  organizationName: 'ANZUK Education',
  tagline: 'International expertise in education. Local understanding.',
  organizationUrl: 'https://www.anzuk.education',
  scootUrl: 'https://scoot.education',
  executiveUrl: 'https://www.anzukexecutive.com',
  ketchEnabled: true,
  ketchOrganizationCode: import.meta.env.PUBLIC_KETCH_ORG ?? 'anzuk',
  ketchPropertyCode: import.meta.env.PUBLIC_KETCH_PROPERTY ?? 'website_smart_tag',
  rudderStackEnabled: Boolean(import.meta.env.PUBLIC_RUDDERSTACK_WRITE_KEY),
  rudderStackWriteKey: import.meta.env.PUBLIC_RUDDERSTACK_WRITE_KEY ?? null,
  rudderStackDataPlaneUrl: import.meta.env.PUBLIC_RUDDERSTACK_DATA_PLANE_URL ?? null,
  optionalGtmContainerId: import.meta.env.PUBLIC_GTM_ID ?? null,
  affiliateBrands: [
    { name: 'Scoot Education', url: 'https://scoot.education', logo: null },
    { name: 'ANZUK Executive', url: 'https://www.anzukexecutive.com', logo: null },
  ],
};

export const MOCK_SITE_SETTINGS = {
  ...MOCK_GLOBAL_SETTINGS,
  siteName: MOCK_GLOBAL_SETTINGS.organizationName,
  contactEmail: 'info@anzuk.education',
  defaultLocale: 'en',
  geoSuggestEnabled: true,
};

export function getMockPagesByRegion(regionCode: Market): CmsPage[] {
  return MOCK_PAGES.filter((p) => p.regionCode === regionCode);
}

export function getMockPageByRegionAndPath(
  regionCode: Market,
  path: string,
): CmsPage | undefined {
  return MOCK_PAGES.find((p) => p.regionCode === regionCode && p.path === path);
}

export function getMockPagesByMarket(market: Market): CmsPage[] {
  return getMockPagesByRegion(market);
}

export function getMockPageByMarketAndSlug(
  market: Market,
  slug: string,
): CmsPage | undefined {
  return getMockPageByRegionAndPath(market, slug);
}

export function getMockPagesByLocale(locale: string): CmsPage[] {
  void locale;
  return MOCK_PAGES;
}

export function getMockPageBySlug(_locale: string, slug: string): CmsPage | undefined {
  return MOCK_PAGES.find((p) => p.path === slug);
}

export function getMockArticlesByRegion(regionCode: RegionalMarket): Article[] {
  return MOCK_ARTICLES.filter((a) => a.regionCode === regionCode);
}

export function getMockArticlesByMarket(market: RegionalMarket): Article[] {
  return getMockArticlesByRegion(market);
}

export function getMockArticleBySlug(
  market: RegionalMarket,
  slug: string,
): Article | undefined {
  return MOCK_ARTICLES.find((a) => a.market === market && a.slug === slug);
}
