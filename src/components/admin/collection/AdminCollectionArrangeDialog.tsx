import { useEffect, useRef, useState } from "react";
import { GripVertical, X } from "lucide-react";
import { useFetcher } from "react-router";

import type { AdminCollectionRowMeta } from "@/utils/cms-entities";
import { cn } from "@/lib/utils";

interface AdminCollectionArrangeDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  collectionPath: string;
  rows: AdminCollectionRowMeta[];
}

interface ReorderActionData {
  ok?: boolean;
}

function reorderRows(
  rows: AdminCollectionRowMeta[],
  fromIndex: number,
  toIndex: number,
): AdminCollectionRowMeta[] {
  if (
    fromIndex === toIndex ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= rows.length ||
    toIndex >= rows.length
  ) {
    return rows;
  }

  const next = [...rows];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

export function AdminCollectionArrangeDialog({
  open,
  onClose,
  title,
  collectionPath,
  rows,
}: AdminCollectionArrangeDialogProps) {
  const fetcher = useFetcher<ReorderActionData>();
  const savedRef = useRef(false);
  const [arrangeRows, setArrangeRows] = useState(rows);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const isSaving = fetcher.state !== "idle";

  useEffect(() => {
    if (!open) return;
    setArrangeRows(rows);
    setDraggingIndex(null);
    setDropTargetIndex(null);
    savedRef.current = false;
  }, [open, rows]);

  useEffect(() => {
    if (!open || !savedRef.current || fetcher.state !== "idle") return;
    savedRef.current = false;
    if (fetcher.data?.ok) onClose();
  }, [fetcher.data, fetcher.state, onClose, open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSaving) onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSaving, onClose, open]);

  function handleDrop(targetIndex: number) {
    if (draggingIndex === null) return;

    setArrangeRows((current) => reorderRows(current, draggingIndex, targetIndex));
    setDraggingIndex(null);
    setDropTargetIndex(null);
  }

  function handleSave() {
    savedRef.current = true;
    void fetcher.submit(
      {
        intent: "reorder",
        orderedKeys: JSON.stringify(arrangeRows.map((row) => row.key)),
      },
      { method: "post", action: collectionPath },
    );
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close arrange dialog"
        className="absolute inset-0 bg-[#111]/40"
        onClick={onClose}
        disabled={isSaving}
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
              Drag items to reorder them. This controls the order shown on the website.
            </p>
          </div>
          <button
            type="button"
            className="rounded-md border border-[#e5e5e5] p-2 text-[#666] hover:border-[#d4d4d4] disabled:opacity-50"
            onClick={onClose}
            disabled={isSaving}
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
                draggable={!isSaving}
                onDragStart={() => {
                  setDraggingIndex(index);
                  setDropTargetIndex(index);
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDropTargetIndex(index);
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  handleDrop(index);
                }}
                onDragEnd={() => {
                  setDraggingIndex(null);
                  setDropTargetIndex(null);
                }}
                className={cn(
                  "flex cursor-grab items-center gap-3 rounded-md border bg-[#fafafa] px-3 py-3 transition active:cursor-grabbing",
                  isSaving && "pointer-events-none opacity-60",
                  draggingIndex === index
                    ? "border-[var(--dot-orange)] opacity-50"
                    : dropTargetIndex === index && draggingIndex !== null
                      ? "border-[var(--dot-orange)] bg-[#fff7ef]"
                      : "border-[#e5e5e5]",
                )}
              >
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-[#888] ring-1 ring-[#e5e5e5]"
                  aria-hidden
                >
                  <GripVertical className="size-4" />
                </span>
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
                <div className="min-w-0 flex-1 select-none">
                  <p className="truncate font-medium text-[#111]">{row.title}</p>
                  {row.subtitle ? (
                    <p className="truncate text-xs text-[#888]">{row.subtitle}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex justify-end gap-2 border-t border-[#e5e5e5] px-5 py-4">
          <button
            type="button"
            className="rounded-md border border-[#e5e5e5] px-4 py-2 text-sm text-[#333] hover:border-[#d4d4d4] disabled:opacity-50"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md bg-[var(--dot-orange)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
