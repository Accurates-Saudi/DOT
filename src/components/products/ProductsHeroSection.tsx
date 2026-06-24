import { Breadcrumb, Container, Section } from "@/components/shared";
import type { ProductsHeroContent } from "@/types";

export interface ProductsHeroSectionProps {
  content: ProductsHeroContent;
}

export function ProductsHeroSection({ content }: ProductsHeroSectionProps) {
  return (
    <Section
      id="products-hero"
      variant="muted"
      padding="md"
      aria-label="Products introduction"
      className="border-b border-border"
    >
      <Container>
        <Breadcrumb items={content.breadcrumbs} />

        <div className="mt-6 max-w-3xl space-y-4">
          <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
            {content.label}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {content.title}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {content.introduction}
          </p>
        </div>
      </Container>
    </Section>
  );
}
