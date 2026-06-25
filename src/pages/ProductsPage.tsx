import {
  ProductsCtaSection,
  ProductsGrid,
  ProductsHeroSection,
} from "@/components/products";
import { useProductsPageContent } from "@/i18n/content/hooks";

export function ProductsPage() {
  const productsPageContent = useProductsPageContent();

  return (
    <>
      <ProductsHeroSection content={productsPageContent.hero} />
      <ProductsGrid content={productsPageContent.listing} />
      <ProductsCtaSection content={productsPageContent.cta} />
    </>
  );
}
