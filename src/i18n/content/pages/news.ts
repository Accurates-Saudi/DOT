import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type { NewsPageContent } from "@/types";

import newsHeader from "@/assets/news/header.png";

import { getMessagesSection, localizeLinkItem } from "../helpers";
import { localizeBreadcrumbs } from "./navigation";

export function buildNewsPageContent(
  messages: TranslationMessages,
  locale: Locale,
) {
  const pages = getMessagesSection<{
    news: NewsPageContent & {
      detailCta: {
        heading: string;
        body: string;
        ctaPrimary: { label: string; href: string };
      };
    };
  }>(messages, "pages");
  const page = pages.news;

  return {
    meta: page.meta,
    hero: {
      ...page.hero,
      breadcrumbs: localizeBreadcrumbs(page.hero.breadcrumbs, locale),
      backgroundImage: page.hero.backgroundImage
        ? { ...page.hero.backgroundImage, src: newsHeader }
        : undefined,
    },
    featured: page.featured,
    grid: page.grid,
    detailCta: {
      ...page.detailCta,
      ctaPrimary: localizeLinkItem(page.detailCta.ctaPrimary, locale),
    },
  };
}
