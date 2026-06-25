import { LocalizedLink } from "@/components/i18n";

import { Container, Section } from "@/components/shared";
import type { NewsArticlePreview, NewsFeaturedContent } from "@/types";

import { formatNewsDateParts, NewsDateBadge } from "./NewsCard";
import { NewsArticleImage } from "./NewsArticleImage";

export interface FeaturedNewsProps {
  article: NewsArticlePreview;
  content: NewsFeaturedContent;
}

export function FeaturedNews({ article, content }: FeaturedNewsProps) {
  const href = `/news/${article.slug}`;
  const date = formatNewsDateParts(article.publishedAt);

  return (
    <Section
      id="featured-news"
      padding="lg"
      aria-label="Featured news article"
      className="border-b border-[#0c1524]/6 bg-white"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <LocalizedLink
            to={href}
            className="group relative block overflow-hidden rounded-xl lg:col-span-7"
          >
            <NewsArticleImage
              image={article.image}
              variant="featured"
              priority
            />
            <NewsDateBadge day={date.day} month={date.month} />
          </LocalizedLink>

          <div className="flex flex-col justify-center lg:col-span-5">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[#0c1524] sm:text-[1.75rem] lg:text-[2rem]">
              <LocalizedLink
                to={href}
                className="transition-colors duration-200 hover:text-[#F68E05]"
              >
                {article.title}
              </LocalizedLink>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#0c1524]/62 sm:text-[1.0625rem]">
              {article.excerpt}
            </p>

            <LocalizedLink
              to={href}
              className="text-link-hover text-link-arrow group/link mt-7 inline-flex items-center gap-2 text-[0.875rem] font-medium text-[#F68E05] hover:text-[#E07F04]"
            >
              {content.readMoreLabel}
              <span className="link-arrow" aria-hidden>
                →
              </span>
            </LocalizedLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
