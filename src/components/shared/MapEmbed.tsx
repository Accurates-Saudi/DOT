import { cn } from "@/lib/utils";

export interface MapEmbedProps {
  embedUrl: string;
  title?: string;
  className?: string;
}

export function MapEmbed({
  embedUrl,
  title = "Location map",
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
        className="aspect-[16/9] w-full min-h-[280px] border-0 sm:min-h-[360px] lg:min-h-[420px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
