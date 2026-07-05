import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, X } from "lucide-react";
import { Form } from "react-router";

import type { AdminCollectionRowMeta } from "@/utils/cms-entities";

interface AdminCollectionArrangeDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  collectionPath: string;
  rows: AdminCollectionRowMeta[];
}

export function AdminCollectionArrangeDialog({
  open,
  onClose,
  title,
  collectionPath,
  rows,
}: AdminCollectionArrangeDialogProps) {
  const [arrangeRows, setArrangeRows] = useState(rows);

  useEffect(() => {
    if (!open) return;
    setArrangeRows(rows);
  }, [open, rows]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  function moveRow(index: number, direction: "up" | "down") {
    setArrangeRows((current) => {
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= current.length) return current;

      const next = [...current];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close arrange dialog"
        className="absolute inset-0 bg-[#111]/40"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-arrange-title"
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-md border border-[#e5e5e5] bg-white shadow-xl"
      >
        <div className="flex items-start justify-between border-b border-[#e5e5e5] px-5 py-4">
          <div>
            <h2 id="admin-arrange-title" className="text-base font-semibold text-[#111]">
              Arrange {title}
            </h2>
            <p className="mt-1 text-sm text-[#666]">
              Move items up or down. This controls the order shown on the website.
            </p>
          </div>
          <button
            type="button"
            className="rounded-md border border-[#e5e5e5] p-2 text-[#666] hover:border-[#d4d4d4]"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <ol className="space-y-2">
            {arrangeRows.map((row, index) => (
              <li
                key={row.key}
                className="flex items-center gap-3 rounded-md border border-[#e5e5e5] bg-[#fafafa] px-3 py-3"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#888] ring-1 ring-[#e5e5e5]">
                  {index + 1}
                </span>
                {row.thumbnail ? (
                  <img
                    src={row.thumbnail}
                    alt=""
                    className="size-10 shrink-0 rounded-md border border-[#e5e5e5] object-cover"
                  />
                ) : (
                  <div className="size-10 shrink-0 rounded-md border border-dashed border-[#e5e5e5] bg-white" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-[#111]">{row.title}</p>
                  {row.subtitle ? (
                    <p className="truncate text-xs text-[#888]">{row.subtitle}</p>
                  ) : null}
                </div>
                <div className="flex shrink-0 flex-col gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    aria-label={`Move ${row.title} up`}
                    className="inline-flex size-8 items-center justify-center rounded-md border border-[#e5e5e5] bg-white text-[#555] hover:border-[#d4d4d4] disabled:cursor-not-allowed disabled:opacity-40"
                    onClick={() => moveRow(index, "up")}
                  >
                    <ArrowUp className="size-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === arrangeRows.length - 1}
                    aria-label={`Move ${row.title} down`}
                    className="inline-flex size-8 items-center justify-center rounded-md border border-[#e5e5e5] bg-white text-[#555] hover:border-[#d4d4d4] disabled:cursor-not-allowed disabled:opacity-40"
                    onClick={() => moveRow(index, "down")}
                  >
                    <ArrowDown className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Form
          method="post"
          action={collectionPath}
          className="flex justify-end gap-2 border-t border-[#e5e5e5] px-5 py-4"
        >
          <input
            type="hidden"
            name="orderedKeys"
            value={JSON.stringify(arrangeRows.map((row) => row.key))}
          />
          <button
            type="button"
            className="rounded-md border border-[#e5e5e5] px-4 py-2 text-sm text-[#333] hover:border-[#d4d4d4]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            name="intent"
            value="reorder"
            className="rounded-md bg-[var(--dot-orange)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Save Order
          </button>
        </Form>
      </div>
    </div>
  );
}
