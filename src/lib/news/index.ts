import { newsArticles } from "@/data/news/articles";
import type { NewsArticlePreview, PaginationMeta } from "@/types";

function sortByDateDesc(articles: NewsArticlePreview[]) {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getAllNewsArticles(): NewsArticlePreview[] {
  return sortByDateDesc(newsArticles);
}

export function getFeaturedNewsArticle(): NewsArticlePreview {
  return getAllNewsArticles()[0];
}

export function getNewsArticlesExcludingFeatured(): NewsArticlePreview[] {
  const [featured, ...rest] = getAllNewsArticles();
  void featured;
  return rest;
}

export function getPaginatedNewsArticles(
  page: number,
  itemsPerPage: number,
): { articles: NewsArticlePreview[]; meta: PaginationMeta } {
  const allArticles = getNewsArticlesExcludingFeatured();
  const totalItems = allArticles.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * itemsPerPage;
  const articles = allArticles.slice(start, start + itemsPerPage);

  return {
    articles,
    meta: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
    },
  };
}
