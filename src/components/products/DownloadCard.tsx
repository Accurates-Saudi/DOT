import { Download } from "lucide-react";
import { Link } from "react-router";

import type { DownloadResource } from "@/types";
import { cn } from "@/lib/utils";

export interface DownloadCardProps {
  resource: DownloadResource;
  className?: string;
}

export function DownloadCard({ resource, className }: DownloadCardProps) {
  return (
    <article
      className={cn(
        "flex gap-4 rounded-2xl border border-[#0c1524]/8 bg-white p-5 transition-[box-shadow,border-color] duration-200 hover:border-[#0c1524]/14 hover:shadow-[0_8px_32px_-20px_rgba(12,21,36,0.14)] sm:p-6",
        className,
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#0c1524]/8 bg-[#0c1524]/[0.02]">
        <Download className="size-4 text-[#F68E05]" aria-hidden />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-[#0c1524]">
            {resource.title}
          </h3>
          <span className="rounded-sm bg-[#0c1524]/5 px-1.5 py-0.5 text-[0.625rem] font-bold tracking-wider text-[#0c1524]/55 uppercase">
            {resource.fileType}
          </span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-[#0c1524]/60 sm:text-[0.8125rem]">
          {resource.description}
        </p>
        <Link
          to={resource.href}
          className="mt-3 inline-flex text-xs font-semibold tracking-wide text-[#F68E05] uppercase transition-colors hover:text-[#E07F04]"
        >
          Download
        </Link>
      </div>
    </article>
  );
}
