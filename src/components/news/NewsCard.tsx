import { Link } from "react-router";

import type { NewsArticlePreview } from "@/types";
import { cn } from "@/lib/utils";

export interface NewsCardProps {
  article: NewsArticlePreview;
  readMoreLabel?: string;
  slidesPerView?: number;
  className?: string;
}

export function NewsCard({
  article,
  readMoreLabel = "Read More",
  slidesPerView,
  className,
}: NewsCardProps) {
  const href = `/news/${article.slug}`;
  const date = formatNewsDateParts(article.publishedAt);
  const gapCount = slidesPerView ? Math.max(slidesPerView - 1, 0) : 0;
  const slideWidth =
    slidesPerView === undefined
      ? undefined
      : slidesPerView === 1
        ? "100%"
        : `calc((100% - ${gapCount * 1.5}rem) / ${slidesPerView})`;

  return (
    <article
      data-news-slide={slidesPerView !== undefined ? true : undefined}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-[#0c1524]/8 bg-white transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-16px_rgba(12,21,36,0.16)]",
        slidesPerView !== undefined && "shrink-0",
        className,
      )}
      style={
        slideWidth
          ? { width: slideWidth, flexBasis: slideWidth }
          : undefined
      }
    >
      <Link to={href} className="relative block overflow-hidden rounded-t-xl">
        <div className="aspect-[4/3] overflow-hidden bg-[#f4f3f2] sm:aspect-[16/11]">
          <img
            src={article.image.src}
            alt={article.image.alt}
            className="size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
        <NewsDateBadge day={date.day} month={date.month} />
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <h3 className="text-[0.9375rem] font-bold leading-snug text-[#0c1524] sm:text-base">
          <Link
            to={href}
            className="line-clamp-2 transition-colors duration-200 hover:text-[#F68E05]"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-[0.8125rem] leading-relaxed text-[#0c1524]/58 sm:text-sm">
          {article.excerpt}
        </p>

        <Link
          to={href}
          className="group/link mt-5 inline-flex items-center gap-2 text-[0.875rem] font-medium text-[#F68E05] transition-colors duration-200 hover:text-[#E07F04]"
        >
          {readMoreLabel}
          <span
            className="inline-block transition-transform duration-300 ease-out group-hover/link:translate-x-1"
            aria-hidden
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

export function NewsDateBadge({ day, month }: { day: string; month: string }) {
  return (
    <div className="absolute left-4 top-4 flex min-w-[2.6rem] flex-col items-center rounded-md bg-[#F68E05] px-2 py-1.5 text-white shadow-[0_4px_14px_-6px_rgba(246,142,5,0.7)]">
      <span className="text-sm font-bold leading-none">{day}</span>
      <span className="mt-0.5 text-[0.625rem] font-semibold uppercase leading-none">
        {month}
      </span>
    </div>
  );
}

export function formatNewsDateParts(isoDate: string) {
  const date = new Date(isoDate);
  return {
    day: date.toLocaleDateString("en-US", { day: "2-digit" }),
    month: date.toLocaleDateString("en-US", { month: "short" }),
  };
}

export function formatNewsDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
