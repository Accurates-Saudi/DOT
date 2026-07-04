import type { ReactNode } from "react";
import { Eye, Save, UploadCloud } from "lucide-react";
import { Link } from "react-router";

interface AdminEntityEditorShellProps {
  backTo: string;
  title: string;
  statusLabel: string;
  previewOpen: boolean;
  onPreviewToggle: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  isSaving?: boolean;
  isPublishing?: boolean;
  previewPanel: ReactNode | null;
  children: ReactNode;
}

export function AdminEntityEditorShell({
  backTo,
  title,
  statusLabel,
  previewOpen,
  onPreviewToggle,
  onSaveDraft,
  onPublish,
  isSaving,
  isPublishing,
  previewPanel,
  children,
}: AdminEntityEditorShellProps) {
  return (
    <>
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link to={backTo} className="text-sm text-[var(--dot-orange)] hover:underline">
            ← Back to list
          </Link>
          <h2 className="mt-2 text-lg font-medium text-[#111]">{title}</h2>
          <p className="mt-1 text-sm text-[#666]">Status: {statusLabel}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-[#e5e5e5] bg-white px-4 text-sm text-[#333] hover:border-[#d4d4d4]"
            onClick={onPreviewToggle}
          >
            <Eye className="size-4" />
            {previewOpen ? "Hide Preview" : "Preview"}
          </button>
          <button
            type="button"
            disabled={isSaving || isPublishing}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-[#e5e5e5] bg-white px-4 text-sm text-[#333] hover:border-[#d4d4d4] disabled:opacity-60"
            onClick={onSaveDraft}
          >
            <Save className="size-4" />
            {isSaving ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            disabled={isSaving || isPublishing}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-[var(--dot-orange)] px-4 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
            onClick={onPublish}
          >
            <UploadCloud className="size-4" />
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div
        className={
          previewOpen
            ? "grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
            : undefined
        }
      >
        <div className="min-w-0">{children}</div>
        {previewPanel}
      </div>
    </>
  );
}
