import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  Send,
  Users,
} from "lucide-react";
import type { Ref } from "react";

import { LocalizedLink } from "@/components/i18n";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container, Section } from "@/components/shared";
import { ParallaxBackgroundImage } from "@/components/shared/ParallaxBackgroundImage";
import { Button } from "@/components/ui";
import { siteSettings } from "@/data/site";
import { useParallaxTransform } from "@/hooks/use-parallax-transform";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type {
  CareerJobDetail,
  CareersDetailHeroContent,
  CareersDetailSidebarContent,
} from "@/types";
import { resolveSkillIcon } from "@/utils/career-icons";

import { CareerDetailSidebar } from "./CareerDetailSidebar";

import careerDetailHeroImage from "@/assets/engineering/cnc.png";

export interface CareerDetailViewProps {
  job: CareerJobDetail;
  detailHero: CareersDetailHeroContent;
  detailSidebar: CareersDetailSidebarContent;
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Briefcase;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm bg-[#F68E05]/15 text-[#F68E05]">
        <Icon className="size-4 stroke-[1.75]" aria-hidden />
      </span>
      <div>
        <p className="text-[0.6875rem] font-bold tracking-[0.08em] text-white/55 uppercase">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

export function CareerDetailView({
  job,
  detailHero,
  detailSidebar,
}: CareerDetailViewProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { containerRef, targetRef } = useParallaxTransform({
    speed: 0.2,
    mode: "scroll",
    disabled: prefersReducedMotion,
  });

  const applyHref = `mailto:${siteSettings.contact.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`;
  const breadcrumbs = [
    ...detailHero.breadcrumbs,
    { label: job.title },
  ];

  return (
    <>
      <Section
        id="career-detail-hero"
        padding="none"
        aria-label={job.title}
        className="relative overflow-hidden border-b border-[#0c1524]/10 bg-[#0c1524]"
      >
        <div
          ref={containerRef as Ref<HTMLDivElement>}
          className="relative py-10 md:py-12"
        >
          <ParallaxBackgroundImage
            src={careerDetailHeroImage}
            targetRef={targetRef as Ref<HTMLImageElement>}
            priority
            objectPosition="center"
          />

          <div className="pointer-events-none absolute inset-0 bg-[#0c1524]/55" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F68E05]/22 via-transparent to-[#0c1524]/45"
            aria-hidden
          />

          <Container className="relative z-[1]">
            <Breadcrumb items={breadcrumbs} variant="onDark" highlightLast />

            <div className="mt-6 max-w-4xl">
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.5rem]">
                {job.title}
              </h1>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetaItem
                  icon={Users}
                  label={detailHero.metaLabels.department}
                  value={job.department}
                />
                <MetaItem
                  icon={MapPin}
                  label={detailHero.metaLabels.location}
                  value={job.location}
                />
                <MetaItem
                  icon={Clock}
                  label={detailHero.metaLabels.employmentType}
                  value={job.employmentType}
                />
                <MetaItem
                  icon={Calendar}
                  label={detailHero.metaLabels.experience}
                  value={job.experience}
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  variant="accent"
                  className="h-11 rounded-sm px-6 text-[0.75rem] font-bold tracking-[0.08em] uppercase"
                  asChild
                >
                  <a href={applyHref}>
                    <Send className="size-4" />
                    {detailHero.applyLabel}
                  </a>
                </Button>
                <Button
                  variant="inverse"
                  className="h-11 rounded-sm border-white/30 bg-transparent px-6 text-[0.75rem] font-bold tracking-[0.08em] text-white uppercase hover:bg-white/10"
                  asChild
                >
                  <LocalizedLink to="/careers">
                    <ArrowLeft className="size-4" />
                    {detailHero.backLabel}
                  </LocalizedLink>
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </Section>

      <Section
        id="career-detail-content"
        padding="none"
        aria-label="Job details"
        className="bg-white"
      >
        <Container size="wide" className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-12 xl:gap-16">
            <div className="min-w-0 space-y-10">
              <section>
                <h2 className="text-xl font-bold text-[#0c1524] sm:text-[1.35rem]">
                  {detailHero.sectionHeadings.overview}
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#0c1524]/72">
                  {job.overview}
                </p>
              </section>

              {job.responsibilities.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-[#0c1524] sm:text-[1.35rem]">
                    {detailHero.sectionHeadings.responsibilities}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {job.responsibilities.map((item, index) => (
                      <li key={`${item}-${index}`} className="flex gap-3">
                        <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#F68E05] text-white">
                          <span className="text-[0.625rem] font-bold">✓</span>
                        </span>
                        <span className="text-[0.9375rem] leading-relaxed text-[#0c1524]/75">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {job.requirements.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-[#0c1524] sm:text-[1.35rem]">
                    {detailHero.sectionHeadings.requirements}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {job.requirements.map((item, index) => (
                      <li
                        key={`${item}-${index}`}
                        className="flex gap-3 text-[0.9375rem] leading-relaxed text-[#0c1524]/75"
                      >
                        <span
                          className="mt-2.5 size-2 shrink-0 rounded-full bg-[#F68E05]"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {job.preferredSkills.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-[#0c1524] sm:text-[1.35rem]">
                    {detailHero.sectionHeadings.preferredSkills}
                  </h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {job.preferredSkills.map((skill, index) => {
                      const Icon = resolveSkillIcon(skill);

                      return (
                        <div
                          key={`${skill}-${index}`}
                          className="flex flex-col items-center rounded-sm border border-[#0c1524]/8 bg-[#f8f7f5] px-4 py-5 text-center"
                        >
                          <Icon
                            className="size-7 text-[#F68E05] stroke-[1.5]"
                            aria-hidden
                          />
                          <p className="mt-3 text-sm font-semibold text-[#0c1524]">
                            {skill}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            <CareerDetailSidebar
              job={job}
              content={detailSidebar}
              detailHero={detailHero}
              applyHref={applyHref}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
