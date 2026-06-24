import {
  ProductsCtaSection,
  ProductsGrid,
  ProductsHeroSection,
} from "@/components/products";
import { productsPageContent } from "@/data/pages/products";

export function ProductsPage() {
  return (
    <>
      <ProductsHeroSection content={productsPageContent.hero} />
      <ProductsGrid content={productsPageContent.listing} />
      <ProductsCtaSection content={productsPageContent.cta} />
    </>
  );
}
