import { Container, Section, SectionHeading } from "@/components/shared";
import { newsPageMeta } from "@/data/pages";

export function NewsPage() {
  return (
    <Section padding="lg">
      <Container size="narrow">
        <SectionHeading
          title={newsPageMeta.title}
          description={newsPageMeta.description}
        />
      </Container>
    </Section>
  );
}
