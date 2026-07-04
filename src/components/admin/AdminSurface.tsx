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
        "rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_30px_80px_-50px_rgba(12,21,36,0.9)] backdrop-blur-sm",
        className,
      )}
    >
      {(title || description) && (
        <header className="border-b border-white/8 px-6 py-5 sm:px-8">
          {title && (
            <h2 className="text-lg font-semibold tracking-[0.01em] text-white">
              {title}
            </h2>
          )}
          {description && <p className="mt-1 text-sm text-white/58">{description}</p>}
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
    <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
      <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-[var(--dot-orange)] uppercase">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-white/55">{detail}</p>
    </div>
  );
}
