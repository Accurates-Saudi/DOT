import { Breadcrumb, Container, Section } from "@/components/shared";
import type { AboutHeroContent } from "@/types";

export interface ProductsHeroSectionProps {
  content: AboutHeroContent;
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
