import { Mail } from "lucide-react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import { ProductDetailBreadcrumb } from "@/components/products/ProductDetailBreadcrumb";
import { ProductSectionHeading } from "@/components/products/ProductSectionHeading";
import { SpecificationTable } from "@/components/products/SpecificationTable";
import { TriangleBulletList } from "@/components/products/TriangleBulletList";
import type { ProductDetailContent, ProductInfoColumn } from "@/types";
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

function dedupeInfoColumns(columns: ProductInfoColumn[]): ProductInfoColumn[] {
  const populated = columns.filter((column) => column.items.length > 0);

  return populated.filter((column, index) => {
    const duplicateIndex = populated.findIndex(
      (other) =>
        other.title !== column.title &&
        other.items.length === column.items.length &&
        other.items.every((item, itemIndex) => item === column.items[itemIndex]),
    );

    return duplicateIndex === -1 || duplicateIndex >= index;
  });
}

function infoGridClassName(columnCount: number): string {
  if (columnCount <= 1) return "max-w-sm";
  if (columnCount === 2) return "sm:grid-cols-2";
  return "sm:grid-cols-2 lg:grid-cols-3";
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const { hero, overview, info, specifications } = product;
  const hasSpecificationRows = Boolean(specifications?.rows?.length);
  const hasSpecificationImage = Boolean(specifications?.image);
  const hasSpecifications = hasSpecificationRows || hasSpecificationImage;
  const hasOverview = overview.paragraphs.length > 0;
  const infoColumns = dedupeInfoColumns([
    info.applications,
    info.features,
    info.benefits,
  ]);

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
            <h1 className="text-[2rem] font-bold leading-[1.08] tracking-tight text-[#0c1524] sm:text-[2.35rem] lg:text-[2.5rem]">
              {hero.name}
            </h1>
            <p className="mt-3 text-[0.875rem] leading-[1.65] text-[#0c1524]/70 sm:text-[0.9375rem]">
              {hero.introduction}
            </p>
            <Button
              variant="accent"
              className="mt-5 h-10 rounded-sm px-6 text-[0.6875rem] font-bold tracking-[0.12em] uppercase sm:h-[42px] sm:px-7 sm:text-[0.75rem]"
              asChild
            >
              <Link to={hero.ctaContact.href}>
                <Mail className="size-3.5" strokeWidth={2.25} />
                {hero.ctaContact.label}
              </Link>
            </Button>
          </div>

          <div className="flex w-full items-center justify-center">
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              className="h-auto w-auto max-h-[min(26rem,58vh)] max-w-full object-contain object-center sm:max-h-[min(28rem,62vh)] lg:max-h-[min(32rem,68vh)]"
            />
          </div>
        </div>

        {/* Row 2 — Details: overview + lists left, technical data right */}
        {(hasOverview || infoColumns.length > 0 || hasSpecifications) && (
          <div
            className={cn(
              "mt-10 grid gap-10 lg:mt-12 lg:items-start lg:gap-x-12 xl:mt-14 xl:gap-x-16",
              hasSpecifications && "lg:grid-cols-2",
            )}
          >
            {(hasOverview || infoColumns.length > 0) && (
              <div className={cn(!hasSpecifications && "max-w-4xl")}>
                {hasOverview && (
                  <>
                    <ProductSectionHeading title={overview.heading} />
                    <TriangleBulletList
                      items={overview.paragraphs}
                      className="mt-4 max-w-2xl"
                    />
                  </>
                )}

                {infoColumns.length > 0 && (
                  <div
                    className={cn(
                      "grid gap-6 lg:gap-5",
                      hasOverview ? "mt-8 lg:mt-9" : "",
                      infoGridClassName(infoColumns.length),
                    )}
                  >
                    {infoColumns.map((column) => (
                      <InfoColumn
                        key={column.title}
                        title={column.title}
                        items={column.items}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {hasSpecifications && specifications && (
              <div className="min-w-0 lg:max-w-none">
                <ProductSectionHeading title={specifications.heading} />

                {hasSpecificationRows && specifications.rows && (
                  <SpecificationTable
                    rows={specifications.rows}
                    className="mt-4"
                  />
                )}

                {hasSpecificationImage && specifications.image && (
                  <div
                    className={cn(
                      "overflow-hidden rounded-sm border border-[#0c1524]/10 bg-[#fafaf9]",
                      hasSpecificationRows ? "mt-4" : "mt-4",
                    )}
                  >
                    <img
                      src={specifications.image.src}
                      alt={specifications.image.alt}
                      className="mx-auto block h-auto w-full max-h-[min(36rem,75vh)] object-contain object-center p-3 sm:p-4"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}
