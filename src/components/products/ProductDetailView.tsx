import { Mail } from "lucide-react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import { ProductDetailBreadcrumb } from "@/components/products/ProductDetailBreadcrumb";
import { ProductSectionHeading } from "@/components/products/ProductSectionHeading";
import { TriangleBulletList } from "@/components/products/TriangleBulletList";
import type { ProductDetailContent } from "@/types";

export interface ProductDetailViewProps {
  product: ProductDetailContent;
}

function InfoColumn({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className="text-[0.6875rem] font-bold tracking-[0.12em] text-[#0c1524] uppercase sm:text-[0.75rem]">
        {title}
      </h3>
      <TriangleBulletList items={items} className="mt-2.5" compact />
    </div>
  );
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const { hero, overview, info, specifications } = product;
  const hasTechnicalData = Boolean(specifications?.image);
  const infoColumns = [info.applications, info.features, info.benefits];

  return (
    <Section
      id="product-detail"
      padding="none"
      aria-label="Product detail"
      className="bg-white"
    >
      <Container size="wide" className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <ProductDetailBreadcrumb items={hero.breadcrumbs} />

        <div className="mt-5 grid gap-10 lg:mt-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)] lg:items-start lg:gap-x-14 xl:gap-x-16">
          {/* Left column */}
          <div>
            <p className="text-[0.6875rem] font-bold tracking-[0.22em] text-[#F68E05] uppercase">
              {hero.category}
            </p>
            <h1 className="mt-2 text-[2rem] font-bold leading-[1.08] tracking-tight text-[#0c1524] sm:text-[2.35rem] lg:text-[2.5rem]">
              {hero.name}
            </h1>
            <p className="mt-3 max-w-md text-[0.875rem] leading-[1.65] text-[#0c1524]/70 sm:text-[0.9375rem] sm:leading-[1.7]">
              {hero.introduction}
            </p>
            <Button
              className="mt-5 h-10 rounded-sm border-transparent bg-[#F68E05] px-6 text-[0.6875rem] font-bold tracking-[0.12em] text-white uppercase hover:bg-[#E07F04] sm:h-[42px] sm:px-7 sm:text-[0.75rem]"
              asChild
            >
              <Link to={hero.ctaContact.href}>
                <Mail className="size-3.5" strokeWidth={2.25} />
                {hero.ctaContact.label}
              </Link>
            </Button>

            <div className="mt-10 lg:mt-12">
              <ProductSectionHeading title={overview.heading} />
              <TriangleBulletList
                items={overview.paragraphs}
                className="mt-4 max-w-xl"
              />
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-5 lg:mt-10">
              {infoColumns.map((column) => (
                <InfoColumn
                  key={column.title}
                  title={column.title}
                  items={column.items}
                />
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:pt-1">
            <div className="flex justify-center lg:justify-end">
              <img
                src={hero.image.src}
                alt={hero.image.alt}
                className="max-h-[240px] w-full max-w-[420px] object-contain sm:max-h-[280px] lg:max-h-[320px] lg:max-w-none xl:max-h-[360px]"
              />
            </div>

            {hasTechnicalData && specifications?.image && (
              <div className="mt-8 lg:mt-10">
                <ProductSectionHeading title={specifications.heading} />
                <img
                  src={specifications.image.src}
                  alt={specifications.image.alt}
                  className="mt-4 w-full border border-[#0c1524]/10"
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
