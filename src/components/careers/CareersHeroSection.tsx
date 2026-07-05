import { ArrowRight } from "lucide-react";
import type { Ref } from "react";

import { CareersPageLink } from "@/components/careers/CareersPageLink";
import { Container, Section } from "@/components/shared";
import { ParallaxBackgroundImage } from "@/components/shared/ParallaxBackgroundImage";
import { Button } from "@/components/ui";
import { useParallaxTransform } from "@/hooks/use-parallax-transform";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { CareersHeroContent } from "@/types";

export interface CareersHeroSectionProps {
  content: CareersHeroContent;
}

export function CareersHeroSection({ content }: CareersHeroSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { containerRef, targetRef } = useParallaxTransform({
    speed: 0.22,
    mode: "scroll",
    disabled: prefersReducedMotion,
  });

  return (
    <Section
      id="careers-hero"
      padding="none"
      aria-label="Careers introduction"
      className="relative overflow-hidden border-b border-[#0c1524]/10 bg-[#0c1524]"
    >
      <div
        ref={containerRef as Ref<HTMLDivElement>}
        className="relative py-16 md:py-20 lg:py-24"
      >
        {content.backgroundImage && (
          <ParallaxBackgroundImage
            src={content.backgroundImage.src}
            targetRef={targetRef as Ref<HTMLImageElement>}
            priority
            objectPosition={content.backgroundImage.objectPosition ?? "center"}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-[#0c1524]/50" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F68E05]/28 via-[#F68E05]/16 to-[#0c1524]/55"
          aria-hidden
        />

        <Container className="relative z-[1]">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
              <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
                {content.label}
              </p>
            </div>

            <h1 className="text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {content.title}{" "}
              <span className="text-[#F68E05]">{content.titleAccent}</span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              {content.introduction}
            </p>

            <Button
              variant="accent"
              size="lg"
              className="mt-2 h-12 rounded-sm px-7 text-[0.8125rem] font-bold tracking-[0.08em] uppercase"
              asChild
            >
              <CareersPageLink href={content.ctaPrimary.href}>
                {content.ctaPrimary.label}
                <ArrowRight className="size-4" />
              </CareersPageLink>
            </Button>
          </div>
        </Container>
      </div>
    </Section>
  );
}
