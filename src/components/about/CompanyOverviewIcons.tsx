import type { ReactNode } from "react";
import {
  Calendar,
  Factory,
  Globe,
  HardHat,
  type LucideIcon,
} from "lucide-react";

import type {
  CompanyOverviewFeature,
  CompanyOverviewStat,
} from "@/types";
import { cn } from "@/lib/utils";

const STAT_ICONS: Record<CompanyOverviewStat["icon"], LucideIcon> = {
  experience: Calendar,
  facility: Factory,
  professionals: HardHat,
  countries: Globe,
};

export function CompanyOverviewFeatureIcon({
  icon,
  className = "size-7 sm:size-8",
}: {
  icon: CompanyOverviewFeature["icon"];
  className?: string;
}) {
  switch (icon) {
    case "saudi-made":
      return <SaudiMadeIcon className={className} />;
    case "quality-driven":
      return <QualityDrivenIcon className={className} />;
    case "client-focused":
      return <ClientFocusedIcon className={className} />;
    case "global-supply":
      return <GlobalSupplyIcon className={className} />;
  }
}

export function CompanyOverviewStatIcon({
  icon,
  className = "size-8 sm:size-9",
}: {
  icon: CompanyOverviewStat["icon"];
  className?: string;
}) {
  const Icon = STAT_ICONS[icon];
  return <Icon className={className} strokeWidth={1.35} aria-hidden />;
}

function FeatureIconFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-[3.25rem] shrink-0 items-center justify-center border border-[#F68E05] text-[#F68E05] sm:size-14">
      {children}
    </div>
  );
}

function StatIconFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-14 shrink-0 items-center justify-center rounded-sm border border-[#F68E05]/70 bg-white text-[#F68E05] sm:size-[3.75rem]">
      {children}
    </div>
  );
}

export function CompanyOverviewFeatureIconFrame({
  icon,
}: {
  icon: CompanyOverviewFeature["icon"];
}) {
  return (
    <FeatureIconFrame>
      <CompanyOverviewFeatureIcon icon={icon} />
    </FeatureIconFrame>
  );
}

export function CompanyOverviewStatIconFrame({
  icon,
}: {
  icon: CompanyOverviewStat["icon"];
}) {
  return (
    <StatIconFrame>
      <CompanyOverviewStatIcon icon={icon} />
    </StatIconFrame>
  );
}

export function CompanyOverviewStatDivider({
  className,
}: {
  className?: string;
}) {
  return (
    <span
      className={cn(
        "hidden w-px shrink-0 self-stretch bg-[#F68E05]/40 lg:block",
        className,
      )}
      aria-hidden
    />
  );
}

function SaudiMadeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        d="M11 8.5h18c2.5 0 4.5 2 4.5 4.5v14.5c0 2.5-2 4.5-4.5 4.5H11c-2.5 0-4.5-2-4.5-4.5V13c0-2.5 2-4.5 4.5-4.5Z"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <path
        d="M14 15c1.5-1 3.2-1.5 5-1.5s3.5.5 5 1.5M14 20c1.8-1.1 3.8-1.7 6-1.7s4.2.6 6 1.7M14 25.5c2-1.2 4.3-1.8 6.5-1.8s4.5.6 6.5 1.8"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function QualityDrivenIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        d="M20 7 10 10.5v8.8c0 5.8 4 11.2 10 13 6-1.8 10-7.2 10-13V10.5L20 7Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="m15.5 20 2.8 2.8 6.2-6.2"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClientFocusedIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <circle cx="20" cy="13.5" r="4" stroke="currentColor" strokeWidth="1.35" />
      <circle cx="11" cy="16.5" r="3" stroke="currentColor" strokeWidth="1.35" />
      <circle cx="29" cy="16.5" r="3" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M9 29c1.4-3.2 4.5-5.2 11-5.2s9.6 2 11 5.2M5.5 27.5c1-2.4 3-3.8 5.5-3.8M34.5 27.5c-1-2.4-3-3.8-5.5-3.8"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GlobalSupplyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <circle cx="20" cy="20" r="12.5" stroke="currentColor" strokeWidth="1.35" />
      <ellipse
        cx="20"
        cy="20"
        rx="5.5"
        ry="12.5"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <path
        d="M7.5 20h25M9 14.5h22M9 25.5h22"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}
