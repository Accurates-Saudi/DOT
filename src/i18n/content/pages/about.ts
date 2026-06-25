import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type { AboutPageContent } from "@/types";

import { aboutAssets } from "../assets/about";
import {
  aboutCapabilitiesStructure,
  aboutCompanyOverviewFeatures,
  aboutCompanyOverviewStats,
} from "../defaults/about-structure";
import { getMessagesSection, localizeLinkItem, mergeIndexed } from "../helpers";
import { localizeBreadcrumbs } from "./navigation";

export function buildAboutPageContent(
  messages: TranslationMessages,
  locale: Locale,
): AboutPageContent {
  const pages = getMessagesSection<{ about: AboutPageContent }>(messages, "pages");
  const page = pages.about;

  return {
    meta: page.meta,
    hero: {
      ...page.hero,
      breadcrumbs: localizeBreadcrumbs(page.hero.breadcrumbs, locale),
      backgroundImage: page.hero.backgroundImage
        ? { ...page.hero.backgroundImage, src: aboutAssets.hero }
        : undefined,
    },
    companyOverview: {
      ...page.companyOverview,
      image: { ...page.companyOverview.image, src: aboutAssets.facility },
      features: mergeIndexed(
        page.companyOverview.features,
        aboutCompanyOverviewFeatures,
      ),
      stats: mergeIndexed(page.companyOverview.stats, aboutCompanyOverviewStats),
    },
    engineeringManufacturing: {
      ...page.engineeringManufacturing,
      capabilities: mergeIndexed(
        page.engineeringManufacturing.capabilities,
        aboutCapabilitiesStructure,
      ).map((capability, index) => ({
        ...capability,
        image: {
          ...capability.image,
          src: aboutAssets.capabilities[index] ?? aboutAssets.capabilities[0],
        },
      })),
      cta: {
        ...page.engineeringManufacturing.cta,
        ctaPrimary: localizeLinkItem(
          page.engineeringManufacturing.cta.ctaPrimary,
          locale,
        ),
        ctaSecondary: localizeLinkItem(
          page.engineeringManufacturing.cta.ctaSecondary,
          locale,
        ),
      },
    },
  };
}
