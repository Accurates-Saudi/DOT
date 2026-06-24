import { newsArticleDetails, newsDetailsBySlug } from "@/data/news/details";
import { newsArticles } from "@/data/news/articles";
import type { NewsArticleDetail, NewsArticlePreview } from "@/types";

function sortByDateDesc(articles: NewsArticlePreview[]) {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getAllNewsArticles(): NewsArticlePreview[] {
  return sortByDateDesc(newsArticles);
}

export function getAllNewsArticleDetails(): NewsArticleDetail[] {
  return [...newsArticleDetails].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getNewsBySlug(slug: string): NewsArticleDetail | undefined {
  return newsDetailsBySlug[slug];
}

export function getAllNewsSlugs(): string[] {
  return newsArticleDetails.map((article) => article.slug);
}

export function getFeaturedNewsArticle(): NewsArticlePreview {
  return getAllNewsArticles()[0];
}

export function getNewsArticlesExcludingFeatured(): NewsArticlePreview[] {
  const [featured, ...rest] = getAllNewsArticles();
  void featured;
  return rest;
}

export function getRelatedNews(
  slug: string,
  limit = 3,
): NewsArticlePreview[] {
  const current = getNewsBySlug(slug);
  if (!current) return [];

  const others = getAllNewsArticles().filter(
    (article) => article.slug !== slug,
  );
  const sameCategory = others.filter(
    (article) => article.category === current.category,
  );
  const differentCategory = others.filter(
    (article) => article.category !== current.category,
  );

  return [...sameCategory, ...differentCategory].slice(0, limit);
}
