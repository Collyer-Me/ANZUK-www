import { INTERNATIONAL_MARKET, marketUrlPrefix, type Market } from '../../config/markets';
import type { CmsPage, RegionEntity } from './types';

export interface PageTreeNode {
  documentId: string;
  slug: string;
  parentDocumentId?: string | null;
}

export function buildPagePath(
  slug: string,
  parentChain: string[] = [],
): string {
  if (slug === 'home') return 'home';
  const segments = [...parentChain.filter(Boolean), slug];
  return segments.join('/');
}

export function resolvePathFromTree(
  page: PageTreeNode,
  allPages: PageTreeNode[],
): string {
  if (page.slug === 'home') return 'home';

  const segments: string[] = [page.slug];
  let current = page;

  while (current.parentDocumentId) {
    const parent = allPages.find((p) => p.documentId === current.parentDocumentId);
    if (!parent || parent.slug === 'home') break;
    segments.unshift(parent.slug);
    current = parent;
  }

  return segments.join('/');
}

export function pageUrlFromPath(regionCode: Market, path: string): string {
  const prefix = marketUrlPrefix(regionCode);
  if (path === 'home') {
    return regionCode === INTERNATIONAL_MARKET ? '/' : `${prefix}/`;
  }
  return regionCode === INTERNATIONAL_MARKET ? `/${path}/` : `${prefix}/${path}/`;
}

export function resolveLinkUrl(
  link: { url?: string | null; page?: { path?: string } | null },
  regionCode: Market,
): string {
  if (link.url) {
    if (link.url.startsWith('http') || link.url.startsWith('/')) return link.url;
    return pageUrlFromPath(regionCode, link.url);
  }
  if (link.page?.path) {
    return pageUrlFromPath(regionCode, link.page.path);
  }
  return '#';
}

export function breadcrumbsForPage(
  page: CmsPage,
  region: RegionEntity,
  allPages: CmsPage[],
): Array<{ label: string; href: string }> {
  const crumbs: Array<{ label: string; href: string }> = [
    {
      label: region.name,
      href: pageUrlFromPath(region.code, 'home'),
    },
  ];

  if (page.path === 'home') return crumbs;

  const segments = page.path.split('/');
  let built = '';

  for (let i = 0; i < segments.length; i++) {
    built = built ? `${built}/${segments[i]}` : segments[i];
    const match = allPages.find((p) => p.path === built && p.regionCode === region.code);
    crumbs.push({
      label: match?.navLabel ?? match?.title ?? segments[i],
      href: pageUrlFromPath(region.code, built),
    });
  }

  return crumbs;
}
