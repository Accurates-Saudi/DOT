import { Navigation } from "lucide-react";

import { FormattedNumericText } from "@/components/i18n";
import type { MapLocationContent } from "@/types";
import { cn } from "@/lib/utils";

export interface MapEmbedProps {
  embedUrl: string;
  title?: string;
  variant?: "default" | "banner";
  info?: MapLocationContent;
  className?: string;
}

export function MapEmbed({
  embedUrl,
  title = "Location map",
  variant = "default",
  info,
  className,
}: MapEmbedProps) {
  const directionsUrl =
    info?.directionsUrl ??
    (info ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(info.address)}` : undefined);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[#0c1524]/8 bg-white shadow-[0_12px_40px_-28px_rgba(12,21,36,0.18)]",
        className,
      )}
    >
      <iframe
        title={title}
        src={embedUrl}
        className={cn(
          "w-full border-0",
          variant === "banner"
            ? "h-[11.5rem] sm:h-[13rem] lg:h-[14.5rem]"
            : "aspect-[16/9] min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]",
        )}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

      {info && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10",
            variant === "banner" ? "p-2.5 sm:p-3" : "p-3 sm:p-4",
          )}
        >
          <div
            className={cn(
              "pointer-events-auto max-w-[calc(100%-0.5rem)] rounded-sm border border-[#dadce0]/80 bg-white shadow-[0_1px_6px_rgba(60,64,67,0.18)]",
              variant === "banner"
                ? "max-w-[13.5rem] sm:max-w-[15.5rem]"
                : "max-w-[15.5rem] sm:max-w-[17.5rem]",
            )}
          >
            <div
              className={cn(
                variant === "banner" ? "p-2.5 sm:p-3" : "p-3 sm:p-3.5",
              )}
            >
              <a
                href={info.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "block font-medium text-[#1a73e8] hover:underline",
                  variant === "banner"
                    ? "text-[0.75rem] leading-snug sm:text-[0.8125rem]"
                    : "text-[0.8125rem] leading-snug sm:text-sm",
                )}
              >
                {info.placeName}
              </a>

              <p
                className={cn(
                  "mt-1.5 leading-snug text-[#5f6368]",
                  variant === "banner"
                    ? "text-[0.625rem] sm:text-[0.6875rem]"
                    : "text-[0.6875rem] sm:text-xs",
                )}
              >
                <FormattedNumericText value={info.address} />
              </p>

              <div className="mt-2 flex items-center gap-2 border-t border-[#e8eaed] pt-2">
                {directionsUrl && (
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-1 font-medium text-[#1a73e8] hover:underline",
                      variant === "banner"
                        ? "text-[0.625rem] sm:text-[0.6875rem]"
                        : "text-[0.6875rem] sm:text-xs",
                    )}
                  >
                    <Navigation
                      className={cn(
                        variant === "banner" ? "size-2.5" : "size-3",
                      )}
                      aria-hidden
                    />
                    {info.directionsLabel ?? "Directions"}
                  </a>
                )}

                <span className="text-[#dadce0]" aria-hidden>
                  |
                </span>

                <a
                  href={info.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "font-medium text-[#1a73e8] hover:underline",
                    variant === "banner"
                      ? "text-[0.625rem] sm:text-[0.6875rem]"
                      : "text-[0.6875rem] sm:text-xs",
                  )}
                >
                  {info.viewLargerMapLabel ?? "View larger map"}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
