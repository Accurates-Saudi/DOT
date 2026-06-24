import { Container, Section, SectionHeading } from "@/components/shared";
import { productsPageMeta } from "@/data/pages";

export function ProductsPage() {
  return (
    <Section padding="lg">
      <Container size="narrow">
        <SectionHeading
          title={productsPageMeta.title}
          description={productsPageMeta.description}
        />
      </Container>
    </Section>
  );
}
