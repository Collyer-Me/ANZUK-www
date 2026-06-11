import type { RegionalMarket } from '../../../config/markets';
import { REGIONS } from '../../../config/regions';
import { fetchStrapi, shouldUseMockData } from '../client';
import { getMockArticleBySlug, getMockArticlesByMarket, MOCK_ARTICLES } from '../mock-data';
import type { Article, StrapiListResponse } from '../types';

const ARTICLE_POPULATE = {
  'populate[seo][populate]': '*',
  'populate[featuredImage][populate]': '*',
};

function normalizeArticle(raw: Record<string, unknown>): Article {
  return {
    documentId: String(raw.documentId),
    title: String(raw.title),
    slug: String(raw.slug),
    market: String(raw.market) as RegionalMarket,
    excerpt: raw.excerpt ? String(raw.excerpt) : null,
    body: raw.body ? String(raw.body) : null,
    featuredImage: raw.featuredImage as Article['featuredImage'],
    seo: raw.seo as Article['seo'],
    publishedAt: raw.publishedAt ? String(raw.publishedAt) : null,
  };
}

export async function getArticlesByMarket(market: RegionalMarket): Promise<Article[]> {
  if (shouldUseMockData()) {
    return getMockArticlesByMarket(market);
  }

  const region = REGIONS.find((r) => r.path === market)!;

  const response = await fetchStrapi<StrapiListResponse<Record<string, unknown>>>('articles', {
    locale: region.strapiLocale,
    'filters[market][$eq]': market,
    'pagination[pageSize]': '100',
    status: 'published',
    ...ARTICLE_POPULATE,
  });

  return response.data.map(normalizeArticle);
}

export async function getArticleByMarketAndSlug(
  market: RegionalMarket,
  slug: string,
): Promise<Article | undefined> {
  if (shouldUseMockData()) {
    return getMockArticleBySlug(market, slug);
  }

  const region = REGIONS.find((r) => r.path === market)!;

  const response = await fetchStrapi<StrapiListResponse<Record<string, unknown>>>('articles', {
    locale: region.strapiLocale,
    'filters[market][$eq]': market,
    'filters[slug][$eq]': slug,
    status: 'published',
    ...ARTICLE_POPULATE,
  });

  const raw = response.data[0];
  return raw ? normalizeArticle(raw) : undefined;
}

export async function getAllArticles(): Promise<Array<{ market: RegionalMarket; slug: string }>> {
  if (shouldUseMockData()) {
    return MOCK_ARTICLES.map((a) => ({ market: a.market, slug: a.slug }));
  }

  const paths: Array<{ market: RegionalMarket; slug: string }> = [];

  for (const region of REGIONS) {
    const articles = await getArticlesByMarket(region.path);
    for (const article of articles) {
      paths.push({ market: region.path, slug: article.slug });
    }
  }

  return paths;
}
