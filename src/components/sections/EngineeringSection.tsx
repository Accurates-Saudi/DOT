import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Container, Section } from "@/components/shared";
import type {
  EngineeringCapabilityStep,
  EngineeringSectionContent,
} from "@/types";
import { cn } from "@/lib/utils";

export interface EngineeringSectionProps {
  content: EngineeringSectionContent;
}

export function EngineeringSection({ content }: EngineeringSectionProps) {
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

  const [stepOne, stepTwo] = content.steps;

  return (
    <Section
      id="engineering"
      padding="none"
      variant="default"
      aria-label="Engineering and R&D"
      className="relative overflow-hidden bg-white pb-[80px] pt-10 sm:pt-12 lg:pt-14"
    >
      {content.backgroundImage && (
        <>
          <img
            src={content.backgroundImage.src}
            alt=""
            className="pointer-events-none absolute inset-0 size-full object-cover object-center opacity-[0.09]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-white/72"
            aria-hidden
          />
        </>
      )}

      <BlueprintArt className="absolute top-16 left-0 hidden w-36 opacity-[0.14] lg:block xl:w-44" />
      <BlueprintArt
        className="absolute top-16 right-0 hidden w-36 scale-x-[-1] opacity-[0.14] lg:block xl:w-44"
        mirrored
      />

      <Container size="wide" className="relative">
        <div ref={sectionRef} className="flex flex-col gap-7 sm:gap-8 lg:gap-9">
          <header {...reveal(0, "mx-auto max-w-2xl text-center")}>
            <p className="text-[0.6875rem] font-bold tracking-[0.18em] text-[#F68E05] uppercase sm:text-xs">
              {content.label}
            </p>

            <h2 className="mt-2.5 text-[1.75rem] font-bold tracking-tight text-[#0c1524] sm:text-[2rem] lg:text-[2.15rem]">
              {content.heading}{" "}
              <span className="text-[#F68E05]">{content.headingAccent}</span>{" "}
              {content.headingSuffix}
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-[0.8125rem] leading-relaxed text-[#0c1524]/68 sm:mt-4 sm:text-sm">
              {content.intro}
            </p>

            <ul className="mt-4 space-y-1.5 sm:mt-5">
              {content.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start justify-center gap-2.5 text-[0.8125rem] leading-relaxed text-[#0c1524]/68 sm:text-sm"
                >
                  <span
                    className="mt-[0.4rem] flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[#F68E05]"
                    aria-hidden
                  >
                    <span className="size-1 rounded-full bg-white" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </header>

          {stepOne && stepTwo && (
            <div
              {...reveal(
                120,
                "relative mx-auto w-full max-w-3xl lg:max-w-4xl",
              )}
            >
              <div
                className="absolute top-[2.15rem] right-[calc(25%+2.125rem)] left-[calc(25%+2.125rem)] hidden border-t border-dashed border-[#F68E05]/55 lg:block"
                aria-hidden
              />

              <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-12">
                <ProcessStep step={stepOne} />
                <ProcessStep step={stepTwo} />
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

function ProcessStep({ step }: { step: EngineeringCapabilityStep }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative flex flex-col items-center">
        <span
          className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 text-[3.25rem] font-bold leading-none text-[#0c1524]/[0.07] sm:text-[3.75rem]"
          aria-hidden
        >
          {step.step}
        </span>

        <div className="relative flex size-[4.25rem] items-center justify-center rounded-2xl bg-[#F68E05] text-white shadow-[0_10px_28px_-12px_rgba(246,142,5,0.55)] sm:size-[4.5rem]">
          {step.icon === "modeling" ? <ModelingIcon /> : <CncCodeIcon />}
        </div>

        <div className="mt-2 flex flex-col items-center" aria-hidden>
          <span className="h-3 w-px bg-[#F68E05]/70" />
          <span className="mt-1 size-2 rounded-full bg-[#F68E05]" />
        </div>
      </div>

      <h3 className="mt-5 text-[0.9375rem] font-bold leading-snug text-[#0c1524] sm:text-base">
        {step.title}
      </h3>

      <p className="mt-2 max-w-[17rem] text-[0.8125rem] leading-relaxed text-[#0c1524]/62 sm:max-w-xs sm:text-sm">
        {step.description}
      </p>

      <div className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 shadow-[0_6px_24px_-10px_rgba(12,21,36,0.18)] sm:mt-5 sm:px-5 sm:py-2.5">
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#F68E05] text-white">
          <Check className="size-3 stroke-[2.5]" aria-hidden />
        </span>
        <span className="text-[0.75rem] font-medium text-[#0c1524]/82 sm:text-[0.8125rem]">
          {step.tag}
        </span>
      </div>
    </div>
  );
}

function ModelingIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className="size-7 sm:size-8"
      aria-hidden
    >
      <path
        d="M8 22L14 10H20L26 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M11 22H23"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="21" cy="13" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M23.5 15.5L25.5 17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CncCodeIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className="size-7 sm:size-8"
      aria-hidden
    >
      <path
        d="M11 24H21M13 27H19M16 7C12.5 7 10 9.5 10 13C10 15.2 11.1 17.1 12.7 18.2C13.4 18.7 13.8 19.5 13.8 20.4V22H18.2V20.4C18.2 19.5 18.6 18.7 19.3 18.2C20.9 17.1 22 15.2 22 13C22 9.5 19.5 7 16 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="12.5" r="1.25" fill="currentColor" />
      <path
        d="M14.5 10.5C15.2 9.9 16.1 9.5 17 9.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BlueprintArt({ className }: { className?: string; mirrored?: boolean }) {
  return (
    <svg
      viewBox="0 0 180 220"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle
        cx="90"
        cy="72"
        r="42"
        stroke="#0c1524"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <circle cx="90" cy="72" r="28" stroke="#0c1524" strokeWidth="0.75" />
      <path
        d="M48 72H132M90 30V114"
        stroke="#0c1524"
        strokeWidth="0.75"
        strokeDasharray="3 3"
      />
      <rect
        x="34"
        y="138"
        width="112"
        height="52"
        stroke="#0c1524"
        strokeWidth="0.75"
      />
      <path
        d="M34 158H146M68 138V190M112 138V190"
        stroke="#0c1524"
        strokeWidth="0.75"
      />
      <path
        d="M62 124H118"
        stroke="#0c1524"
        strokeWidth="0.75"
        strokeDasharray="2 2"
      />
    </svg>
  );
}
