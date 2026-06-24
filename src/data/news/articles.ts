import type { NewsArticleDetail, NewsArticlePreview } from "@/types";

import { newsArticleDetails } from "./details";

function toPreview(article: NewsArticleDetail): NewsArticlePreview {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    publishedAt: article.publishedAt,
    image: article.image,
  };
}

export const newsArticles: NewsArticlePreview[] =
  newsArticleDetails.map(toPreview);
