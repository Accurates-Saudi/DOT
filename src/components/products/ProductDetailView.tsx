import { Mail } from "lucide-react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import { ProductDetailBreadcrumb } from "@/components/products/ProductDetailBreadcrumb";
import { ProductSectionHeading } from "@/components/products/ProductSectionHeading";
import { TriangleBulletList } from "@/components/products/TriangleBulletList";
import type { ProductDetailContent } from "@/types";
import { cn } from "@/lib/utils";

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
      <h3 className="text-[0.6875rem] font-bold tracking-[0.1em] text-[#0c1524] uppercase sm:text-[0.75rem]">
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
      {/* Breadcrumb strip */}
      <div className="border-b border-[#0c1524]/8 bg-[#f5f4f2]">
        <Container size="wide" className="px-4 py-3.5 sm:px-6 lg:px-8">
          <ProductDetailBreadcrumb items={hero.breadcrumbs} />
        </Container>
      </div>

      <Container size="wide" className="px-4 py-8 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
        {/* Row 1 — Hero: text left, image right */}
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div className="max-w-lg">
            <p className="text-[0.6875rem] font-bold tracking-[0.22em] text-[#F68E05] uppercase">
              {hero.category}
            </p>
            <h1 className="mt-2 text-[2rem] font-bold leading-[1.08] tracking-tight text-[#0c1524] sm:text-[2.35rem] lg:text-[2.5rem]">
              {hero.name}
            </h1>
            <p className="mt-3 text-[0.875rem] leading-[1.65] text-[#0c1524]/70 sm:text-[0.9375rem]">
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
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              className="max-h-[220px] w-full max-w-[480px] object-contain sm:max-h-[260px] lg:max-h-[300px] lg:max-w-none xl:max-h-[320px]"
            />
          </div>
        </div>

        {/* Row 2 — Details: overview + lists left, technical data right */}
        <div
          className={cn(
            "mt-10 grid gap-10 lg:mt-12 lg:items-start lg:gap-x-12 xl:mt-14 xl:gap-x-16",
            hasTechnicalData && "lg:grid-cols-2",
          )}
        >
          <div>
            <ProductSectionHeading title={overview.heading} />
            <TriangleBulletList
              items={overview.paragraphs}
              className="mt-4 max-w-2xl"
            />

            <div className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-4 lg:mt-9 lg:gap-5">
              {infoColumns.map((column) => (
                <InfoColumn
                  key={column.title}
                  title={column.title}
                  items={column.items}
                />
              ))}
            </div>
          </div>

          {hasTechnicalData && specifications?.image && (
            <div className="lg:max-w-none">
              <ProductSectionHeading title={specifications.heading} />
              <img
                src={specifications.image.src}
                alt={specifications.image.alt}
                className="mt-4 w-full min-w-0 border border-[#0c1524]/10"
              />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
