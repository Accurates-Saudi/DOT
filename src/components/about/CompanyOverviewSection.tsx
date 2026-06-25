import { useEffect, useRef, useState } from "react";

import { Container, Section } from "@/components/shared";
import {
  CompanyOverviewFeatureIconFrame,
  CompanyOverviewStatDivider,
  CompanyOverviewStatIconFrame,
} from "@/components/about/CompanyOverviewIcons";
import type { CompanyOverviewContent } from "@/types";
import { getRevealProps } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface CompanyOverviewSectionProps {
  content: CompanyOverviewContent;
}

export function CompanyOverviewSection({ content }: CompanyOverviewSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const reveal = (delayMs: number, className?: string) =>
    getRevealProps(isVisible, delayMs, className);

  return (
    <Section
      id="company-overview"
      padding="none"
      aria-label="Company overview"
      className="overflow-hidden bg-white"
    >
      <div
        ref={sectionRef}
        className="flex flex-col lg:min-h-[34rem] lg:flex-row xl:min-h-[36rem]"
      >
        <div
          {...reveal(
            0,
            "relative w-full lg:w-[42%] xl:w-[44%] lg:shrink-0",
          )}
        >
          <div className="relative min-h-[280px] sm:min-h-[340px] lg:absolute lg:inset-0 lg:min-h-0">
            <span
              className="absolute inset-y-0 left-0 z-10 w-1 bg-[#F68E05]"
              aria-hidden
            />
            <img
              src={content.image.src}
              alt={content.image.alt}
              className="size-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#0c1524]/15 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        </div>

        <div
          {...reveal(
            100,
            "relative flex flex-1 flex-col justify-center bg-white",
          )}
        >
          <ContentBackgroundArt />

          <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14 xl:px-16 xl:py-16 2xl:px-20">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
              <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
                {content.label}
              </p>
            </div>

            <h2 className="mt-5 text-[2rem] font-bold leading-[1.08] tracking-tight text-[#0c1524] sm:text-[2.25rem] lg:text-[2.45rem] xl:text-[2.65rem]">
              {content.heading}
            </h2>

            <div className="mt-7 max-w-none space-y-5 lg:mt-8">
              {content.body.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-[42rem] text-[0.9375rem] leading-[1.8] text-[#0c1524]/74 sm:text-base lg:text-[1.0625rem] lg:leading-[1.78]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-6 lg:mt-12 lg:grid-cols-4 lg:gap-0">
              {content.features.map((feature, index) => (
                <li
                  key={feature.id}
                  className={cn(
                    "flex flex-col",
                    index < content.features.length - 1 &&
                      "lg:border-r lg:border-[#0c1524]/10 lg:pr-5 xl:pr-7",
                    index > 0 && "lg:pl-5 xl:pl-7",
                  )}
                >
                  <CompanyOverviewFeatureIconFrame icon={feature.icon} />
                  <h3 className="mt-4 text-[0.9375rem] font-bold leading-snug text-[#0c1524] sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] leading-[1.65] text-[#0c1524]/60 sm:text-sm">
                    {feature.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#0c1524]/6 bg-[#f0eeeb]">
        <Container size="wide" className="px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-stretch">
            {content.stats.map((stat, index) => (
              <li
                key={stat.id}
                className={cn(
                  "flex flex-1 items-center gap-5 py-8 sm:gap-6 sm:py-9 lg:px-4 lg:py-10 xl:px-6",
                  index >= 2 && "border-t border-[#0c1524]/8 sm:border-t",
                  index % 2 === 1 && "sm:border-l sm:border-[#0c1524]/8",
                  index > 0 && "lg:border-0",
                )}
              >
                {index > 0 && <CompanyOverviewStatDivider />}
                <CompanyOverviewStatIconFrame icon={stat.icon} />
                <div className="min-w-0">
                  <p className="text-[1.875rem] font-bold leading-none tracking-tight text-[#F68E05] sm:text-[2rem] lg:text-[2.15rem]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[0.8125rem] font-semibold leading-snug text-[#0c1524]/72 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </Section>
  );
}

function ContentBackgroundArt() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute top-8 right-8 grid grid-cols-5 gap-[5px] opacity-40 sm:top-10 sm:right-10 lg:top-12 lg:right-14">
        {Array.from({ length: 25 }).map((_, index) => (
          <span
            key={index}
            className="size-[3px] rounded-full bg-[#0c1524]/10"
          />
        ))}
      </div>
      <div
        className="absolute -right-8 bottom-0 size-56 opacity-[0.03] sm:size-72 lg:size-80"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120' fill='none'%3E%3Cpath stroke='%230c1524' stroke-width='1.2' d='M20 95V55l18-10 18 10v40M56 95V45l18-10 18 10v50M38 55l18-18 18 18'/%3E%3Ccircle cx='92' cy='28' r='8' stroke='%230c1524' stroke-width='1.2'/%3E%3C/svg%3E\")",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
