import type { Locale } from "@/i18n/config";
import { createProductDetail } from "@/data/products/factory";
import { productRecords } from "@/data/products/registry";
import { buildHomeContent } from "@/i18n/content";
import { buildCatalogsPageContent } from "@/i18n/content/pages/catalogs";
import { getLocalizedNewsArticles, getLocalizedNewsBySlug } from "@/i18n/content/news";
import {
  getLocalizedCareerJobs,
  getLocalizedCareerJobBySlug,
} from "@/i18n/content/careers";
import { getLocalizedProductBySlug } from "@/i18n/content/products";
import { localeContentMessages } from "@/content/shared";
import type {
  CatalogItem,
  CertificateItem,
  CareerJobDetail,
  NewsArticleDetail,
  ProductDetailContent,
} from "@/types";
import type { CMSContentType as CMSContentTypeDto } from "@/types";
import type {
  CmsCatalogPayload,
  CmsCareerPayload,
  CmsCertificatePayload,
  CmsCollectionOrderPayload,
  CmsNewsPayload,
  CmsProductPayload,
} from "@/types/cms-entities";
import {
  CMS_COLLECTION_ORDER_KEYS,
  buildEntityKey,
  parseEntityId,
} from "@/types/cms-entities";
import {
  buildCollectionOrderPayload,
  createEmptyLocalizedPayload,
  getLocalizedPayload,
  parseCollectionOrderPayload,
  sortByCollectionOrder,
} from "@/utils/cms-entities";

import {
  archiveContentEntry,
  getContentEntryByKey,
  getPublicContentPayloadByKey,
  listContentEntries,
  unarchiveContentEntry,
  upsertContentEntry,
} from "./service.server";

function resolveStaticProduct(locale: Locale, slug: string): ProductDetailContent | undefined {
  return getLocalizedProductBySlug(localeContentMessages[locale], locale, slug);
}

function resolveStaticNews(locale: Locale, slug: string): NewsArticleDetail | undefined {
  return getLocalizedNewsBySlug(localeContentMessages[locale], slug);
}

function resolveStaticCareer(locale: Locale, slug: string): CareerJobDetail | undefined {
  return getLocalizedCareerJobBySlug(localeContentMessages[locale], slug);
}

export async function getArchivedEntityKeys(): Promise<Set<string>> {
  const entries = await listContentEntries({ status: "archived" });
  return new Set(entries.map((entry) => entry.key));
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
  const archivedKeys = await getArchivedEntityKeys();

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

  const keyed = [...merged, ...cmsOnly]
    .filter((product) => !archivedKeys.has(buildEntityKey("product", product.slug)))
    .map((product) => ({
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
  const archivedKeys = await getArchivedEntityKeys();
  if (archivedKeys.has(key)) return undefined;

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
    .map((preview) => resolveStaticNews(locale, preview.slug))
    .filter((article): article is NewsArticleDetail => Boolean(article));

  const cmsEntries = await listPublishedEntityPayloads<CmsNewsPayload>("news");
  const order = await getCollectionOrder(CMS_COLLECTION_ORDER_KEYS.news);
  const archivedKeys = await getArchivedEntityKeys();
  const cmsBySlug = new Map<string, NewsArticleDetail>();

  for (const entry of cmsEntries) {
    const localized = getLocalizedPayload<NewsArticleDetail>(entry.payload, locale);
    if (localized) cmsBySlug.set(localized.slug, localized);
  }

  const merged = staticArticles.map((article) => cmsBySlug.get(article.slug) ?? article);
  const staticSlugs = new Set(staticArticles.map((article) => article.slug));
  const cmsOnly = [...cmsBySlug.values()].filter((article) => !staticSlugs.has(article.slug));

  const keyed = [...merged, ...cmsOnly]
    .filter((article) => !archivedKeys.has(buildEntityKey("news", article.slug)))
    .map((article) => ({
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
  const archivedKeys = await getArchivedEntityKeys();
  if (archivedKeys.has(key)) return undefined;

  const cmsPayload = await getPublicContentPayloadByKey(key);

  if (cmsPayload) {
    const localized = getLocalizedPayload<NewsArticleDetail>(cmsPayload, locale);
    if (localized) return localized;
  }

  return resolveStaticNews(locale, slug);
}

export async function getPublishedCareerJobs(
  locale: Locale,
): Promise<CareerJobDetail[]> {
  const messages = localeContentMessages[locale];
  const staticJobs = getLocalizedCareerJobs(messages, locale);
  const cmsEntries = await listPublishedEntityPayloads<CmsCareerPayload>("page", "career.");
  const order = await getCollectionOrder(CMS_COLLECTION_ORDER_KEYS.career);
  const archivedKeys = await getArchivedEntityKeys();
  const cmsBySlug = new Map<string, CareerJobDetail>();

  for (const entry of cmsEntries) {
    const localized = getLocalizedPayload<CareerJobDetail>(entry.payload, locale);
    if (localized) cmsBySlug.set(localized.slug, localized);
  }

  const merged = staticJobs.map((job) => cmsBySlug.get(job.slug) ?? job);
  const staticSlugs = new Set(staticJobs.map((job) => job.slug));
  const cmsOnly = [...cmsBySlug.values()].filter((job) => !staticSlugs.has(job.slug));

  const keyed = [...merged, ...cmsOnly]
    .filter((job) => !archivedKeys.has(buildEntityKey("career", job.slug)))
    .map((job) => ({
      key: buildEntityKey("career", job.slug),
      job,
    }));

  return sortByCollectionOrder(keyed, order).map((item) => item.job);
}

export async function getPublishedCareerJobBySlug(
  locale: Locale,
  slug: string,
): Promise<CareerJobDetail | undefined> {
  const key = buildEntityKey("career", slug);
  const archivedKeys = await getArchivedEntityKeys();
  if (archivedKeys.has(key)) return undefined;

  const cmsPayload = await getPublicContentPayloadByKey(key);

  if (cmsPayload) {
    const localized = getLocalizedPayload<CareerJobDetail>(cmsPayload, locale);
    if (localized) return localized;
  }

  return resolveStaticCareer(locale, slug);
}

export async function getPublishedCertificates(
  locale: Locale,
): Promise<CertificateItem[]> {
  const staticItems = buildHomeContent(localeContentMessages[locale], locale).certificates
    .items;
  const cmsEntries = await listPublishedEntityPayloads<CmsCertificatePayload>("certificate");
  const order = await getCollectionOrder(CMS_COLLECTION_ORDER_KEYS.certificate);
  const archivedKeys = await getArchivedEntityKeys();

  const cmsById = new Map<string, CertificateItem>();
  for (const entry of cmsEntries) {
    const localized = getLocalizedPayload<CertificateItem>(entry.payload, locale);
    if (localized) cmsById.set(localized.id, localized);
  }

  const merged = staticItems.map((item) => cmsById.get(item.id) ?? item);
  const staticIds = new Set(staticItems.map((item) => item.id));
  const cmsOnly = [...cmsById.values()].filter((item) => !staticIds.has(item.id));

  const keyed = [...merged, ...cmsOnly]
    .filter((item) => !archivedKeys.has(buildEntityKey("certificate", item.id)))
    .map((item) => ({
      key: buildEntityKey("certificate", item.id),
      item,
    }));

  return sortByCollectionOrder(keyed, order).map((entry) => entry.item);
}

export async function getPublishedCatalogItems(locale: Locale): Promise<CatalogItem[]> {
  const staticItems = buildCatalogsPageContent(localeContentMessages[locale], locale).library.items;
  const cmsEntries = await listPublishedEntityPayloads<CmsCatalogPayload>("page", "catalog.");
  const order = await getCollectionOrder(CMS_COLLECTION_ORDER_KEYS.catalog);
  const archivedKeys = await getArchivedEntityKeys();

  const cmsById = new Map<string, CatalogItem>();
  for (const entry of cmsEntries) {
    const localized = getLocalizedPayload<CatalogItem>(entry.payload, locale);
    if (localized) cmsById.set(localized.id, localized);
  }

  const merged = staticItems.map((item) => cmsById.get(item.id) ?? item);
  const staticIds = new Set(staticItems.map((item) => item.id));
  const cmsOnly = [...cmsById.values()].filter((item) => !staticIds.has(item.id));

  const keyed = [...merged, ...cmsOnly]
    .filter((item) => !archivedKeys.has(buildEntityKey("catalog", item.id)))
    .map((item) => ({
      key: buildEntityKey("catalog", item.id),
      item,
    }));

  return sortByCollectionOrder(keyed, order).map((entry) => entry.item);
}

export async function archiveEntityContent(input: {
  key: string;
  type: CMSContentTypeDto;
  actorId: string;
  slug?: string;
  payload?: unknown;
}): Promise<void> {
  try {
    await getContentEntryByKey(input.key);
    await archiveContentEntry({ key: input.key, actorId: input.actorId });
    return;
  } catch {
    if (!input.payload) {
      throw new Error(`Cannot archive "${input.key}" without existing CMS content.`);
    }

    await upsertContentEntry({
      key: input.key,
      type: input.type,
      payload: input.payload,
      actorId: input.actorId,
      ...(input.slug ? { slug: input.slug } : {}),
      publish: false,
      changeSummary: "Archived website content",
    });
    await archiveContentEntry({ key: input.key, actorId: input.actorId });
  }
}

export async function unarchiveEntityContent(input: {
  key: string;
  actorId: string;
}): Promise<void> {
  const detail = await unarchiveContentEntry(input);

  if (detail.publishedVersion || !detail.entry.currentVersion?.payload) {
    return;
  }

  await upsertContentEntry({
    key: input.key,
    type: detail.entry.type,
    payload: detail.entry.currentVersion.payload,
    actorId: input.actorId,
    ...(detail.entry.slug ? { slug: detail.entry.slug } : {}),
    publish: true,
    changeSummary: "Restored archived content to the website",
  });
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

import {
  createDefaultCatalogPayload,
  createDefaultCertificatePayload,
  createDefaultNewsPayload,
  createDefaultProductPayload,
} from "@/utils/cms-entity-defaults";

export {
  createDefaultCatalogPayload,
  createDefaultCertificatePayload,
  createDefaultNewsPayload,
  createDefaultProductPayload,
};

export async function getStaticProductPayload(slug: string): Promise<CmsProductPayload | null> {
  const en = resolveStaticProduct("en", slug);
  const ar = resolveStaticProduct("ar", slug);
  if (!en || !ar) return null;

  return createEmptyLocalizedPayload(en, ar, en.listingOrder ?? 0);
}

export async function getStaticNewsPayload(slug: string): Promise<CmsNewsPayload | null> {
  const en = resolveStaticNews("en", slug);
  const ar = resolveStaticNews("ar", slug);
  if (!en || !ar) return null;
  return createEmptyLocalizedPayload(en, ar, 0);
}

export async function getStaticCertificatePayload(
  id: string,
): Promise<CmsCertificatePayload | null> {
  const en = buildHomeContent(localeContentMessages.en, "en").certificates.items.find(
    (item) => item.id === id,
  );
  const ar = buildHomeContent(localeContentMessages.ar, "ar").certificates.items.find(
    (item) => item.id === id,
  );
  if (!en || !ar) return null;

  return createEmptyLocalizedPayload(
    { id: en.id, ...(en.title ? { title: en.title } : {}), image: en.image },
    { id: ar.id, ...(ar.title ? { title: ar.title } : {}), image: ar.image },
    0,
  );
}

export async function getStaticCatalogPayload(id: string): Promise<CmsCatalogPayload | null> {
  const en = buildCatalogsPageContent(localeContentMessages.en, "en").library.items.find(
    (item) => item.id === id,
  );
  const ar = buildCatalogsPageContent(localeContentMessages.ar, "ar").library.items.find(
    (item) => item.id === id,
  );
  if (!en || !ar) return null;

  return createEmptyLocalizedPayload(en, ar, 0);
}

export async function resolveArchivePayload(
  key: string,
  entityType: "product" | "news" | "certificate" | "catalog",
): Promise<{ payload?: unknown; slug?: string }> {
  try {
    await getContentEntryByKey(key);
    return {};
  } catch {
    const id = parseEntityId(entityType, key);
    if (!id) return {};

    switch (entityType) {
      case "product":
        return { payload: await getStaticProductPayload(id), slug: id };
      case "news":
        return { payload: await getStaticNewsPayload(id), slug: id };
      case "certificate":
        return { payload: await getStaticCertificatePayload(id), slug: id };
      case "catalog":
        return { payload: await getStaticCatalogPayload(id), slug: id };
      default:
        return {};
    }
  }
}

export type { CmsCollectionOrderPayload };
