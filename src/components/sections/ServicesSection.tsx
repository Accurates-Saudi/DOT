import {
  Cog,
  Droplets,
  Factory,
  Filter,
  Hammer,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { ServiceItem, ServicesSectionContent } from "@/types";
import { cn } from "@/lib/utils";

const SERVICE_ICONS: Record<ServiceItem["icon"], LucideIcon> = {
  "oil-gas": Factory,
  process: Cog,
  downhole: Droplets,
  strainers: Filter,
  treatments: Hammer,
};

export interface ServicesSectionProps {
  content: ServicesSectionContent;
}

export function ServicesSection({ content }: ServicesSectionProps) {
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
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
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

  const primaryItems = content.items.slice(0, 3);
  const secondaryItems = content.items.slice(3);

  return (
    <Section
      id="services"
      padding="section72"
      variant="default"
      aria-label="Our services"
      className="relative overflow-hidden bg-white"
    >
      <ServicesBackgroundArt />

      <Container size="wide" className="relative">
        <div
          ref={sectionRef}
          className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-14 xl:gap-20"
        >
          <div
            {...reveal(
              0,
              "lg:sticky lg:top-28 lg:max-w-sm lg:self-start xl:max-w-md",
            )}
          >
            <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-tight text-[#0c1524] sm:text-[2.35rem] lg:text-[2.65rem] xl:text-[2.85rem]">
              <span className="block">{content.heading}</span>
              <span className="mt-1 block text-[#F68E05] lg:mt-1.5">
                {content.headingAccent}
              </span>
            </h2>

            <span
              className="mt-5 block h-1 w-14 rounded-full bg-[#F68E05] sm:mt-6"
              aria-hidden
            />

            <div className="mt-8 sm:mt-9">
              <Button
                size="lg"
                className="h-12 rounded-full border-transparent bg-[#F68E05] px-7 text-[0.9375rem] font-medium text-white shadow-[0_8px_24px_-10px_rgba(246,142,5,0.45)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-px hover:bg-[#E07F04] hover:shadow-[0_12px_28px_-10px_rgba(246,142,5,0.5)] active:translate-y-0"
                asChild
              >
                <Link to={content.ctaPrimary.href}>
                  {content.ctaPrimary.label}
                </Link>
              </Button>
            </div>
          </div>

          <div className="min-w-0">
            <ul
              {...reveal(120, "grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3")}
            >
              {primaryItems.map((item, index) => (
                <ServiceEntry
                  key={item.id}
                  item={item}
                  revealDelay={180 + index * 70}
                  isVisible={isVisible}
                />
              ))}
            </ul>

            {secondaryItems.length > 0 && (
              <ul
                {...reveal(
                  420,
                  "mt-10 grid gap-10 sm:mt-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mx-auto lg:mt-14 lg:max-w-[68%] lg:grid-cols-2",
                )}
              >
                {secondaryItems.map((item, index) => (
                  <ServiceEntry
                    key={item.id}
                    item={item}
                    revealDelay={480 + index * 70}
                    isVisible={isVisible}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ServiceEntry({
  item,
  revealDelay,
  isVisible,
}: {
  item: ServiceItem;
  revealDelay: number;
  isVisible: boolean;
}) {
  const Icon = SERVICE_ICONS[item.icon];

  const content = (
    <>
      <span className="flex size-12 items-center justify-center rounded-full bg-[#F68E05] text-white shadow-[0_8px_20px_-10px_rgba(246,142,5,0.55)] transition-transform duration-300 ease-out group-hover:scale-[1.04]">
        <Icon className="size-5 stroke-[1.75]" aria-hidden />
      </span>

      <h3 className="mt-4 text-lg font-semibold tracking-tight text-[#0c1524] transition-colors duration-300 ease-out group-hover:text-[#0c1524]/85 sm:text-xl">
        {item.title}
      </h3>

      <span
        className="mt-3 block h-0.5 w-10 rounded-full bg-[#F68E05]/90"
        aria-hidden
      />

      <p className="mt-3 text-[0.9375rem] leading-[1.7] text-[#0c1524]/68 sm:text-base">
        {item.description}
      </p>
    </>
  );

  const itemClassName = cn(
    "group block",
    item.href &&
      "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F68E05]",
  );

  return (
    <li
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
      style={{ transitionDelay: isVisible ? `${revealDelay}ms` : "0ms" }}
    >
      {item.href ? (
        <Link to={item.href} className={itemClassName}>
          {content}
        </Link>
      ) : (
        <div className={itemClassName}>{content}</div>
      )}
    </li>
  );
}

function ServicesBackgroundArt() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute top-[8%] right-[4%] left-[18%] h-40 opacity-[0.03] sm:h-52 lg:h-64"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 120' fill='none'%3E%3Cpath stroke='%230c1524' stroke-width='1.2' d='M20 95h120M20 95V55l30-18 30 18v40M80 95V45l30-18 30 18v50M140 95V60l25-15 25 15v35M200 95V50l28-16 28 16v45M260 95V40l32-20 32 20v55M320 95V55l30-18 30 18v40M380 95V65l22-12 22 12v30M440 95V45l30-18 30 18v50M500 95V55l28-16 28 16v40M560 95V70l20-12 20 12v25M620 95V50l30-18 30 18v45M680 95V60l24-14 24 14v35'/%3E%3Ccircle cx='760' cy='30' r='10' stroke='%230c1524' stroke-width='1.2'/%3E%3C/svg%3E\")",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute bottom-[12%] left-[6%] size-36 opacity-[0.025] sm:size-48"
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
