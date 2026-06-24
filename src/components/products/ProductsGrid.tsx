import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Container, Section } from "@/components/shared";
import { ProductCard } from "@/components/products/ProductCard";
import type { ProductsListingContent } from "@/types";
import { cn } from "@/lib/utils";

export interface ProductsGridProps {
  content: ProductsListingContent;
  className?: string;
}

export function ProductsGrid({ content, className }: ProductsGridProps) {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return content.items;

    return content.items.filter((product) => {
      const searchable = [
        product.name,
        product.description,
        product.category,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [content.items, query]);

  return (
    <Section
      id="products-listing"
      padding="none"
      aria-label="Product listing"
      className={cn("bg-white pb-14 sm:pb-16 lg:pb-20", className)}
    >
      <Container size="wide" className="px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl pt-10 text-center sm:pt-12 lg:pt-14">
          <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
            {content.label}
          </p>
          <h2 className="mt-4 text-[1.75rem] font-bold leading-[1.12] tracking-tight text-[#0c1524] sm:text-[2.15rem] lg:text-[2.35rem]">
            {content.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[0.9375rem] leading-[1.75] text-[#0c1524]/68 sm:text-base">
            {content.subheading}
          </p>
        </header>

        <div className="mx-auto mt-8 max-w-xl sm:mt-10 lg:mt-12">
          <label htmlFor="products-search" className="sr-only">
            {content.searchPlaceholder}
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#0c1524]/35"
              aria-hidden
            />
            <input
              id="products-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={content.searchPlaceholder}
              className="h-12 w-full rounded-sm border border-[#0c1524]/12 bg-white pr-4 pl-11 text-sm text-[#0c1524] shadow-[0_4px_20px_-12px_rgba(12,21,36,0.12)] transition-[border-color,box-shadow] duration-200 placeholder:text-[#0c1524]/40 focus:border-[#F68E05]/50 focus:shadow-[0_4px_24px_-10px_rgba(246,142,5,0.15)] focus:outline-none"
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <ul className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-7">
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  viewProductLabel={content.viewProductLabel}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 text-center text-sm text-[#0c1524]/55 sm:mt-12">
            {content.emptyStateMessage}
          </p>
        )}
      </Container>
    </Section>
  );
}
