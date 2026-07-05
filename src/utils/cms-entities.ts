import type { Locale } from "@/i18n/config";
import type { CareerJobDetail, CMSContentRecord, CMSContentType, ProductDetailContent } from "@/types";
import type {
  CmsCareerPayload,
  CmsCatalogPayload,
  CmsCertificatePayload,
  CmsCollectionOrderPayload,
  CmsLocalizedPayload,
  CmsNewsPayload,
  CmsProductPayload,
} from "@/types/cms-entities";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getPayloadListingOrder(payload: unknown): number | undefined {
  if (!isRecord(payload)) return undefined;
  return typeof payload.listingOrder === "number" ? payload.listingOrder : undefined;
}

export function getPayloadIsActive(payload: unknown): boolean {
  if (!isRecord(payload)) return true;
  return payload.isActive !== false;
}

export function getLocalizedPayload<T>(
  payload: unknown,
  locale: Locale,
): T | undefined {
  if (!isRecord(payload) || !isRecord(payload.locales)) return undefined;
  const locales = payload.locales as Record<string, unknown>;
  return locales[locale] as T | undefined;
}

export function createEmptyLocalizedPayload<T>(
  en: T,
  ar: T,
  listingOrder = 0,
): CmsLocalizedPayload<T> {
  return {
    listingOrder,
    locales: { en, ar },
  };
}

export function sortByCollectionOrder<T extends { key: string }>(
  items: T[],
  orderedKeys: string[],
): T[] {
  if (orderedKeys.length === 0) return items;

  const rank = new Map(orderedKeys.map((key, index) => [key, index]));
  const indexed = items.map((item, index) => ({ item, index }));

  return indexed
    .sort((left, right) => {
      const leftRank = rank.get(left.item.key);
      const rightRank = rank.get(right.item.key);

      if (leftRank !== undefined && rightRank !== undefined) {
        return leftRank - rightRank;
      }

      if (leftRank !== undefined) return -1;
      if (rightRank !== undefined) return 1;

      return left.index - right.index;
    })
    .map(({ item }) => item);
}

export function sortByListingOrder<T extends { listingOrder?: number; updatedAt?: string }>(
  items: T[],
): T[] {
  return [...items].sort((left, right) => {
    const leftOrder = left.listingOrder ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.listingOrder ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return (right.updatedAt ?? "").localeCompare(left.updatedAt ?? "");
  });
}

export interface AdminCollectionRowMeta {
  key: string;
  cmsKey?: string;
  title: string;
  subtitle?: string;
  thumbnail?: string;
  status: "published" | "draft" | "archived" | "static";
  updatedAt?: string;
  slug?: string;
  listingOrder?: number;
  href?: string;
  isActive?: boolean;
}

export function extractProductRowMeta(
  record: CMSContentRecord,
  locale: Locale,
): AdminCollectionRowMeta {
  const payload = record.currentVersion?.payload as CmsProductPayload | undefined;
  const product = getLocalizedPayload<ProductDetailContent>(payload, locale);

  return {
    key: record.key,
    cmsKey: record.key,
    title: product?.hero?.name ?? record.slug ?? record.key,
    subtitle: record.slug ? `/${record.slug}` : undefined,
    thumbnail: product?.hero?.image?.src,
    status: record.status,
    updatedAt: record.updatedAt,
    slug: record.slug,
    listingOrder: getPayloadListingOrder(payload),
    href: record.slug ? `/${locale}/products/${record.slug}` : undefined,
  };
}

export function extractNewsRowMeta(
  record: CMSContentRecord,
  locale: Locale,
): AdminCollectionRowMeta {
  const payload = record.currentVersion?.payload as CmsNewsPayload | undefined;
  const article = getLocalizedPayload<{ title?: string; image?: { src?: string } }>(
    payload,
    locale,
  );

  return {
    key: record.key,
    cmsKey: record.key,
    title: article?.title ?? record.slug ?? record.key,
    subtitle: record.slug ? `/${record.slug}` : undefined,
    thumbnail: article?.image?.src,
    status: record.status,
    updatedAt: record.updatedAt,
    slug: record.slug,
    listingOrder: getPayloadListingOrder(payload),
    href: record.slug ? `/${locale}/news/${record.slug}` : undefined,
  };
}

export function extractCertificateRowMeta(
  record: CMSContentRecord,
  locale: Locale,
): AdminCollectionRowMeta {
  const payload = record.currentVersion?.payload as CmsCertificatePayload | undefined;
  const item = getLocalizedPayload<{ title?: string; image?: { src?: string; alt?: string } }>(
    payload,
    locale,
  );

  return {
    key: record.key,
    cmsKey: record.key,
    title: item?.title ?? item?.image?.alt ?? record.key,
    thumbnail: item?.image?.src,
    status: record.status,
    updatedAt: record.updatedAt,
    listingOrder: getPayloadListingOrder(payload),
  };
}

export function extractCareerRowMeta(
  record: CMSContentRecord,
  locale: Locale,
): AdminCollectionRowMeta {
  const payload = record.currentVersion?.payload as CmsCareerPayload | undefined;
  const job = getLocalizedPayload<CareerJobDetail>(payload, locale);
  const slug = record.slug ?? job?.slug;

  return {
    key: record.key,
    cmsKey: record.key,
    title: job?.title ?? slug ?? record.key,
    subtitle: job?.department ?? (slug ? `/${slug}` : undefined),
    status: record.status,
    updatedAt: record.updatedAt,
    slug,
    listingOrder: getPayloadListingOrder(payload),
    href: slug ? `/${locale}/careers/${slug}` : undefined,
    isActive: getPayloadIsActive(payload),
  };
}

export function extractCatalogRowMeta(
  record: CMSContentRecord,
  locale: Locale,
): AdminCollectionRowMeta {
  const payload = record.currentVersion?.payload as CmsCatalogPayload | undefined;
  const item = getLocalizedPayload<{ title?: string; description?: string; cover?: { src?: string } }>(
    payload,
    locale,
  );

  return {
    key: record.key,
    cmsKey: record.key,
    title: item?.title ?? record.key,
    subtitle: item?.description,
    thumbnail: item?.cover?.src,
    status: record.status,
    updatedAt: record.updatedAt,
    listingOrder: getPayloadListingOrder(payload),
    href: `/${locale}/catalogs`,
  };
}

export function getRowMetaExtractor(type: CMSContentType) {
  switch (type) {
    case "product":
      return extractProductRowMeta;
    case "news":
      return extractNewsRowMeta;
    case "certificate":
      return extractCertificateRowMeta;
    default:
      return extractCatalogRowMeta;
  }
}

export function parseCollectionOrderPayload(payload: unknown): string[] {
  if (!isRecord(payload)) return [];
  const orderedKeys = payload.orderedKeys;
  return Array.isArray(orderedKeys)
    ? orderedKeys.filter((key): key is string => typeof key === "string")
    : [];
}

export function buildCollectionOrderPayload(
  orderedKeys: string[],
): CmsCollectionOrderPayload {
  return { orderedKeys };
}

export function slugifyInput(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
