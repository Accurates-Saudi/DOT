import { Container } from "@/components/shared";
import type { HomePageContent } from "@/types";
import { useHeroSlideshow } from "@/hooks";

import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";

export interface HeroSectionProps {
  content: HomePageContent["hero"];
}

export function HeroSection({ content }: HeroSectionProps) {
  const slides = content.slides;
  const slideCount = slides.length;
  const intervalMs = content.intervalMs ?? 7000;

  const { activeIndex, prefersReducedMotion, fadeDurationMs, shouldAnimate } =
    useHeroSlideshow({
      slideCount,
      intervalMs,
    });

  const backgrounds = slides.map((slide) => slide.background);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-svh overflow-hidden"
    >
      <HeroBackground
        images={backgrounds}
        activeIndex={activeIndex}
        fadeDurationMs={fadeDurationMs}
        shouldAnimate={shouldAnimate}
        prefersReducedMotion={prefersReducedMotion}
      />

      <Container
        size="wide"
        className="relative z-10 flex w-full min-h-svh items-center justify-start py-[96px] pt-[calc(4rem+96px)] lg:pt-[calc(5rem+96px)]"
      >
        <HeroContent
          slides={slides}
          activeIndex={activeIndex}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Container>
    </section>
  );
}
