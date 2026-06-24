import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import type { NewsArticlePreview } from "@/types";
import { cn } from "@/lib/utils";

export interface NewsCardProps {
  article: NewsArticlePreview;
  readMoreLabel?: string;
  className?: string;
}

export function NewsCard({
  article,
  readMoreLabel = "Read More",
  className,
}: NewsCardProps) {
  const href = `/news/${article.slug}`;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden border border-[#0c1524]/8 bg-white transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-16px_rgba(12,21,36,0.16)]",
        className,
      )}
    >
      <Link to={href} className="relative block overflow-hidden">
        <div className="aspect-[16/10] overflow-hidden bg-[#f4f3f2]">
          <img
            src={article.image.src}
            alt={article.image.alt}
            className="size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
        <time
          dateTime={article.publishedAt}
          className="text-[0.6875rem] font-semibold tracking-[0.08em] text-[#0c1524]/45 uppercase"
        >
          {formatNewsDate(article.publishedAt)}
        </time>

        <h3 className="mt-2.5 text-base font-semibold leading-snug tracking-tight text-[#0c1524] sm:text-[1.0625rem]">
          <Link
            to={href}
            className="line-clamp-2 transition-colors duration-200 hover:text-[#F68E05]"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[#0c1524]/58">
          {article.excerpt}
        </p>

        <Link
          to={href}
          className="group/link mt-5 inline-flex items-center gap-2 text-[0.875rem] font-medium text-[#F68E05] transition-colors duration-200 hover:text-[#E07F04]"
        >
          {readMoreLabel}
          <ArrowRight className="size-3.5 transition-transform duration-300 ease-out group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

export function formatNewsDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
