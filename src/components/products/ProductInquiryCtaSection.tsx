import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { ProductInquiryCtaContent } from "@/types";

export interface ProductInquiryCtaSectionProps {
  content: ProductInquiryCtaContent;
}

export function ProductInquiryCtaSection({
  content,
}: ProductInquiryCtaSectionProps) {
  return (
    <Section
      id="product-inquiry-cta"
      padding="none"
      aria-label="Product inquiry"
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
              <p className="mt-3 max-w-xl text-[0.875rem] leading-relaxed text-[#0c1524]/68 sm:text-[0.9375rem]">
                {content.body}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
            <Button
              size="lg"
              className="h-12 rounded-sm border-transparent bg-[#F68E05] px-7 text-[0.8125rem] font-bold tracking-[0.08em] text-white uppercase hover:bg-[#E07F04]"
              asChild
            >
              <Link to={content.ctaPrimary.href}>
                {content.ctaPrimary.label}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-sm border-[#0c1524]/20 bg-transparent px-7 text-[0.8125rem] font-bold tracking-[0.08em] text-[#0c1524] uppercase hover:bg-[#0c1524]/5"
              asChild
            >
              <Link to={content.ctaSecondary.href}>
                {content.ctaSecondary.label}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
