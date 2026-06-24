import { Container, Section } from "@/components/shared";
import { SpecificationTable } from "@/components/products/SpecificationTable";
import type { ProductSpecificationsContent } from "@/types";

export interface ProductSpecificationsSectionProps {
  content: ProductSpecificationsContent;
}

export function ProductSpecificationsSection({
  content,
}: ProductSpecificationsSectionProps) {
  return (
    <Section
      id="product-specifications"
      variant="muted"
      padding="md"
      aria-label="Technical specifications"
      className="border-y border-border"
    >
      <Container size="wide">
        <h2 className="text-xl font-bold text-[#0c1524] sm:text-2xl">
          {content.heading}
        </h2>
        <div className="mt-6 max-w-3xl">
          <SpecificationTable rows={content.rows} />
        </div>
      </Container>
    </Section>
  );
}
