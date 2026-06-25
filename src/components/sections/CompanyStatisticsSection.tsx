import { Clock, Globe, HardHat, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Ref } from "react";
import { useEffect, useRef, useState } from "react";

import { Container, ParallaxBackgroundImage, Section } from "@/components/shared";
import { useCountUp } from "@/hooks/use-count-up";
import { useParallaxTransform } from "@/hooks/use-parallax-transform";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type {
  CompanyStatisticItem,
  CompanyStatisticsSectionContent,
} from "@/types";
import { cn } from "@/lib/utils";

const STAT_ICONS: Record<CompanyStatisticItem["icon"], LucideIcon> = {
  experience: Clock,
  projects: HardHat,
  clients: Users,
  countries: Globe,
};

export interface CompanyStatisticsSectionProps {
  content: CompanyStatisticsSectionContent;
}

export function CompanyStatisticsSection({
  content,
}: CompanyStatisticsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { containerRef, targetRef } = useParallaxTransform({
    speed: 0.32,
    disabled: prefersReducedMotion,
  });

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

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
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <Section
      id="company-statistics"
      padding="none"
      variant="default"
      aria-label="Company statistics"
      className="relative overflow-hidden bg-[#0c1524]"
    >
      <div
        ref={(node) => {
          sectionRef.current = node;
          containerRef.current = node;
        }}
        className="relative flex min-h-[300px] items-center py-14 sm:min-h-[340px] sm:py-16 lg:min-h-[360px]"
      >
        <ParallaxBackgroundImage
          src={content.backgroundImage.src}
          targetRef={targetRef as Ref<HTMLImageElement>}
        />

        <div
          className="pointer-events-none absolute inset-0 bg-[#0c1524]/35"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F68E05]/38 via-[#F68E05]/28 to-[#0c1524]/42"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,transparent_30%,rgba(12,21,36,0.18)_100%)]"
          aria-hidden
        />

        <Container size="wide" className="relative z-[1]">
          <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-0 lg:max-w-5xl lg:gap-x-16">
            {content.items.map((item, index) => (
              <StatisticEntry
                key={item.id}
                item={item}
                isVisible={isVisible}
                prefersReducedMotion={prefersReducedMotion}
                revealDelay={index * 80}
              />
            ))}
          </ul>
        </Container>
      </div>
    </Section>
  );
}

function StatisticEntry({
  item,
  isVisible,
  prefersReducedMotion,
  revealDelay,
}: {
  item: CompanyStatisticItem;
  isVisible: boolean;
  prefersReducedMotion: boolean;
  revealDelay: number;
}) {
  const Icon = STAT_ICONS[item.icon];
  const count = useCountUp({
    target: item.value,
    isActive: isVisible,
    disabled: prefersReducedMotion,
  });

  return (
    <li
      className={cn(
        "flex flex-col items-center text-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
      )}
      style={{ transitionDelay: isVisible ? `${revealDelay}ms` : "0ms" }}
    >
      <span className="flex size-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-[2px] sm:size-12">
        <Icon className="size-5 stroke-[1.65]" aria-hidden />
      </span>

      <p className="mt-4 text-[2.35rem] font-bold leading-none tracking-tight text-white sm:mt-5 sm:text-[2.65rem] lg:text-[2.85rem]">
        <span className="tabular-nums">{count}</span>
        {item.suffix && (
          <span className="text-[#F68E05]">{item.suffix}</span>
        )}
      </p>

      <p className="mt-2.5 max-w-[9rem] text-[0.8125rem] font-medium leading-snug tracking-wide text-white/88 uppercase sm:mt-3 sm:text-[0.875rem]">
        {item.label}
      </p>
    </li>
  );
}
