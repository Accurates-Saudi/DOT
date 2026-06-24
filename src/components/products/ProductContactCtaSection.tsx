import { ArrowRight, HardHat, Mail } from "lucide-react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { ProductContactCtaContent } from "@/types";

export interface ProductContactCtaSectionProps {
  content: ProductContactCtaContent;
}

export function ProductContactCtaSection({
  content,
}: ProductContactCtaSectionProps) {
  return (
    <Section
      id="product-contact-cta"
      padding="none"
      aria-label="Engineering assistance"
      className="border-t border-[#0c1524]/8 bg-[#f0eeeb]"
    >
      <Container size="wide" className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 py-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-14">
          <div className="flex items-start gap-5 lg:max-w-2xl lg:gap-6">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-[#0c1524]/10 bg-white">
              <HardHat className="size-7 text-[#0c1524]/70" aria-hidden />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-snug text-[#0c1524] sm:text-xl lg:text-2xl">
                {content.heading}
              </h2>
              <p className="mt-2 max-w-xl text-[0.875rem] leading-relaxed text-[#0c1524]/65 sm:text-[0.9375rem]">
                {content.body}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
            <Button
              size="lg"
              className="h-11 rounded-sm border-transparent bg-[#F68E05] px-6 text-[0.75rem] font-bold tracking-[0.08em] text-white uppercase hover:bg-[#E07F04] sm:h-12 sm:px-7 sm:text-[0.8125rem]"
              asChild
            >
              <Link to={content.ctaPrimary.href}>
                <Mail className="size-4" />
                {content.ctaPrimary.label}
              </Link>
            </Button>
            {content.ctaSecondary && (
              <Button
                size="lg"
                variant="outline"
                className="h-11 rounded-sm border-[#0c1524]/25 bg-white px-6 text-[0.75rem] font-bold tracking-[0.08em] text-[#0c1524] uppercase hover:bg-white/80 sm:h-12 sm:px-7 sm:text-[0.8125rem]"
                asChild
              >
                <Link to={content.ctaSecondary.href}>
                  {content.ctaSecondary.label}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
