import { cn } from "@/lib/utils";

export interface MapEmbedProps {
  embedUrl: string;
  title?: string;
  variant?: "default" | "banner";
  className?: string;
}

export function MapEmbed({
  embedUrl,
  title = "Location map",
  variant = "default",
  className,
}: MapEmbedProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[#0c1524]/8 bg-white shadow-[0_12px_40px_-28px_rgba(12,21,36,0.18)]",
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
    </div>
  );
}
