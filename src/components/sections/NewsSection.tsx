import { ArrowRight, Calendar, Mail } from "lucide-react";
import { type FormEvent } from "react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { NewsArticlePreview, NewsSectionContent } from "@/types";

export interface NewsSectionProps {
  content: NewsSectionContent;
}

export function NewsSection({ content }: NewsSectionProps) {
  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Section
      id="news"
      padding="none"
      variant="default"
      aria-label="Latest news"
      className="overflow-hidden bg-white py-10 sm:py-12 lg:py-14"
    >
      <div className="relative">
        <Container size="wide" className="relative z-10">
          <div className="max-w-xl pb-8 lg:pb-10">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-7 bg-[#F68E05]" aria-hidden />
              <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-[#0c1524]/55 uppercase sm:text-xs">
                {content.label}
              </p>
            </div>

            <h2 className="mt-4 text-[1.85rem] font-bold leading-[1.1] tracking-tight text-[#0c1524] sm:text-[2rem] lg:text-[2.15rem]">
              {content.heading}{" "}
              <span className="text-[#F68E05]">{content.headingAccent}</span>
            </h2>

            <p className="mt-4 text-[0.875rem] leading-relaxed text-[#0c1524]/65 sm:text-sm">
              {content.description}
            </p>

            <Link
              to={content.viewAll.href}
              className="group mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.12em] text-[#F68E05] uppercase transition-colors duration-200 hover:text-[#E07F04]"
            >
              {content.viewAll.label}
              <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Container>

        {content.headerImage && (
          <div className="pointer-events-none absolute top-0 right-0 hidden h-full w-[58%] lg:block">
            <img
              src={content.headerImage.src}
              alt=""
              className="size-full object-cover object-center"
              aria-hidden
            />
            <div
              className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-white via-white/95 to-transparent"
              aria-hidden
            />
          </div>
        )}
      </div>

      <Container size="wide">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {content.articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>

        <div className="mt-8 bg-[#f3f2f1] px-5 py-5 sm:mt-10 sm:px-6 sm:py-5 lg:px-8">
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5"
          >
            <div className="flex shrink-0 items-start gap-4 lg:items-center lg:gap-5">
              <div className="flex size-11 shrink-0 items-center justify-center bg-[#F68E05] text-white sm:size-12">
                <Mail className="size-5" aria-hidden />
              </div>
              <div className="min-w-0 lg:max-w-[14rem]">
                <p className="text-sm font-bold text-[#0c1524]">
                  {content.newsletter.heading}
                </p>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-[#0c1524]/60">
                  {content.newsletter.description}
                </p>
              </div>
            </div>

            <input
              type="email"
              name="email"
              required
              placeholder={content.newsletter.placeholder}
              className="h-11 min-w-0 flex-1 border border-[#0c1524]/10 bg-white px-4 text-sm text-[#0c1524] outline-none transition-[border-color] duration-200 placeholder:text-[#0c1524]/40 focus:border-[#F68E05]/45 lg:max-w-none"
            />

            <Button
              type="submit"
              className="group h-11 w-full shrink-0 justify-between rounded-sm border-transparent bg-[#F68E05] px-5 text-[0.8125rem] font-semibold tracking-wide text-white uppercase transition-[background-color] duration-200 hover:bg-[#E07F04] sm:h-12 lg:w-auto lg:min-w-[10.5rem]"
            >
              {content.newsletter.buttonLabel}
              <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            </Button>
          </form>
        </div>
      </Container>
    </Section>
  );
}

function NewsCard({ article }: { article: NewsArticlePreview }) {
  const href = `/news/${article.slug}`;
  const date = formatNewsDate(article.publishedAt);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg bg-[#f7f6f5] transition-[box-shadow] duration-300 ease-out hover:shadow-[0_8px_24px_-14px_rgba(12,21,36,0.18)]">
      <Link to={href} className="block overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={article.image.src}
            alt={article.image.alt}
            className="size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-5 pt-4 sm:px-5">
        <div className="flex items-center gap-1.5 text-[0.75rem] text-[#0c1524]/52">
          <Calendar className="size-3.5 text-[#F68E05]" aria-hidden />
          <time dateTime={article.publishedAt}>{date}</time>
        </div>

        <h3 className="mt-3 text-[0.9375rem] font-bold leading-snug text-[#0c1524] sm:text-base">
          <Link
            to={href}
            className="line-clamp-2 transition-colors duration-200 hover:text-[#F68E05]"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-2.5 line-clamp-3 flex-1 text-[0.8125rem] leading-relaxed text-[#0c1524]/58">
          {article.excerpt}
        </p>

        <Link
          to={href}
          className="group/link mt-4 inline-flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.1em] text-[#F68E05] uppercase transition-colors duration-200 hover:text-[#E07F04]"
        >
          Read More
          <ArrowRight className="size-3.5 transition-transform duration-300 ease-out group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

function formatNewsDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
