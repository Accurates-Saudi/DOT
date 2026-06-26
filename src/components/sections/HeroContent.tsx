import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui";
import type { HeroSlide } from "@/types";
import { HERO_SLIDE_FADE_MS } from "@/hooks/use-hero-slideshow";
import { cn } from "@/lib/utils";

interface HeroContentProps {
  slides: HeroSlide[];
  activeIndex: number;
  prefersReducedMotion: boolean;
}

export function HeroContent({
  slides,
  activeIndex,
  prefersReducedMotion,
}: HeroContentProps) {
  const [playEntrance, setPlayEntrance] = useState(!prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setPlayEntrance(false);
      return;
    }

    const id = window.setTimeout(() => setPlayEntrance(false), 900);
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion]);

  const activeSlide = slides[activeIndex] ?? slides[0];

  return (
    <div className="grid w-full max-w-2xl text-start py-12 sm:py-16 max-lg:mx-auto max-lg:text-center lg:py-20 xl:max-w-3xl">
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        const showEntrance = playEntrance && index === 0 && isActive;

        return (
          <div
            key={`${slide.headline}-${index}`}
            className={cn(
              "col-start-1 row-start-1 transition-opacity ease-in-out",
              isActive
                ? "pointer-events-auto z-10 opacity-100"
                : "pointer-events-none z-0 opacity-0",
            )}
            style={{
              transitionDuration: prefersReducedMotion ? "0ms" : `${HERO_SLIDE_FADE_MS}ms`,
            }}
            aria-hidden={!isActive}
          >
            <div
              className={cn(
                "flex items-center gap-3 max-lg:justify-center",
                showEntrance && "hero-enter hero-enter-delay-1",
              )}
            >
              <span className="h-px w-8 bg-accent" aria-hidden />
              <p className="text-[0.8125rem] font-medium tracking-[0.14em] text-white/55">
                {slide.label}
              </p>
            </div>

            <h1
              id={isActive ? "hero-heading" : undefined}
              className={cn(
                "mt-5 text-[2rem] leading-[1.12] font-semibold tracking-tight text-white sm:text-5xl lg:mt-6 lg:text-[3.25rem] lg:leading-[1.08] xl:text-[3.5rem]",
                showEntrance && "hero-enter hero-enter-delay-2",
              )}
            >
              <span className="block">{slide.headline}</span>
              <span className="mt-1 block text-accent lg:mt-1.5">
                {slide.headlineAccent}
              </span>
            </h1>

            <p
              className={cn(
                "mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg lg:mt-6 max-lg:mx-auto",
                showEntrance && "hero-enter hero-enter-delay-3",
              )}
            >
              {slide.subheadline}
            </p>

            <div
              className={cn(
                "mt-8 flex flex-col gap-3 max-lg:items-stretch sm:flex-row sm:flex-wrap sm:items-center lg:mt-10",
                showEntrance && "hero-enter hero-enter-delay-4",
              )}
            >
              <Button
                variant="hero"
                size="lg"
                className="h-12 rounded-full px-6 text-[0.9375rem] font-medium max-lg:w-full"
                asChild
              >
                <Link to={slide.ctaPrimary.href}>
                  {slide.ctaPrimary.label}
                  <ArrowRight className="size-4 rtl:-scale-x-100" />
                </Link>
              </Button>

              {slide.ctaSecondary && (
                <Button
                  variant="inverse"
                  size="lg"
                  className="h-12 rounded-full px-6 text-[0.9375rem] font-medium max-lg:w-full"
                  asChild
                >
                  <Link to={slide.ctaSecondary.href}>
                    {slide.ctaSecondary.label}
                    <ArrowRight className="size-4 rtl:-scale-x-100" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        );
      })}

      <p className="sr-only" aria-live="polite">
        {activeSlide
          ? `${activeSlide.headline} ${activeSlide.headlineAccent}`
          : ""}
      </p>
    </div>
  );
}
