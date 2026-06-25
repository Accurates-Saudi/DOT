import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type { HomePageContent } from "@/types";

import { dotMapLocation } from "@/data/map";

import { homeAssets } from "../assets/home";
import {
  homeAboutMedia,
  homeAboutServiceIcons,
  homeCertificateIds,
  homeCompanyStatisticsStructure,
  homeEngineeringStepIcons,
  homeServiceItemsStructure,
  homeStatisticsObjectPosition,
  homeTimingDefaults,
} from "../defaults/home-structure";
import { getMessagesSection, localizeLinkItem } from "../helpers";
import { buildLocalizedProductItems } from "../products";
import { buildNewsPreviews } from "../news";
import { buildTrustedPartnersContent } from "./trusted-partners";

type HomeMessages = HomePageContent;

export function buildHomePageContent(
  messages: TranslationMessages,
  locale: Locale,
): HomePageContent {
  const pages = getMessagesSection<{ home: HomeMessages }>(messages, "pages");
  const page = pages.home;
  const productItems = buildLocalizedProductItems(messages, locale).slice(0, 8);
  const newsArticles = buildNewsPreviews(messages, locale);

  return {
    meta: page.meta,
    hero: {
      intervalMs: page.hero.intervalMs ?? homeTimingDefaults.heroIntervalMs,
      slides: page.hero.slides.map((slide, index) => ({
        ...slide,
        ctaPrimary: localizeLinkItem(slide.ctaPrimary, locale),
        ...(slide.ctaSecondary
          ? { ctaSecondary: localizeLinkItem(slide.ctaSecondary, locale) }
          : {}),
        background: {
          ...slide.background,
          src: homeAssets.hero[index] ?? homeAssets.hero[0],
        },
      })),
    },
    about: {
      ...page.about,
      ctaPrimary: localizeLinkItem(page.about.ctaPrimary, locale),
      ...(page.about.ctaVideo
        ? { ctaVideo: localizeLinkItem(page.about.ctaVideo, locale) }
        : {}),
      servicesBanner: page.about.servicesBanner
        ? {
            ...page.about.servicesBanner,
            items: page.about.servicesBanner.items.map((item, index) => ({
              ...item,
              ...homeAboutServiceIcons[index],
            })),
            thumbnail: page.about.servicesBanner.thumbnail
              ? {
                  ...page.about.servicesBanner.thumbnail,
                  src: homeAssets.aboutPhoto,
                }
              : undefined,
          }
        : undefined,
      media: {
        ...homeAboutMedia,
        ...page.about.media,
      },
    },
    services: {
      ...page.services,
      ctaPrimary: localizeLinkItem(page.services.ctaPrimary, locale),
      items: page.services.items.map((item, index) => ({
        ...item,
        ...homeServiceItemsStructure[index],
        ...(item.href
          ? {
              href: localizeLinkItem(
                { label: item.title, href: item.href },
                locale,
              ).href,
            }
          : {}),
      })),
    },
    companyStatistics: {
      ...page.companyStatistics,
      backgroundImage: {
        ...page.companyStatistics.backgroundImage,
        src: homeAssets.statisticsBg,
        objectPosition: homeStatisticsObjectPosition,
      },
      items: page.companyStatistics.items.map((item, index) => ({
        ...item,
        ...homeCompanyStatisticsStructure[index],
      })),
    },
    whyChooseUs: {
      ...page.whyChooseUs,
      featuredImage: {
        ...page.whyChooseUs.featuredImage,
        src: homeAssets.whyChooseFeatured,
      },
      ctaPanel: {
        ...page.whyChooseUs.ctaPanel,
        ctaPrimary: localizeLinkItem(page.whyChooseUs.ctaPanel.ctaPrimary, locale),
        ctaSecondary: localizeLinkItem(page.whyChooseUs.ctaPanel.ctaSecondary, locale),
      },
      mission: {
        ...page.whyChooseUs.mission,
        backgroundImage: page.whyChooseUs.mission.backgroundImage
          ? {
              ...page.whyChooseUs.mission.backgroundImage,
              src: homeAssets.whyChooseMissionBg,
            }
          : undefined,
      },
      vision: {
        ...page.whyChooseUs.vision,
        backgroundImage: page.whyChooseUs.vision.backgroundImage
          ? {
              ...page.whyChooseUs.vision.backgroundImage,
              src: homeAssets.whyChooseVisionBg,
            }
          : undefined,
      },
    },
    engineering: {
      ...page.engineering,
      bullets: page.engineering.bullets ?? [],
      steps: page.engineering.steps.map((step, index) => ({
        ...step,
        ...homeEngineeringStepIcons[index],
      })),
      backgroundImage: page.engineering.backgroundImage
        ? {
            ...page.engineering.backgroundImage,
            src: homeAssets.engineeringBg,
          }
        : undefined,
    },
    featuredProducts: {
      ...page.featuredProducts,
      autoplayDelayMs:
        page.featuredProducts.autoplayDelayMs ??
        homeTimingDefaults.featuredProductsAutoplayDelayMs,
      transitionMs:
        page.featuredProducts.transitionMs ??
        homeTimingDefaults.featuredProductsTransitionMs,
      exploreAll: localizeLinkItem(page.featuredProducts.exploreAll, locale),
      items: productItems,
    },
    certificates: {
      ...page.certificates,
      autoplayDelayMs:
        page.certificates.autoplayDelayMs ??
        homeTimingDefaults.certificatesAutoplayDelayMs,
      transitionMs:
        page.certificates.transitionMs ??
        homeTimingDefaults.certificatesTransitionMs,
      items: page.certificates.items.map((item, index) => ({
        ...item,
        ...homeCertificateIds[index],
        image: {
          ...item.image,
          src: homeAssets.certificates[index] ?? homeAssets.certificates[0],
        },
      })),
    },
    news: {
      ...page.news,
      viewAll: localizeLinkItem(page.news.viewAll, locale),
      headerImage: page.news.headerImage
        ? { ...page.news.headerImage, src: homeAssets.newsHeader }
        : undefined,
      articles: newsArticles,
      locationMap: page.news.locationMap
        ? {
            ...dotMapLocation,
            ...page.news.locationMap,
            address:
              page.news.locationMap.address ?? dotMapLocation.address,
          }
        : undefined,
    },
    trustedPartners: buildTrustedPartnersContent(messages),
  };
}
