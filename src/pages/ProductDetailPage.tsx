import { useLoaderData } from "react-router";

import {
  ProductDetailHeroSection,
  ProductDownloadsSection,
  ProductGallerySection,
  ProductInquiryCtaSection,
  ProductOverviewSection,
  ProductSpecificationsSection,
} from "@/components/products";
import type { ProductDetailContent } from "@/types";

export function ProductDetailPage() {
  const { product } = useLoaderData() as { product: ProductDetailContent };

  return (
    <>
      <ProductDetailHeroSection content={product.hero} />
      <ProductOverviewSection content={product.overview} />
      <ProductSpecificationsSection content={product.specifications} />
      <ProductGallerySection content={product.gallery} />
      <ProductDownloadsSection content={product.downloads} />
      <ProductInquiryCtaSection content={product.inquiryCta} />
    </>
  );
}
