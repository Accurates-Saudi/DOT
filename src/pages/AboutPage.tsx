import { Container, Section, SectionHeading } from "@/components/shared";
import { aboutPageMeta } from "@/data/pages";

export function AboutPage() {
  return (
    <Section padding="lg">
      <Container size="narrow">
        <SectionHeading
          title={aboutPageMeta.title}
          description={aboutPageMeta.description}
        />
      </Container>
    </Section>
  );
}
