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
    const products = normalizedQuery
      ? content.items.filter((product) => {
          const searchable = [product.name, product.description, product.category]
            .join(" ")
            .toLowerCase();

          return searchable.includes(normalizedQuery);
        })
      : content.items;

    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  }, [content.items, query]);

  return (
    <Section
      id="products-listing"
      padding="md"
      aria-label="Product listing"
      className={cn("bg-white", className)}
    >
      <Container size="wide">
        <div className="relative max-w-sm">
          <label htmlFor="products-search" className="sr-only">
            {content.searchPlaceholder}
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#0c1524]/35"
            aria-hidden
          />
          <input
            id="products-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={content.searchPlaceholder}
            className="h-10 w-full rounded-lg border border-[#0c1524]/12 bg-white pr-4 pl-10 text-sm text-[#0c1524] placeholder:text-[#0c1524]/40 focus:border-[#F68E05]/50 focus:outline-none"
          />
        </div>

        {filteredProducts.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5">
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
          <p className="mt-10 text-center text-sm text-[#0c1524]/55">
            {content.emptyStateMessage}
          </p>
        )}
      </Container>
    </Section>
  );
}
