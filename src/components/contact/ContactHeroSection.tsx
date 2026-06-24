import { Breadcrumb, Container, Section } from "@/components/shared";
import type { ContactHeroContent } from "@/types";

export interface ContactHeroSectionProps {
  content: ContactHeroContent;
}

export function ContactHeroSection({ content }: ContactHeroSectionProps) {
  return (
    <Section
      id="contact-hero"
      variant="muted"
      padding="md"
      aria-label="Contact introduction"
      className="border-b border-border"
    >
      <Container>
        <Breadcrumb items={content.breadcrumbs} />

        <div className="mt-6 max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
            <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
              {content.label}
            </p>
          </div>

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
