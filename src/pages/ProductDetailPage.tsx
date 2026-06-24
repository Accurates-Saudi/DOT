import { useLoaderData } from "react-router";

import {
  ProductContactCtaSection,
  ProductDetailView,
} from "@/components/products";
import type { ProductDetailContent } from "@/types";

interface ProductDetailLoaderData {
  product: ProductDetailContent;
}

export function ProductDetailPage() {
  const { product } = useLoaderData() as ProductDetailLoaderData;

  return (
    <>
      <ProductDetailView product={product} />
      <ProductContactCtaSection content={product.contactCta} />
    </>
  );
}
