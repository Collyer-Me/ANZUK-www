/**
 * Mock content for the /brand/demo/ concept pages.
 * Copy leans on @anzuk/brand voice tokens; figures are illustrative only.
 * Icons are referenced by key — components map keys to asset imports.
 */

export type DemoValueIconKey =
  | 'belief'
  | 'equity'
  | 'growth'
  | 'relationships'
  | 'empower'
  | 'attitude'
  | 'team';

export interface DemoNavItem {
  path: string;
  label: string;
}

export const demoNavItems: DemoNavItem[] = [
  { path: '/brand/demo', label: 'Home' },
  { path: '/brand/demo/educators', label: 'For educators' },
  { path: '/brand/demo/jobs', label: 'Browse jobs' },
];

export interface DemoStat {
  value: number;
  suffix: string;
  label: string;
}

export const demoStats: DemoStat[] = [
  { value: 20, suffix: '+', label: 'Years connecting educators and schools' },
  { value: 12000, suffix: '+', label: 'Educators supported worldwide' },
  { value: 600, suffix: '+', label: 'Partner schools across five regions' },
  { value: 5, suffix: '', label: 'Countries with local ANZUK teams' },
];

export interface DemoStep {
  title: string;
  description: string;
  icon: DemoValueIconKey;
}

export type DemoStepsVariant = 'home' | 'educators';

export const demoSteps: Record<DemoStepsVariant, DemoStep[]> = {
  home: [
    {
      title: 'Tell us about you',
      description:
        'Share your experience, curriculum background, and where you would love to teach — it takes a few minutes.',
      icon: 'belief',
    },
    {
      title: 'We match you with schools',
      description:
        'A local consultant shortlists curriculum-aligned roles at partner schools that fit your goals.',
      icon: 'relationships',
    },
    {
      title: 'Thrive with local support',
      description:
        'From contract to classroom, your ANZUK team supports you before you land and long after.',
      icon: 'growth',
    },
  ],
  educators: [
    {
      title: 'Share your details',
      description:
        'Complete a short expression of interest — your experience, preferred curriculum, and destinations.',
      icon: 'belief',
    },
    {
      title: 'Meet your consultant',
      description:
        'A specialist in your region talks through options and matches you with the right partner schools.',
      icon: 'relationships',
    },
    {
      title: 'Step into the classroom',
      description:
        'We handle the practical details — contracts, relocation guidance, and support that continues all year.',
      icon: 'empower',
    },
  ],
};

export interface DemoTestimonial {
  quote: string;
  name: string;
  role: string;
}

export const demoTestimonials: DemoTestimonial[] = [
  {
    quote:
      'My consultant knew the school, the curriculum, and the city. I arrived in Hong Kong feeling like I already had a team behind me.',
    name: 'Hannah M.',
    role: 'Primary teacher, placed in Hong Kong',
  },
  {
    quote:
      'ANZUK understood exactly the kind of educators our community needed. Every shortlist felt hand-picked, because it was.',
    name: 'David O.',
    role: 'Principal, partner school in Dubai',
  },
  {
    quote:
      'The leadership search was discreet, values-led, and fast. We appointed a head of secondary who has transformed our senior school.',
    name: 'Priya S.',
    role: 'Board chair, international school group',
  },
];

export interface DemoBenefit {
  title: string;
  description: string;
  icon: DemoValueIconKey;
}

export const demoBenefits: DemoBenefit[] = [
  {
    title: 'Personalised guidance',
    description:
      'One consultant who knows your story, not a portal. Real conversations about where you will thrive.',
    icon: 'relationships',
  },
  {
    title: 'Curriculum-matched roles',
    description:
      'IB, British, American, Australian, and bilingual settings — matched to your experience and ambitions.',
    icon: 'equity',
  },
  {
    title: 'Relocation and visa support',
    description:
      'Flights, housing, visas, and the first-week essentials — we have helped thousands of educators land well.',
    icon: 'growth',
  },
  {
    title: 'A community abroad',
    description:
      'Teach Abroad events, local meet-ups, and a network of educators who made the same leap.',
    icon: 'team',
  },
];

export interface DemoRegionCard {
  name: string;
  flagKey: 'aus' | 'uk' | 'can' | 'nz' | 'usa';
  description: string;
  /** Internal path (run through withBase) or external URL. */
  path?: string;
  href?: string;
  external?: boolean;
  note?: string;
}

export const demoRegions: DemoRegionCard[] = [
  {
    name: 'Australia',
    flagKey: 'aus',
    description: 'Casual relief, contract, and permanent roles across every state.',
    path: '/au',
  },
  {
    name: 'United Kingdom',
    flagKey: 'uk',
    description: 'Daily supply through to leadership roles in London and beyond.',
    path: '/uk',
  },
  {
    name: 'Canada',
    flagKey: 'can',
    description: 'Opportunities in early years, schools, and specialist settings.',
    path: '/ca',
  },
  {
    name: 'New Zealand',
    flagKey: 'nz',
    description: 'Relief and long-term teaching roles across Aotearoa.',
    path: '/nz',
  },
  {
    name: 'United States',
    flagKey: 'usa',
    description: 'Served by our US affiliate, Scoot Education.',
    href: 'https://scoot.education/',
    external: true,
    note: 'via Scoot Education',
  },
];

export interface DemoFooterLink {
  label: string;
  /** Internal path (run through withBase) — mutually exclusive with href. */
  path?: string;
  /** Literal href (mailto:, external). */
  href?: string;
  external?: boolean;
}

export interface DemoFooterColumn {
  heading: string;
  links: DemoFooterLink[];
}

export const demoFooterColumns: DemoFooterColumn[] = [
  {
    heading: 'Explore the demo',
    links: [
      { label: 'Home', path: '/brand/demo' },
      { label: 'For educators', path: '/brand/demo/educators' },
      { label: 'Browse jobs', path: '/brand/demo/jobs' },
    ],
  },
  {
    heading: 'For schools',
    links: [
      { label: 'Schools enquiry', href: 'mailto:hello@anzuk.education?subject=Schools%20enquiry' },
      { label: 'Leadership search', href: 'mailto:hello@anzuk.education?subject=Leadership%20search' },
      { label: 'Become a partner', href: 'mailto:hello@anzuk.education?subject=Partnership' },
    ],
  },
  {
    heading: 'More',
    links: [
      { label: 'Brand guide', path: '/brand' },
      { label: 'Current live site', href: 'https://anzuk.education/', external: true },
      { label: 'Scoot Education (US)', href: 'https://scoot.education/', external: true },
    ],
  },
];
