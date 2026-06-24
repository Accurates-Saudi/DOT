import { ArrowRight, Calendar, Mail } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { NewsArticlePreview, NewsSectionContent } from "@/types";
import { cn } from "@/lib/utils";

export interface NewsSectionProps {
  content: NewsSectionContent;
}

export function NewsSection({ content }: NewsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const reveal = (delayMs: number, className?: string) => ({
    className: cn(
      "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      className,
    ),
    style: { transitionDelay: isVisible ? `${delayMs}ms` : "0ms" },
  });

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Section
      id="news"
      padding="lg"
      variant="default"
      aria-label="Latest news"
      className="overflow-hidden bg-white"
    >
      <Container size="wide">
        <div ref={sectionRef} className="flex flex-col gap-8 lg:gap-9">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-12">
            <div {...reveal(0)}>
              <div className="flex items-center gap-2.5">
                <span className="h-px w-7 bg-[#F68E05]" aria-hidden />
                <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-[#0c1524]/55 uppercase sm:text-xs">
                  {content.label}
                </p>
              </div>

              <h2 className="mt-4 text-[1.85rem] font-bold leading-[1.12] tracking-tight text-[#0c1524] sm:text-[2.1rem] lg:text-[2.25rem]">
                {content.heading}{" "}
                <span className="text-[#F68E05]">{content.headingAccent}</span>
              </h2>

              <p className="mt-4 max-w-lg text-[0.875rem] leading-relaxed text-[#0c1524]/68 sm:text-sm">
                {content.description}
              </p>

              <Link
                to={content.viewAll.href}
                className="group mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.12em] text-[#F68E05] uppercase transition-colors duration-200 hover:text-[#E07F04] sm:mt-6"
              >
                {content.viewAll.label}
                <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Link>
            </div>

            {content.headerImage && (
              <div
                {...reveal(
                  80,
                  "relative hidden overflow-hidden rounded-2xl bg-[#f4f3f2] lg:block",
                )}
              >
                <div className="aspect-[16/10]">
                  <img
                    src={content.headerImage.src}
                    alt={content.headerImage.alt}
                    className="size-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white to-transparent"
                  aria-hidden
                />
              </div>
            )}
          </div>

          <div
            {...reveal(
              140,
              "grid gap-5 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-6",
            )}
          >
            <FeaturedNewsCard article={content.featured} />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
              {content.articles.map((article) => (
                <SecondaryNewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          <div
            {...reveal(
              220,
              "rounded-2xl bg-[#f4f3f2] px-5 py-5 sm:px-6 sm:py-6 lg:px-8",
            )}
          >
            <form
              onSubmit={handleNewsletterSubmit}
              className="grid items-center gap-5 lg:grid-cols-[auto_1fr_auto] lg:gap-6 xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,0.55fr)_auto]"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F68E05] text-white sm:size-12">
                <Mail className="size-5" aria-hidden />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold text-[#0c1524] sm:text-base">
                  {content.newsletter.heading}
                </p>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-[#0c1524]/62 sm:text-sm">
                  {content.newsletter.description}
                </p>
              </div>

              <input
                type="email"
                name="email"
                required
                placeholder={content.newsletter.placeholder}
                className="h-11 w-full rounded-xl border border-[#0c1524]/10 bg-white px-4 text-sm text-[#0c1524] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#0c1524]/40 focus:border-[#F68E05]/50 focus:ring-2 focus:ring-[#F68E05]/15 lg:col-start-3 xl:col-start-3"
              />

              <Button
                type="submit"
                className="group h-11 w-full justify-between rounded-xl border-transparent bg-[#F68E05] px-5 text-[0.8125rem] font-semibold tracking-wide text-white uppercase transition-[transform,background-color] duration-300 ease-out hover:-translate-y-px hover:bg-[#E07F04] sm:h-12 sm:px-6 lg:w-auto lg:min-w-[9.5rem] xl:col-start-4"
              >
                {content.newsletter.buttonLabel}
                <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FeaturedNewsCard({ article }: { article: NewsArticlePreview }) {
  const date = formatNewsDate(article.publishedAt);
  const href = `/news/${article.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#0c1524]/6 bg-white shadow-[0_8px_30px_-18px_rgba(12,21,36,0.2)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-18px_rgba(12,21,36,0.26)]">
      <Link to={href} className="relative block overflow-hidden">
        <div className="aspect-[16/10] overflow-hidden sm:aspect-[5/3]">
          <img
            src={article.image.src}
            alt={article.image.alt}
            className="size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        </div>
        <DateBadge day={date.day} month={date.month} className="left-4 top-4" />
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#F68E05]/10 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide text-[#F68E05] uppercase">
            {article.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[0.75rem] text-[#0c1524]/52">
            <Calendar className="size-3.5 text-[#F68E05]" aria-hidden />
            {date.display}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-bold leading-snug text-[#0c1524] sm:text-xl">
          <Link
            to={href}
            className="transition-colors duration-200 hover:text-[#F68E05]"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 text-[0.875rem] leading-relaxed text-[#0c1524]/65">
          {article.excerpt}
        </p>

        <ReadMoreLink href={href} className="mt-auto pt-5" />
      </div>
    </article>
  );
}

function SecondaryNewsCard({ article }: { article: NewsArticlePreview }) {
  const date = formatNewsDate(article.publishedAt);
  const href = `/news/${article.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#0c1524]/6 bg-white shadow-[0_6px_24px_-16px_rgba(12,21,36,0.18)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-16px_rgba(12,21,36,0.24)]">
      <Link to={href} className="relative block overflow-hidden">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={article.image.src}
            alt={article.image.alt}
            className="size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        </div>
        <DateBadge day={date.day} month={date.month} className="left-3 top-3" />
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[0.6875rem] font-semibold tracking-wide text-[#F68E05] uppercase">
            {article.category}
          </span>
          <span className="text-[#0c1524]/25" aria-hidden>
            |
          </span>
          <span className="text-[0.75rem] text-[#0c1524]/52">{date.display}</span>
        </div>

        <h3 className="mt-2.5 text-[0.9375rem] font-bold leading-snug text-[#0c1524] sm:text-base">
          <Link
            to={href}
            className="line-clamp-2 transition-colors duration-200 hover:text-[#F68E05]"
          >
            {article.title}
          </Link>
        </h3>

        <ReadMoreLink href={href} className="mt-auto pt-4" />
      </div>
    </article>
  );
}

function DateBadge({
  day,
  month,
  className,
}: {
  day: string;
  month: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute flex min-w-[2.75rem] flex-col items-center rounded-md bg-[#F68E05] px-2 py-1.5 text-white shadow-[0_6px_16px_-8px_rgba(246,142,5,0.65)]",
        className,
      )}
    >
      <span className="text-sm font-bold leading-none">{day}</span>
      <span className="mt-0.5 text-[0.625rem] font-semibold uppercase leading-none">
        {month}
      </span>
    </div>
  );
}

function ReadMoreLink({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <Link
      to={href}
      className={cn(
        "group/link inline-flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.1em] text-[#F68E05] uppercase transition-colors duration-200 hover:text-[#E07F04]",
        className,
      )}
    >
      Read More
      <ArrowRight className="size-3.5 transition-transform duration-300 ease-out group-hover/link:translate-x-0.5" />
    </Link>
  );
}

function formatNewsDate(isoDate: string) {
  const date = new Date(isoDate);
  return {
    display: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    day: date.toLocaleDateString("en-US", { day: "2-digit" }),
    month: date.toLocaleDateString("en-US", { month: "short" }),
  };
}
