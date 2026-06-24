import { ArrowRight } from "lucide-react";
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
      className="border-b border-border"
    >
      <Container size="wide">
        <Breadcrumb items={content.breadcrumbs} />

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
              {content.category}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {content.name}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {content.introduction}
            </p>
            <Button
              size="lg"
              className="mt-8 h-12 rounded-sm border-transparent bg-[#F68E05] px-7 text-[0.8125rem] font-bold tracking-[0.08em] text-white uppercase hover:bg-[#E07F04]"
              asChild
            >
              <Link to={content.ctaContact.href}>
                {content.ctaContact.label}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#0c1524]/8 bg-white p-1.5 shadow-[0_12px_40px_-24px_rgba(12,21,36,0.16)] sm:p-2">
            <div className="aspect-[4/3] overflow-hidden rounded-[0.75rem] sm:rounded-xl">
              <img
                src={content.image.src}
                alt={content.image.alt}
                className="size-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
