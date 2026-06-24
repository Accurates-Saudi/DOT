import { useEffect, useRef, useState } from "react";

import { Container, Section } from "@/components/shared";
import {
  CompanyOverviewFeatureIconFrame,
  CompanyOverviewStatIconFrame,
} from "@/components/about/CompanyOverviewIcons";
import type { CompanyOverviewContent } from "@/types";
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

  const reveal = (delayMs: number, className?: string) => ({
    className: cn(
      "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      className,
    ),
    style: { transitionDelay: isVisible ? `${delayMs}ms` : "0ms" },
  });

  return (
    <Section
      id="company-overview"
      padding="none"
      aria-label="Company overview"
      className="overflow-hidden bg-white"
    >
      <Container size="wide" className="px-0 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
        >
          <div
            {...reveal(
              0,
              "relative min-h-[260px] overflow-hidden sm:min-h-[320px] lg:min-h-[480px]",
            )}
          >
            <img
              src={content.image.src}
              alt={content.image.alt}
              className="size-full object-cover"
            />
          </div>

          <div
            {...reveal(
              80,
              "flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-12",
            )}
          >
            <div>
              <span
                className="block h-px w-7 bg-[#F68E05]"
                aria-hidden
              />
              <p className="mt-2.5 text-[0.6875rem] font-semibold tracking-[0.18em] text-[#F68E05] uppercase sm:text-xs">
                {content.label}
              </p>
            </div>

            <h2 className="mt-5 text-[1.875rem] font-bold leading-[1.12] tracking-tight text-[#0c1524] sm:text-[2.125rem] lg:text-[2.35rem]">
              {content.heading}
            </h2>

            <div className="mt-6 space-y-4">
              {content.body.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[0.9375rem] leading-[1.7] text-[#0c1524]/72 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:mt-10 lg:grid-cols-4 lg:gap-0">
              {content.features.map((feature, index) => (
                <li
                  key={feature.id}
                  className={cn(
                    "flex flex-col",
                    index < content.features.length - 1 &&
                      "lg:border-r lg:border-[#0c1524]/10 lg:pr-5 xl:pr-6",
                    index > 0 && "lg:pl-5 xl:pl-6",
                  )}
                >
                  <CompanyOverviewFeatureIconFrame icon={feature.icon} />
                  <h3 className="mt-4 text-[0.9375rem] font-semibold leading-snug text-[#0c1524] sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-[#0c1524]/62 sm:text-sm">
                    {feature.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="bg-[#f6f5f4]">
        <Container size="wide">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {content.stats.map((stat, index) => (
              <li
                key={stat.id}
                className={cn(
                  "flex items-center gap-4 px-2 py-8 sm:gap-5 sm:px-4 sm:py-9 lg:px-5 lg:py-10",
                  index >= 2 && "border-t border-[#F68E05]/35 sm:border-t",
                  index > 0 && "lg:border-t-0 lg:border-l lg:border-[#F68E05]/45",
                )}
              >
                <CompanyOverviewStatIconFrame icon={stat.icon} />
                <div className="min-w-0">
                  <p className="text-[1.75rem] font-bold leading-none tracking-tight text-[#F68E05] sm:text-[2rem]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[0.8125rem] font-medium leading-snug text-[#0c1524]/75 sm:text-sm">
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
