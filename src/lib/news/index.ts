import { newsArticles } from "@/data/news/articles";
import type { NewsArticlePreview } from "@/types";

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
