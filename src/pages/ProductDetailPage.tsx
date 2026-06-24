import { useLoaderData } from "react-router";

import {
  ProductContactCtaSection,
  ProductDetailHeroSection,
  ProductInfoSection,
  ProductOverviewSection,
  ProductSpecificationsSection,
  RelatedProductsSection,
} from "@/components/products";
import type { ProductDetailContent, ProductItem } from "@/types";

interface ProductDetailLoaderData {
  product: ProductDetailContent;
  relatedProducts: ProductItem[];
}

export function ProductDetailPage() {
  const { product, relatedProducts } =
    useLoaderData() as ProductDetailLoaderData;

  return (
    <>
      <ProductDetailHeroSection content={product.hero} />
      <ProductOverviewSection content={product.overview} />
      <ProductInfoSection content={product.info} />
      <ProductSpecificationsSection content={product.specifications} />
      <RelatedProductsSection products={relatedProducts} />
      <ProductContactCtaSection content={product.contactCta} />
    </>
  );
}
