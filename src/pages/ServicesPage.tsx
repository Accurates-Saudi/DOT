import { Container, Section, SectionHeading } from "@/components/shared";
import { servicesPageMeta } from "@/data/pages";

export function ServicesPage() {
  return (
    <Section padding="lg">
      <Container size="narrow">
        <SectionHeading
          title={servicesPageMeta.title}
          description={servicesPageMeta.description}
        />
      </Container>
    </Section>
  );
}
