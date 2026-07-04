import type { ReactNode } from "react";
import { X } from "lucide-react";

interface AdminPreviewPanelProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function AdminPreviewPanel({
  open,
  onClose,
  title = "Preview",
  children,
}: AdminPreviewPanelProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        type="button"
        aria-label="Close preview"
        className="absolute inset-0 bg-[#111]/40"
        onClick={onClose}
      />
      <aside className="relative ml-auto flex h-full w-full max-w-5xl flex-col border-l border-[#e5e5e5] bg-white shadow-xl">
        <div className="flex h-14 items-center justify-between border-b border-[#e5e5e5] px-5">
          <div>
            <p className="text-sm font-semibold text-[#111]">{title}</p>
            <p className="text-xs text-[#888]">
              Draft preview only. The public website updates after Publish.
            </p>
          </div>
          <button
            type="button"
            className="rounded-md border border-[#e5e5e5] p-2 text-[#666] hover:border-[#d4d4d4]"
            onClick={onClose}
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto bg-[#f8f8f8]">{children}</div>
      </aside>
    </div>
  );
}
