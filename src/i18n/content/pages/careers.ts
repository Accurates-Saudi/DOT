import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type { CareersPageContent } from "@/types";

import careersHeroImage from "@/assets/about/facility.png";
import careersCtaImage from "@/assets/engineering/bg.png";

import { getMessagesSection, localizeLinkItem } from "../helpers";
import { localizeBreadcrumbs } from "./navigation";

export function buildCareersPageContent(
  messages: TranslationMessages,
  locale: Locale,
): CareersPageContent {
  const pages = getMessagesSection<{ careers: CareersPageContent }>(messages, "pages");
  const page = pages.careers;

  return {
    meta: page.meta,
    hero: {
      ...page.hero,
      ctaPrimary: localizeLinkItem(page.hero.ctaPrimary, locale),
      backgroundImage: page.hero.backgroundImage
        ? { ...page.hero.backgroundImage, src: careersHeroImage }
        : undefined,
    },
    benefits: page.benefits,
    openings: {
      ...page.openings,
      viewDetailsLabel: page.openings.viewDetailsLabel,
      generalApplication: {
        ...page.openings.generalApplication,
        ctaPrimary: localizeLinkItem(
          page.openings.generalApplication.ctaPrimary,
          locale,
        ),
      },
    },
    hiringProcess: page.hiringProcess,
    cta: {
      ...page.cta,
      ctaPrimary: localizeLinkItem(page.cta.ctaPrimary, locale),
      backgroundImage: page.cta.backgroundImage
        ? { ...page.cta.backgroundImage, src: careersCtaImage }
        : undefined,
    },
    detailSidebar: {
      ...page.detailSidebar,
      ctaPrimary: localizeLinkItem(page.detailSidebar.ctaPrimary, locale),
    },
    detailHero: {
      ...page.detailHero,
      breadcrumbs: localizeBreadcrumbs(page.detailHero.breadcrumbs, locale),
    },
  };
}
