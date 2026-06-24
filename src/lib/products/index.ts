import { productDetails, productDetailsBySlug } from "@/data/products";
import type { ProductDetailContent, ProductItem } from "@/types";

export function getProductBySlug(slug: string): ProductDetailContent | undefined {
  return productDetailsBySlug[slug];
}

export function getAllProductSlugs(): string[] {
  return productDetails.map((product) => product.slug);
}

export function getRelatedProducts(
  slug: string,
  limit = 3,
): ProductItem[] {
  const current = getProductBySlug(slug);
  if (!current) return [];

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
      description: product.hero.introduction,
      category: product.category,
      image: product.hero.image,
    }));
}
