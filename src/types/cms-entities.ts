import type { Locale } from "@/i18n/config";
import type {
  CatalogItem,
  CertificateItem,
  CareerJobDetail,
  NewsArticleDetail,
  ProductDetailContent,
} from "@/types";

export type CmsEntityLocale = Locale;

export interface CmsLocalizedPayload<T> {
  listingOrder?: number;
  locales: Record<CmsEntityLocale, T>;
}

export type CmsProductPayload = CmsLocalizedPayload<ProductDetailContent>;

export type CmsNewsPayload = CmsLocalizedPayload<
  NewsArticleDetail & { author?: string }
>;

export type CmsCertificatePayload = CmsLocalizedPayload<CertificateItem>;

export type CmsCatalogPayload = CmsLocalizedPayload<CatalogItem>;

export type CmsCareerPayload = CmsLocalizedPayload<CareerJobDetail>;

export interface CmsCollectionOrderPayload {
  orderedKeys: string[];
}

export const CMS_COLLECTION_ORDER_KEYS = {
  product: "products.order",
  news: "news.order",
  career: "careers.order",
  certificate: "certificates.order",
  catalog: "catalogs.order",
} as const;

export const CMS_ENTITY_KEY_PREFIX = {
  product: "product.",
  news: "news.",
  career: "career.",
  certificate: "certificate.",
  catalog: "catalog.",
} as const;

export function buildEntityKey(
  type: keyof typeof CMS_ENTITY_KEY_PREFIX,
  id: string,
): string {
  return `${CMS_ENTITY_KEY_PREFIX[type]}${id}`;
}

export function parseEntityId(
  type: keyof typeof CMS_ENTITY_KEY_PREFIX,
  key: string,
): string | null {
  const prefix = CMS_ENTITY_KEY_PREFIX[type];
  if (!key.startsWith(prefix)) return null;
  return key.slice(prefix.length);
}
