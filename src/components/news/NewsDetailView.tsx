import { ProductDetailBreadcrumb } from "@/components/products/ProductDetailBreadcrumb";
import { Container, Section } from "@/components/shared";
import type { NewsArticleDetail } from "@/types";

import { formatNewsDate } from "./NewsCard";
import { NewsDetailContent } from "./NewsDetailContent";
import { NewsImageGallery } from "./NewsImageGallery";

export interface NewsDetailViewProps {
  article: NewsArticleDetail;
}

export function NewsDetailView({ article }: NewsDetailViewProps) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    { label: article.title },
  ];

  return (
    <Section
      id="news-detail"
      padding="none"
      aria-label="News article"
      className="bg-white"
    >
      <div className="border-b border-[#0c1524]/8 bg-[#f5f4f2]">
        <Container size="wide" className="px-4 py-3.5 sm:px-6 lg:px-8">
          <ProductDetailBreadcrumb items={breadcrumbs} />
        </Container>
      </div>

      <Container size="narrow" className="px-4 py-8 sm:px-6 sm:py-9 lg:py-10">
        <header className="space-y-4">
          <time
            dateTime={article.publishedAt}
            className="block text-[0.6875rem] font-semibold tracking-[0.1em] text-[#0c1524]/45 uppercase"
          >
            {formatNewsDate(article.publishedAt)}
          </time>

          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-[#0c1524] sm:text-[1.75rem] lg:text-[2rem]">
            {article.title}
          </h1>

          <div className="overflow-hidden rounded-xl bg-[#f4f3f2]">
            <img
              src={article.image.src}
              alt={article.image.alt}
              className="aspect-[16/10] w-full object-cover object-center sm:aspect-[16/9]"
              loading="eager"
              decoding="async"
            />
          </div>
        </header>

        <NewsDetailContent paragraphs={article.content} />

        {article.gallery && article.gallery.length > 0 && (
          <NewsImageGallery images={article.gallery} />
        )}
      </Container>
    </Section>
  );
}
