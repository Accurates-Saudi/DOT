import { useState, type ReactNode } from "react";
import { Save, UploadCloud } from "lucide-react";
import { Link } from "react-router";

import { AdminSaveDialog } from "./AdminSaveDialog";

interface AdminEntityEditorShellProps {
  backTo: string;
  title: string;
  statusLabel: string;
  isDirty?: boolean;
  onSaveDraft: (changeSummary: string) => void | Promise<void>;
  onPublish: (changeSummary: string) => void | Promise<void>;
  isSaving?: boolean;
  isPublishing?: boolean;
  children: ReactNode;
}

export function AdminEntityEditorShell({
  backTo,
  title,
  statusLabel,
  isDirty = false,
  onSaveDraft,
  onPublish,
  isSaving,
  isPublishing,
  children,
}: AdminEntityEditorShellProps) {
  const [pendingAction, setPendingAction] = useState<"draft" | "publish" | null>(null);
  const isBusy = Boolean(isSaving || isPublishing);

  async function handleConfirm(changeSummary: string) {
    if (pendingAction === "publish") {
      await onPublish(changeSummary);
    } else {
      await onSaveDraft(changeSummary);
    }
    setPendingAction(null);
  }

  return (
    <>
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link to={backTo} className="text-sm text-[var(--dot-orange)] hover:underline">
            ← Back to list
          </Link>
          <h2 className="mt-2 text-lg font-medium text-[#111]">{title}</h2>
          <p className="mt-1 text-sm text-[#666]">
            Status: {statusLabel}
            {isDirty ? (
              <span className="ml-2 rounded bg-[#fff7ed] px-2 py-0.5 text-xs font-medium text-[var(--dot-orange)]">
                Unsaved changes
              </span>
            ) : null}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={isBusy || !isDirty}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-[#e5e5e5] bg-white px-4 text-sm text-[#333] hover:border-[#d4d4d4] disabled:opacity-60"
            onClick={() => setPendingAction("draft")}
          >
            <Save className="size-4" />
            Save Draft
          </button>
          <button
            type="button"
            disabled={isBusy || !isDirty}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-[var(--dot-orange)] px-4 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
            onClick={() => setPendingAction("publish")}
          >
            <UploadCloud className="size-4" />
            Publish
          </button>
        </div>
      </div>

      {children}

      <AdminSaveDialog
        open={pendingAction !== null}
        action={pendingAction ?? "draft"}
        onClose={() => {
          if (!isBusy) setPendingAction(null);
        }}
        onConfirm={(changeSummary) => void handleConfirm(changeSummary)}
        isSubmitting={isBusy}
      />
    </>
  );
}
