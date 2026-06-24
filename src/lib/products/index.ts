import { productDetails, productDetailsBySlug } from "@/data/products";
import type { ProductDetailContent } from "@/types";

export function getProductBySlug(slug: string): ProductDetailContent | undefined {
  return productDetailsBySlug[slug];
}

export function getAllProductSlugs(): string[] {
  return productDetails.map((product) => product.slug);
}
