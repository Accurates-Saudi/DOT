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
            <p className="text-[0.8125rem] font-medium tracking-[0.14em] text-white/55">
              {content.label}
            </p>
          </div>

          <h1
            id="hero-heading"
            className={cn(
              "mt-5 text-[2rem] leading-[1.12] font-semibold tracking-tight text-white sm:text-5xl lg:mt-6 lg:text-[3.25rem] lg:leading-[1.08] xl:text-[3.5rem]",
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
              "mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg lg:mt-6",
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
              className="group h-12 rounded-full border-transparent bg-[#F68E05] px-6 text-[0.9375rem] font-medium text-white shadow-none transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#E07F04] hover:shadow-[0_10px_28px_-10px_rgba(246,142,5,0.45)] active:translate-y-0 active:shadow-none"
              asChild
            >
              <Link to={content.ctaPrimary.href}>
                {content.ctaPrimary.label}
                <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </Link>
            </Button>

            {content.ctaSecondary && (
              <Button
                variant="outline"
                size="lg"
                className="group h-12 rounded-full border-white bg-transparent px-6 text-[0.9375rem] font-medium text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#0c1524] active:translate-y-0"
                asChild
              >
                <Link to={content.ctaSecondary.href}>
                  {content.ctaSecondary.label}
                  <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
