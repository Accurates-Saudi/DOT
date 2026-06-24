import { Factory, Lightbulb } from "lucide-react";

import type { EngineeringManufacturingCapability } from "@/types";

export function CapabilityIcon({
  icon,
  className = "size-5",
}: {
  icon: EngineeringManufacturingCapability["icon"];
  className?: string;
}) {
  switch (icon) {
    case "engineering":
      return <EngineeringBlueprintIcon className={className} />;
    case "manufacturing":
      return <Factory className={className} strokeWidth={1.35} aria-hidden />;
    case "quality":
      return <QualityShieldIcon className={className} />;
    case "innovation":
      return <Lightbulb className={className} strokeWidth={1.35} aria-hidden />;
  }
}

function EngineeringBlueprintIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect
        x="4"
        y="3"
        width="16"
        height="18"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <path
        d="M8 8h8M8 12h8M8 16h5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <circle cx="17" cy="16" r="2" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}

function QualityShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3.5 6 6v5.8c0 3.5 2.6 6.8 6 7.7 3.4-.9 6-4.2 6-7.7V6l-6-2.5Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
