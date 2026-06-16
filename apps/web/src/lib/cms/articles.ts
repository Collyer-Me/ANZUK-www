import type { RegionalMarket } from '../../config/markets';
import { MOCK_ARTICLES, getMockArticlesByRegion } from './mock-data';
import type { Article } from './types';

export async function getArticlesByRegion(regionCode: RegionalMarket): Promise<Article[]> {
  return getMockArticlesByRegion(regionCode);
}

/** @deprecated Use getArticlesByRegion */
export async function getArticlesByMarket(market: RegionalMarket): Promise<Article[]> {
  return getArticlesByRegion(market);
}

export async function getArticleBySlug(
  regionCode: RegionalMarket,
  slug: string,
): Promise<Article | undefined> {
  return MOCK_ARTICLES.find((a) => a.regionCode === regionCode && a.slug === slug);
}

export async function getArticleByMarketAndSlug(
  regionCode: RegionalMarket,
  slug: string,
): Promise<Article | undefined> {
  return getArticleBySlug(regionCode, slug);
}

export async function getAllArticles(): Promise<Array<{ region: RegionalMarket; slug: string }>> {
  return MOCK_ARTICLES.map((a) => ({ region: a.regionCode, slug: a.slug }));
}
