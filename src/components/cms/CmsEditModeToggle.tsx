import { PencilLine } from "lucide-react";

import { cn } from "@/lib/utils";

interface CmsEditModeToggleProps {
  isActive: boolean;
  onToggle: () => void;
  compact?: boolean;
  tone?: "light" | "dark";
  className?: string;
}

export function CmsEditModeToggle({
  isActive,
  onToggle,
  compact = false,
  tone = "light",
  className,
}: CmsEditModeToggleProps) {
  const isDark = tone === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isActive}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border transition-[background-color,border-color,color,box-shadow] duration-300",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:rgba(246,142,5,0.18)]",
        compact
          ? "h-9 shrink-0 px-3 text-[0.8125rem] font-medium"
          : "h-9 shrink-0 px-3.5 text-sm font-medium",
        isActive
          ? "border-[var(--dot-orange)] bg-[var(--dot-orange)] text-white shadow-[0_10px_30px_-18px_rgba(246,142,5,0.75)]"
          : isDark
            ? "border-white/18 bg-white/8 text-white hover:border-white/26 hover:bg-white/14"
            : "border-[#0c1524]/12 bg-white text-[#0c1524] hover:border-[var(--dot-orange)]/45 hover:bg-[var(--dot-orange)]/[0.06]",
        className,
      )}
    >
      <PencilLine className="size-4" />
      {isActive ? "Edit Mode On" : "Edit Mode"}
    </button>
  );
}
