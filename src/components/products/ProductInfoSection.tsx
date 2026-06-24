import { Container, Section } from "@/components/shared";
import type { ProductDetailInfoContent } from "@/types";

export interface ProductInfoSectionProps {
  content: ProductDetailInfoContent;
}

function InfoColumn({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-[#0c1524]/8 bg-white p-5 sm:p-6">
      <h3 className="text-[0.6875rem] font-bold tracking-[0.16em] text-[#F68E05] uppercase sm:text-xs">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-[#0c1524]/75 sm:text-sm"
          >
            <span
              className="mt-2 size-1 shrink-0 rounded-full bg-[#F68E05]"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductInfoSection({ content }: ProductInfoSectionProps) {
  const columns = [
    content.applications,
    content.features,
    content.benefits,
  ];

  return (
    <Section
      id="product-info"
      variant="muted"
      padding="md"
      aria-label="Applications, features, and benefits"
      className="border-y border-border"
    >
      <Container size="wide">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {columns.map((column) => (
            <InfoColumn
              key={column.title}
              title={column.title}
              items={column.items}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
