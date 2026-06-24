import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import { homePageContent } from "@/data/pages/home";
import { siteSettings } from "@/data/site";

export function HomePage() {
  const { hero } = homePageContent;

  return (
    <>
      <section className="relative flex min-h-[min(100svh,56rem)] items-end bg-[#0c1524] pb-16 pt-28 lg:items-center lg:pb-24 lg:pt-32">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,21,36,0.15)_0%,rgba(12,21,36,0.85)_72%,#0c1524_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 80px)",
          }}
          aria-hidden
        />

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl space-y-6 text-center lg:mx-0 lg:max-w-2xl lg:text-left">
            <p className="text-xs font-medium tracking-[0.2em] text-white/55 uppercase">
              {siteSettings.companyName}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              {hero.headline}
            </h1>
            <p className="text-base leading-relaxed text-white/70 md:text-lg">
              {hero.subheadline}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 lg:justify-start">
              <Button size="lg" variant="accent" className="rounded-sm" asChild>
                <Link to={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</Link>
              </Button>
              {hero.ctaSecondary && (
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-sm border-white/30 bg-transparent text-white hover:border-white/50 hover:bg-white/10"
                  asChild
                >
                  <Link to={hero.ctaSecondary.href}>
                    {hero.ctaSecondary.label}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>

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
