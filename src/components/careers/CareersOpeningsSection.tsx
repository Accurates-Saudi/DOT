import { ArrowRight, Mail } from "lucide-react";

import { LocalizedLink } from "@/components/i18n";
import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { CareerJobDetail, CareersOpeningsContent } from "@/types";
import { resolveDepartmentIcon } from "@/utils/career-icons";
import { cn } from "@/lib/utils";

export interface CareersOpeningsSectionProps {
  content: CareersOpeningsContent;
  jobs: CareerJobDetail[];
}

export function CareersOpeningsSection({
  content,
  jobs,
}: CareersOpeningsSectionProps) {
  return (
    <Section
      id="careers-openings"
      padding="none"
      aria-label="Current openings"
      className="scroll-mt-24 bg-[#f8f7f5]"
    >
      <Container size="wide" className="px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
            <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
              {content.label}
            </p>
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0c1524] sm:text-3xl lg:text-[2rem]">
            {content.heading}
          </h2>
        </div>

        <div className="mt-8 overflow-hidden rounded-sm border border-[#0c1524]/10 bg-white shadow-[0_1px_3px_rgba(12,21,36,0.04)]">
          <div className="hidden border-b border-[#0c1524]/8 bg-[#f5f4f2] px-5 py-3.5 text-[0.6875rem] font-bold tracking-[0.1em] text-[#0c1524]/55 uppercase sm:grid sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)_auto] sm:gap-4 sm:px-6 lg:px-8">
            <span>{content.columns.position}</span>
            <span>{content.columns.department}</span>
            <span>{content.columns.location}</span>
            <span>{content.columns.type}</span>
            <span className="text-end">{content.columns.action}</span>
          </div>

          <ul className="divide-y divide-[#0c1524]/8">
            {jobs.map((job) => {
              const Icon = resolveDepartmentIcon(job.department);

              return (
                <li key={job.id}>
                  <div className="flex flex-col gap-4 px-5 py-5 sm:grid sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)_auto] sm:items-center sm:gap-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm bg-[#F68E05]/10 text-[#F68E05]">
                        <Icon className="size-4 stroke-[1.75]" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[0.6875rem] font-bold tracking-[0.08em] text-[#0c1524]/45 uppercase sm:hidden">
                          {content.columns.position}
                        </p>
                        <p className="font-semibold text-[#0c1524]">{job.title}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[0.6875rem] font-bold tracking-[0.08em] text-[#0c1524]/45 uppercase sm:hidden">
                        {content.columns.department}
                      </p>
                      <p className="text-sm text-[#0c1524]/72">{job.department}</p>
                    </div>

                    <div>
                      <p className="text-[0.6875rem] font-bold tracking-[0.08em] text-[#0c1524]/45 uppercase sm:hidden">
                        {content.columns.location}
                      </p>
                      <p className="text-sm text-[#0c1524]/72">{job.location}</p>
                    </div>

                    <div>
                      <p className="text-[0.6875rem] font-bold tracking-[0.08em] text-[#0c1524]/45 uppercase sm:hidden">
                        {content.columns.type}
                      </p>
                      <p className="text-sm text-[#0c1524]/72">{job.employmentType}</p>
                    </div>

                    <div className="sm:text-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "h-9 rounded-sm border border-[#F68E05] bg-white px-4 text-[0.6875rem] font-bold tracking-[0.08em] text-[#F68E05] uppercase",
                          "hover:border-[#F68E05] hover:bg-[#F68E05] hover:text-white",
                        )}
                        asChild
                      >
                        <LocalizedLink to={`/careers/${job.slug}`}>
                          {content.viewDetailsLabel}
                          <ArrowRight className="size-3.5" />
                        </LocalizedLink>
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 rounded-sm border border-[#0c1524]/8 bg-white p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
          <div className="flex gap-4 sm:max-w-2xl">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-sm bg-[#F68E05]/10 text-[#F68E05]">
              <Mail className="size-5" aria-hidden />
            </span>
            <div>
              <h3 className="text-lg font-bold text-[#0c1524]">
                {content.generalApplication.heading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#0c1524]/68 sm:text-[0.9375rem]">
                {content.generalApplication.body}
              </p>
            </div>
          </div>

          <Button
            variant="accent"
            size="lg"
            className="mt-5 h-11 w-full shrink-0 rounded-sm px-6 text-[0.75rem] font-bold tracking-[0.08em] uppercase sm:mt-0 sm:w-auto"
            asChild
          >
            <LocalizedLink to={content.generalApplication.ctaPrimary.href}>
              {content.generalApplication.ctaPrimary.label}
            </LocalizedLink>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
