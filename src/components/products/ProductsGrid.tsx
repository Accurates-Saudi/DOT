import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Container, Section } from "@/components/shared";
import { ProductCard } from "@/components/products/ProductCard";
import type { ProductItem, ProductsListingContent } from "@/types";
import { LISTING_CATEGORY_ORDER } from "@/data/products/parseContent";
import { cn } from "@/lib/utils";

export interface ProductsGridProps {
  content: ProductsListingContent;
  className?: string;
}

function groupProductsByCategory(
  products: ProductItem[],
  categoryOrder: string[],
): { category: string; products: ProductItem[] }[] {
  const byCategory = new Map<string, ProductItem[]>();

  for (const product of products) {
    const group = byCategory.get(product.category) ?? [];
    group.push(product);
    byCategory.set(product.category, group);
  }

  const orderedCategories = categoryOrder.filter((category) =>
    byCategory.has(category),
  );

  for (const category of byCategory.keys()) {
    if (!orderedCategories.includes(category)) {
      orderedCategories.push(category);
    }
  }

  return orderedCategories.map((category) => ({
    category,
    products: (byCategory.get(category) ?? []).sort((a, b) =>
      a.name.localeCompare(b.name),
    ),
  }));
}

function CategoryHeading({ title }: { title: string }) {
  return (
    <div className="text-center">
      <span
        className="mx-auto block h-[3px] w-8 rounded-sm bg-[#F68E05]"
        aria-hidden
      />
      <h2 className="mt-2.5 text-[0.6875rem] font-bold tracking-[0.2em] text-[#0c1524]/70 uppercase sm:text-xs">
        {title}
      </h2>
    </div>
  );
}

export function ProductsGrid({ content, className }: ProductsGridProps) {
  const [query, setQuery] = useState("");

  const categoryOrder = useMemo(() => {
    const order: string[] = [...LISTING_CATEGORY_ORDER];
    for (const item of content.items) {
      if (!order.includes(item.category)) {
        order.push(item.category);
      }
    }
    return order;
  }, [content.items]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return content.items;

    return content.items.filter((product) => {
      const searchable = [product.name, product.description, product.category]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [content.items, query]);

  const productGroups = useMemo(
    () => groupProductsByCategory(filteredProducts, categoryOrder),
    [filteredProducts, categoryOrder],
  );

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

        {productGroups.length > 0 ? (
          <div className="mt-10 space-y-12 sm:space-y-14">
            {productGroups.map((group, groupIndex) => (
              <section
                key={group.category}
                aria-labelledby={`products-category-${groupIndex}`}
              >
                <CategoryHeading title={group.category} />
                <h3 id={`products-category-${groupIndex}`} className="sr-only">
                  {group.category}
                </h3>

                <ul className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5">
                  {group.products.map((product) => (
                    <li key={product.id}>
                      <ProductCard
                        product={product}
                        viewProductLabel={content.viewProductLabel}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-[#0c1524]/55">
            {content.emptyStateMessage}
          </p>
        )}
      </Container>
    </Section>
  );
}
