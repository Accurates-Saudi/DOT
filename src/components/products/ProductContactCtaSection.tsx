import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router";

import { EngineerIllustration } from "@/components/products/EngineerIllustration";
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
      className="bg-[#eceae7]"
    >
      <Container size="wide" className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 py-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-14">
          <div className="flex items-center gap-5 lg:gap-6">
            <EngineerIllustration className="h-[72px] w-[60px] shrink-0 sm:h-20 sm:w-[68px]" />
            <div className="max-w-lg">
              <h2 className="text-lg font-bold leading-snug text-[#0c1524] sm:text-xl">
                {content.heading}
              </h2>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-[#0c1524]/65 sm:text-sm">
                {content.body}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
            <Button
              className="h-10 rounded-sm border-transparent bg-[#F68E05] px-6 text-[0.6875rem] font-bold tracking-[0.1em] text-white uppercase hover:bg-[#E07F04] sm:h-[42px] sm:px-7 sm:text-xs"
              asChild
            >
              <Link to={content.ctaPrimary.href}>
                <Mail className="size-3.5" strokeWidth={2.25} />
                {content.ctaPrimary.label}
              </Link>
            </Button>
            {content.ctaSecondary && (
              <Button
                variant="outline"
                className="h-10 rounded-sm border-[#0c1524]/30 bg-white px-6 text-[0.6875rem] font-bold tracking-[0.1em] text-[#0c1524] uppercase hover:bg-white/90 sm:h-[42px] sm:px-7 sm:text-xs"
                asChild
              >
                <Link to={content.ctaSecondary.href}>
                  {content.ctaSecondary.label}
                  <ArrowRight className="size-3.5" strokeWidth={2.25} />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
