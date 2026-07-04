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
      className={cn("rounded-md border border-[#e5e5e5] bg-white", className)}
    >
      {(title || description) && (
        <header className="border-b border-[#e5e5e5] px-6 py-5">
          {title && (
            <h2 className="text-base font-semibold text-[#111]">{title}</h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-[#666]">{description}</p>
          )}
        </header>
      )}
      <div className={cn("px-6 py-5", contentClassName)}>{children}</div>
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
    <div className="rounded-md border border-[#e5e5e5] bg-[#f8f8f8] p-5">
      <p className="text-sm font-medium text-[#888]">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[#111]">{value}</p>
      <p className="mt-1 text-sm text-[#666]">{detail}</p>
    </div>
  );
}
