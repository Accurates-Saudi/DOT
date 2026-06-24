import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { Container } from "@/components/shared";
import { Button } from "@/components/ui";
import type { HomePageContent } from "@/types";
import { usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

import { HeroBackground } from "./HeroBackground";

export interface HeroSectionProps {
  content: HomePageContent["hero"];
}

export function HeroSection({ content }: HeroSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const backgrounds = content.backgrounds ?? [];

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-svh overflow-hidden"
    >
      <HeroBackground images={backgrounds} intervalMs={7000} />

      <Container
        size="wide"
        className="relative z-10 flex min-h-svh items-center pt-16 lg:pt-20"
      >
        <div
          className={cn(
            "w-full max-w-2xl py-12 sm:py-16 lg:py-20 xl:max-w-3xl",
            !prefersReducedMotion &&
              "animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3",
              !prefersReducedMotion &&
                "animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100 fill-mode-both",
            )}
          >
            <span className="h-px w-8 bg-accent" aria-hidden />
            <p className="text-[0.8125rem] font-medium tracking-[0.14em] text-muted-foreground">
              {content.label}
            </p>
          </div>

          <h1
            id="hero-heading"
            className={cn(
              "mt-5 text-[2rem] leading-[1.12] font-semibold tracking-tight text-foreground sm:text-5xl lg:mt-6 lg:text-[3.25rem] lg:leading-[1.08] xl:text-[3.5rem]",
              !prefersReducedMotion &&
                "animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200 fill-mode-both",
            )}
          >
            <span className="block">{content.headline}</span>
            <span className="mt-1 block text-accent lg:mt-1.5">
              {content.headlineAccent}
            </span>
          </h1>

          <p
            className={cn(
              "mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mt-6",
              !prefersReducedMotion &&
                "animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 fill-mode-both",
            )}
          >
            {content.subheadline}
          </p>

          <div
            className={cn(
              "mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-10",
              !prefersReducedMotion &&
                "animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500 fill-mode-both",
            )}
          >
            <Button
              size="lg"
              variant="accent"
              className="group h-12 rounded-full px-6 text-[0.9375rem] font-medium shadow-none hover:shadow-none"
              asChild
            >
              <Link to={content.ctaPrimary.href}>
                {content.ctaPrimary.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Button>

            {content.ctaSecondary && (
              <Button
                variant="outline"
                size="lg"
                className="group h-12 rounded-full border-border/80 bg-background/70 px-6 text-[0.9375rem] font-medium backdrop-blur-[2px] hover:bg-background"
                asChild
              >
                <Link to={content.ctaSecondary.href}>
                  {content.ctaSecondary.label}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
