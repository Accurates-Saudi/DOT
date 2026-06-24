import { useEffect, useRef, useState } from "react";

import { Container, Section } from "@/components/shared";
import {
  CompanyOverviewFeatureIconFrame,
  CompanyOverviewStatDivider,
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
      className="relative overflow-hidden bg-[#fafaf9]"
    >
      <OverviewBackgroundArt />

      <Container size="wide" className="relative px-0 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className="grid bg-white shadow-[0_1px_0_0_rgba(12,21,36,0.06)] lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]"
        >
          <div
            {...reveal(
              0,
              "relative min-h-[300px] overflow-hidden sm:min-h-[360px] lg:min-h-[540px] xl:min-h-[580px]",
            )}
          >
            <span
              className="absolute inset-y-0 left-0 z-20 hidden w-1 bg-[#F68E05] lg:block"
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
              className="absolute inset-0 bg-gradient-to-r from-[#0c1524]/20 via-transparent to-transparent lg:from-[#0c1524]/30"
              aria-hidden
            />
            <div
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0c1524]/35 to-transparent lg:hidden"
              aria-hidden
            />
          </div>

          <div
            {...reveal(
              100,
              "relative flex flex-col justify-center px-7 py-11 sm:px-9 sm:py-12 lg:px-10 lg:py-14 xl:px-14 xl:py-16",
            )}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
              <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#0c1524]/55 uppercase sm:text-xs">
                {content.label}
              </p>
            </div>

            <h2 className="mt-5 max-w-xl text-[2rem] font-bold leading-[1.08] tracking-tight text-[#0c1524] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.65rem]">
              {content.heading}
            </h2>

            <span
              className="mt-5 block h-[3px] w-11 bg-[#F68E05]"
              aria-hidden
            />

            <div className="mt-7 max-w-2xl space-y-5">
              {content.body.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[0.9375rem] leading-[1.8] text-[#0c1524]/76 sm:text-base lg:text-[1.0625rem] lg:leading-[1.75]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 border-t border-[#0c1524]/8 pt-10 lg:mt-11 lg:pt-11">
              <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
                {content.features.map((feature, index) => (
                  <li
                    key={feature.id}
                    className={cn(
                      "flex gap-4 lg:flex-col lg:gap-0",
                      index < content.features.length - 1 &&
                        "lg:border-r lg:border-[#0c1524]/8 lg:pr-6 xl:pr-8",
                      index > 0 && "lg:pl-6 xl:pl-8",
                    )}
                  >
                    <CompanyOverviewFeatureIconFrame icon={feature.icon} />
                    <div className="min-w-0 lg:mt-5">
                      <h3 className="text-[0.9375rem] font-bold leading-snug text-[#0c1524] sm:text-base">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-[0.8125rem] leading-relaxed text-[#0c1524]/62 sm:text-sm sm:leading-[1.65]">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-[#0c1524]/6 bg-[#ece9e5]">
        <Container size="wide">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-stretch">
            {content.stats.map((stat, index) => (
              <li
                key={stat.id}
                className={cn(
                  "flex flex-1 items-center gap-5 px-1 py-9 sm:gap-6 sm:px-4 sm:py-10 lg:px-5 lg:py-11 xl:px-7",
                  index >= 2 && "sm:border-t sm:border-[#0c1524]/8",
                  index % 2 === 1 && "sm:border-l sm:border-[#0c1524]/8",
                  index > 0 && "lg:border-0",
                )}
              >
                {index > 0 && <CompanyOverviewStatDivider />}
                <CompanyOverviewStatIconFrame icon={stat.icon} />
                <div className="min-w-0">
                  <p className="text-[2rem] font-bold leading-none tracking-tight text-[#F68E05] sm:text-[2.15rem] lg:text-[2.35rem]">
                    {stat.value}
                  </p>
                  <p className="mt-2.5 max-w-[11rem] text-[0.8125rem] font-semibold leading-snug text-[#0c1524]/72 sm:text-sm">
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

function OverviewBackgroundArt() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute top-[12%] right-[6%] size-48 opacity-[0.03] sm:size-64"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120' fill='none'%3E%3Cpath stroke='%230c1524' stroke-width='1.2' d='M20 95V55l18-10 18 10v40M56 95V45l18-10 18 10v50M38 55l18-18 18 18'/%3E%3Ccircle cx='92' cy='28' r='8' stroke='%230c1524' stroke-width='1.2'/%3E%3C/svg%3E\")",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute bottom-[18%] left-[3%] size-40 opacity-[0.025] sm:size-52"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120' fill='none'%3E%3Cpath stroke='%230c1524' stroke-width='1.2' d='M15 100h90M30 100V60l30-22 30 22v40M48 78h24M60 56v22'/%3E%3C/svg%3E\")",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
