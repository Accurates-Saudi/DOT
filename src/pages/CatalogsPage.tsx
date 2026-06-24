import { Container, Section, SectionHeading } from "@/components/shared";
import { catalogsPageMeta } from "@/data/pages";

export function CatalogsPage() {
  return (
    <Section padding="lg">
      <Container size="narrow">
        <SectionHeading
          title={catalogsPageMeta.title}
          description={catalogsPageMeta.description}
        />
      </Container>
    </Section>
  );
}
