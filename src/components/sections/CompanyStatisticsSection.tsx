import { Clock, Globe, HardHat, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Ref } from "react";

import { LocalizedNumeric } from "@/components/i18n";
import { Container, ParallaxBackgroundImage, Section } from "@/components/shared";
import { useCountUp, useScrollReveal } from "@/hooks";
import { useNumberFormat } from "@/i18n/hooks";
import { useParallaxTransform } from "@/hooks/use-parallax-transform";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { getRevealProps } from "@/lib/animations";
import type {
  CompanyStatisticItem,
  CompanyStatisticsSectionContent,
} from "@/types";

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
  const { ref: sectionRef, isVisible } = useScrollReveal({
    threshold: 0.25,
    rootMargin: "0px 0px -8% 0px",
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  const { containerRef, targetRef } = useParallaxTransform({
    speed: 0.32,
    disabled: prefersReducedMotion,
  });

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
          objectPosition={content.backgroundImage.objectPosition}
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
  const { formatNumber } = useNumberFormat();
  const Icon = STAT_ICONS[item.icon];
  const count = useCountUp({
    target: item.value,
    isActive: isVisible,
    disabled: prefersReducedMotion,
  });

  const reveal = getRevealProps(
    isVisible,
    revealDelay,
    "flex flex-col items-center text-center",
  );

  return (
    <li {...reveal}>
      <span className="flex size-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-[2px] sm:size-12">
        <Icon className="size-5 stroke-[1.65]" aria-hidden />
      </span>

      <p className="mt-4 text-[2.35rem] font-bold leading-none tracking-tight text-white sm:mt-5 sm:text-[2.65rem] lg:text-[2.85rem]">
        <LocalizedNumeric
          isolateLtr={Boolean(item.suffix)}
          className="tabular-nums"
        >
          <span>{formatNumber(count)}</span>
          {item.suffix && (
            <span className="text-[#F68E05]">{item.suffix}</span>
          )}
        </LocalizedNumeric>
      </p>

      <p className="mt-2.5 max-w-[9rem] text-[0.8125rem] font-medium leading-snug tracking-wide text-white/88 uppercase sm:mt-3 sm:text-[0.875rem]">
        {item.label}
      </p>
    </li>
  );
}
