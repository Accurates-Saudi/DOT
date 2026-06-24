import { Container, Section } from "@/components/shared";
import type { ProductOverviewContent } from "@/types";

export interface ProductOverviewSectionProps {
  content: ProductOverviewContent;
}

export function ProductOverviewSection({
  content,
}: ProductOverviewSectionProps) {
  return (
    <Section
      id="product-overview"
      padding="md"
      aria-label="Product overview"
      className="bg-white"
    >
      <Container size="wide">
        <div className="max-w-3xl">
          <h2 className="text-xl font-bold text-[#0c1524] sm:text-2xl">
            {content.heading}
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-[1.8] text-[#0c1524]/70 sm:text-base">
            {content.body}
          </p>
        </div>
      </Container>
    </Section>
  );
}
