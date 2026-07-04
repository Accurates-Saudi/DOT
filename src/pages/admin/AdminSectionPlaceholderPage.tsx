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
      <div className="max-w-lg">
        <Icon className="size-8 text-[#888]" />
        <p className="mt-4 text-xs font-medium text-[var(--dot-orange)]">{eyebrow}</p>
        <h2 className="mt-1 text-lg font-semibold text-[#111]">{title}</h2>
        <p className="mt-2 text-sm text-[#666]">{description}</p>
        <Link
          to="/admin"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--dot-orange)] hover:underline"
        >
          Back to dashboard
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </AdminSurface>
  );
}
