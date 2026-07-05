import {
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  Send,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui";
import type {
  CareerJobDetail,
  CareersDetailHeroContent,
  CareersDetailSidebarContent,
} from "@/types";
import { resolveWhyJoinIcon } from "@/utils/career-icons";

export interface CareerDetailSidebarProps {
  job: CareerJobDetail;
  content: CareersDetailSidebarContent;
  detailHero: CareersDetailHeroContent;
  applyHref: string;
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Briefcase;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-[#0c1524]/8 py-3.5 last:border-b-0">
      <Icon className="mt-0.5 size-4 shrink-0 text-[#F68E05] stroke-[1.75]" aria-hidden />
      <div>
        <p className="text-[0.6875rem] font-bold tracking-[0.08em] text-[#0c1524]/45 uppercase">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-[#0c1524]">{value}</p>
      </div>
    </div>
  );
}

export function CareerDetailSidebar({
  job,
  content,
  detailHero,
  applyHref,
}: CareerDetailSidebarProps) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-sm border border-[#0c1524]/8 bg-[#f5f4f2] p-5 sm:p-6">
        <h3 className="text-base font-bold text-[#0c1524]">
          {content.summaryHeading}
        </h3>
        <div className="mt-2">
          <SummaryRow icon={Briefcase} label={detailHero.metaLabels.position} value={job.title} />
          <SummaryRow icon={Users} label={detailHero.metaLabels.department} value={job.department} />
          <SummaryRow icon={MapPin} label={detailHero.metaLabels.location} value={job.location} />
          <SummaryRow icon={Clock} label={detailHero.metaLabels.employmentType} value={job.employmentType} />
          <SummaryRow icon={Calendar} label={detailHero.metaLabels.experience} value={job.experience} />
        </div>
      </div>

      <div className="rounded-sm border border-[#0c1524]/8 bg-white p-5 sm:p-6">
        <h3 className="text-base font-bold text-[#0c1524]">
          {content.whyJoinHeading}
        </h3>
        <ul className="mt-4 space-y-3.5">
          {content.whyJoinItems.map((item, index) => {
            const Icon = resolveWhyJoinIcon(index);

            return (
              <li key={`${item.title}-${index}`} className="flex items-start gap-3">
                <Icon
                  className="mt-0.5 size-4 shrink-0 text-[#F68E05] stroke-[1.75]"
                  aria-hidden
                />
                <span className="text-sm leading-relaxed text-[#0c1524]/72">
                  {item.title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-sm bg-[#0c1524] p-5 sm:p-6">
        <p className="text-base font-bold text-white">{content.ctaHeading}</p>
        <Button
          variant="accent"
          className="mt-4 h-11 w-full rounded-sm text-[0.75rem] font-bold tracking-[0.08em] uppercase"
          asChild
        >
          <a href={applyHref}>
            <Send className="size-4" />
            {content.ctaPrimary.label}
          </a>
        </Button>
      </div>
    </aside>
  );
}
