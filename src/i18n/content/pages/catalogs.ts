import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type { CatalogsPageContent } from "@/types";

import { catalogAssets } from "../assets/catalogs";
import { pageHeroAssets } from "../assets/pages";
import { getMessagesSection } from "../helpers";
import { localizeBreadcrumbs } from "./navigation";

export function buildCatalogsPageContent(
  messages: TranslationMessages,
  locale: Locale,
): CatalogsPageContent {
  const pages = getMessagesSection<{ catalogs: CatalogsPageContent }>(
    messages,
    "pages",
  );
  const page = pages.catalogs;

  return {
    meta: page.meta,
    hero: {
      ...page.hero,
      breadcrumbs: localizeBreadcrumbs(page.hero.breadcrumbs, locale),
      backgroundImage: page.hero.backgroundImage
        ? { ...page.hero.backgroundImage, src: pageHeroAssets.overviewHero }
        : undefined,
    },
    library: {
      ...page.library,
      items: page.library.items.map((item, index) => ({
        ...item,
        cover: {
          ...item.cover,
          src: catalogAssets[index] ?? catalogAssets[0],
        },
      })),
    },
  };
}
