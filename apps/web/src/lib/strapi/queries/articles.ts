import type { RegionalMarket } from '../../../config/markets';
import { fetchStrapiOptional, shouldUseMockData } from '../client';
import { MOCK_ARTICLES, getMockArticlesByRegion } from '../mock-data';
import type { Article, StrapiListResponse } from '../types';

const ARTICLE_POPULATE = {
  'populate[region][fields][0]': 'code',
  'populate[featuredImage][populate]': '*',
  'populate[seo][populate]': '*',
};

function normalizeArticle(raw: Record<string, unknown>): Article {
  const regionRaw = raw.region as Record<string, unknown> | undefined;
  const regionCode = String(regionRaw?.code ?? raw.market ?? 'au') as RegionalMarket;

  return {
    documentId: String(raw.documentId),
    title: String(raw.title),
    slug: String(raw.slug),
    regionCode,
    market: regionCode,
    excerpt: raw.excerpt ? String(raw.excerpt) : null,
    body: raw.body ? String(raw.body) : null,
    featuredImage: raw.featuredImage as Article['featuredImage'],
    seo: raw.seo as Article['seo'],
    publishedAt: raw.publishedAt ? String(raw.publishedAt) : null,
  };
}

export async function getArticlesByRegion(regionCode: RegionalMarket): Promise<Article[]> {
  if (shouldUseMockData()) return getMockArticlesByRegion(regionCode);

  const response = await fetchStrapiOptional<StrapiListResponse<Record<string, unknown>>>('articles', {
    locale: 'en',
    'filters[region][code][$eq]': regionCode,
    'pagination[pageSize]': '100',
    status: 'published',
    'sort[0]': 'publishedAt:desc',
    ...ARTICLE_POPULATE,
  });

  if (!response?.data) return getMockArticlesByRegion(regionCode);
  return response.data.map(normalizeArticle);
}

/** @deprecated Use getArticlesByRegion */
export async function getArticlesByMarket(market: RegionalMarket): Promise<Article[]> {
  return getArticlesByRegion(market);
}

export async function getArticleBySlug(
  regionCode: RegionalMarket,
  slug: string,
): Promise<Article | undefined> {
  if (shouldUseMockData()) {
    return MOCK_ARTICLES.find((a) => a.regionCode === regionCode && a.slug === slug);
  }

  const response = await fetchStrapiOptional<StrapiListResponse<Record<string, unknown>>>('articles', {
    locale: 'en',
    'filters[region][code][$eq]': regionCode,
    'filters[slug][$eq]': slug,
    status: 'published',
    ...ARTICLE_POPULATE,
  });

  const raw = response?.data[0];
  return raw ? normalizeArticle(raw) : undefined;
}

export async function getArticleByMarketAndSlug(
  regionCode: RegionalMarket,
  slug: string,
): Promise<Article | undefined> {
  return getArticleBySlug(regionCode, slug);
}

export async function getAllArticles(): Promise<Array<{ region: RegionalMarket; slug: string }>> {
  if (shouldUseMockData()) {
    return MOCK_ARTICLES.map((a) => ({ region: a.regionCode, slug: a.slug }));
  }

  const response = await fetchStrapiOptional<StrapiListResponse<Record<string, unknown>>>('articles', {
    locale: 'en',
    'pagination[pageSize]': '200',
    status: 'published',
    'populate[region][fields][0]': 'code',
  });

  if (!response?.data) {
    return MOCK_ARTICLES.map((a) => ({ region: a.regionCode, slug: a.slug }));
  }

  return response.data.map((raw) => ({
    region: String((raw.region as Record<string, unknown>)?.code) as RegionalMarket,
    slug: String(raw.slug),
  }));
}
