export const taglines = {
  primary: 'Experience exceptional',
  secondary: 'International expertise in education. Local understanding.',
  regional: 'Right educator, right place, right time',
  schools: 'Exceptional educators for global classrooms',
  values: 'BE GREAT',
} as const;

export const personas = [
  {
    id: 'schools',
    name: 'Schools & international leaders',
    description:
      'Principals, HR, and recruitment leads at international schools seeking qualified teachers and leaders who fit their curriculum, culture, and community.',
    needs: ['Curriculum-aligned placements', 'Fast, reliable recruitment', 'Global network of educators'],
    ctas: ['Schools enquiry', 'School leadership search', 'Become a partner'],
  },
  {
    id: 'educators',
    name: 'Educators & job seekers',
    description:
      'Classroom teachers, early years specialists, and school leaders exploring roles in international, UK, AU, US, CA, and NZ settings.',
    needs: ['Personalised guidance', 'Curriculum-matched roles', 'Support to thrive abroad'],
    ctas: ['Search jobs', 'Expression of interest', 'Apply here'],
  },
  {
    id: 'leadership',
    name: 'Executive & leadership search',
    description:
      'International schools seeking principals, executives, and senior leaders through dedicated leadership search.',
    needs: ['Values-aligned leaders', 'Discreet, specialist search', 'Global executive network'],
    ctas: ['Leadership search', 'School enquiries'],
  },
] as const;

export const tonePrinciples = [
  {
    title: 'Warm & confident',
    description: 'Professional without being corporate. We speak with conviction and care.',
  },
  {
    title: 'People-first',
    description: 'Educators and schools are at the centre. We celebrate relationships and community.',
  },
  {
    title: 'Global with local understanding',
    description: 'International reach, regional nuance. Acknowledge curriculum and cultural context.',
  },
  {
    title: 'Clear & actionable',
    description: 'Direct CTAs, plain language, no jargon. Help visitors know their next step.',
  },
] as const;

export const vocabulary = {
  prefer: [
    'educators',
    'exceptional',
    'partner schools',
    'international schools',
    'local understanding',
    'curriculum-aligned',
    'thrive',
    'connect',
    'support',
  ],
  avoid: [
    'candidates (prefer educators or job seekers)',
    'clients (prefer schools or partners)',
    'resources (prefer people or educators)',
    'synergy, leverage, disrupt',
    'overly casual slang',
  ],
} as const;

/** Capitalisation rules from the live anzuk.education site */
export const capitalization = {
  summary:
    'Marketing copy uses sentence case for headings and UI. Reserve ALL CAPS for the ANZUK wordmark, BE GREAT acronym, and value keywords in the values accordion.',
  rules: [
    {
      context: 'Brand name',
      style: 'ANZUK Education',
      example: 'ANZUK Education',
      note: 'ANZUK is always uppercase. Education is title case. Include ® on first prominent mention where appropriate.',
    },
    {
      context: 'Primary hero & taglines',
      style: 'Sentence case',
      example: 'Experience exceptional',
      note: 'Only capitalise the first word unless a proper noun. The highlighted hero word stays lowercase: exceptional.',
    },
    {
      context: 'Section headings (H2–H4)',
      style: 'Sentence case',
      example: 'Local recruitment teams, distributed globally.',
      note: 'Do not title-case every word. Match the live site — natural sentence rhythm.',
    },
    {
      context: 'Eyebrows & subtitles',
      style: 'Sentence case',
      example: 'Teacher recruitment for international schools',
      note: 'Small labels above headings use sentence case, not ALL CAPS (unless a design token explicitly sets uppercase styling).',
    },
    {
      context: 'Buttons & CTAs',
      style: 'Sentence case',
      example: 'Schools enquiry · Search jobs · Expression of interest',
      note: 'Action labels read like short phrases, not shouty labels.',
    },
    {
      context: 'BE GREAT values',
      style: 'Acronym in ALL CAPS',
      example: 'BE GREAT',
      note: 'The framework name is always BE GREAT. Individual value names are title case in prose (Belief, Equity) but display in ALL CAPS in the accordion UI (BELIEF, EQUITY).',
    },
    {
      context: 'Body copy',
      style: 'Standard sentence case',
      example: 'At ANZUK Education, we help international schools experience exceptional…',
      note: 'Proper nouns, curricula (IB, UK), and country names follow normal English rules.',
    },
  ],
  avoid: [
    'Title Case Every Word In Headings',
    'ALL CAPS body paragraphs or long headings',
    'anzuk education or Anzuk Education for the brand name',
    'Be Great or Be great for the values framework',
  ],
} as const;

export const beGreatValues = [
  { letter: 'B', word: 'Belief', summary: 'Unwavering belief in what we do, the people we serve, and education.' },
  { letter: 'E', word: 'Equity', summary: 'Equity across all streams of education.' },
  { letter: 'G', word: 'Growth', summary: 'Learning, improving, and expanding our impact.' },
  { letter: 'R', word: 'Relationships', summary: 'Personal relationships that connect, collaborate, and empower.' },
  { letter: 'E', word: 'Empower', summary: 'Empowering our team to take ownership and make things happen.' },
  { letter: 'A', word: 'Attitude', summary: 'Leading with a positive attitude every day.' },
  { letter: 'T', word: 'Team', summary: 'One team around the world — we love what we do.' },
] as const;
