import { Mail } from "lucide-react";
import { Link } from "react-router";

import { Breadcrumb, Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { ProductDetailHeroContent } from "@/types";

export interface ProductDetailHeroSectionProps {
  content: ProductDetailHeroContent;
}

export function ProductDetailHeroSection({
  content,
}: ProductDetailHeroSectionProps) {
  return (
    <Section
      id="product-hero"
      variant="muted"
      padding="md"
      aria-label="Product introduction"
      className="border-b border-[#0c1524]/8"
    >
      <Container size="wide">
        <Breadcrumb items={content.breadcrumbs} highlightLast />

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-14">
          <div className="max-w-xl">
            <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
              {content.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0c1524] md:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              {content.name}
            </h1>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-[#0c1524]/65 sm:text-base">
              {content.introduction}
            </p>
            <Button
              size="lg"
              className="mt-7 h-11 rounded-sm border-transparent bg-[#F68E05] px-6 text-[0.75rem] font-bold tracking-[0.1em] text-white uppercase hover:bg-[#E07F04] sm:h-12 sm:px-7 sm:text-[0.8125rem]"
              asChild
            >
              <Link to={content.ctaContact.href}>
                <Mail className="size-4" />
                {content.ctaContact.label}
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <img
              src={content.image.src}
              alt={content.image.alt}
              className="max-h-[260px] w-full max-w-lg object-contain sm:max-h-[300px] lg:max-h-[340px]"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
