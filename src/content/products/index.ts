import { buildProductsPageContent } from "@/i18n/content/pages/products";
import {
  buildLocalizedProductCatalog,
  getLocalizedProductBySlug,
} from "@/i18n/content/products";
import type { ProductDetailContent, ProductsPageContent } from "@/types";
import { toCmsSource } from "@/utils/cms-content";

import { localeContentMessages } from "../shared";

const enCatalog = buildLocalizedProductCatalog(localeContentMessages.en);
const productSlugs = enCatalog.productDetails.map((product) => product.slug);

function getLocalizedProductDetail(
  slug: string,
  locale: "en" | "ar",
): ProductDetailContent {
  const messages =
    locale === "en" ? localeContentMessages.en : localeContentMessages.ar;
  const product = getLocalizedProductBySlug(messages, locale, slug);

  if (!product) {
    throw new Error(`[content] Missing localized product for slug "${slug}".`);
  }

  return product;
}

export const productsPageContentSource = toCmsSource<ProductsPageContent>(
  buildProductsPageContent(localeContentMessages.en, "en"),
  buildProductsPageContent(localeContentMessages.ar, "ar"),
  ["products", "page"],
);

export const productDetailsContentSource = toCmsSource<ProductDetailContent[]>(
  productSlugs.map((slug) => getLocalizedProductDetail(slug, "en")),
  productSlugs.map((slug) => getLocalizedProductDetail(slug, "ar")),
  ["products", "details"],
);
