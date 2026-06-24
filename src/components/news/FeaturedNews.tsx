import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { NewsArticlePreview, NewsFeaturedContent } from "@/types";

import { formatNewsDate } from "./NewsCard";

export interface FeaturedNewsProps {
  article: NewsArticlePreview;
  content: NewsFeaturedContent;
}

export function FeaturedNews({ article, content }: FeaturedNewsProps) {
  const href = `/news/${article.slug}`;

  return (
    <Section
      id="featured-news"
      padding="lg"
      aria-label="Featured news article"
      className="border-b border-[#0c1524]/6 bg-white"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <Link
            to={href}
            className="group relative block overflow-hidden lg:col-span-7"
          >
            <div className="aspect-[16/10] overflow-hidden bg-[#f4f3f2] lg:aspect-[16/9]">
              <img
                src={article.image.src}
                alt={article.image.alt}
                className="size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                loading="eager"
                decoding="async"
              />
            </div>
          </Link>

          <div className="flex flex-col justify-center lg:col-span-5">
            <time
              dateTime={article.publishedAt}
              className="text-[0.6875rem] font-semibold tracking-[0.08em] text-[#0c1524]/45 uppercase"
            >
              {formatNewsDate(article.publishedAt)}
            </time>

            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#0c1524] sm:text-[1.75rem] lg:text-[2rem]">
              <Link
                to={href}
                className="transition-colors duration-200 hover:text-[#F68E05]"
              >
                {article.title}
              </Link>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#0c1524]/62 sm:text-[1.0625rem]">
              {article.excerpt}
            </p>

            <div className="mt-7">
              <Button
                size="lg"
                className="group h-11 rounded-sm border-transparent bg-[#F68E05] px-7 text-[0.8125rem] font-semibold tracking-[0.04em] text-white uppercase shadow-[0_6px_20px_-10px_rgba(246,142,5,0.45)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-px hover:bg-[#E07F04] hover:shadow-[0_10px_24px_-10px_rgba(246,142,5,0.5)] sm:h-12 sm:px-8"
                asChild
              >
                <Link to={href}>
                  {content.readMoreLabel}
                  <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
