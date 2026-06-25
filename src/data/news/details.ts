import type { NewsArticleDetail } from "@/types";

import { placeholderNewsArticles } from "./placeholders";
import { realNewsArticles } from "./realArticles";

export const newsArticleDetails: NewsArticleDetail[] = [
  ...realNewsArticles,
  ...placeholderNewsArticles,
];

export const newsDetailsBySlug = Object.fromEntries(
  newsArticleDetails.map((article) => [article.slug, article]),
) as Record<string, NewsArticleDetail>;
