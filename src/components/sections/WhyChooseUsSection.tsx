import { ArrowRight, Calendar } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { WhyChooseUsSectionContent } from "@/types";
import { cn } from "@/lib/utils";

export interface WhyChooseUsSectionProps {
  content: WhyChooseUsSectionContent;
}

export function WhyChooseUsSection({ content }: WhyChooseUsSectionProps) {
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
      id="why-choose-us"
      padding="section80"
      variant="default"
      aria-label="Why choose us"
      className="overflow-hidden bg-white"
    >
      <Container size="full" className="max-w-none px-0">
        <div ref={sectionRef} className="flex flex-col">
          <div className="grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.62fr)]">
            <div
              {...reveal(
                0,
                "relative flex min-h-[300px] flex-col justify-center bg-white px-7 py-11 sm:px-9 sm:py-12 lg:min-h-[420px] lg:px-10 lg:py-14 xl:px-12",
              )}
            >
              <DotGrid
                className="absolute bottom-7 left-7 grid grid-cols-5 gap-[5px] sm:bottom-8 sm:left-8 lg:bottom-9 lg:left-9"
                dotClassName="size-[3px] rounded-full bg-[#0c1524]/12"
              />

              <div className="relative flex items-center gap-2.5">
                <span className="h-px w-7 bg-[#F68E05]" aria-hidden />
                <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-[#0c1524]/55 uppercase sm:text-[0.75rem]">
                  {content.label}
                </p>
              </div>

              <h2 className="relative mt-5 text-[2rem] font-bold leading-[1.08] tracking-tight text-[#0c1524] sm:text-[2.2rem] lg:text-[2.35rem] xl:text-[2.5rem]">
                {content.heading}
              </h2>

              <span
                className="relative mt-5 block h-[3px] w-11 bg-[#F68E05]"
                aria-hidden
              />

              <div className="relative mt-7 flex items-stretch gap-4">
                <span className="w-[5px] shrink-0 bg-[#F68E05]" aria-hidden />
                <p className="max-w-[15rem] text-[1.05rem] font-bold leading-[1.35] tracking-tight text-[#0c1524] sm:max-w-[17rem] sm:text-[1.12rem] lg:text-[1.18rem]">
                  {content.subheading}
                </p>
              </div>
            </div>

            <div
              {...reveal(
                80,
                "relative flex flex-col lg:block lg:min-h-[420px]",
              )}
            >
              <div className="relative aspect-[16/10] w-full sm:aspect-[5/3] lg:absolute lg:inset-0 lg:aspect-auto">
                <img
                  src={content.featuredImage.src}
                  alt={content.featuredImage.alt}
                  className="absolute inset-0 size-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="relative flex items-center justify-end lg:absolute lg:inset-0">
                <div className="w-full bg-[#F68E05] px-7 py-10 sm:px-9 sm:py-11 lg:w-[46%] lg:max-w-[22.5rem] lg:px-9 lg:py-12 xl:px-10">
                  <h3 className="text-[1.45rem] font-bold leading-[1.22] tracking-tight text-white sm:text-[1.55rem] lg:text-[1.62rem]">
                    {content.ctaPanel.heading}
                  </h3>

                  <span
                    className="mt-4 block h-px w-9 bg-white/75"
                    aria-hidden
                  />

                  <div className="mt-7 flex flex-col gap-3">
                    <Button
                      size="lg"
                      className="group h-12 w-full justify-between rounded-full border-transparent bg-[#0c1524] px-5 text-[0.875rem] font-medium text-white transition-[transform,background-color] duration-300 ease-out hover:-translate-y-px hover:bg-[#0c1524]/92 sm:px-6 sm:text-[0.9375rem]"
                      asChild
                    >
                      <Link to={content.ctaPanel.ctaPrimary.href}>
                        {content.ctaPanel.ctaPrimary.label}
                        <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="group h-12 w-full justify-between rounded-full border-white/85 bg-transparent px-5 text-[0.875rem] font-medium text-white transition-[transform,background-color,border-color] duration-300 ease-out hover:-translate-y-px hover:border-white hover:bg-white/10 sm:px-6 sm:text-[0.9375rem]"
                      asChild
                    >
                      <Link to={content.ctaPanel.ctaSecondary.href}>
                        {content.ctaPanel.ctaSecondary.label}
                        <Calendar className="size-4 stroke-[1.75]" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2">
            <div
              {...reveal(
                200,
                "relative flex min-h-[320px] flex-col overflow-hidden bg-[#0c1524] px-7 py-11 sm:px-9 sm:py-12 lg:min-h-[340px] lg:px-10 lg:py-12 xl:px-12",
              )}
            >
              {content.mission.backgroundImage && (
                <>
                  <img
                    src={content.mission.backgroundImage.src}
                    alt=""
                    className="absolute inset-0 size-full object-cover object-center opacity-28"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-[#0c1524]/84"
                    aria-hidden
                  />
                </>
              )}

              <DotGrid
                className="absolute right-7 bottom-7 grid grid-cols-5 gap-[5px] sm:right-8 sm:bottom-8 lg:right-9 lg:bottom-9"
                dotClassName="size-[3px] rounded-full bg-white/22"
              />

              <div className="relative flex flex-1 flex-col">
                <div className="flex items-start gap-6 sm:gap-7">
                  <IconFrame>
                    <MissionIcon />
                  </IconFrame>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex items-center gap-2.5">
                      <span className="h-px w-7 bg-[#F68E05]" aria-hidden />
                      <h3 className="text-[1.4rem] font-bold tracking-tight text-white sm:text-[1.5rem]">
                        {content.mission.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-xl text-[0.9rem] leading-[1.8] text-white/76 sm:text-[0.9375rem]">
                      {content.mission.body}
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-2.5 pt-10 sm:pt-12">
                  <span className="h-px w-7 bg-[#F68E05]" aria-hidden />
                  <p className="text-[0.625rem] font-semibold tracking-[0.22em] text-white/90 uppercase sm:text-[0.6875rem]">
                    {content.tagline}
                  </p>
                </div>
              </div>
            </div>

            <div
              {...reveal(
                280,
                "relative flex min-h-[320px] flex-col justify-center overflow-hidden bg-[#eceae8] px-7 py-11 sm:px-9 sm:py-12 lg:min-h-[340px] lg:px-10 lg:py-12 xl:px-12",
              )}
            >
              {content.vision.backgroundImage && (
                <>
                  <img
                    src={content.vision.backgroundImage.src}
                    alt=""
                    className="absolute inset-0 size-full object-cover object-center opacity-32"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-[#eceae8]/88"
                    aria-hidden
                  />
                </>
              )}

              <DotGrid
                className="absolute right-7 bottom-7 grid grid-cols-5 gap-[5px] sm:right-8 sm:bottom-8 lg:right-9 lg:bottom-9"
                dotClassName="size-[3px] rounded-full bg-[#F68E05]/60"
              />

              <div className="relative flex items-start gap-6 sm:gap-7">
                <IconFrame>
                  <VisionIcon />
                </IconFrame>

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-center gap-2.5">
                    <span className="h-px w-7 bg-[#F68E05]" aria-hidden />
                    <h3 className="text-[1.4rem] font-bold tracking-tight text-[#0c1524] sm:text-[1.5rem]">
                      {content.vision.title}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-md text-[0.9rem] leading-[1.8] text-[#0c1524]/74 sm:text-[0.9375rem]">
                    {content.vision.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-[4.25rem] shrink-0 items-center justify-center border border-[#F68E05] text-[#F68E05] sm:size-[4.75rem]">
      {children}
    </div>
  );
}

function MissionIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="size-9 sm:size-10"
      aria-hidden
    >
      <circle cx="20" cy="20" r="12.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="20" cy="20" r="6.25" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="20" cy="20" r="1.75" fill="currentColor" />
      <path d="M20 4.5V9.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M20 30.5V35.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M4.5 20H9.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M30.5 20H35.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function VisionIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="size-9 sm:size-10"
      aria-hidden
    >
      <path
        d="M6 20C10.5 12.5 14.75 9 20 9C25.25 9 29.5 12.5 34 20C29.5 27.5 25.25 31 20 31C14.75 31 10.5 27.5 6 20Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="5.25" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="20" cy="20" r="2.25" fill="currentColor" />
      <path
        d="M13.5 14.5C15.25 13.25 17.25 12.5 20 12.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DotGrid({
  className,
  dotClassName,
}: {
  className?: string;
  dotClassName: string;
}) {
  return (
    <div className={className} aria-hidden>
      {Array.from({ length: 25 }).map((_, index) => (
        <span key={index} className={dotClassName} />
      ))}
    </div>
  );
}
