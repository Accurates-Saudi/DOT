import {
  ArrowRight,
  Building2,
  Cog,
  Droplets,
  Play,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { AboutSectionContent, AboutServiceItem } from "@/types";
import { cn } from "@/lib/utils";

const SERVICE_ICONS: Record<AboutServiceItem["icon"], LucideIcon> = {
  maintenance: Wrench,
  petroleum: Droplets,
  engineering: Cog,
  plant: Building2,
};

export interface AboutSectionProps {
  content: AboutSectionContent;
}

export function AboutSection({ content }: AboutSectionProps) {
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

  const { media, servicesBanner } = content;
  const videoHref = media.videoUrl ?? content.ctaVideo?.href;
  const playIsLink = media.showPlayButton && videoHref;

  return (
    <Section
      id="about"
      padding="xl"
      variant="default"
      aria-label="About us"
      className="relative overflow-hidden bg-white"
    >
      <AboutBackgroundArt />

      <Container size="wide" className="relative">
        <div ref={sectionRef} className="flex flex-col gap-10 lg:gap-14 xl:gap-16">
          {servicesBanner && (
            <div
              {...reveal(
                0,
                "grid gap-5 sm:gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch lg:gap-8",
              )}
            >
              <div className="flex h-full flex-col justify-center rounded-2xl bg-[#f6f5f4] px-6 py-4 sm:px-7 sm:py-5 lg:rounded-3xl lg:px-8 lg:py-5">
                <h3 className="max-w-xl text-base font-semibold leading-snug tracking-tight text-[#0c1524] sm:text-lg lg:text-[1.2rem] lg:leading-[1.35]">
                  {servicesBanner.title}
                </h3>

                <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:mt-4 sm:flex sm:items-start sm:justify-between sm:gap-x-4 lg:mt-5">
                  {servicesBanner.items.map((item) => {
                    const Icon = SERVICE_ICONS[item.icon];
                    return (
                      <li
                        key={item.label}
                        className="flex min-w-0 flex-1 flex-col items-center gap-1.5 text-center"
                      >
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#0c1524]/8 bg-white text-[#0c1524]/75 sm:size-[3.25rem] lg:size-14">
                          <Icon
                            className="size-6 stroke-[1.5] lg:size-7"
                            aria-hidden
                          />
                        </span>
                        <span className="text-[0.8125rem] font-semibold leading-tight text-[#0c1524] sm:text-sm">
                          {item.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {servicesBanner.thumbnail && (
                <div className="flex h-full overflow-hidden rounded-2xl bg-[#f6f5f4] shadow-[0_12px_40px_-24px_rgba(12,21,36,0.18)] lg:rounded-3xl">
                  <div className="aspect-[2/1] w-full sm:aspect-[5/2.5] lg:aspect-auto lg:h-full lg:min-h-0">
                    <img
                      src={servicesBanner.thumbnail.src}
                      alt={servicesBanner.thumbnail.alt}
                      className="size-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div {...reveal(servicesBanner ? 100 : 0)}>
              <div className="rounded-2xl bg-white p-2 shadow-[0_20px_60px_-28px_rgba(12,21,36,0.22)] sm:rounded-3xl sm:p-2.5 lg:rounded-[1.75rem] lg:p-3">
                <div className="group relative aspect-[16/11] overflow-hidden rounded-xl sm:rounded-2xl lg:aspect-[5/4] lg:rounded-[1.35rem]">
                  <img
                    src={media.image.src}
                    alt={media.image.alt}
                    className="size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.012]"
                    loading="lazy"
                    decoding="async"
                  />

                  {media.showPlayButton && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {playIsLink ? (
                        <a
                          href={videoHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Play company video"
                          className="flex size-[4.5rem] items-center justify-center rounded-full bg-[#F68E05] text-white shadow-[0_12px_36px_-10px_rgba(246,142,5,0.55)] transition-[transform,box-shadow] duration-300 ease-out hover:scale-[1.04] hover:shadow-[0_16px_44px_-10px_rgba(246,142,5,0.6)] sm:size-20"
                        >
                          <Play className="size-7 fill-current pl-1 sm:size-8" />
                        </a>
                      ) : (
                        <span
                          className="flex size-[4.5rem] items-center justify-center rounded-full bg-[#F68E05] text-white shadow-[0_12px_36px_-10px_rgba(246,142,5,0.55)] sm:size-20"
                          aria-hidden
                        >
                          <Play className="size-7 fill-current pl-1 sm:size-8" />
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:py-2 xl:py-4">
              <div {...reveal(servicesBanner ? 180 : 80, "flex items-center gap-3")}>
                <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
                <p className="text-[0.75rem] font-semibold tracking-[0.16em] text-[#0c1524]/80 uppercase sm:text-[0.8125rem]">
                  {content.label}
                </p>
              </div>

              <h2
                {...reveal(
                  servicesBanner ? 260 : 160,
                  "mt-4 text-[1.875rem] font-semibold tracking-tight text-[#0c1524] sm:mt-5 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1] xl:text-[2.75rem]",
                )}
              >
                <span className="block">{content.heading}</span>
                <span className="mt-1 block text-[#F68E05] lg:mt-1.5">
                  {content.headingAccent}
                </span>
              </h2>

              <div
                {...reveal(
                  servicesBanner ? 340 : 240,
                  "mt-5 space-y-4 sm:mt-6 lg:max-w-xl",
                )}
              >
                {content.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-[0.9375rem] leading-[1.75] text-[#0c1524]/72 sm:text-base lg:text-[1.0625rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div
                {...reveal(
                  servicesBanner ? 420 : 320,
                  "mt-8 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center lg:mt-10",
                )}
              >
                <Button
                  size="lg"
                  className="group h-12 rounded-full border-transparent bg-[#F68E05] px-6 text-[0.9375rem] font-medium text-white shadow-[0_8px_24px_-10px_rgba(246,142,5,0.45)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-px hover:bg-[#E07F04] hover:shadow-[0_12px_28px_-10px_rgba(246,142,5,0.5)] active:translate-y-0"
                  asChild
                >
                  <Link to={content.ctaPrimary.href}>
                    {content.ctaPrimary.label}
                    <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                  </Link>
                </Button>

                {content.ctaVideo && (
                  <Link
                    to={content.ctaVideo.href}
                    className="group inline-flex items-center gap-3 text-[0.9375rem] font-medium text-[#0c1524] transition-colors duration-300 ease-out hover:text-[#0c1524]/80"
                  >
                    <span className="flex size-10 items-center justify-center rounded-full bg-[#F68E05] text-white shadow-[0_6px_20px_-8px_rgba(246,142,5,0.55)] transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                      <Play className="size-4 fill-current pl-0.5" />
                    </span>
                    {content.ctaVideo.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function AboutBackgroundArt() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -top-8 right-[8%] size-44 opacity-[0.035] sm:size-56 lg:size-72"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120' fill='none'%3E%3Cpath stroke='%230c1524' stroke-width='1.2' d='M20 95V55l18-10 18 10v40M56 95V45l18-10 18 10v50M38 55l18-18 18 18'/%3E%3Ccircle cx='92' cy='28' r='8' stroke='%230c1524' stroke-width='1.2'/%3E%3C/svg%3E\")",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute top-[18%] left-[4%] size-36 opacity-[0.03] sm:size-48"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120' fill='none'%3E%3Cpath stroke='%230c1524' stroke-width='1.2' d='M15 100h90M30 100V60l30-22 30 22v40M48 78h24M60 56v22'/%3E%3C/svg%3E\")",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute right-[18%] bottom-[10%] size-40 opacity-[0.028] sm:size-52"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120' fill='none'%3E%3Cpath stroke='%230c1524' stroke-width='1.2' d='M10 95h100M25 95V70l20-12 20 12v25M55 95V55l20-12 20 12v40'/%3E%3C/svg%3E\")",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
