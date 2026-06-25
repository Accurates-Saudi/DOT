import { PageHeroSection } from "@/components/shared";
import type { AboutHeroContent } from "@/types";

export interface ProductsHeroSectionProps {
  content: AboutHeroContent;
}

export function ProductsHeroSection({ content }: ProductsHeroSectionProps) {
  return (
    <PageHeroSection
      id="products-hero"
      aria-label="Products introduction"
      breadcrumbs={content.breadcrumbs}
      title={content.title}
      introduction={content.introduction}
      backgroundImage={content.backgroundImage}
    />
  );
}
