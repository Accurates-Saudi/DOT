import { Download, FileText } from "lucide-react";

import { Button } from "@/components/ui";
import type { CatalogItem } from "@/types";
import { cn } from "@/lib/utils";

export interface CatalogCardProps {
  catalog: CatalogItem;
  downloadLabel: string;
  pdfLabel: string;
  className?: string;
}

export function CatalogCard({
  catalog,
  downloadLabel,
  pdfLabel,
  className,
}: CatalogCardProps) {
  const { title, description, cover, pdf } = catalog;

  return (
    <article
      className={cn(
        "group card-hover flex h-full flex-col border border-[#0c1524]/10 bg-white hover:border-[#0c1524]/14 hover:shadow-[0_18px_48px_-34px_rgba(12,21,36,0.18)]",
        className,
      )}
    >
      <div className="relative bg-[#f5f4f2] px-5 pt-7 pb-5 sm:px-6 sm:pt-8 sm:pb-6">
        <span
          className="absolute top-0 right-0 left-0 h-0.5 bg-[#F68E05]"
          aria-hidden
        />

        <div className="relative aspect-[3/4] overflow-hidden bg-white shadow-[0_10px_36px_-14px_rgba(12,21,36,0.22)]">
          <img
            src={cover.src}
            alt={cover.alt}
            className="img-zoom-hover size-full object-contain object-center"
            loading="lazy"
            decoding="async"
          />

          <div className="absolute top-3 right-3 flex items-center gap-1.5 border border-[#0c1524]/8 bg-white/95 px-2 py-1 text-[#0c1524] backdrop-blur-sm">
            <FileText className="size-3 text-[#F68E05]" aria-hidden />
            <span className="text-[0.625rem] font-bold tracking-[0.14em] uppercase">
              {pdfLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
        <h3 className="text-base font-semibold tracking-tight text-[#0c1524] sm:text-[1.0625rem]">
          {title}
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#0c1524]/60">
          {description}
        </p>

        <div className="mt-6 border-t border-[#0c1524]/8 pt-5">
          {pdf?.href ? (
            <Button
              variant="accent"
              className="h-10 rounded-sm px-5 text-[0.6875rem] font-bold tracking-[0.1em] uppercase sm:h-[42px] sm:px-6 sm:text-xs"
              asChild
            >
              <a href={pdf.href} download={pdf.fileName}>
                <Download className="size-3.5" aria-hidden />
                {downloadLabel}
              </a>
            </Button>
          ) : (
            <Button
              type="button"
              variant="accent"
              className="h-10 rounded-sm px-5 text-[0.6875rem] font-bold tracking-[0.1em] uppercase sm:h-[42px] sm:px-6 sm:text-xs"
            >
              <Download className="size-3.5" aria-hidden />
              {downloadLabel}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
