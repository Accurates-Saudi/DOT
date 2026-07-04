import { useEffect, useId, useState } from "react";

interface AdminSaveDialogProps {
  open: boolean;
  action: "draft" | "publish";
  onClose: () => void;
  onConfirm: (changeSummary: string) => void;
  isSubmitting?: boolean;
}

export function AdminSaveDialog({
  open,
  action,
  onClose,
  onConfirm,
  isSubmitting,
}: AdminSaveDialogProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const titleId = useId();
  const isPublish = action === "publish";

  useEffect(() => {
    if (!open) return;
    setMessage("");
    setError(null);
  }, [open, action]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, isSubmitting, onClose]);

  if (!open) return null;

  function handleSubmit() {
    const trimmed = message.trim();
    if (!trimmed) {
      setError("Add a short summary describing what changed.");
      return;
    }

    onConfirm(trimmed);
  }

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-[#111]/40"
        onClick={() => {
          if (!isSubmitting) onClose();
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg rounded-md border border-[#e5e5e5] bg-white shadow-xl"
      >
        <div className="border-b border-[#e5e5e5] px-5 py-4">
          <h2 id={titleId} className="text-base font-semibold text-[#111]">
            {isPublish ? "Publish changes" : "Save draft"}
          </h2>
          <p className="mt-1 text-sm text-[#666]">
            Describe your changes like a git commit message. This is stored in version history.
          </p>
        </div>

        <div className="px-5 py-4">
          <label className="block text-sm font-medium text-[#333]" htmlFor={`${titleId}-message`}>
            Change summary
          </label>
          <textarea
            id={`${titleId}-message`}
            rows={4}
            value={message}
            disabled={isSubmitting}
            placeholder={
              isPublish
                ? "Publish updated hero copy and technical data table"
                : "Update product introduction and cover image"
            }
            className="mt-2 w-full rounded-md border border-[#e5e5e5] px-3 py-2 text-sm text-[#111] outline-none focus:border-[var(--dot-orange)]"
            onChange={(event) => {
              setMessage(event.target.value);
              if (error) setError(null);
            }}
          />
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        </div>

        <div className="flex justify-end gap-2 border-t border-[#e5e5e5] px-5 py-4">
          <button
            type="button"
            disabled={isSubmitting}
            className="rounded-md border border-[#e5e5e5] px-4 py-2 text-sm text-[#333] hover:border-[#d4d4d4] disabled:opacity-60"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            className={
              isPublish
                ? "rounded-md bg-[var(--dot-orange)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
                : "rounded-md border border-[#111] bg-[#111] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
            }
            onClick={handleSubmit}
          >
            {isSubmitting
              ? isPublish
                ? "Publishing..."
                : "Saving..."
              : isPublish
                ? "Publish"
                : "Save Draft"}
          </button>
        </div>
      </div>
    </div>
  );
}
