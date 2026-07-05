import { Container, Section } from "@/components/shared";
import type { CareersHiringProcessContent } from "@/types";
import { resolveHiringStepIcon } from "@/utils/career-icons";
import { cn } from "@/lib/utils";

export interface CareersHiringProcessSectionProps {
  content: CareersHiringProcessContent;
}

export function CareersHiringProcessSection({
  content,
}: CareersHiringProcessSectionProps) {
  return (
    <Section
      id="careers-hiring-process"
      padding="none"
      aria-label="Hiring process"
      className="border-b border-[#0c1524]/8 bg-white"
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

        <div className="relative mt-10 lg:mt-12">
          <div
            className="pointer-events-none absolute top-8 right-[12%] left-[12%] hidden border-t border-dashed border-[#0c1524]/15 lg:block"
            aria-hidden
          />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {content.steps.map((step, index) => {
              const Icon = resolveHiringStepIcon(index);
              const stepNumber = String(index + 1).padStart(2, "0");

              return (
                <li key={`${step.title}-${index}`} className="relative text-center">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full border-2 border-[#F68E05]/30 bg-white shadow-[0_2px_8px_rgba(12,21,36,0.06)]">
                    <Icon className="size-6 text-[#F68E05] stroke-[1.5]" aria-hidden />
                  </div>
                  <p
                    className={cn(
                      "mt-4 text-[0.6875rem] font-bold tracking-[0.12em] text-[#F68E05] uppercase",
                    )}
                  >
                    {stepNumber}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-[#0c1524]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#0c1524]/65">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
