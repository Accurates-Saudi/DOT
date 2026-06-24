import { ChevronsRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Container, Section } from "@/components/shared";
import type {
  EngineeringCapabilityStep,
  EngineeringFeatureItem,
  EngineeringSectionContent,
} from "@/types";
import { cn } from "@/lib/utils";

const HEX_CLIP =
  "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

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
      padding="lg"
      variant="default"
      aria-label="Engineering and R&D"
      className="relative overflow-hidden bg-white"
    >
      {content.backgroundImage && (
        <>
          <img
            src={content.backgroundImage.src}
            alt=""
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] w-full object-cover object-center opacity-[0.07]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white/88"
            aria-hidden
          />
        </>
      )}

      <DotGrid
        className="absolute top-8 left-6 hidden opacity-80 sm:grid sm:grid-cols-5 sm:gap-1.5 lg:left-10 lg:top-10"
        dotClassName="size-[3px] rounded-full bg-[#0c1524]/10"
      />
      <DotGrid
        className="absolute top-8 right-6 hidden opacity-80 sm:grid sm:grid-cols-5 sm:gap-1.5 lg:right-10 lg:top-10"
        dotClassName="size-[3px] rounded-full bg-[#0c1524]/10"
      />

      <Container size="wide" className="relative">
        <div ref={sectionRef} className="flex flex-col gap-8 sm:gap-9 lg:gap-10">
          <header {...reveal(0, "mx-auto max-w-3xl text-center")}>
            <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
              {content.label}
            </p>

            <h2 className="mt-3 text-[1.85rem] font-bold tracking-tight text-[#0c1524] sm:text-[2.1rem] lg:text-[2.25rem]">
              {content.heading}{" "}
              <span className="text-[#F68E05]">{content.headingAccent}</span>
            </h2>

            <ul className="mt-4 space-y-1.5 sm:mt-5">
              {content.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start justify-center gap-2.5 text-[0.8125rem] leading-relaxed text-[#0c1524]/68 sm:text-sm"
                >
                  <span
                    className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-[#F68E05]"
                    aria-hidden
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </header>

          {stepOne && stepTwo && (
            <div
              {...reveal(
                100,
                "mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6 xl:gap-8",
              )}
            >
              <CapabilityStep
                step={stepOne}
                stepPosition="left"
                className="lg:justify-end"
              />

              <div
                className="hidden items-center justify-center gap-1.5 text-[#0c1524]/18 lg:flex"
                aria-hidden
              >
                <span className="size-1.5 rounded-full bg-[#F68E05]/80" />
                <ChevronsRight className="size-7 stroke-[1.5]" />
                <span className="size-1.5 rounded-full bg-[#F68E05]/80" />
              </div>

              <div
                className="flex items-center justify-center gap-1.5 text-[#0c1524]/18 lg:hidden"
                aria-hidden
              >
                <span className="size-1.5 rounded-full bg-[#F68E05]/80" />
                <ChevronsRight className="size-6 rotate-90 stroke-[1.5]" />
                <span className="size-1.5 rounded-full bg-[#F68E05]/80" />
              </div>

              <CapabilityStep
                step={stepTwo}
                stepPosition="right"
                className="lg:justify-start"
              />
            </div>
          )}

          <div
            {...reveal(
              220,
              "mx-auto w-full max-w-5xl rounded-2xl bg-[#0c1524] px-4 py-5 sm:px-6 sm:py-6 lg:rounded-[1.35rem] lg:px-8",
            )}
          >
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {content.features.map((feature, index) => (
                <li
                  key={feature.label}
                  className={cn(
                    "flex items-center gap-3 sm:gap-3.5",
                    index > 0 &&
                      "lg:border-l lg:border-white/12 lg:pl-6 xl:pl-8",
                  )}
                >
                  <FeatureHexIcon icon={feature.icon} />
                  <span className="text-[0.8125rem] font-medium leading-snug text-white sm:text-sm">
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function CapabilityStep({
  step,
  stepPosition,
  className,
}: {
  step: EngineeringCapabilityStep;
  stepPosition: "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center",
        stepPosition === "left" ? "lg:flex-row" : "lg:flex-row-reverse",
        className,
      )}
    >
      <div
        className={cn(
          "mb-3 hidden items-center lg:mb-0 lg:flex",
          stepPosition === "left" ? "mr-3 xl:mr-4" : "ml-3 xl:ml-4",
        )}
        aria-hidden
      >
        <StepIndicator label={step.step} />
        <span className="h-px w-8 bg-[#0c1524]/12 xl:w-10" />
      </div>

      <div className="flex w-full max-w-[15.5rem] flex-col items-center sm:max-w-[16.5rem]">
        <p className="mb-2 text-xs font-medium tracking-wide text-[#0c1524]/40 lg:hidden">
          {step.step}
        </p>

        <HexagonFrame icon={step.icon}>
          <img
            src={step.image.src}
            alt={step.image.alt}
            className="size-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </HexagonFrame>

        <div className="mt-4 w-full text-center sm:mt-5">
          <span
            className="mx-auto block h-px w-8 bg-[#F68E05]"
            aria-hidden
          />
          <h3 className="mt-3 text-[0.9375rem] font-bold leading-snug text-[#0c1524] sm:text-base">
            {step.title}
          </h3>
          <p className="mt-1 text-[0.75rem] leading-relaxed text-[#0c1524]/55 sm:text-[0.8125rem]">
            {step.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function HexagonFrame({
  children,
  icon,
}: {
  children: ReactNode;
  icon: EngineeringCapabilityStep["icon"];
}) {
  return (
    <div className="relative mx-auto aspect-[0.88] w-full max-w-[15.5rem] sm:max-w-[16.5rem]">
      <div
        className="absolute inset-[5px] overflow-hidden sm:inset-[6px]"
        style={{ clipPath: HEX_CLIP }}
      >
        {children}
      </div>

      <svg
        viewBox="0 0 200 228"
        className="pointer-events-none absolute inset-0 size-full"
        aria-hidden
      >
        <polygon
          points="50,6 150,6 194,114 150,222 50,222 6,114"
          fill="none"
          stroke="#F68E05"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>

      <div className="absolute bottom-2 left-3 z-10 flex size-9 items-center justify-center rounded-full bg-[#0c1524] text-[#F68E05] sm:bottom-3 sm:left-4 sm:size-10">
        {icon === "drafting" ? <DraftingIcon /> : <CncIcon />}
      </div>
    </div>
  );
}

function StepIndicator({ label }: { label: string }) {
  return (
    <div className="flex size-9 items-center justify-center rounded-full border border-[#0c1524]/12 bg-[#f4f3f2] text-xs font-semibold text-[#0c1524]/45 xl:size-10">
      {label}
    </div>
  );
}

function FeatureHexIcon({ icon }: { icon: EngineeringFeatureItem["icon"] }) {
  return (
    <div className="relative size-9 shrink-0 sm:size-10">
      <svg
        viewBox="0 0 40 46"
        className="absolute inset-0 size-full text-[#F68E05]"
        aria-hidden
      >
        <polygon
          points="10,2 30,2 38,23 30,44 10,44 2,23"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex size-full items-center justify-center text-[#F68E05]">
        {icon === "engineering-tools" && <CubeIcon />}
        {icon === "precision" && <TargetIcon />}
        {icon === "manufacturing" && <GearIcon />}
        {icon === "innovation" && <InnovationIcon />}
      </div>
    </div>
  );
}

function DraftingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4 sm:size-[1.125rem]" aria-hidden>
      <path d="M5 19L16 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 8L19 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="5" cy="19" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 5L16 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CncIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4 sm:size-[1.125rem]" aria-hidden>
      <rect x="4" y="10" width="16" height="8" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 10V7H16V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 14V16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="14" r="1.25" fill="currentColor" />
    </svg>
  );
}

function CubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
      <path d="M12 4L20 8.5V15.5L12 20L4 15.5V8.5L12 4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M12 4V20" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 8.5L12 13L20 8.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M12 3V5M12 19V21M3 12H5M19 12H21M5.6 5.6L7 7M17 17L18.4 18.4M5.6 18.4L7 17M17 7L18.4 5.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InnovationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
      <path
        d="M9 18H15M10 21H14M12 3C9.5 3 7.5 5 7.5 7.5C7.5 9.2 8.3 10.7 9.5 11.7C10.2 12.3 10.5 13.2 10.5 14V16H13.5V14C13.5 13.2 13.8 12.3 14.5 11.7C15.7 10.7 16.5 9.2 16.5 7.5C16.5 5 14.5 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
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
