import { X } from "lucide-react";

export interface CmsMediaLibrarySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect?: (mediaId: string) => void;
}

export function CmsMediaLibrarySheet({
  open,
  onOpenChange,
}: CmsMediaLibrarySheetProps) {
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

      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[32rem] flex-col border-l border-[#0c1524]/8 bg-white shadow-[-24px_0_80px_-48px_rgba(12,21,36,0.28)]">
        <header className="flex items-start justify-between gap-4 border-b border-[#0c1524]/6 px-5 py-4">
          <div>
            <p className="text-lg font-semibold text-[#0c1524]">Media Library</p>
            <p className="mt-2 text-sm leading-6 text-[#0c1524]/58">
              This feature will be available after the Media Library module is
              completed.
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

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-5">
          <section className="rounded-2xl border border-dashed border-[#0c1524]/12 bg-[#f7f8fa] p-5">
            <p className="text-sm font-medium text-[#0c1524]">Coming soon</p>
            <p className="mt-2 text-sm leading-6 text-[#0c1524]/56">
              Search, image grid, pagination, and image selection will appear
              here without changing this workflow.
            </p>
          </section>

          <div className="space-y-3 opacity-50" aria-hidden>
            <div className="h-11 rounded-2xl border border-[#0c1524]/10 bg-white" />
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`media-placeholder-${index}`}
                  className="aspect-square rounded-2xl border border-[#0c1524]/8 bg-[#f3f5f7]"
                />
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
