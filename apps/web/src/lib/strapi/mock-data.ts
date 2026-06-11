import type { LocalizedPage, SiteSettings } from './types';
import { REGIONS } from '../../config/regions';

const homeBlocks = (regionLabel: string) => [
  {
    __component: 'blocks.hero' as const,
    id: 1,
    heading: `Welcome to ANZUK ${regionLabel}`,
    subheading:
      'Connecting passionate educators with schools across the globe. Local expertise, international reach.',
    ctaLabel: 'Find teaching jobs',
    ctaUrl: '#jobs',
    variant: 'default' as const,
  },
  {
    __component: 'blocks.feature-grid' as const,
    id: 2,
    heading: 'Why ANZUK?',
    features: [
      {
        id: 1,
        title: 'Expert placement',
        description: 'Dedicated consultants who understand your local education market.',
        icon: 'teaching' as const,
      },
      {
        id: 2,
        title: 'Ongoing support',
        description: 'We stay with you from application through placement and beyond.',
        icon: 'support' as const,
      },
      {
        id: 3,
        title: 'Global network',
        description: 'Part of an international group with deep roots in each region we serve.',
        icon: 'global' as const,
      },
    ],
  },
  {
    __component: 'blocks.cta' as const,
    id: 3,
    heading: 'Ready to take the next step?',
    body: 'Register with ANZUK and discover opportunities matched to your skills and goals.',
    buttonLabel: 'Get started',
    buttonUrl: '#register',
    variant: 'primary' as const,
  },
  {
    __component: 'blocks.testimonial' as const,
    id: 4,
    quote:
      'ANZUK made my move overseas seamless. Their local knowledge and personal support made all the difference.',
    authorName: 'Sarah M.',
    authorRole: 'Primary Teacher',
  },
];

function buildMockPages(): LocalizedPage[] {
  const pages: LocalizedPage[] = [];

  for (const region of REGIONS) {
    const siblings = REGIONS.map((r) => ({
      locale: r.strapiLocale,
      slug: 'home',
      documentId: `mock-home-${r.path}`,
    }));

    pages.push({
      documentId: `mock-home-${region.path}`,
      title: `ANZUK Education — ${region.label}`,
      slug: 'home',
      canonicalUrl: null,
      noIndex: false,
      seo: {
        metaTitle: `ANZUK Education — ${region.label}`,
        metaDescription: `International expertise in education. Local understanding in ${region.label}.`,
        ogImage: null,
      },
      body: homeBlocks(region.label),
      localizations: siblings.filter((s) => s.locale !== region.strapiLocale),
    });
  }

  return pages;
}

export const MOCK_PAGES = buildMockPages();

export const MOCK_SITE_SETTINGS: SiteSettings = {
  siteName: 'ANZUK Education',
  tagline: 'International expertise in education. Local understanding.',
  organizationUrl: 'https://www.anzuk.education',
  contactEmail: 'info@anzuk.education',
  defaultLocale: 'en-AU',
};

export function getMockPagesByLocale(locale: string): LocalizedPage[] {
  return MOCK_PAGES.filter((p) => {
    const region = REGIONS.find((r) => r.strapiLocale === locale);
    return region && p.documentId === `mock-home-${region.path}`;
  });
}

export function getMockPageBySlug(locale: string, slug: string): LocalizedPage | undefined {
  const region = REGIONS.find((r) => r.strapiLocale === locale);
  if (!region) return undefined;
  return MOCK_PAGES.find((p) => p.documentId === `mock-home-${region.path}` && p.slug === slug);
}
