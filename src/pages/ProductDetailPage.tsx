import { useLoaderData } from "react-router";

import {
  ProductContactCtaSection,
  ProductDetailBodySection,
  ProductDetailHeroSection,
} from "@/components/products";
import type { ProductDetailContent } from "@/types";

interface ProductDetailLoaderData {
  product: ProductDetailContent;
}

export function ProductDetailPage() {
  const { product } = useLoaderData() as ProductDetailLoaderData;

  return (
    <>
      <ProductDetailHeroSection content={product.hero} />
      <ProductDetailBodySection
        overview={product.overview}
        info={product.info}
        specifications={product.specifications}
      />
      <ProductContactCtaSection content={product.contactCta} />
    </>
  );
}
