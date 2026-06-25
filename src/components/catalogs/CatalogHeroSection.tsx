import { PageHeroSection } from "@/components/shared";
import type { CatalogHeroContent } from "@/types";

export interface CatalogHeroSectionProps {
  content: CatalogHeroContent;
}

export function CatalogHeroSection({ content }: CatalogHeroSectionProps) {
  return (
    <PageHeroSection
      id="catalogs-hero"
      aria-label="Catalogs introduction"
      breadcrumbs={content.breadcrumbs}
      title={content.title}
      introduction={content.introduction}
      backgroundImage={content.backgroundImage}
    />
  );
}
