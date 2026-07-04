import type { Locale } from "@/i18n/config";
import { createProductDetail } from "@/data/products/factory";
import { productRecords } from "@/data/products/registry";
import { getLocalizedNewsBySlug, getLocalizedNewsArticles } from "@/i18n/content/news";
import { getLocalizedProductBySlug } from "@/i18n/content/products";
import { localeContentMessages } from "@/content/shared";
import type {
  CatalogItem,
  CertificateItem,
  NewsArticleDetail,
  ProductDetailContent,
} from "@/types";
import type { CMSContentType as CMSContentTypeDto } from "@/types";
import type {
  CmsCatalogPayload,
  CmsCertificatePayload,
  CmsCollectionOrderPayload,
  CmsNewsPayload,
  CmsProductPayload,
} from "@/types/cms-entities";
import {
  CMS_COLLECTION_ORDER_KEYS,
  buildEntityKey,
} from "@/types/cms-entities";
import {
  buildCollectionOrderPayload,
  createEmptyLocalizedPayload,
  getLocalizedPayload,
  parseCollectionOrderPayload,
  sortByCollectionOrder,
} from "@/utils/cms-entities";

import {
  getContentEntryByKey,
  getPublicContentPayloadByKey,
  listContentEntries,
  upsertContentEntry,
} from "./service.server";

function resolveStaticProduct(locale: Locale, slug: string): ProductDetailContent | undefined {
  return getLocalizedProductBySlug(localeContentMessages[locale], locale, slug);
}

function resolveStaticNews(locale: Locale, slug: string): NewsArticleDetail | undefined {
  const messages = localeContentMessages[locale];
  return getLocalizedNewsBySlug(messages, slug);
}

export async function getCollectionOrder(
  orderKey: string,
): Promise<string[]> {
  const payload = await getPublicContentPayloadByKey(orderKey);
  return parseCollectionOrderPayload(payload);
}

export async function saveCollectionOrder(input: {
  orderKey: string;
  orderedKeys: string[];
  actorId: string;
}): Promise<void> {
  await upsertContentEntry({
    key: input.orderKey,
    type: "shared",
    payload: buildCollectionOrderPayload(input.orderedKeys),
    actorId: input.actorId,
    publish: true,
    changeSummary: "Updated collection order",
  });
}

export async function listPublishedEntityPayloads<T>(
  type: CMSContentTypeDto,
  keyPrefix?: string,
): Promise<Array<{ key: string; slug?: string; payload: T }>> {
  const entries = await listContentEntries({
    type,
    status: "published",
    ...(keyPrefix ? { search: keyPrefix } : {}),
  });
  const results: Array<{ key: string; slug?: string; payload: T }> = [];

  for (const entry of entries) {
    if (keyPrefix && !entry.key.startsWith(keyPrefix)) continue;

    const payload = (await getPublicContentPayloadByKey(entry.key)) as T | null;
    if (!payload) continue;

    results.push({
      key: entry.key,
      ...(entry.slug ? { slug: entry.slug } : {}),
      payload,
    });
  }

  return results;
}

export async function getPublishedProductDetails(
  locale: Locale,
): Promise<ProductDetailContent[]> {
  const staticProducts = productRecords.map((record) => createProductDetail(record));
  const cmsEntries = await listPublishedEntityPayloads<CmsProductPayload>("product");
  const order = await getCollectionOrder(CMS_COLLECTION_ORDER_KEYS.product);

  const cmsBySlug = new Map<string, ProductDetailContent>();

  for (const entry of cmsEntries) {
    const localized = getLocalizedPayload<ProductDetailContent>(entry.payload, locale);
    if (localized) {
      cmsBySlug.set(localized.slug, localized);
    }
  }

  const merged = staticProducts.map((product) => cmsBySlug.get(product.slug) ?? product);
  const staticSlugs = new Set(staticProducts.map((product) => product.slug));
  const cmsOnly = [...cmsBySlug.values()].filter((product) => !staticSlugs.has(product.slug));

  const keyed = [...merged, ...cmsOnly].map((product) => ({
    key: buildEntityKey("product", product.slug),
    product,
    listingOrder: product.listingOrder,
  }));

  const sorted = sortByCollectionOrder(keyed, order);

  return sorted.map((item) => item.product);
}

export async function getPublishedProductBySlug(
  locale: Locale,
  slug: string,
): Promise<ProductDetailContent | undefined> {
  const key = buildEntityKey("product", slug);
  const cmsPayload = await getPublicContentPayloadByKey(key);

  if (cmsPayload) {
    const localized = getLocalizedPayload<ProductDetailContent>(cmsPayload, locale);
    if (localized) return localized;
  }

  return resolveStaticProduct(locale, slug);
}

export async function getPublishedNewsArticles(
  locale: Locale,
): Promise<NewsArticleDetail[]> {
  const messages = localeContentMessages[locale];
  const staticArticles = getLocalizedNewsArticles(messages)
    .map((preview) => getLocalizedNewsBySlug(messages, preview.slug))
    .filter((article): article is NewsArticleDetail => Boolean(article));

  const cmsEntries = await listPublishedEntityPayloads<CmsNewsPayload>("news");
  const order = await getCollectionOrder(CMS_COLLECTION_ORDER_KEYS.news);
  const cmsBySlug = new Map<string, NewsArticleDetail>();

  for (const entry of cmsEntries) {
    const localized = getLocalizedPayload<NewsArticleDetail>(entry.payload, locale);
    if (localized) cmsBySlug.set(localized.slug, localized);
  }

  const merged = staticArticles.map((article) => cmsBySlug.get(article.slug) ?? article);
  const staticSlugs = new Set(staticArticles.map((article) => article.slug));
  const cmsOnly = [...cmsBySlug.values()].filter((article) => !staticSlugs.has(article.slug));

  const keyed = [...merged, ...cmsOnly].map((article) => ({
    key: buildEntityKey("news", article.slug),
    article,
  }));

  return sortByCollectionOrder(keyed, order).map((item) => item.article);
}

export async function getPublishedNewsBySlug(
  locale: Locale,
  slug: string,
): Promise<NewsArticleDetail | undefined> {
  const key = buildEntityKey("news", slug);
  const cmsPayload = await getPublicContentPayloadByKey(key);

  if (cmsPayload) {
    const localized = getLocalizedPayload<NewsArticleDetail>(cmsPayload, locale);
    if (localized) return localized;
  }

  return resolveStaticNews(locale, slug);
}

export async function getPublishedCertificates(
  locale: Locale,
): Promise<Array<CertificateItem & { description?: string }>> {
  const cmsEntries = await listPublishedEntityPayloads<CmsCertificatePayload>("certificate");
  const order = await getCollectionOrder(CMS_COLLECTION_ORDER_KEYS.certificate);

  const items = cmsEntries
    .map((entry) => getLocalizedPayload<CmsCertificatePayload["locales"]["en"]>(
      entry.payload,
      locale,
    ))
    .filter((item): item is CertificateItem & { description?: string } => Boolean(item));

  const keyed = cmsEntries.map((entry, index) => ({
    key: entry.key,
    item: items[index],
  })).filter((entry): entry is { key: string; item: CertificateItem & { description?: string } } =>
    Boolean(entry.item),
  );

  return sortByCollectionOrder(keyed, order).map((entry) => entry.item);
}

export async function getPublishedCatalogItems(locale: Locale): Promise<CatalogItem[]> {
  const { buildCatalogsPageContent } = await import("@/i18n/content/pages/catalogs");
  const staticItems = buildCatalogsPageContent(localeContentMessages[locale], locale).library.items;
  const cmsEntries = await listPublishedEntityPayloads<CmsCatalogPayload>("page", "catalog.");
  const order = await getCollectionOrder(CMS_COLLECTION_ORDER_KEYS.catalog);

  const cmsItems = cmsEntries
    .map((entry) => getLocalizedPayload<CatalogItem>(entry.payload, locale))
    .filter((item): item is CatalogItem => Boolean(item));

  if (cmsItems.length === 0) {
    return staticItems;
  }

  const cmsById = new Map(cmsItems.map((item) => [item.id, item]));
  const merged = staticItems.map((item) => cmsById.get(item.id) ?? item);
  const staticIds = new Set(staticItems.map((item) => item.id));
  const cmsOnly = cmsItems.filter((item) => !staticIds.has(item.id));

  const keyed = [...merged, ...cmsOnly].map((item) => ({
    key: buildEntityKey("catalog", item.id),
    item,
  }));

  return sortByCollectionOrder(keyed, order).map((entry) => entry.item);
}

export async function getDraftEntityPayload(key: string): Promise<unknown | null> {
  try {
    const detail = await getContentEntryByKey(key);
    return detail.entry.currentVersion?.payload ?? detail.publishedVersion?.payload ?? null;
  } catch {
    return null;
  }
}

export async function duplicateContentEntry(input: {
  sourceKey: string;
  targetKey: string;
  actorId: string;
  slug?: string;
}): Promise<void> {
  const source = await getContentEntryByKey(input.sourceKey);
  const payload =
    source.entry.currentVersion?.payload ?? source.publishedVersion?.payload;

  if (!payload) {
    throw new Error("Cannot duplicate an entry without content.");
  }

  await upsertContentEntry({
    key: input.targetKey,
    type: source.entry.type,
    payload,
    actorId: input.actorId,
    ...(input.slug ? { slug: input.slug } : {}),
    publish: false,
    changeSummary: `Duplicated from ${input.sourceKey}`,
  });
}

export function createDefaultProductPayload(
  slug: string,
  locale: Locale,
): CmsProductPayload {
  const emptyProduct: ProductDetailContent = {
    id: slug,
    slug,
    category: "Products",
    meta: { title: "", description: "" },
    hero: {
      breadcrumbs: [],
      category: "",
      name: "",
      introduction: "",
      image: { src: "", alt: "" },
      ctaContact: { label: "Contact Us", href: "/contact" },
    },
    overview: { heading: "Overview", paragraphs: [] },
    info: {
      applications: { title: "Applications", items: [] },
      features: { title: "Features", items: [] },
      benefits: { title: "Benefits", items: [] },
    },
    contactCta: {
      heading: "Need Technical Assistance?",
      body: "Our engineering team is ready to help you find the right solution for your well completion requirements.",
      ctaPrimary: { label: "Contact Us", href: "/contact" },
    },
  };

  return createEmptyLocalizedPayload(emptyProduct, emptyProduct, 0);
}

export function createDefaultNewsPayload(slug: string): CmsNewsPayload {
  const emptyArticle: NewsArticleDetail = {
    id: slug,
    slug,
    title: "",
    excerpt: "",
    category: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    image: { src: "", alt: "" },
    content: [],
    meta: { title: "", description: "" },
  };

  return createEmptyLocalizedPayload(emptyArticle, emptyArticle, 0);
}

export function createDefaultCertificatePayload(id: string): CmsCertificatePayload {
  const emptyItem = {
    id,
    title: "",
    image: { src: "", alt: "" },
  };

  return createEmptyLocalizedPayload(emptyItem, emptyItem, 0);
}

export function createDefaultCatalogPayload(id: string): CmsCatalogPayload {
  const emptyItem: CmsCatalogPayload["locales"]["en"] = {
    id,
    title: "",
    description: "",
    cover: { src: "", alt: "" },
    category: "",
  };

  return createEmptyLocalizedPayload(emptyItem, emptyItem, 0);
}

export async function getStaticProductPayload(slug: string): Promise<CmsProductPayload | null> {
  const en = getLocalizedProductBySlug(localeContentMessages.en, "en", slug);
  const ar = getLocalizedProductBySlug(localeContentMessages.ar, "ar", slug);
  if (!en || !ar) return null;

  return createEmptyLocalizedPayload(en, ar, en.listingOrder ?? 0);
}

export async function getStaticNewsPayload(slug: string): Promise<CmsNewsPayload | null> {
  const en = getLocalizedNewsBySlug(localeContentMessages.en, slug);
  const ar = getLocalizedNewsBySlug(localeContentMessages.ar, slug);
  if (!en || !ar) return null;
  return createEmptyLocalizedPayload(en, ar, 0);
}

export type { CmsCollectionOrderPayload };
