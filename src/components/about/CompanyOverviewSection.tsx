import { Container, Section, SectionHeading } from "@/components/shared";
import type { CompanyOverviewContent } from "@/types";

export interface CompanyOverviewSectionProps {
  content: CompanyOverviewContent;
}

export function CompanyOverviewSection({ content }: CompanyOverviewSectionProps) {
  return (
    <Section
      id="company-overview"
      padding="lg"
      aria-label="Company overview"
    >
      <Container>
        <SectionHeading title={content.heading} />

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div
            className="aspect-[4/3] overflow-hidden rounded-lg border border-dashed border-border bg-muted"
            aria-hidden
          >
            <img
              src={content.image.src}
              alt={content.image.alt}
              className="size-full object-cover opacity-40"
            />
          </div>

          <div className="space-y-4">
            {content.body.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
