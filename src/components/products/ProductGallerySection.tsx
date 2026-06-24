import { Container, Section } from "@/components/shared";
import { ProductGallery } from "@/components/products/ProductGallery";
import type { ProductGalleryContent } from "@/types";

export interface ProductGallerySectionProps {
  content: ProductGalleryContent;
}

export function ProductGallerySection({ content }: ProductGallerySectionProps) {
  return (
    <Section
      id="product-gallery"
      padding="md"
      aria-label="Product gallery"
      className="bg-white"
    >
      <Container size="wide">
        <ProductGallery heading={content.heading} images={content.images} />
      </Container>
    </Section>
  );
}
