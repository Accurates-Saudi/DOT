import { Check } from "lucide-react";

import { Container, Section } from "@/components/shared";
import type { ProductOverviewContent } from "@/types";

export interface ProductOverviewSectionProps {
  content: ProductOverviewContent;
}

export function ProductOverviewSection({
  content,
}: ProductOverviewSectionProps) {
  return (
    <Section
      id="product-overview"
      padding="md"
      aria-label="Product overview"
      className="bg-white"
    >
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-xl font-bold text-[#0c1524] sm:text-2xl">
              {content.heading}
            </h2>
            <div className="mt-5 space-y-4">
              {content.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[0.9375rem] leading-relaxed text-[#0c1524]/68"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#0c1524]/8 bg-[#0c1524]/[0.02] p-6 sm:p-8">
            <h3 className="text-sm font-bold tracking-[0.1em] text-[#F68E05] uppercase">
              {content.benefits.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {content.benefits.items.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-[#F68E05]"
                    aria-hidden
                  />
                  <span className="text-[0.875rem] leading-relaxed text-[#0c1524]/75">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
