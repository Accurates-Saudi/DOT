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

const STAT_ICONS: Record<CompanyOverviewStat["icon"], LucideIcon> = {
  experience: Calendar,
  facility: Factory,
  professionals: HardHat,
  countries: Globe,
};

export function CompanyOverviewFeatureIcon({
  icon,
  className = "size-8",
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
  className = "size-9 sm:size-10",
}: {
  icon: CompanyOverviewStat["icon"];
  className?: string;
}) {
  const Icon = STAT_ICONS[icon];
  return <Icon className={className} strokeWidth={1.25} aria-hidden />;
}

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-[3.25rem] shrink-0 items-center justify-center border border-[#F68E05] text-[#F68E05] sm:size-[3.5rem]">
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
    <IconFrame>
      <CompanyOverviewFeatureIcon icon={icon} />
    </IconFrame>
  );
}

export function CompanyOverviewStatIconFrame({
  icon,
}: {
  icon: CompanyOverviewStat["icon"];
}) {
  return (
    <IconFrame>
      <CompanyOverviewStatIcon icon={icon} />
    </IconFrame>
  );
}

function SaudiMadeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M10.5 6.5h11c2.2 0 4 1.8 4 4v11c0 2.2-1.8 4-4 4h-11c-2.2 0-4-1.8-4-4v-11c0-2.2 1.8-4 4-4Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M12.5 11.5c1.2-.8 2.6-1.2 4-1.2s2.8.4 4 1.2M12.5 16c1.4-.9 3.1-1.4 4.8-1.4 1.7 0 3.4.5 4.8 1.4M12.5 20.5c1.6-1 3.5-1.5 5.3-1.5s3.7.5 5.3 1.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function QualityDrivenIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M16 5.5 8.5 8.5v7.2c0 4.8 3.2 9.3 7.5 10.8 4.3-1.5 7.5-6 7.5-10.8V8.5L16 5.5Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="m12.5 16 2.4 2.4L19.8 13"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClientFocusedIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="16" cy="11" r="3.25" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="9" cy="13.5" r="2.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="23" cy="13.5" r="2.5" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M7.5 23.5c1.2-2.8 3.8-4.5 8.5-4.5s7.3 1.7 8.5 4.5M4.5 22.5c.8-2 2.5-3.2 4.5-3.2M27.5 22.5c-.8-2-2.5-3.2-4.5-3.2"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GlobalSupplyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="16" cy="16" r="10.5" stroke="currentColor" strokeWidth="1.1" />
      <ellipse
        cx="16"
        cy="16"
        rx="4.5"
        ry="10.5"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M5.5 16h21M7 11h18M7 21h18"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
