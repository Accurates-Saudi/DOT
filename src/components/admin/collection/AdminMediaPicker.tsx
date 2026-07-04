import { useEffect, useState } from "react";

import type { MediaLibraryItem } from "@/types";
import { cn } from "@/lib/utils";

import { AdminField, AdminInput } from "./AdminEntityFormFields";

interface AdminMediaPickerProps {
  label: string;
  value?: { src: string; alt: string };
  onChange: (value: { src: string; alt: string }) => void;
}

export function AdminMediaPicker({ label, value, onChange }: AdminMediaPickerProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaLibraryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setLoading(true);

    fetch("/api/cms/media")
      .then((response) => response.json())
      .then((body) => {
        if (cancelled) return;
        setItems(body.data ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open]);

  return (
    <div className="space-y-3">
      <AdminField label={label}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          {value?.src ? (
            <img
              src={value.src}
              alt={value.alt || label}
              className="h-24 w-24 rounded-md border border-[#e5e5e5] object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-md border border-dashed border-[#e5e5e5] text-xs text-[#aaa]">
              No image
            </div>
          )}
          <div className="flex-1 space-y-2">
            <AdminInput
              value={value?.src ?? ""}
              onChange={(event) =>
                onChange({ src: event.target.value, alt: value?.alt ?? "" })
              }
              placeholder="Image URL"
            />
            <AdminInput
              value={value?.alt ?? ""}
              onChange={(event) =>
                onChange({ src: value?.src ?? "", alt: event.target.value })
              }
              placeholder="Alt text"
            />
            <button
              type="button"
              className="rounded-md border border-[#e5e5e5] px-3 py-2 text-sm text-[#333] hover:border-[#d4d4d4]"
              onClick={() => setOpen((current) => !current)}
            >
              {open ? "Hide Media Library" : "Choose from Media Library"}
            </button>
          </div>
        </div>
      </AdminField>

      {open ? (
        <div className="rounded-md border border-[#e5e5e5] bg-[#f8f8f8] p-4">
          {loading ? (
            <p className="text-sm text-[#666]">Loading media...</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-[#666]">No media assets found.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {items.map((item) => {
                const url = item.currentVersion?.url;
                if (!url) return null;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={cn(
                      "overflow-hidden rounded-md border bg-white text-left transition hover:border-[var(--dot-orange)]",
                      value?.src === url
                        ? "border-[var(--dot-orange)]"
                        : "border-[#e5e5e5]",
                    )}
                    onClick={() =>
                      onChange({
                        src: url,
                        alt: item.currentVersion?.filename ?? item.key,
                      })
                    }
                  >
                    <img
                      src={url}
                      alt={item.key}
                      className="aspect-square w-full object-cover"
                    />
                    <span className="block truncate px-2 py-1 text-xs text-[#666]">
                      {item.key}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
