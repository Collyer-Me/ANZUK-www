/**
 * Mock job listings for the /brand/demo/jobs/ explorer.
 * All schools are fictional and all figures illustrative — demo content only.
 */

export type DemoJobRegion = 'international' | 'australia' | 'uk' | 'canada' | 'nz';
export type DemoJobType = 'casual' | 'contract' | 'permanent' | 'leadership';

export interface DemoJob {
  id: string;
  title: string;
  school: string;
  location: string;
  region: DemoJobRegion;
  regionLabel: string;
  type: DemoJobType;
  typeLabel: string;
  category: 'Early childhood' | 'Primary' | 'Secondary' | 'Leadership' | 'Education support';
  salary: string;
  startDate: string;
  posted: string;
  summary: string;
  featured?: boolean;
}

export const demoJobs: DemoJob[] = [
  {
    id: 'intl-hk-primary',
    title: 'Primary homeroom teacher',
    school: 'Harbourview International School',
    location: 'Hong Kong SAR',
    region: 'international',
    regionLabel: 'International',
    type: 'permanent',
    typeLabel: 'Permanent · Full-time',
    category: 'Primary',
    salary: 'HK$540k–620k + housing allowance',
    startDate: 'August 2026',
    posted: '3 days ago',
    summary:
      'IB PYP school on Hong Kong Island seeking an experienced homeroom teacher to join a collaborative year 4 team.',
    featured: true,
  },
  {
    id: 'intl-dubai-secondary-english',
    title: 'Secondary English teacher',
    school: 'Al Noor Academy',
    location: 'Dubai, UAE',
    region: 'international',
    regionLabel: 'International',
    type: 'permanent',
    typeLabel: 'Permanent · Full-time',
    category: 'Secondary',
    salary: 'AED 280k–330k tax-free + flights',
    startDate: 'August 2026',
    posted: '1 week ago',
    summary:
      'British-curriculum academy seeking an English specialist for KS3–KS5, including A-level literature.',
  },
  {
    id: 'intl-shanghai-ey',
    title: 'Early years educator',
    school: 'Jade Garden International Kindergarten',
    location: 'Shanghai, China',
    region: 'international',
    regionLabel: 'International',
    type: 'contract',
    typeLabel: 'Contract · 2 years',
    category: 'Early childhood',
    salary: '¥420k–480k + accommodation',
    startDate: 'August 2026',
    posted: '2 weeks ago',
    summary:
      'Bilingual early years setting looking for a play-based practitioner with EYFS or EYLF experience.',
  },
  {
    id: 'intl-muscat-pe',
    title: 'PE and outdoor education teacher',
    school: 'Muscat International College',
    location: 'Muscat, Oman',
    region: 'international',
    regionLabel: 'International',
    type: 'contract',
    typeLabel: 'Contract · 2 years',
    category: 'Secondary',
    salary: 'OMR 14.4k–16.8k tax-free + housing',
    startDate: 'August 2026',
    posted: '5 days ago',
    summary:
      'Whole-school PE role with a strong outdoor education programme, swimming, and competitive sport.',
  },
  {
    id: 'intl-singapore-head-primary',
    title: 'Head of primary',
    school: 'Straits International School',
    location: 'Singapore',
    region: 'international',
    regionLabel: 'International',
    type: 'leadership',
    typeLabel: 'Leadership · Permanent',
    category: 'Leadership',
    salary: 'S$160k–190k + benefits',
    startDate: 'January 2027',
    posted: '1 week ago',
    summary:
      'Established IB school seeking a visible, values-led head of primary to lead 60 staff across two campuses.',
    featured: true,
  },
  {
    id: 'au-melbourne-crt',
    title: 'Casual relief teacher (CRT)',
    school: 'Multiple partner schools',
    location: 'Melbourne, VIC',
    region: 'australia',
    regionLabel: 'Australia',
    type: 'casual',
    typeLabel: 'Casual · Daily relief',
    category: 'Primary',
    salary: '$420–480 per day',
    startDate: 'Immediate',
    posted: 'Today',
    summary:
      'Choose the days you work across our network of primary schools in Melbourne’s inner and eastern suburbs.',
  },
  {
    id: 'au-melbourne-science',
    title: 'Secondary science teacher',
    school: 'Banksia Park Secondary College',
    location: 'Melbourne, VIC',
    region: 'australia',
    regionLabel: 'Australia',
    type: 'contract',
    typeLabel: 'Contract · 12 months',
    category: 'Secondary',
    salary: '$92k–115k + super',
    startDate: 'Term 1, 2027',
    posted: '4 days ago',
    summary:
      'Years 7–10 general science with senior chemistry, in a well-resourced STEM faculty.',
  },
  {
    id: 'au-sydney-ey-director',
    title: 'Early learning centre director',
    school: 'Wattle Lane Early Learning',
    location: 'Sydney, NSW',
    region: 'australia',
    regionLabel: 'Australia',
    type: 'leadership',
    typeLabel: 'Leadership · Permanent',
    category: 'Early childhood',
    salary: '$120k–135k + super',
    startDate: 'Negotiable',
    posted: '1 week ago',
    summary:
      '78-place service rated Exceeding seeking a director who leads with warmth and operational rigour.',
  },
  {
    id: 'au-brisbane-support',
    title: 'Education support officer',
    school: 'Riverbend State School',
    location: 'Brisbane, QLD',
    region: 'australia',
    regionLabel: 'Australia',
    type: 'casual',
    typeLabel: 'Casual · Flexible days',
    category: 'Education support',
    salary: '$38–45 per hour',
    startDate: 'Immediate',
    posted: '2 days ago',
    summary:
      'Support students with additional needs across primary classrooms — experience with AAC valued.',
  },
  {
    id: 'uk-london-supply',
    title: 'Daily supply teacher',
    school: 'Multiple partner schools',
    location: 'London, UK',
    region: 'uk',
    regionLabel: 'United Kingdom',
    type: 'casual',
    typeLabel: 'Casual · Daily supply',
    category: 'Primary',
    salary: '£160–210 per day',
    startDate: 'Immediate',
    posted: 'Today',
    summary:
      'Flexible supply across our London primary network, with weekly pay and a dedicated consultant.',
  },
  {
    id: 'uk-london-sen',
    title: 'SEN teacher',
    school: 'Elm Court Specialist School',
    location: 'London, UK',
    region: 'uk',
    regionLabel: 'United Kingdom',
    type: 'permanent',
    typeLabel: 'Permanent · Full-time',
    category: 'Education support',
    salary: '£38k–52k + SEN allowance',
    startDate: 'September 2026',
    posted: '6 days ago',
    summary:
      'Specialist setting for students with complex needs; strong therapy team and genuine career progression.',
  },
  {
    id: 'uk-manchester-maths',
    title: 'Secondary maths teacher',
    school: 'Irwell Valley High School',
    location: 'Manchester, UK',
    region: 'uk',
    regionLabel: 'United Kingdom',
    type: 'permanent',
    typeLabel: 'Permanent · Full-time',
    category: 'Secondary',
    salary: '£32k–49k (MPS/UPS)',
    startDate: 'September 2026',
    posted: '1 week ago',
    summary:
      'KS3–KS4 mathematics in an improving school with a supportive, well-led department.',
  },
  {
    id: 'ca-toronto-french',
    title: 'French immersion teacher',
    school: 'Maplewood Public School',
    location: 'Toronto, ON',
    region: 'canada',
    regionLabel: 'Canada',
    type: 'contract',
    typeLabel: 'Contract · 1 year',
    category: 'Primary',
    salary: 'CA$62k–78k',
    startDate: 'September 2026',
    posted: '3 days ago',
    summary:
      'Grade 2 French immersion classroom; OCT registration or eligibility required.',
  },
  {
    id: 'nz-auckland-relief',
    title: 'Relief teacher',
    school: 'Multiple partner schools',
    location: 'Auckland, NZ',
    region: 'nz',
    regionLabel: 'New Zealand',
    type: 'casual',
    typeLabel: 'Casual · Daily relief',
    category: 'Primary',
    salary: 'NZ$380–420 per day',
    startDate: 'Immediate',
    posted: 'Yesterday',
    summary:
      'Day-to-day relief across Auckland primary and intermediate schools — you set your availability.',
  },
  {
    id: 'nz-wellington-te-reo',
    title: 'Kaiako — te reo Māori',
    school: 'Tawa Valley College',
    location: 'Wellington, NZ',
    region: 'nz',
    regionLabel: 'New Zealand',
    type: 'permanent',
    typeLabel: 'Permanent · Full-time',
    category: 'Secondary',
    salary: 'NZ$61k–90k',
    startDate: 'Term 1, 2027',
    posted: '5 days ago',
    summary:
      'Grow a thriving te reo Māori programme across years 9–13 with strong community backing.',
  },
];

export interface DemoJobFilter {
  value: string;
  label: string;
}

export const jobRegionFilters: DemoJobFilter[] = [
  { value: 'all', label: 'All regions' },
  { value: 'international', label: 'International' },
  { value: 'australia', label: 'Australia' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'canada', label: 'Canada' },
  { value: 'nz', label: 'New Zealand' },
];

export const jobTypeFilters: DemoJobFilter[] = [
  { value: 'all', label: 'All types' },
  { value: 'casual', label: 'Casual relief' },
  { value: 'contract', label: 'Contract' },
  { value: 'permanent', label: 'Permanent' },
  { value: 'leadership', label: 'Leadership' },
];

/** Lower-cased haystack used for client-side text search. */
export function jobSearchText(job: DemoJob): string {
  return [job.title, job.school, job.location, job.category, job.typeLabel, job.regionLabel]
    .join(' ')
    .toLowerCase();
}
