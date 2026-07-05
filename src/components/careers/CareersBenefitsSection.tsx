import { Container, Section } from "@/components/shared";
import type { CareersBenefitItem } from "@/types";
import { resolveBenefitIcon } from "@/utils/career-icons";

export interface CareersBenefitsSectionProps {
  items: CareersBenefitItem[];
}

export function CareersBenefitsSection({ items }: CareersBenefitsSectionProps) {
  return (
    <Section
      id="careers-benefits"
      padding="none"
      aria-label="Why join us"
      className="border-b border-[#0c1524]/8 bg-white"
    >
      <Container size="wide" className="px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((item, index) => {
            const Icon = resolveBenefitIcon(index);

            return (
              <div
                key={`${item.title}-${index}`}
                className="flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-sm border border-[#F68E05]/25 text-[#F68E05]">
                  <Icon className="size-6 stroke-[1.5]" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-bold text-[#0c1524] sm:text-[1.0625rem]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#0c1524]/68">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
