import { buildNewsPageContent } from "@/i18n/content/pages/news";
import {
  getLocalizedNewsArticles,
  getLocalizedNewsBySlug,
} from "@/i18n/content/news";
import type { NewsArticleDetail, NewsPageContent } from "@/types";
import { toCmsSource } from "@/utils/cms-content";

import { localeContentMessages } from "../shared";

const articleSlugs = getLocalizedNewsArticles(localeContentMessages.en).map(
  (article) => article.slug,
);

function getLocalizedArticleByLocale(
  slug: string,
  locale: "en" | "ar",
): NewsArticleDetail {
  const messages =
    locale === "en" ? localeContentMessages.en : localeContentMessages.ar;
  const article = getLocalizedNewsBySlug(messages, slug);

  if (!article) {
    throw new Error(`[content] Missing localized news article for "${slug}".`);
  }

  return article;
}

export const newsPageContentSource = toCmsSource<
  NewsPageContent & {
    detailCta: {
      heading: string;
      body: string;
      ctaPrimary: { label: string; href: string };
    };
  }
>(
  buildNewsPageContent(localeContentMessages.en, "en"),
  buildNewsPageContent(localeContentMessages.ar, "ar"),
  ["news", "page"],
);

export const newsArticlesContentSource = toCmsSource<NewsArticleDetail[]>(
  articleSlugs.map((slug) => getLocalizedArticleByLocale(slug, "en")),
  articleSlugs.map((slug) => getLocalizedArticleByLocale(slug, "ar")),
  ["news", "articles"],
);
