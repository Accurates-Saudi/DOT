import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { AdminSurface } from "@/components/admin";

interface AdminSectionPlaceholderPageProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export function AdminSectionPlaceholderPage({
  eyebrow,
  title,
  description,
  icon: Icon,
}: AdminSectionPlaceholderPageProps) {
  return (
    <AdminSurface>
      <div className="max-w-3xl">
        <div className="flex size-14 items-center justify-center rounded-2xl border border-[var(--dot-orange)]/30 bg-[var(--dot-orange)]/12 text-[var(--dot-orange)]">
          <Icon className="size-6" />
        </div>
        <p className="mt-6 text-[0.72rem] font-semibold tracking-[0.22em] text-[var(--dot-orange)] uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-4 text-base leading-7 text-white/62">{description}</p>
        <Link
          to="/admin"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--dot-orange)]"
        >
          Back to dashboard
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </AdminSurface>
  );
}
