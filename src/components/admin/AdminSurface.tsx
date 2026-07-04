import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AdminSurfaceProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function AdminSurface({
  title,
  description,
  children,
  className,
  contentClassName,
}: AdminSurfaceProps) {
  return (
    <section
      className={cn(
        "rounded-[1.75rem] border border-[#0c1524]/8 bg-white shadow-[0_28px_70px_-46px_rgba(12,21,36,0.22)]",
        className,
      )}
    >
      {(title || description) && (
        <header className="border-b border-[#0c1524]/6 px-6 py-5 sm:px-8">
          {title && (
            <h2 className="text-lg font-semibold tracking-[0.01em] text-[#0c1524]">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-1 text-sm leading-6 text-[#0c1524]/56">{description}</p>
          )}
        </header>
      )}
      <div className={cn("px-6 py-5 sm:px-8 sm:py-6", contentClassName)}>{children}</div>
    </section>
  );
}

interface AdminMetricCardProps {
  label: string;
  value: string;
  detail: string;
}

export function AdminMetricCard({ label, value, detail }: AdminMetricCardProps) {
  return (
    <div className="rounded-2xl border border-[#0c1524]/8 bg-[#f5f6f8] p-5">
      <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-[var(--dot-orange)] uppercase">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-[#0c1524]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[#0c1524]/56">{detail}</p>
    </div>
  );
}
