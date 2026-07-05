import { useEffect, useRef, useState } from "react";

import type { MediaGalleryItem } from "@/server/cms/media/gallery.server";
import { cn } from "@/lib/utils";

import { AdminField, AdminInput } from "./AdminEntityFormFields";

interface AdminMediaPickerProps {
  label: string;
  value?: { src: string; alt: string };
  onChange: (value: { src: string; alt: string }) => void;
}

export function AdminMediaPicker({ label, value, onChange }: AdminMediaPickerProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaGalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const uploadFormRef = useRef<HTMLFormElement>(null);

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

  async function handleUpload(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("key", file.name.replace(/\.[^.]+$/, ""));

    const response = await fetch("/api/cms/media", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) return;

    const body = await response.json();
    const uploaded = body.data;
    const url = uploaded?.url ?? uploaded?.currentVersion?.url;
    if (url) {
      onChange({
        src: url,
        alt: uploaded?.label ?? uploaded?.currentVersion?.filename ?? file.name,
      });
    }

    const refreshed = await fetch("/api/cms/media").then((result) => result.json());
    setItems(refreshed.data ?? []);
  }

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
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-md border border-[#e5e5e5] px-3 py-2 text-sm text-[#333] hover:border-[#d4d4d4]"
                onClick={() => setOpen((current) => !current)}
              >
                {open ? "Hide Media Library" : "Choose from Media Library"}
              </button>
              <button
                type="button"
                className="rounded-md border border-[#e5e5e5] px-3 py-2 text-sm text-[#333] hover:border-[#d4d4d4]"
                onClick={() => uploadInputRef.current?.click()}
              >
                Upload New
              </button>
            </div>
            <form ref={uploadFormRef} className="hidden">
              <input
                ref={uploadInputRef}
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) void handleUpload(file);
                  event.currentTarget.value = "";
                }}
              />
            </form>
          </div>
        </div>
      </AdminField>

      {open ? (
        <div className="rounded-md border border-[#e5e5e5] bg-[#f8f8f8] p-4">
          {loading ? (
            <p className="text-sm text-[#666]">Loading media library...</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-[#666]">No images found.</p>
          ) : (
            <div className="grid max-h-80 grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-4 lg:grid-cols-6">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={cn(
                    "overflow-hidden rounded-md border bg-white text-left transition hover:border-[var(--dot-orange)]",
                    value?.src === item.url
                      ? "border-[var(--dot-orange)]"
                      : "border-[#e5e5e5]",
                  )}
                  onClick={() =>
                    onChange({
                      src: item.url,
                      alt: item.label,
                    })
                  }
                >
                  <img
                    src={item.url}
                    alt={item.label}
                    className="aspect-square w-full object-cover"
                  />
                  <span className="block truncate px-2 py-1 text-xs text-[#666]">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
