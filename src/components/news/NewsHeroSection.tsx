import { PageHeroSection } from "@/components/shared";
import type { NewsHeroContent } from "@/types";

export interface NewsHeroSectionProps {
  content: NewsHeroContent;
}

export function NewsHeroSection({ content }: NewsHeroSectionProps) {
  return (
    <PageHeroSection
      id="news-hero"
      aria-label="News introduction"
      breadcrumbs={content.breadcrumbs}
      label={content.label}
      title={content.title}
      introduction={content.introduction}
      backgroundImage={content.backgroundImage}
    />
  );
}
