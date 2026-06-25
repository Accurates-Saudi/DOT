import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type {
  AboutPageContent,
  CatalogsPageContent,
  ContactPageContent,
  FooterContent,
  HomePageContent,
  NavItem,
  NewsPageContent,
  NotFoundPageContent,
  PageMeta,
  ProductsPageContent,
  TrustedPartnersSectionContent,
} from "@/types";

import { buildAboutPageContent } from "./pages/about";
import { buildCatalogsPageContent } from "./pages/catalogs";
import { buildContactPageContent } from "./pages/contact";
import { buildFooterContent } from "./pages/footer";
import { buildHomePageContent } from "./pages/home";
import { buildNavigation } from "./pages/navigation";
import { buildNewsPageContent } from "./pages/news";
import { buildNotFoundPageContent } from "./pages/not-found";
import { buildProductsPageContent } from "./pages/products";
import { buildTrustedPartnersContent } from "./pages/trusted-partners";

export function buildMainNavigation(
  messages: TranslationMessages,
  locale: Locale,
): NavItem[] {
  return buildNavigation(messages, locale);
}

export function buildFooter(
  messages: TranslationMessages,
  locale: Locale,
): FooterContent {
  return buildFooterContent(messages, locale);
}

export function buildHomeContent(
  messages: TranslationMessages,
  locale: Locale,
): HomePageContent {
  return buildHomePageContent(messages, locale);
}

export function buildAboutContent(
  messages: TranslationMessages,
  locale: Locale,
): AboutPageContent {
  return buildAboutPageContent(messages, locale);
}

export function buildProductsContent(
  messages: TranslationMessages,
  locale: Locale,
): ProductsPageContent {
  return buildProductsPageContent(messages, locale);
}

export function buildContactContent(
  messages: TranslationMessages,
  locale: Locale,
): ContactPageContent {
  return buildContactPageContent(messages, locale);
}

export function buildCatalogsContent(
  messages: TranslationMessages,
  locale: Locale,
): CatalogsPageContent {
  return buildCatalogsPageContent(messages, locale);
}

export function buildNewsContent(
  messages: TranslationMessages,
  locale: Locale,
) {
  return buildNewsPageContent(messages, locale);
}

export function buildNotFoundContent(
  messages: TranslationMessages,
  locale: Locale,
): NotFoundPageContent {
  return buildNotFoundPageContent(messages, locale);
}

export function buildTrustedPartners(
  messages: TranslationMessages,
): TrustedPartnersSectionContent {
  return buildTrustedPartnersContent(messages);
}

export function buildServicesMeta(messages: TranslationMessages): PageMeta {
  const page = messages.pages as { services?: { meta?: PageMeta } };
  return page.services?.meta ?? { title: "Services", description: "" };
}

export { buildCookieConsentCopy } from "./cookie";
export {
  buildLocalizedProductCatalog,
  getLocalizedProductBySlug,
  getLocalizedRelatedProducts,
} from "./products";
export {
  getLocalizedNewsArticles,
  getLocalizedNewsBySlug,
  getLocalizedFeaturedNews,
  getLocalizedNewsExcludingFeatured,
  getLocalizedRelatedNews,
} from "./news";
