import type { Market } from '../../config/markets';
import type { MarketNavigation, NavItem } from './types';

function navItem(id: number, label: string, url: string, children?: NavItem[]): NavItem {
  return { id, label, url, openInNewTab: false, children };
}

export const MOCK_MARKET_NAVIGATIONS: MarketNavigation[] = [
  {
    id: 1,
    market: 'international',
    items: [
      navItem(1, 'About international teaching', 'international-teaching-jobs'),
      navItem(2, 'Search jobs', 'browse-jobs'),
      navItem(3, 'Teacher recruitment', 'teacher-recruitment-for-school'),
      navItem(4, 'Leadership search', 'school-leadership-search'),
    ],
  },
  {
    id: 2,
    market: 'au',
    items: [
      navItem(10, 'Who we are', 'who-we-are', [
        navItem(11, 'Meet the team', 'who-we-are/meet-the-team'),
      ]),
      navItem(12, 'For educators', 'casual-opportunities', [
        navItem(13, 'Browse jobs', 'browse-jobs'),
      ]),
      navItem(14, 'Browse jobs', 'browse-jobs'),
      navItem(15, 'Contact', 'contact-us'),
    ],
  },
  {
    id: 3,
    market: 'uk',
    items: [
      navItem(20, 'Who we are', 'who-we-are'),
      navItem(21, 'Teach with us', 'teach-with-us'),
      navItem(22, 'Featured jobs', 'featured-jobs'),
      navItem(23, 'Blog', 'blog'),
    ],
  },
  {
    id: 4,
    market: 'ca',
    items: [
      navItem(30, 'Who we are', 'who-we-are'),
      navItem(31, 'Teach in Australia', 'teach-in-australia'),
      navItem(32, 'Browse jobs', 'browse-jobs'),
      navItem(33, 'Blog', 'blog'),
    ],
  },
  {
    id: 5,
    market: 'nz',
    items: [
      navItem(40, 'Who we are', 'who-we-are'),
      navItem(41, 'Four-step process', 'four-step-process'),
      navItem(42, 'Browse jobs', 'browse-jobs'),
      navItem(43, 'Partner with us', 'partner-with-us'),
      navItem(44, 'Refer & earn', 'refer-earn'),
    ],
  },
];

export function getMockMarketNav(market: Market): NavItem[] {
  return MOCK_MARKET_NAVIGATIONS.find((nav) => nav.market === market)?.items ?? [];
}
