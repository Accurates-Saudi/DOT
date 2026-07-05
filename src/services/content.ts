import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type {
  AboutPageContent,
  CatalogsPageContent,
  CareerJobDetail,
  CareersPageContent,
  ContactPageContent,
  FooterContent,
  HomePageContent,
  NavItem,
  NewsArticleDetail,
  NewsArticlePreview,
  NotFoundPageContent,
  NewsDetailCtaContent,
  NewsPageContent,
  PageMeta,
  ProductDetailContent,
  ProductItem,
  ProductsPageContent,
  TrustedPartnersSectionContent,
} from "@/types";
import type { CookieCategoryDefinition } from "@/types/cookie-consent";
import { resolveCmsSource } from "@/utils/cms-content";

import {
  aboutContentSource,
  catalogsContentSource,
  contactContentSource,
  cookieContentSource,
  footerContentSource,
  homeContentSource,
  navigationContentSource,
  navigationUiContentSource,
  newsArticlesContentSource,
  newsPageContentSource,
  careersPageContentSource,
  careerJobsContentSource,
  notFoundContentSource,
  productDetailsContentSource,
  productsPageContentSource,
  servicesContentSource,
  siteContentSource,
  trustedPartnersContentSource,
} from "@/content";

type NewsPageWithDetailCta = NewsPageContent & {
  detailCta: NewsDetailCtaContent;
};

type ServicesPageContent = {
  meta: PageMeta;
  hero: {
    breadcrumbs: Array<{ label: string; href?: string }>;
    title: string;
    introduction: string;
    backgroundImage: {
      src: string;
      alt: string;
      objectPosition?: string;
      mobileObjectPosition?: string;
      width?: number;
      height?: number;
    };
  };
};

function resolveSource<T>(source: unknown, locale: Locale): T {
  return resolveCmsSource(source as never, locale) as T;
}

function resolveProductDetails(locale: Locale): ProductDetailContent[] {
  return resolveSource<ProductDetailContent[]>(productDetailsContentSource, locale);
}

function resolveNewsDetails(locale: Locale): NewsArticleDetail[] {
  return resolveSource<NewsArticleDetail[]>(newsArticlesContentSource, locale);
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

export function buildMainNavigation(
  _messages: TranslationMessages,
  locale: Locale,
): NavItem[] {
  return resolveSource<NavItem[]>(navigationContentSource, locale);
}

export function buildNavigationUi(locale: Locale) {
  return resolveSource<{
    items: Array<{ label: string; href: string }>;
    login: string;
    linkedIn: string;
    openMenu: string;
    closeMenu: string;
    mobileMenuTitle: string;
    mainAria: string;
    mobileAria: string;
    homeAria: string;
    linkedInAria: string;
  }>(navigationUiContentSource, locale);
}

export function buildFooter(
  _messages: TranslationMessages,
  locale: Locale,
): FooterContent {
  return resolveSource<FooterContent>(footerContentSource, locale);
}

export function buildHomeContent(
  _messages: TranslationMessages,
  locale: Locale,
): HomePageContent {
  return resolveSource<HomePageContent>(homeContentSource, locale);
}

export function buildAboutContent(
  _messages: TranslationMessages,
  locale: Locale,
): AboutPageContent {
  return resolveSource<AboutPageContent>(aboutContentSource, locale);
}

export function buildProductsContent(
  _messages: TranslationMessages,
  locale: Locale,
): ProductsPageContent {
  return resolveSource<ProductsPageContent>(productsPageContentSource, locale);
}

export function buildContactContent(
  _messages: TranslationMessages,
  locale: Locale,
): ContactPageContent {
  return resolveSource<ContactPageContent>(contactContentSource, locale);
}

export function buildCatalogsContent(
  _messages: TranslationMessages,
  locale: Locale,
): CatalogsPageContent {
  return resolveSource<CatalogsPageContent>(catalogsContentSource, locale);
}

export function buildNewsContent(
  _messages: TranslationMessages,
  locale: Locale,
): NewsPageWithDetailCta {
  return resolveSource<NewsPageWithDetailCta>(newsPageContentSource, locale);
}

export function buildCareersContent(
  _messages: TranslationMessages,
  locale: Locale,
): CareersPageContent {
  return resolveSource<CareersPageContent>(careersPageContentSource, locale);
}

function resolveCareerJobs(locale: Locale): CareerJobDetail[] {
  return resolveSource<CareerJobDetail[]>(careerJobsContentSource, locale);
}

export function getLocalizedCareerJobs(
  _messages: TranslationMessages,
  locale: Locale,
): CareerJobDetail[] {
  return resolveCareerJobs(locale);
}

export function getLocalizedCareerJobBySlug(
  _messages: TranslationMessages,
  locale: Locale,
  slug: string,
): CareerJobDetail | undefined {
  return resolveCareerJobs(locale).find((job) => job.slug === slug);
}

export function buildNotFoundContent(
  _messages: TranslationMessages,
  locale: Locale,
): NotFoundPageContent {
  return resolveSource<NotFoundPageContent>(notFoundContentSource, locale);
}

export function buildTrustedPartners(
  _messages: TranslationMessages,
  locale: Locale,
): TrustedPartnersSectionContent {
  return resolveSource<TrustedPartnersSectionContent>(
    trustedPartnersContentSource,
    locale,
  );
}

export function buildServicesMeta(
  _messages: TranslationMessages,
  locale: Locale,
): PageMeta {
  return resolveSource<ServicesPageContent>(servicesContentSource, locale).meta;
}

export function buildServicesPageContent(locale: Locale): ServicesPageContent {
  return resolveSource<ServicesPageContent>(servicesContentSource, locale);
}

export function buildCookieConsentCopy(
  _messages: TranslationMessages,
  locale: Locale,
) {
  return resolveSource<{
    banner: Record<string, string>;
    modal: Record<string, string>;
    categories: CookieCategoryDefinition[];
    regionAria: string;
  }>(cookieContentSource, locale);
}

export function buildSiteCopy(locale: Locale) {
  return resolveSource<{
    companyName: string;
    legalName: string;
    tagline: string;
    description: string;
  }>(siteContentSource, locale);
}

export function buildLocalizedProductCatalog(
  _messages: TranslationMessages,
  locale: Locale,
) {
  const productDetails = resolveProductDetails(locale);

  return {
    productDetails,
    productDetailsBySlug: Object.fromEntries(
      productDetails.map((product) => [product.slug, product]),
    ) as Record<string, ProductDetailContent>,
  };
}

export function buildLocalizedProductItems(
  _messages: TranslationMessages,
  locale: Locale,
): ProductItem[] {
  return resolveProductDetails(locale).map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.hero.name,
    description: product.listingTeaser ?? product.hero.introduction,
    category: product.category,
    image: product.hero.image,
    ...(product.listingOrder !== undefined
      ? { listingOrder: product.listingOrder }
      : {}),
  }));
}

export function getLocalizedProductBySlug(
  _messages: TranslationMessages,
  locale: Locale,
  slug: string,
): ProductDetailContent | undefined {
  return resolveProductDetails(locale).find((product) => product.slug === slug);
}

export function getLocalizedRelatedProducts(
  _messages: TranslationMessages,
  locale: Locale,
  slug: string,
  limit = 3,
): ProductItem[] {
  const current = getLocalizedProductBySlug({} as TranslationMessages, locale, slug);

  if (!current) {
    return [];
  }

  return resolveProductDetails(locale)
    .filter(
      (product) =>
        product.slug !== slug && product.category === current.category,
    )
    .slice(0, limit)
    .map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.hero.name,
      description: product.listingTeaser ?? product.hero.introduction,
      category: product.category,
      image: product.hero.image,
      ...(product.listingOrder !== undefined
        ? { listingOrder: product.listingOrder }
        : {}),
    }));
}

export function getLocalizedNewsArticles(
  _messages: TranslationMessages,
  locale: Locale,
): NewsArticlePreview[] {
  return resolveNewsDetails(locale).map(toPreview);
}

export function getLocalizedNewsBySlug(
  _messages: TranslationMessages,
  locale: Locale,
  slug: string,
): NewsArticleDetail | undefined {
  return resolveNewsDetails(locale).find((article) => article.slug === slug);
}

export function getLocalizedFeaturedNews(
  _messages: TranslationMessages,
  locale: Locale,
): NewsArticlePreview {
  return getLocalizedNewsArticles({} as TranslationMessages, locale)[0];
}

export function getLocalizedNewsExcludingFeatured(
  _messages: TranslationMessages,
  locale: Locale,
): NewsArticlePreview[] {
  const [, ...rest] = getLocalizedNewsArticles({} as TranslationMessages, locale);
  return rest;
}

export function getLocalizedRelatedNews(
  _messages: TranslationMessages,
  locale: Locale,
  slug: string,
  limit = 3,
): NewsArticlePreview[] {
  const current = getLocalizedNewsBySlug({} as TranslationMessages, locale, slug);

  if (!current) {
    return [];
  }

  const others = getLocalizedNewsArticles({} as TranslationMessages, locale).filter(
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
