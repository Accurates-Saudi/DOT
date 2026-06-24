import { Container, Section } from "@/components/shared";
import { HeroSection } from "@/components/sections";
import { homePageContent } from "@/data/pages/home";

export function HomePage() {
  return (
    <>
      <HeroSection content={homePageContent.hero} />

      <Section padding="xl" variant="default">
        <Container>
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              Foundation placeholder — page sections will be built here.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
