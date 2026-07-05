import { ArrowRight } from "lucide-react";
import type { Ref } from "react";

import { CareersPageLink } from "@/components/careers/CareersPageLink";
import { Container, Section } from "@/components/shared";
import { ParallaxBackgroundImage } from "@/components/shared/ParallaxBackgroundImage";
import { Button } from "@/components/ui";
import { useParallaxTransform } from "@/hooks/use-parallax-transform";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { CareersCtaContent } from "@/types";

export interface CareersCtaSectionProps {
  content: CareersCtaContent;
}

export function CareersCtaSection({ content }: CareersCtaSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { containerRef, targetRef } = useParallaxTransform({
    speed: 0.18,
    mode: "scroll",
    disabled: prefersReducedMotion,
  });

  return (
    <Section
      id="careers-cta"
      padding="none"
      aria-label="Careers call to action"
      className="relative overflow-hidden bg-[#0c1524]"
    >
      <div
        ref={containerRef as Ref<HTMLDivElement>}
        className="relative py-14 md:py-16 lg:py-20"
      >
        {content.backgroundImage && (
          <ParallaxBackgroundImage
            src={content.backgroundImage.src}
            targetRef={targetRef as Ref<HTMLImageElement>}
            objectPosition={content.backgroundImage.objectPosition ?? "center"}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-[#0c1524]/72" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0c1524]/85 via-[#0c1524]/55 to-transparent"
          aria-hidden
        />

        <Container className="relative z-[1]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="max-w-3xl text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl lg:text-[2rem]">
              {content.heading}{" "}
              <span className="text-[#F68E05]">{content.headingAccent}</span>
            </h2>

            <Button
              variant="accent"
              size="lg"
              className="h-12 shrink-0 rounded-sm px-7 text-[0.8125rem] font-bold tracking-[0.08em] uppercase"
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
