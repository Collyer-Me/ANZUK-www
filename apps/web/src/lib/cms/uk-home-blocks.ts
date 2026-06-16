import { beGreatValues, personas, taglines } from '@anzuk/brand';
import type { ContentBlock, RegionGridBlock } from './types';

const ukRegionGrid: RegionGridBlock = {
  __component: 'blocks.region-grid',
  id: 8,
  heading: 'Local teams, global reach',
  subheading: taglines.regional,
  regions: [
    {
      id: 1,
      name: 'Australia',
      description: 'Casual relief, contract, and permanent roles across every state.',
      url: '/au/',
      flagKey: 'aus',
      external: false,
    },
    {
      id: 2,
      name: 'United Kingdom',
      description: 'Daily supply through to leadership roles in London and beyond.',
      url: '/uk/',
      flagKey: 'uk',
      external: false,
    },
    {
      id: 3,
      name: 'Canada',
      description: 'Opportunities in early years, schools, and specialist settings.',
      url: '/ca/',
      flagKey: 'can',
      external: false,
    },
    {
      id: 4,
      name: 'New Zealand',
      description: 'Relief and long-term teaching roles across Aotearoa.',
      url: '/nz/',
      flagKey: 'nz',
      external: false,
    },
    {
      id: 5,
      name: 'United States',
      description: 'Served by our US affiliate, Scoot Education.',
      url: 'https://scoot.education/',
      flagKey: 'usa',
      external: true,
    },
  ],
};

/** Demo-quality homepage blocks for `/uk/` — mirrors `/brand/demo/` section order. */
export function buildUkHomeBlocks(): ContentBlock[] {
  const [schools, educators, leadership] = personas;

  return [
    {
      __component: 'blocks.blob-hero',
      id: 1,
      eyebrow: 'Teacher recruitment, worldwide',
      heading: 'Experience exceptional',
      highlightWord: 'exceptional',
      subheading: taglines.secondary,
      note: 'Local teams in Australia, the United Kingdom, Canada and New Zealand — and the United States via Scoot Education.',
      imageAlt: 'Educators and students in an international classroom',
      primary: { label: 'Expression of interest', url: 'teach-with-us' },
      secondary: { label: 'Browse jobs', url: 'featured-jobs' },
    },
    {
      __component: 'blocks.persona-cards',
      id: 2,
      eyebrow: 'One team, three journeys',
      heading: 'Who we help',
      description:
        'Schools, educators, and boards each get a dedicated specialist — one relationship from first conversation to long after placement.',
      cards: [
        {
          id: 1,
          title: schools.name,
          description: schools.description,
          needs: [...schools.needs],
          iconKey: 'school',
          accent: 'blue',
          featured: false,
          cta: {
            label: 'Schools enquiry',
            url: 'mailto:hello@anzuk.education?subject=Schools%20enquiry',
          },
        },
        {
          id: 2,
          title: educators.name,
          description: educators.description,
          needs: [...educators.needs],
          iconKey: 'teaching',
          accent: 'green',
          featured: true,
          cta: { label: 'Expression of interest', url: 'teach-with-us' },
        },
        {
          id: 3,
          title: leadership.name,
          description: leadership.description,
          needs: [...leadership.needs],
          iconKey: 'leadership',
          accent: 'purple',
          featured: false,
          cta: {
            label: 'Leadership search',
            url: 'mailto:hello@anzuk.education?subject=Leadership%20search',
          },
        },
      ],
    },
    {
      __component: 'blocks.stats-band',
      id: 3,
      heading: 'ANZUK by the numbers',
      footnote: 'Illustrative figures for demo purposes.',
      stats: [
        { id: 1, value: '20+', label: 'Years connecting educators and schools' },
        { id: 2, value: '12000+', label: 'Educators supported worldwide' },
        { id: 3, value: '600+', label: 'Partner schools across five regions' },
        { id: 4, value: '5', label: 'Countries with local ANZUK teams' },
      ],
    },
    {
      __component: 'blocks.steps-row',
      id: 4,
      title: 'Three steps to your next classroom',
      description: 'No portals, no guesswork — a consultant who knows your region guides every step.',
      steps: [
        {
          id: 1,
          title: 'Tell us about you',
          description:
            'Share your experience, curriculum background, and where you would love to teach — it takes a few minutes.',
        },
        {
          id: 2,
          title: 'We match you with schools',
          description:
            'A local consultant shortlists curriculum-aligned roles at partner schools that fit your goals.',
        },
        {
          id: 3,
          title: 'Thrive with local support',
          description:
            'From contract to classroom, your ANZUK team supports you before you land and long after.',
        },
      ],
    },
    {
      __component: 'blocks.value-tabs',
      id: 5,
      heading: 'We live BE GREAT',
      description: 'Seven values guide every conversation, shortlist, and placement we make.',
      autoAdvance: true,
      values: beGreatValues.map((value, index) => ({
        id: index + 1,
        letter: value.letter,
        word: value.word,
        summary: value.summary,
      })),
    },
    {
      __component: 'blocks.testimonials',
      id: 6,
      title: 'Educators and schools on working with ANZUK',
      items: [
        {
          id: 1,
          quote:
            'My consultant knew the school, the curriculum, and the city. I arrived in Hong Kong feeling like I already had a team behind me.',
          name: 'Hannah M.',
          role: 'Primary teacher, placed in Hong Kong',
        },
        {
          id: 2,
          quote:
            'ANZUK understood exactly the kind of educators our community needed. Every shortlist felt hand-picked, because it was.',
          name: 'David O.',
          role: 'Principal, partner school in Dubai',
        },
        {
          id: 3,
          quote:
            'The leadership search was discreet, values-led, and fast. We appointed a head of secondary who has transformed our senior school.',
          name: 'Priya S.',
          role: 'Board chair, international school group',
        },
      ],
    },
    {
      __component: 'blocks.logo-marquee',
      id: 7,
      heading: 'Trusted by partner schools worldwide',
    },
    ukRegionGrid,
    {
      __component: 'blocks.cta-band',
      id: 9,
      heading: 'Ready to experience exceptional?',
      body: "Whether you're a school searching for educators or a teacher planning your next move, our local teams are ready to help.",
      primary: { label: 'Expression of interest', url: 'teach-with-us' },
      secondary: { label: 'Browse jobs', url: 'featured-jobs' },
    },
  ];
}
