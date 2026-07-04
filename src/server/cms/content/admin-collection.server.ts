import { createProductDetail } from "@/data/products/factory";
import { productRecords } from "@/data/products/registry";
import { localeContentMessages } from "@/content/shared";
import { defaultLocale, type Locale } from "@/i18n/config";
import { getLocalizedNewsArticles, getLocalizedNewsBySlug } from "@/i18n/content/news";
import {
  CMS_COLLECTION_ORDER_KEYS,
  buildEntityKey,
  parseEntityId,
} from "@/types/cms-entities";
import type { AdminCollectionRowMeta } from "@/utils/cms-entities";
import {
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

  const rows = cmsRecords.map((record) => extractCertificateRowMeta(record, locale));
  return sortByCollectionOrder(rows, order);
}

export async function buildAdminCatalogRows(
  locale: Locale = defaultLocale,
  search = "",
): Promise<AdminCollectionRowMeta[]> {
  const cmsRecords = await listContentEntries({
    type: "page",
    ...(search ? { search } : {}),
  });
  const filtered = cmsRecords.filter((record) => record.key.startsWith("catalog."));
  const order = await getCollectionOrder(CMS_COLLECTION_ORDER_KEYS.catalog);
  const rows = filtered.map((record) => extractCatalogRowMeta(record, locale));
  return sortByCollectionOrder(rows, order);
}
