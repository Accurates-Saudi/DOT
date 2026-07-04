import { useLoaderData } from "react-router";

import {
  ProductsCtaSection,
  ProductsGrid,
  ProductsHeroSection,
} from "@/components/products";
import { useProductsPageContent } from "@/i18n/content/hooks";
import type { ProductsPageContent } from "@/types";

export function ProductsPage() {
  const loaderData = useLoaderData<{ pageContent?: ProductsPageContent } | undefined>();
  const fallbackContent = useProductsPageContent();
  const productsPageContent = loaderData?.pageContent ?? fallbackContent;

  return (
    <>
      <ProductsHeroSection content={productsPageContent.hero} />
      <ProductsGrid content={productsPageContent.listing} />
      <ProductsCtaSection content={productsPageContent.cta} />
    </>
  );
}
