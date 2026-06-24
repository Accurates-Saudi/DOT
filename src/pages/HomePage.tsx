import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import { homePageContent } from "@/data/pages/home";

export function HomePage() {
  const { hero } = homePageContent;

  return (
    <Section padding="xl" variant="muted">
      <Container>
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <p className="text-sm font-medium tracking-wider text-primary uppercase">
            {homePageContent.meta.description.split("—")[0]?.trim()}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            {hero.subheadline}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button size="lg" asChild>
              <Link to={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</Link>
            </Button>
            {hero.ctaSecondary && (
              <Button variant="outline" size="lg" asChild>
                <Link to={hero.ctaSecondary.href}>
                  {hero.ctaSecondary.label}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
