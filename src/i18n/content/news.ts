import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type { NewsArticleDetail, NewsArticlePreview } from "@/types";

import { newsArticleDetails } from "@/data/news/details";

import { getMessagesSection } from "./helpers";

interface NewsArticleTranslation {
  title?: string;
  excerpt?: string;
  category?: string;
  content?: string[];
  meta?: { title: string; description: string };
}

interface NewsArticlesMessages {
  [slug: string]: NewsArticleTranslation | undefined;
}

/** Legacy keys from early locale export scripts → real article slugs */
const NEWS_TRANSLATION_SLUG_ALIASES: Record<string, string> = {
  "1": "tenaris-visit",
  "2": "sabic-conference-2020",
};

function resolveNewsTranslation(
  translations: NewsArticlesMessages,
  slug: string,
): NewsArticleTranslation | undefined {
  if (translations[slug]) {
    return translations[slug];
  }

  for (const [legacyKey, mappedSlug] of Object.entries(
    NEWS_TRANSLATION_SLUG_ALIASES,
  )) {
    if (mappedSlug === slug && translations[legacyKey]) {
      return translations[legacyKey];
    }
  }

  return undefined;
}

function applyNewsTranslation(
  article: NewsArticleDetail,
  translation: NewsArticleTranslation | undefined,
): NewsArticleDetail {
  if (!translation) return article;

  return {
    ...article,
    title: translation.title ?? article.title,
    excerpt: translation.excerpt ?? article.excerpt,
    category: translation.category ?? article.category,
    content: translation.content ?? article.content,
    meta: translation.meta ?? article.meta,
  };
}

function getLocalizedArticles(
  messages: TranslationMessages,
): NewsArticleDetail[] {
  const translations = getMessagesSection<NewsArticlesMessages>(
    messages,
    "newsArticles",
  );

  return newsArticleDetails.map((article) =>
    applyNewsTranslation(
      article,
      resolveNewsTranslation(translations, article.slug),
    ),
  );
}

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

function sortByDateDesc(articles: NewsArticlePreview[]) {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function buildNewsPreviews(
  messages: TranslationMessages,
  _locale: Locale,
): NewsArticlePreview[] {
  return sortByDateDesc(getLocalizedArticles(messages).map(toPreview));
}

export function getLocalizedNewsArticles(
  messages: TranslationMessages,
): NewsArticlePreview[] {
  return buildNewsPreviews(messages, "en");
}

export function getLocalizedNewsBySlug(
  messages: TranslationMessages,
  slug: string,
): NewsArticleDetail | undefined {
  return getLocalizedArticles(messages).find((article) => article.slug === slug);
}

export function getLocalizedFeaturedNews(
  messages: TranslationMessages,
): NewsArticlePreview {
  return getLocalizedNewsArticles(messages)[0];
}

export function getLocalizedNewsExcludingFeatured(
  messages: TranslationMessages,
): NewsArticlePreview[] {
  const [, ...rest] = getLocalizedNewsArticles(messages);
  return rest;
}

export function getLocalizedRelatedNews(
  messages: TranslationMessages,
  slug: string,
  limit = 3,
): NewsArticlePreview[] {
  const current = getLocalizedNewsBySlug(messages, slug);
  if (!current) return [];

  const others = getLocalizedNewsArticles(messages).filter(
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
