import { PageHeroSection } from "@/components/shared";
import type { AboutHeroContent } from "@/types";

export interface AboutHeroSectionProps {
  content: AboutHeroContent;
}

export function AboutHeroSection({ content }: AboutHeroSectionProps) {
  return (
    <PageHeroSection
      id="about-hero"
      aria-label="About us introduction"
      breadcrumbs={content.breadcrumbs}
      title={content.title}
      introduction={content.introduction}
      backgroundImage={content.backgroundImage}
    />
  );
}
