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

export const beGreatValues = [
  { letter: 'B', word: 'Belief', summary: 'Unwavering belief in what we do, the people we serve, and education.' },
  { letter: 'E', word: 'Equity', summary: 'Equity across all streams of education.' },
  { letter: 'G', word: 'Growth', summary: 'Learning, improving, and expanding our impact.' },
  { letter: 'R', word: 'Relationships', summary: 'Personal relationships that connect, collaborate, and empower.' },
  { letter: 'E', word: 'Empower', summary: 'Empowering our team to take ownership and make things happen.' },
  { letter: 'A', word: 'Attitude', summary: 'Leading with a positive attitude every day.' },
  { letter: 'T', word: 'Team', summary: 'One team around the world — we love what we do.' },
] as const;
