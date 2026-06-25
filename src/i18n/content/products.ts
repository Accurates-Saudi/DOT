import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type {
  ProductDetailContent,
  ProductItem,
  ProductRecord,
} from "@/types";

import { productRecords } from "@/data/products/registry";
import { buildProductCatalog } from "@/data/products/factory";

import { getMessagesSection, localizeLinkItem, localizeLinkItems } from "./helpers";

interface ProductTranslation {
  name?: string;
  category?: string;
  subcategory?: string;
  introduction?: string;
  listingTeaser?: string;
  overview?: string[];
  applications?: string[];
  features?: string[];
  benefits?: string[];
  specifications?: {
    heading?: string;
    rows?: { label: string; value: string }[];
  };
  meta?: { title: string; description: string };
  breadcrumbs?: { label: string; href?: string }[];
}

interface ProductsCatalogMessages {
  sections: {
    overview: string;
    applications: string;
    features: string;
    benefits: string;
    technicalData: string;
  };
  contactCta: ProductDetailContent["contactCta"];
  items: Record<string, ProductTranslation>;
}

function applyProductTranslation(
  record: ProductRecord,
  translation: ProductTranslation | undefined,
): ProductRecord {
  if (!translation) return record;

  return {
    ...record,
    name: translation.name ?? record.name,
    category: translation.category ?? record.category,
    ...(translation.subcategory || record.subcategory
      ? { subcategory: translation.subcategory ?? record.subcategory }
      : {}),
    introduction: translation.introduction ?? record.introduction,
    listingTeaser: translation.listingTeaser ?? record.listingTeaser,
    overview: translation.overview ?? record.overview,
    applications: translation.applications ?? record.applications,
    features: translation.features ?? record.features,
    benefits: translation.benefits ?? record.benefits,
    ...(record.specifications || translation.specifications
      ? {
          specifications: {
            ...record.specifications,
            heading:
              translation.specifications?.heading ??
              record.specifications?.heading,
            rows:
              translation.specifications?.rows ?? record.specifications?.rows,
            image: record.specifications?.image,
          },
        }
      : {}),
  };
}

function getLocalizedRecords(messages: TranslationMessages): ProductRecord[] {
  const catalog = getMessagesSection<ProductsCatalogMessages>(
    messages,
    "productsCatalog",
  );

  return productRecords.map((record) =>
    applyProductTranslation(record, catalog.items?.[record.slug]),
  );
}

export function buildLocalizedProductCatalog(messages: TranslationMessages) {
  const catalogMessages = getMessagesSection<ProductsCatalogMessages>(
    messages,
    "productsCatalog",
  );
  const records = getLocalizedRecords(messages);
  const catalog = buildProductCatalog(records);

  return {
    ...catalog,
    sections: catalogMessages.sections,
    contactCta: catalogMessages.contactCta,
  };
}

export function buildLocalizedProductItems(
  messages: TranslationMessages,
  locale: Locale,
): ProductItem[] {
  const { productDetails } = buildLocalizedProductCatalog(messages);
  return productDetails.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.hero.name,
    description: product.listingTeaser ?? product.hero.introduction,
    category: product.category,
    image: product.hero.image,
  }));
}

export function getLocalizedProductBySlug(
  messages: TranslationMessages,
  locale: Locale,
  slug: string,
): ProductDetailContent | undefined {
  const catalogMessages = getMessagesSection<ProductsCatalogMessages>(
    messages,
    "productsCatalog",
  );
  const { productDetailsBySlug } = buildLocalizedProductCatalog(messages);
  const product = productDetailsBySlug[slug];
  if (!product) return undefined;

  const translation = catalogMessages.items?.[slug];

  return {
    ...product,
    meta: translation?.meta ?? product.meta,
    hero: {
      ...product.hero,
      breadcrumbs: localizeLinkItems(
        (translation?.breadcrumbs ?? product.hero.breadcrumbs)
          .filter((item): item is { label: string; href: string } =>
            Boolean(item.href),
          )
          .map((item) => ({ label: item.label, href: item.href })),
        locale,
      ),
      ctaContact: localizeLinkItem(product.hero.ctaContact, locale),
    },
    contactCta: {
      ...catalogMessages.contactCta,
      ctaPrimary: localizeLinkItem(catalogMessages.contactCta.ctaPrimary, locale),
      ...(catalogMessages.contactCta.ctaSecondary
        ? {
            ctaSecondary: localizeLinkItem(
              catalogMessages.contactCta.ctaSecondary,
              locale,
            ),
          }
        : {}),
    },
    overview: {
      heading: catalogMessages.sections.overview,
      paragraphs: product.overview.paragraphs,
    },
    info: {
      applications: {
        title: catalogMessages.sections.applications,
        items: product.info.applications.items,
      },
      features: {
        title: catalogMessages.sections.features,
        items: product.info.features.items,
      },
      benefits: {
        title: catalogMessages.sections.benefits,
        items: product.info.benefits.items,
      },
    },
    ...(product.specifications
      ? {
          specifications: {
            ...product.specifications,
            heading:
              product.specifications.heading ??
              catalogMessages.sections.technicalData,
          },
        }
      : {}),
  };
}

export function getLocalizedRelatedProducts(
  messages: TranslationMessages,
  locale: Locale,
  slug: string,
  limit = 3,
): ProductItem[] {
  const current = getLocalizedProductBySlug(messages, locale, slug);
  if (!current) return [];

  const { productDetails } = buildLocalizedProductCatalog(messages);

  return productDetails
    .filter(
      (product) =>
        product.category === current.category && product.slug !== slug,
    )
    .slice(0, limit)
    .map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.hero.name,
      description: product.listingTeaser ?? product.hero.introduction,
      category: product.category,
      image: product.hero.image,
    }));
}
