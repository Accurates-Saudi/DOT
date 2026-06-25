import { PageHeroSection } from "@/components/shared";
import type { ContactHeroContent } from "@/types";

export interface ContactHeroSectionProps {
  content: ContactHeroContent;
}

export function ContactHeroSection({ content }: ContactHeroSectionProps) {
  return (
    <PageHeroSection
      id="contact-hero"
      aria-label="Contact introduction"
      breadcrumbs={content.breadcrumbs}
      label={content.label}
      title={content.title}
      introduction={content.introduction}
      backgroundImage={content.backgroundImage}
    />
  );
}
