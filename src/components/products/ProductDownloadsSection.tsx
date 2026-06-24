import { Container, Section } from "@/components/shared";
import { DownloadCard } from "@/components/products/DownloadCard";
import type { ProductDownloadsContent } from "@/types";

export interface ProductDownloadsSectionProps {
  content: ProductDownloadsContent;
}

export function ProductDownloadsSection({
  content,
}: ProductDownloadsSectionProps) {
  return (
    <Section
      id="product-downloads"
      variant="muted"
      padding="md"
      aria-label="Product downloads"
      className="border-t border-border"
    >
      <Container size="wide">
        <h2 className="text-xl font-bold text-[#0c1524] sm:text-2xl">
          {content.heading}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {content.items.map((resource) => (
            <li key={resource.id}>
              <DownloadCard resource={resource} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
