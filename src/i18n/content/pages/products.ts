import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type { ProductsPageContent } from "@/types";

import { pageHeroAssets } from "../assets/pages";
import { getMessagesSection, localizeLinkItem } from "../helpers";
import { localizeBreadcrumbs } from "./navigation";
import { buildLocalizedProductItems } from "../products";

export function buildProductsPageContent(
  messages: TranslationMessages,
  locale: Locale,
): ProductsPageContent {
  const pages = getMessagesSection<{ products: ProductsPageContent }>(
    messages,
    "pages",
  );
  const page = pages.products;

  return {
    meta: page.meta,
    hero: {
      ...page.hero,
      breadcrumbs: localizeBreadcrumbs(page.hero.breadcrumbs, locale),
      backgroundImage: page.hero.backgroundImage
        ? { ...page.hero.backgroundImage, src: pageHeroAssets.overviewHero }
        : undefined,
    },
    listing: {
      ...page.listing,
      items: buildLocalizedProductItems(messages, locale),
    },
    cta: {
      ...page.cta,
      ctaPrimary: localizeLinkItem(page.cta.ctaPrimary, locale),
    },
  };
}
