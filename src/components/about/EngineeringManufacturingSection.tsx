import { Container, Section, SectionHeading } from "@/components/shared";
import type { EngineeringManufacturingContent } from "@/types";

export interface EngineeringManufacturingSectionProps {
  content: EngineeringManufacturingContent;
}

export function EngineeringManufacturingSection({
  content,
}: EngineeringManufacturingSectionProps) {
  return (
    <Section
      id="engineering-manufacturing"
      variant="muted"
      padding="lg"
      aria-label="Engineering and manufacturing excellence"
    >
      <Container>
        <SectionHeading
          title={content.heading}
          description={content.subheading}
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.capabilities.map((capability) => (
            <li
              key={capability.id}
              className="rounded-lg border border-dashed border-border bg-background p-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {capability.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {capability.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
