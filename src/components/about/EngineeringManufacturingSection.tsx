import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { CapabilityIcon } from "@/components/about/CapabilitiesIcons";
import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { EngineeringManufacturingContent } from "@/types";
import { getRevealProps } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface EngineeringManufacturingSectionProps {
  content: EngineeringManufacturingContent;
}

export function EngineeringManufacturingSection({
  content,
}: EngineeringManufacturingSectionProps) {
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
      id="engineering-manufacturing"
      padding="none"
      aria-label="Engineering and manufacturing capabilities"
      className="overflow-hidden bg-white"
    >
      <Container size="wide" className="px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <header
            {...reveal(
              0,
              "mx-auto max-w-3xl px-2 pt-14 text-center sm:pt-16 lg:pt-20",
            )}
          >
            <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
              {content.label}
            </p>
            <h2 className="mt-4 text-[2rem] font-bold leading-[1.1] tracking-tight text-[#0c1524] sm:text-[2.35rem] lg:text-[2.5rem]">
              {content.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[0.9375rem] leading-[1.75] text-[#0c1524]/68 sm:text-base lg:text-[1.0625rem]">
              {content.subheading}
            </p>
          </header>

          <ul
            {...reveal(
              100,
              "mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-5 xl:gap-6",
            )}
          >
            {content.capabilities.map((capability) => (
              <li
                key={capability.id}
                className="group overflow-hidden rounded-2xl border border-[#0c1524]/8 bg-white p-1.5 shadow-[0_12px_40px_-24px_rgba(12,21,36,0.16)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-20px_rgba(12,21,36,0.2)] sm:p-2"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-[0.75rem] sm:rounded-xl">
                  <img
                    src={capability.image.src}
                    alt={capability.image.alt}
                    className="img-zoom-hover size-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="px-4 py-5 sm:px-5 sm:py-6">
                  <div className="flex items-center gap-2.5 text-[#F68E05]">
                    <CapabilityIcon icon={capability.icon} className="size-5" />
                    <h3 className="text-[0.8125rem] font-bold tracking-[0.08em] text-[#0c1524] uppercase sm:text-sm">
                      {capability.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[0.8125rem] leading-[1.7] text-[#0c1524]/65 sm:text-sm">
                    {capability.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div
        {...reveal(
          200,
          "relative mt-14 border-t border-[#0c1524]/8 bg-white sm:mt-16 lg:mt-20",
        )}
      >
        <Container size="wide" className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 py-10 sm:py-11 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-12 xl:py-14">
            <div className="flex gap-5 lg:max-w-2xl lg:gap-6">
              <span
                className="w-1 shrink-0 self-stretch bg-[#F68E05]"
                aria-hidden
              />
              <div>
                <h3 className="text-xl font-bold leading-snug text-[#0c1524] sm:text-[1.35rem] lg:text-2xl">
                  {content.cta.heading}
                </h3>
                <p className="mt-3 max-w-xl text-[0.875rem] leading-relaxed text-[#0c1524]/68 sm:text-[0.9375rem]">
                  {content.cta.body}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
              <Button
                variant="accent"
                size="lg"
                className="h-12 rounded-sm px-7 text-[0.8125rem] font-bold tracking-[0.08em] uppercase"
                asChild
              >
                <Link to={content.cta.ctaPrimary.href}>
                  {content.cta.ctaPrimary.label}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-sm px-7 text-[0.8125rem] font-bold tracking-[0.08em] uppercase"
                asChild
              >
                <Link to={content.cta.ctaSecondary.href}>
                  {content.cta.ctaSecondary.label}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
