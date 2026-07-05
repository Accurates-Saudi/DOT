import { createProductDetail } from "@/data/products/factory";
import { productRecords } from "@/data/products/registry";
import { localeContentMessages } from "@/content/shared";
import { defaultLocale, type Locale } from "@/i18n/config";
import { buildHomeContent } from "@/i18n/content";
import { buildCatalogsPageContent } from "@/i18n/content/pages/catalogs";
import { getLocalizedCareerJobs } from "@/i18n/content/careers";
import { getLocalizedNewsArticles, getLocalizedNewsBySlug } from "@/i18n/content/news";
import {
  CMS_COLLECTION_ORDER_KEYS,
  buildEntityKey,
  parseEntityId,
} from "@/types/cms-entities";
import type { AdminCollectionRowMeta } from "@/utils/cms-entities";
import {
  extractCareerRowMeta,
  extractCatalogRowMeta,
  extractCertificateRowMeta,
  extractNewsRowMeta,
  extractProductRowMeta,
  sortByCollectionOrder,
} from "@/utils/cms-entities";

import { getCollectionOrder } from "./entity-content.server";
import { listContentEntries } from "./service.server";

export async function buildAdminProductRows(
  locale: Locale = defaultLocale,
  search = "",
): Promise<AdminCollectionRowMeta[]> {
  const [cmsRecords, order] = await Promise.all([
    listContentEntries({
      type: "product",
      ...(search ? { search } : {}),
    }),
    getCollectionOrder(CMS_COLLECTION_ORDER_KEYS.product),
  ]);

  const cmsByKey = new Map(cmsRecords.map((record) => [record.key, record]));
  const rows: AdminCollectionRowMeta[] = [];

  for (const record of productRecords) {
    const key = buildEntityKey("product", record.slug);
    const cms = cmsByKey.get(key);

    if (cms) {
      rows.push(extractProductRowMeta(cms, locale));
      continue;
    }

    const product = createProductDetail(record);
    rows.push({
      key,
      title: product.hero.name,
      subtitle: `/${product.slug}`,
      thumbnail: product.hero.image.src,
      status: "static",
      slug: product.slug,
      listingOrder: product.listingOrder,
      href: `/${locale}/products/${product.slug}`,
    });
  }

  for (const cms of cmsRecords) {
    const id = parseEntityId("product", cms.key);
    if (!id || productRecords.some((record) => record.slug === id)) continue;
    rows.push(extractProductRowMeta(cms, locale));
  }

  return sortByCollectionOrder(rows, order);
}

export async function buildAdminNewsRows(
  locale: Locale = defaultLocale,
  search = "",
): Promise<AdminCollectionRowMeta[]> {
  const [cmsRecords, order] = await Promise.all([
    listContentEntries({
      type: "news",
      ...(search ? { search } : {}),
    }),
    getCollectionOrder(CMS_COLLECTION_ORDER_KEYS.news),
  ]);

  const cmsByKey = new Map(cmsRecords.map((record) => [record.key, record]));
  const staticArticles = getLocalizedNewsArticles(localeContentMessages[locale]);
  const rows: AdminCollectionRowMeta[] = [];

  for (const preview of staticArticles) {
    const key = buildEntityKey("news", preview.slug);
    const cms = cmsByKey.get(key);

    if (cms) {
      rows.push(extractNewsRowMeta(cms, locale));
      continue;
    }

    rows.push({
      key,
      title: preview.title,
      subtitle: `/${preview.slug}`,
      thumbnail: preview.image.src,
      status: "static",
      slug: preview.slug,
      href: `/${locale}/news/${preview.slug}`,
    });
  }

  for (const cms of cmsRecords) {
    const id = parseEntityId("news", cms.key);
    if (!id || staticArticles.some((article) => article.slug === id)) continue;
    rows.push(extractNewsRowMeta(cms, locale));
  }

  return sortByCollectionOrder(rows, order);
}

export async function buildAdminCertificateRows(
  locale: Locale = defaultLocale,
  search = "",
): Promise<AdminCollectionRowMeta[]> {
  const [cmsRecords, order] = await Promise.all([
    listContentEntries({
      type: "certificate",
      ...(search ? { search } : {}),
    }),
    getCollectionOrder(CMS_COLLECTION_ORDER_KEYS.certificate),
  ]);

  const cmsByKey = new Map(cmsRecords.map((record) => [record.key, record]));
  const staticItems = buildHomeContent(localeContentMessages[locale], locale).certificates.items;
  const rows: AdminCollectionRowMeta[] = [];

  for (const item of staticItems) {
    const key = buildEntityKey("certificate", item.id);
    const cms = cmsByKey.get(key);

    if (cms) {
      rows.push(extractCertificateRowMeta(cms, locale));
      continue;
    }

    rows.push({
      key,
      title: item.title ?? item.image.alt ?? item.id,
      thumbnail: item.image.src,
      status: "static",
    });
  }

  for (const cms of cmsRecords) {
    const id = parseEntityId("certificate", cms.key);
    if (!id || staticItems.some((item) => item.id === id)) continue;
    rows.push(extractCertificateRowMeta(cms, locale));
  }

  return sortByCollectionOrder(rows, order);
}

export async function buildAdminCatalogRows(
  locale: Locale = defaultLocale,
  search = "",
): Promise<AdminCollectionRowMeta[]> {
  const staticItems = buildCatalogsPageContent(localeContentMessages[locale], locale).library.items;
  const cmsRecords = await listContentEntries({
    type: "page",
    ...(search ? { search } : {}),
  });
  const filtered = cmsRecords.filter((record) => record.key.startsWith("catalog."));
  const cmsByKey = new Map(filtered.map((record) => [record.key, record]));
  const order = await getCollectionOrder(CMS_COLLECTION_ORDER_KEYS.catalog);
  const rows: AdminCollectionRowMeta[] = [];

  for (const item of staticItems) {
    const key = buildEntityKey("catalog", item.id);
    const cms = cmsByKey.get(key);

    if (cms) {
      rows.push(extractCatalogRowMeta(cms, locale));
      continue;
    }

    rows.push({
      key,
      title: item.title,
      subtitle: item.description,
      thumbnail: item.cover.src,
      status: "static",
      href: `/${locale}/catalogs`,
    });
  }

  for (const cms of filtered) {
    const id = parseEntityId("catalog", cms.key);
    if (!id || staticItems.some((item) => item.id === id)) continue;
    rows.push(extractCatalogRowMeta(cms, locale));
  }

  return sortByCollectionOrder(rows, order);
}

export async function buildAdminCareerRows(
  locale: Locale = defaultLocale,
  search = "",
): Promise<AdminCollectionRowMeta[]> {
  const cmsRecords = await listContentEntries({
    type: "page",
    ...(search ? { search } : {}),
  });
  const filtered = cmsRecords.filter((record) => record.key.startsWith("career."));
  const cmsByKey = new Map(filtered.map((record) => [record.key, record]));
  const order = await getCollectionOrder(CMS_COLLECTION_ORDER_KEYS.career);
  const staticJobs = getLocalizedCareerJobs(localeContentMessages[locale], locale);
  const rows: AdminCollectionRowMeta[] = [];

  for (const job of staticJobs) {
    const key = buildEntityKey("career", job.slug);
    const cms = cmsByKey.get(key);

    if (cms) {
      rows.push(extractCareerRowMeta(cms, locale));
      continue;
    }

    rows.push({
      key,
      title: job.title,
      subtitle: job.department,
      status: "static",
      slug: job.slug,
      listingOrder: job.listingOrder,
      href: `/${locale}/careers/${job.slug}`,
      isActive: true,
    });
  }

  for (const cms of filtered) {
    const id = parseEntityId("career", cms.key);
    if (!id || staticJobs.some((job) => job.slug === id)) continue;
    rows.push(extractCareerRowMeta(cms, locale));
  }

  return sortByCollectionOrder(rows, order);
}
