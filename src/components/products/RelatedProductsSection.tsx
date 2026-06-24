import { Container, Section } from "@/components/shared";
import { ProductCard } from "@/components/products/ProductCard";
import type { ProductItem } from "@/types";

export interface RelatedProductsSectionProps {
  products: ProductItem[];
  heading?: string;
  viewProductLabel?: string;
}

export function RelatedProductsSection({
  products,
  heading = "Related Products",
  viewProductLabel = "View Product",
}: RelatedProductsSectionProps) {
  if (products.length === 0) return null;

  return (
    <Section
      id="related-products"
      variant="muted"
      padding="md"
      aria-label="Related products"
      className="border-t border-border"
    >
      <Container size="wide">
        <h2 className="text-xl font-bold text-[#0c1524] sm:text-2xl">
          {heading}
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                viewProductLabel={viewProductLabel}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
