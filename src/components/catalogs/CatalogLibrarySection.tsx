import { CatalogCard } from "./CatalogCard";
import { Container, Section } from "@/components/shared";
import type { CatalogLibraryContent } from "@/types";

export interface CatalogLibrarySectionProps {
  content: CatalogLibraryContent;
}

export function CatalogLibrarySection({ content }: CatalogLibrarySectionProps) {
  return (
    <Section
      id="catalog-library"
      padding="lg"
      aria-label="Catalog document library"
      className="bg-white"
    >
      <Container>
        <div className="mb-10 flex items-center gap-3 sm:mb-12">
          <span
            className="h-px w-8 bg-[#F68E05]"
            aria-hidden
          />
          <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
            {content.label}
          </p>
        </div>

        <ul className="grid list-none grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {content.items.map((catalog) => (
            <li key={catalog.id}>
              <CatalogCard
                catalog={catalog}
                downloadLabel={content.downloadLabel}
                pdfLabel={content.pdfLabel}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
