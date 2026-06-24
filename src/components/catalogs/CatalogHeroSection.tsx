import { Breadcrumb, Container, Section } from "@/components/shared";
import type { CatalogHeroContent } from "@/types";

export interface CatalogHeroSectionProps {
  content: CatalogHeroContent;
}

export function CatalogHeroSection({ content }: CatalogHeroSectionProps) {
  return (
    <Section
      id="catalogs-hero"
      variant="muted"
      padding="md"
      aria-label="Catalogs introduction"
      className="border-b border-border"
    >
      <Container>
        <Breadcrumb items={content.breadcrumbs} />

        <div className="mt-6 max-w-3xl space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-[#0c1524] md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {content.title}
          </h1>
          <p className="text-base leading-relaxed text-[#0c1524]/65 md:text-lg">
            {content.introduction}
          </p>
        </div>
      </Container>
    </Section>
  );
}
