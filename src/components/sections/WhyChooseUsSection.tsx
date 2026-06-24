import { ArrowRight, Calendar, Eye, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
      padding="none"
      variant="default"
      aria-label="Why choose us"
      className="overflow-hidden bg-white"
    >
      <Container size="wide" className="px-0 sm:px-0 lg:px-8">
        <div ref={sectionRef} className="flex flex-col">
          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.55fr)]">
            <div
              {...reveal(
                0,
                "relative flex flex-col justify-center bg-[#f4f3f2] px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-12",
              )}
            >
              <DotGrid
                className="absolute bottom-6 left-6 hidden opacity-40 sm:grid sm:grid-cols-5 sm:gap-1.5 lg:bottom-8 lg:left-8"
                dotClassName="size-1 rounded-full bg-[#0c1524]/15"
              />

              <div className="relative flex items-center gap-3">
                <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
                <p className="text-[0.75rem] font-semibold tracking-[0.16em] text-[#0c1524]/75 uppercase sm:text-[0.8125rem]">
                  {content.label}
                </p>
              </div>

              <h2 className="relative mt-5 text-[2rem] font-semibold tracking-tight text-[#0c1524] sm:text-[2.15rem] lg:text-[2.35rem] xl:text-[2.5rem]">
                {content.heading}
              </h2>

              <span
                className="relative mt-4 block h-1 w-12 rounded-full bg-[#F68E05] sm:mt-5"
                aria-hidden
              />

              <div className="relative mt-6 flex gap-4 sm:mt-7">
                <span
                  className="w-1 shrink-0 rounded-full bg-[#F68E05]"
                  aria-hidden
                />
                <p className="max-w-sm text-lg font-semibold leading-snug tracking-tight text-[#0c1524] sm:text-xl lg:text-[1.35rem]">
                  {content.subheading}
                </p>
              </div>
            </div>

            <div {...reveal(120, "relative flex flex-col lg:block lg:min-h-[420px]")}>
              <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
                <img
                  src={content.featuredImage.src}
                  alt={content.featuredImage.alt}
                  className="absolute inset-0 size-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="relative flex flex-col justify-center bg-[#F68E05] px-6 py-10 sm:px-8 sm:py-12 lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:w-[42%] lg:px-8 lg:py-10 xl:px-10">
                <h3 className="max-w-xs text-2xl font-semibold leading-tight tracking-tight text-white sm:text-[1.65rem] lg:text-[1.75rem]">
                  {content.ctaPanel.heading}
                </h3>

                <span
                  className="mt-4 block h-0.5 w-10 rounded-full bg-white/70"
                  aria-hidden
                />

                <div className="mt-7 flex flex-col gap-3 sm:mt-8">
                  <Button
                    className="group h-11 w-full justify-between rounded-sm border-transparent bg-[#0c1524] px-5 text-[0.875rem] font-medium text-white transition-[transform,background-color] duration-300 ease-out hover:-translate-y-px hover:bg-[#0c1524]/90 sm:h-12 sm:text-[0.9375rem]"
                    asChild
                  >
                    <Link to={content.ctaPanel.ctaPrimary.href}>
                      {content.ctaPanel.ctaPrimary.label}
                      <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="group h-11 w-full justify-between rounded-sm border-white/80 bg-transparent px-5 text-[0.875rem] font-medium text-white transition-[transform,background-color,border-color] duration-300 ease-out hover:-translate-y-px hover:border-white hover:bg-white/10 sm:h-12 sm:text-[0.9375rem]"
                    asChild
                  >
                    <Link to={content.ctaPanel.ctaSecondary.href}>
                      {content.ctaPanel.ctaSecondary.label}
                      <Calendar className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2">
            <div
              {...reveal(
                220,
                "relative overflow-hidden bg-[#0c1524] px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14",
              )}
            >
              {content.mission.backgroundImage && (
                <>
                  <img
                    src={content.mission.backgroundImage.src}
                    alt=""
                    className="absolute inset-0 size-full object-cover object-center opacity-25"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-[#0c1524]/78"
                    aria-hidden
                  />
                </>
              )}

              <div className="relative grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
                <IconFrame icon={Target} variant="dark" />
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.65rem]">
                    {content.mission.title}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-[1.75] text-white/78 sm:text-base">
                    {content.mission.body}
                  </p>
                </div>
              </div>
            </div>

            <div
              {...reveal(
                300,
                "relative overflow-hidden bg-[#f4f3f2] px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14",
              )}
            >
              {content.vision.backgroundImage && (
                <>
                  <img
                    src={content.vision.backgroundImage.src}
                    alt=""
                    className="absolute inset-0 size-full object-cover object-center opacity-20"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-[#f4f3f2]/88"
                    aria-hidden
                  />
                </>
              )}

              <DotGrid
                className="absolute right-6 bottom-6 hidden opacity-80 sm:grid sm:grid-cols-5 sm:gap-1.5 lg:right-8 lg:bottom-8"
                dotClassName="size-1 rounded-full bg-[#F68E05]/55"
              />

              <div className="relative grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
                <IconFrame icon={Eye} variant="light" />
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-[#0c1524] sm:text-[1.65rem]">
                    {content.vision.title}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-[1.75] text-[#0c1524]/72 sm:text-base">
                    {content.vision.body}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            {...reveal(
              380,
              "relative flex items-center bg-[#0c1524] px-6 py-4 sm:px-8 sm:py-5 lg:px-10",
            )}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
              <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-white/90 uppercase sm:text-xs">
                {content.tagline}
              </p>
            </div>

            <DotGrid
              className="absolute right-6 bottom-3 hidden opacity-90 sm:grid sm:grid-cols-5 sm:gap-1.5 lg:right-10"
              dotClassName="size-1 rounded-full bg-[#F68E05]/70"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function IconFrame({
  icon: Icon,
  variant,
}: {
  icon: typeof Target;
  variant: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "flex size-16 shrink-0 items-center justify-center border-2 sm:size-[4.5rem]",
        variant === "dark"
          ? "border-[#F68E05] text-[#F68E05]"
          : "border-[#F68E05] text-[#F68E05]",
      )}
    >
      <Icon className="size-7 stroke-[1.5] sm:size-8" aria-hidden />
    </div>
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
