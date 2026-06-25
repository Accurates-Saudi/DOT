import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { ProductsCtaContent } from "@/types";

export interface ProductsCtaSectionProps {
  content: ProductsCtaContent;
}

export function ProductsCtaSection({ content }: ProductsCtaSectionProps) {
  return (
    <Section
      id="products-cta"
      padding="none"
      aria-label="Contact call to action"
      className="border-t border-[#0c1524]/8 bg-white"
    >
      <Container size="wide" className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 py-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-14">
          <div className="flex gap-5 lg:max-w-2xl lg:gap-6">
            <span
              className="w-1 shrink-0 self-stretch bg-[#F68E05]"
              aria-hidden
            />
            <div>
              <h2 className="text-xl font-bold leading-snug text-[#0c1524] sm:text-[1.35rem] lg:text-2xl">
                {content.heading}
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#0c1524]/68 sm:text-base">
                {content.body}
              </p>
            </div>
          </div>

          <Button
            variant="accent"
            size="lg"
            className="h-12 shrink-0 rounded-sm px-7 text-[0.8125rem] font-bold tracking-[0.08em] uppercase"
            asChild
          >
            <Link to={content.ctaPrimary.href}>
              {content.ctaPrimary.label}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
