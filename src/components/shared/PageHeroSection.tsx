import type { Ref } from "react";

import defaultPageHeroBg from "@/assets/about/overview-hero.png";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { ParallaxBackgroundImage } from "@/components/shared/ParallaxBackgroundImage";
import { Section } from "@/components/shared/Section";
import { useParallaxTransform } from "@/hooks/use-parallax-transform";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { BreadcrumbItem, ImageAsset } from "@/types";

export interface PageHeroSectionProps {
  id: string;
  "aria-label": string;
  breadcrumbs: BreadcrumbItem[];
  title: string;
  introduction: string;
  label?: string;
  backgroundImage?: ImageAsset;
}

export function PageHeroSection({
  id,
  "aria-label": ariaLabel,
  breadcrumbs,
  title,
  introduction,
  label,
  backgroundImage,
}: PageHeroSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { containerRef, targetRef } = useParallaxTransform({
    speed: 0.22,
    mode: "scroll",
    disabled: prefersReducedMotion,
  });

  const background = backgroundImage ?? {
    src: defaultPageHeroBg,
    alt: "Dynamic Oil Tools industrial manufacturing facility",
  };

  return (
    <Section
      id={id}
      padding="none"
      variant="default"
      aria-label={ariaLabel}
      className="relative overflow-hidden border-b border-[#0c1524]/10 bg-[#0c1524]"
    >
      <div
        ref={containerRef as Ref<HTMLDivElement>}
        className="relative py-12 md:py-16"
      >
        <ParallaxBackgroundImage
          src={background.src}
          targetRef={targetRef as Ref<HTMLImageElement>}
          priority
        />

        <div
          className="pointer-events-none absolute inset-0 bg-[#0c1524]/42"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F68E05]/32 via-[#F68E05]/22 to-[#0c1524]/48"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,transparent_35%,rgba(12,21,36,0.22)_100%)]"
          aria-hidden
        />

        <Container className="relative z-[1]">
          <Breadcrumb items={breadcrumbs} variant="onDark" highlightLast />

          <div className="mt-6 max-w-3xl space-y-4">
            {label && (
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
                <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
                  {label}
                </p>
              </div>
            )}

            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {title}
            </h1>
            <p className="text-base leading-relaxed text-white/85 md:text-lg">
              {introduction}
            </p>
          </div>
        </Container>
      </div>
    </Section>
  );
}
