import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { MediaGalleryItem } from "@/server/cms/media/gallery.server";
import { cn } from "@/lib/utils";

export interface CmsMediaLibrarySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect?: (item: MediaGalleryItem) => void;
  selectedUrl?: string;
}

export function CmsMediaLibrarySheet({
  open,
  onOpenChange,
  onSelect,
  selectedUrl,
}: CmsMediaLibrarySheetProps) {
  const [items, setItems] = useState<MediaGalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch("/api/cms/media")
      .then((response) => response.json())
      .then((body) => {
        if (cancelled) return;
        if (body.error) {
          setError(body.error.message ?? "Unable to load media library.");
          return;
        }
        setItems(body.data ?? []);
      })
      .catch(() => {
        if (!cancelled) {
          setError("Unable to load media library.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [open]);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return items;
    }

    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(normalized) ||
        item.url.toLowerCase().includes(normalized),
    );
  }, [items, query]);

  const uploads = filteredItems.filter((item) => item.source === "upload");
  const website = filteredItems.filter((item) => item.source === "website");

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[110]">
      <button
        type="button"
        className="absolute inset-0 bg-[#0c1524]/20"
        aria-label="Close media library"
        onClick={() => onOpenChange(false)}
      />

      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[36rem] flex-col border-l border-[#0c1524]/8 bg-white shadow-[-24px_0_80px_-48px_rgba(12,21,36,0.28)]">
        <header className="flex items-start justify-between gap-4 border-b border-[#0c1524]/6 px-5 py-4">
          <div>
            <p className="text-lg font-semibold text-[#0c1524]">Media Library</p>
            <p className="mt-2 text-sm leading-6 text-[#0c1524]/58">
              Choose an image already used on the website or uploaded through the CMS.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex size-9 items-center justify-center rounded-full border border-[#0c1524]/8 text-[#0c1524]/60 transition hover:bg-[#f5f6f8] hover:text-[#0c1524]"
            aria-label="Close media library"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="border-b border-[#0c1524]/6 px-5 py-4">
          <label className="relative block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#0c1524]/40" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search images"
              className="h-11 w-full rounded-2xl border border-[#0c1524]/10 bg-[#f7f8fa] pr-4 pl-10 text-sm text-[#0c1524] outline-none transition placeholder:text-[#0c1524]/40 focus:border-[#0c1524]/20"
            />
          </label>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-5">
          {loading ? (
            <p className="text-sm text-[#0c1524]/58">Loading media library...</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : filteredItems.length === 0 ? (
            <p className="text-sm text-[#0c1524]/58">
              No images found. Upload an image first, or try a different search.
            </p>
          ) : (
            <>
              <GalleryGroup
                title="Uploaded Media"
                items={uploads}
                selectedUrl={selectedUrl}
                onSelect={onSelect}
                onOpenChange={onOpenChange}
              />
              <GalleryGroup
                title="Website Images"
                items={website}
                selectedUrl={selectedUrl}
                onSelect={onSelect}
                onOpenChange={onOpenChange}
              />
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

function GalleryGroup({
  title,
  items,
  selectedUrl,
  onSelect,
  onOpenChange,
}: {
  title: string;
  items: MediaGalleryItem[];
  selectedUrl?: string;
  onSelect?: (item: MediaGalleryItem) => void;
  onOpenChange: (open: boolean) => void;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <h3 className="text-[0.72rem] font-semibold tracking-[0.18em] text-[#0c1524]/52 uppercase">
        {title}
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn(
              "overflow-hidden rounded-2xl border bg-white text-left transition hover:border-[var(--dot-orange)]",
              selectedUrl === item.url
                ? "border-[var(--dot-orange)] ring-1 ring-[var(--dot-orange)]"
                : "border-[#0c1524]/10",
            )}
            onClick={() => {
              onSelect?.(item);
              onOpenChange(false);
            }}
          >
            <img
              src={item.url}
              alt={item.label}
              className="aspect-square w-full object-cover"
              loading="lazy"
            />
            <span className="block truncate px-2 py-1.5 text-xs text-[#0c1524]/58">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
