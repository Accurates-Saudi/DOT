import { ArrowRight, Calendar, Eye, Target } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router";

import { Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { WhyChooseUsSectionContent } from "@/types";
import { getRevealProps } from "@/lib/animations";
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

  const reveal = (delayMs: number, className?: string) =>
    getRevealProps(isVisible, delayMs, className);

  return (
    <Section
      id="why-choose-us"
      padding="none"
      variant="default"
      aria-label="Why choose us"
      className="overflow-hidden bg-white"
    >
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

              <h2 className="relative mt-5 text-[1.75rem] font-bold leading-[1.1] tracking-tight text-[#0c1524] sm:text-[1.9rem] lg:text-[2.05rem] xl:text-[2.15rem]">
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
                      variant="default"
                      size="lg"
                      className="h-12 w-full justify-between rounded-full px-5 text-[0.875rem] font-medium sm:px-6 sm:text-[0.9375rem]"
                      asChild
                    >
                      <Link to={content.ctaPanel.ctaPrimary.href}>
                        {content.ctaPanel.ctaPrimary.label}
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>

                    <Button
                      variant="inverse"
                      size="lg"
                      className="h-12 w-full justify-between rounded-full px-5 text-[0.875rem] font-medium sm:px-6 sm:text-[0.9375rem]"
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

        <div className="grid w-full lg:grid-cols-2">
          <ValueCard
            {...reveal(
              200,
              "relative min-h-[320px] overflow-hidden bg-[#0c1524] lg:min-h-[340px]",
            )}
            title={content.mission.title}
            body={content.mission.body}
            icon={
              <Target
                className="size-11 text-[#F68E05] stroke-[1.35] sm:size-12 lg:size-[3.25rem]"
                aria-hidden
              />
            }
            variant="dark"
            backgroundImage={content.mission.backgroundImage}
            dotClassName="size-[3px] rounded-full bg-white/22"
          />

          <ValueCard
            {...reveal(
              280,
              "relative min-h-[320px] overflow-hidden bg-[#eceae8] lg:min-h-[340px]",
            )}
            title={content.vision.title}
            body={content.vision.body}
            icon={
              <Eye
                className="size-11 text-[#F68E05] stroke-[1.35] sm:size-12 lg:size-[3.25rem]"
                aria-hidden
              />
            }
            variant="light"
            backgroundImage={content.vision.backgroundImage}
            dotClassName="size-[3px] rounded-full bg-[#F68E05]/60"
          />
        </div>
      </div>
    </Section>
  );
}

function ValueCard({
  title,
  body,
  icon,
  variant,
  backgroundImage,
  dotClassName,
  className,
  style,
}: {
  title: string;
  body: string;
  icon: ReactNode;
  variant: "dark" | "light";
  backgroundImage?: { src: string; alt: string };
  dotClassName: string;
  className?: string;
  style?: CSSProperties;
}) {
  const isDark = variant === "dark";

  return (
    <div className={className} style={style}>
      {backgroundImage && (
        <>
          <img
            src={backgroundImage.src}
            alt=""
            className={cn(
              "absolute inset-0 size-full object-cover object-center",
              isDark ? "opacity-28" : "opacity-32",
            )}
            aria-hidden
          />
          <div
            className={cn(
              "absolute inset-0",
              isDark ? "bg-[#0c1524]/84" : "bg-[#eceae8]/88",
            )}
            aria-hidden
          />
        </>
      )}

      <DotGrid
        className="absolute right-7 bottom-7 grid grid-cols-5 gap-[5px] sm:right-8 sm:bottom-8 lg:right-9 lg:bottom-9"
        dotClassName={dotClassName}
      />

      <div className="relative flex h-full min-h-[inherit] items-center px-7 py-11 sm:px-9 sm:py-12 lg:px-10 lg:py-12 xl:px-12">
        <div className="grid w-full grid-cols-[auto_1fr] items-start gap-x-5 gap-y-4 sm:gap-x-6">
          <div className="flex h-[3.25rem] w-11 items-start justify-center sm:w-12 lg:w-[3.25rem]">
            {icon}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-7 shrink-0 bg-[#F68E05]" aria-hidden />
              <h3
                className={cn(
                  "text-[1.35rem] font-bold tracking-tight sm:text-[1.45rem]",
                  isDark ? "text-white" : "text-[#0c1524]",
                )}
              >
                {title}
              </h3>
            </div>

            <p
              className={cn(
                "mt-4 max-w-xl text-[0.9rem] leading-[1.75] sm:text-[0.9375rem]",
                isDark ? "text-white/76" : "text-[#0c1524]/74",
              )}
            >
              {body}
            </p>
          </div>
        </div>
      </div>
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
