import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useSearchParams } from "react-router";

import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** Base route path, e.g. "/news" */
  basePath: string;
  previousLabel?: string;
  nextLabel?: string;
  pageLabel?: string;
  className?: string;
}

function buildPageHref(basePath: string, page: number) {
  if (page <= 1) return basePath;
  return `${basePath}?page=${page}`;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  previousLabel = "Previous",
  nextLabel = "Next",
  pageLabel = "Page",
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex flex-col items-center gap-4", className)}
    >
      <ul className="flex list-none flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <li>
          <PaginationLink
            to={buildPageHref(basePath, currentPage - 1)}
            disabled={!hasPrevious}
            aria-label={previousLabel}
            className="px-3 sm:px-4"
          >
            <ChevronLeft className="size-4" aria-hidden />
            <span className="sr-only sm:not-sr-only">{previousLabel}</span>
          </PaginationLink>
        </li>

        {pages.map((page) => (
          <li key={page}>
            <PaginationLink
              to={buildPageHref(basePath, page)}
              isActive={page === currentPage}
              aria-label={`${pageLabel} ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </PaginationLink>
          </li>
        ))}

        <li>
          <PaginationLink
            to={buildPageHref(basePath, currentPage + 1)}
            disabled={!hasNext}
            aria-label={nextLabel}
            className="px-3 sm:px-4"
          >
            <span className="sr-only sm:not-sr-only">{nextLabel}</span>
            <ChevronRight className="size-4" aria-hidden />
          </PaginationLink>
        </li>
      </ul>
    </nav>
  );
}

interface PaginationLinkProps {
  to: string;
  children: ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-current"?: "page";
}

function PaginationLink({
  to,
  children,
  isActive = false,
  disabled = false,
  className,
  "aria-label": ariaLabel,
  "aria-current": ariaCurrent,
}: PaginationLinkProps) {
  const baseStyles =
    "inline-flex h-10 min-w-10 items-center justify-center gap-1.5 border text-[0.8125rem] font-medium transition-[border-color,background-color,color,box-shadow] duration-200 ease-out sm:h-11 sm:min-w-11";

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={cn(
          baseStyles,
          "cursor-not-allowed border-[#0c1524]/8 bg-[#f8f7f6] text-[#0c1524]/30",
          className,
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      className={cn(
        baseStyles,
        isActive
          ? "border-[#F68E05] bg-[#F68E05] text-white shadow-[0_4px_14px_-8px_rgba(246,142,5,0.6)]"
          : "border-[#0c1524]/10 bg-white text-[#0c1524]/70 hover:border-[#0c1524]/18 hover:text-[#0c1524]",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Hook for reading pagination page from URL search params */
export function usePaginationPage(): number {
  const [searchParams] = useSearchParams();
  const page = Number.parseInt(searchParams.get("page") ?? "1", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}
