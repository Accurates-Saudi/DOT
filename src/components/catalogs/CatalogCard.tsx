import { Download, FileText } from "lucide-react";

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
        "group card-hover flex h-full flex-col border border-[#0c1524]/10 bg-white hover:border-[#0c1524]/16 hover:shadow-[0_24px_56px_-32px_rgba(12,21,36,0.22)]",
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
            className="img-zoom-hover size-full object-cover object-center"
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
          <a
            href={pdf.href}
            download={pdf.fileName}
            className="inline-flex h-10 items-center gap-2 rounded-sm border border-transparent bg-[#F68E05] px-5 text-[0.6875rem] font-bold tracking-[0.1em] text-white uppercase shadow-[0_6px_20px_-10px_rgba(246,142,5,0.45)] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.02] hover:bg-[#E07F04] hover:shadow-[0_10px_24px_-10px_rgba(246,142,5,0.5)] active:scale-[0.98] sm:h-[42px] sm:px-6 sm:text-xs"
          >
            <Download className="size-3.5" aria-hidden />
            {downloadLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
