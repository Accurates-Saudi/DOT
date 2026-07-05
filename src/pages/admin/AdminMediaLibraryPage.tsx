import { useMemo, useRef, useState } from "react";
import { Form, useNavigation } from "react-router";
import { Upload } from "lucide-react";

import { AdminSurface } from "@/components/admin";
import type { MediaGalleryItem } from "@/server/cms/media/gallery.server";
import { cn } from "@/lib/utils";

export function AdminMediaLibraryPage({
  items,
  searchValue,
}: {
  items: MediaGalleryItem[];
  searchValue: string;
}) {
  const navigation = useNavigation();
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [uploadKey, setUploadKey] = useState("");
  const isUploading =
    navigation.state === "submitting" &&
    navigation.formAction?.endsWith("/admin/media");

  const grouped = useMemo(() => {
    const uploads = items.filter((item) => item.source === "upload");
    const website = items.filter((item) => item.source === "website");
    return { uploads, website };
  }, [items]);

  return (
    <div className="space-y-5">
      <p className="text-[0.9375rem] text-[#666]">
        Browse every image used on the website plus uploaded CMS media. Pick any image when editing
        content fields.
      </p>

      <AdminSurface contentClassName="py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Form method="get" className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="search"
              name="q"
              defaultValue={searchValue}
              placeholder="Search images by name or URL"
              className="h-10 flex-1 rounded-md border border-[#e5e5e5] bg-white px-4 text-sm outline-none focus:border-[var(--dot-orange)]"
            />
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md border border-[#e5e5e5] bg-white px-5 text-sm text-[#333]"
            >
              Search
            </button>
          </Form>

          <Form
            method="post"
            encType="multipart/form-data"
            className="flex flex-col gap-2 sm:flex-row sm:items-center"
          >
            <input
              type="text"
              name="key"
              value={uploadKey}
              onChange={(event) => setUploadKey(event.target.value)}
              placeholder="Upload key (optional)"
              className="h-10 rounded-md border border-[#e5e5e5] bg-white px-3 text-sm outline-none focus:border-[var(--dot-orange)]"
            />
            <input
              ref={uploadInputRef}
              type="file"
              name="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                if (event.currentTarget.files?.length) {
                  event.currentTarget.form?.requestSubmit();
                }
              }}
            />
            <button
              type="button"
              disabled={isUploading}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-[var(--dot-orange)] px-4 text-sm font-medium text-white disabled:opacity-60"
              onClick={() => uploadInputRef.current?.click()}
            >
              <Upload className="size-4" />
              {isUploading ? "Uploading..." : "Upload Image"}
            </button>
          </Form>
        </div>
      </AdminSurface>

      <GallerySection title="Uploaded Media" items={grouped.uploads} emptyMessage="No uploaded media yet." />
      <GallerySection
        title="Website Images"
        items={grouped.website}
        emptyMessage="No website images matched your search."
      />
    </div>
  );
}

function GallerySection({
  title,
  items,
  emptyMessage,
}: {
  title: string;
  items: MediaGalleryItem[];
  emptyMessage: string;
}) {
  return (
    <AdminSurface title={title} contentClassName="p-4">
      {items.length === 0 ? (
        <p className="py-8 text-center text-sm text-[#666]">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-md border border-[#e5e5e5] bg-white"
            >
              <div className="aspect-square bg-[#fafafa]">
                <img
                  src={item.url}
                  alt={item.label}
                  className="size-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1 px-2 py-2">
                <p className="truncate text-xs font-medium text-[#111]">{item.label}</p>
                <p
                  className={cn(
                    "text-[0.6875rem] uppercase tracking-wide",
                    item.source === "upload" ? "text-[var(--dot-orange)]" : "text-[#888]",
                  )}
                >
                  {item.source}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminSurface>
  );
}
