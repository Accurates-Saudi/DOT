import { ProductDetailBreadcrumb } from "@/components/products/ProductDetailBreadcrumb";
import { Container, Section } from "@/components/shared";
import type { NewsArticleDetail } from "@/types";

import { formatNewsDate } from "./NewsCard";
import { NewsArticleImage } from "./NewsArticleImage";
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

      <Container size="narrow" className="px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
        <article className="mx-auto max-w-3xl">
          <header className="border-b border-[#0c1524]/8 pb-7 sm:pb-8">
            <p className="text-[0.6875rem] font-bold tracking-[0.22em] text-[#F68E05] uppercase">
              {article.category}
            </p>

            <time
              dateTime={article.publishedAt}
              className="mt-3 block text-[0.6875rem] font-semibold tracking-[0.1em] text-[#0c1524]/45 uppercase"
            >
              {formatNewsDate(article.publishedAt)}
            </time>

            <h1 className="mt-3 text-[1.625rem] font-bold leading-[1.2] tracking-tight text-[#0c1524] sm:text-[1.875rem] lg:text-[2.125rem]">
              {article.title}
            </h1>

            <p className="mt-4 border-l-2 border-[#F68E05] pl-4 text-[0.9375rem] leading-relaxed text-[#0c1524]/72 sm:text-base">
              {article.excerpt}
            </p>
          </header>

          <figure className="mt-7 sm:mt-8">
            <NewsArticleImage
              image={article.image}
              variant="detail"
              priority
            />
          </figure>

          <NewsDetailContent paragraphs={article.content} />

          {article.gallery && article.gallery.length > 0 && (
            <NewsImageGallery images={article.gallery} />
          )}
        </article>
      </Container>
    </Section>
  );
}
