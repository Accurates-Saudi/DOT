import { Container, Section } from "@/components/shared";
import { ProductSectionHeading } from "@/components/products/ProductSectionHeading";
import { SpecificationTable } from "@/components/products/SpecificationTable";
import { TriangleBulletList } from "@/components/products/TriangleBulletList";
import type {
  ProductDetailInfoContent,
  ProductOverviewContent,
  ProductSpecificationsContent,
} from "@/types";
import { cn } from "@/lib/utils";

export interface ProductDetailBodySectionProps {
  overview: ProductOverviewContent;
  info: ProductDetailInfoContent;
  specifications?: ProductSpecificationsContent;
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
      <h3 className="text-[0.75rem] font-bold tracking-[0.1em] text-[#0c1524] uppercase sm:text-[0.8125rem]">
        {title}
      </h3>
      <TriangleBulletList items={items} className="mt-3" />
    </div>
  );
}

export function ProductDetailBodySection({
  overview,
  info,
  specifications,
}: ProductDetailBodySectionProps) {
  const hasSpecs = Boolean(specifications?.rows.length);
  const infoColumns = [info.applications, info.features, info.benefits];

  return (
    <Section
      id="product-details"
      padding="md"
      aria-label="Product details"
      className="bg-white"
    >
      <Container size="wide">
        <div
          className={cn(
            "grid gap-10 lg:gap-14",
            hasSpecs && "lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-start",
          )}
        >
          <div>
            <ProductSectionHeading title={overview.heading} />
            <TriangleBulletList items={overview.paragraphs} className="mt-5" />

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {infoColumns.map((column) => (
                <InfoColumn
                  key={column.title}
                  title={column.title}
                  items={column.items}
                />
              ))}
            </div>
          </div>

          {hasSpecs && specifications && (
            <aside className="lg:sticky lg:top-24">
              <ProductSectionHeading title={specifications.heading} />
              <div className="mt-5">
                <SpecificationTable rows={specifications.rows} />
              </div>
            </aside>
          )}
        </div>
      </Container>
    </Section>
  );
}
