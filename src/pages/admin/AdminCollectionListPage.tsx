import {
  Archive,
  ChevronRight,
  Copy,
  GripVertical,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { Form, Link } from "react-router";
import { useEffect, useState } from "react";

import { AdminSurface } from "@/components/admin";
import type { AdminCollectionRowMeta } from "@/utils/cms-entities";
import { cn } from "@/lib/utils";

interface AdminCollectionListPageProps {
  title: string;
  description: string;
  collectionPath: string;
  searchValue: string;
  searchPlaceholder: string;
  addNewHref: string;
  rows: AdminCollectionRowMeta[];
  editPath: (row: AdminCollectionRowMeta) => string;
  emptyMessage: string;
  statusFilter?: string;
}

export function AdminCollectionListPage({
  title,
  description,
  collectionPath,
  searchValue,
  searchPlaceholder,
  addNewHref,
  rows,
  editPath,
  emptyMessage,
  statusFilter = "all",
}: AdminCollectionListPageProps) {
  const [orderedRows, setOrderedRows] = useState(rows);
  const [draggingKey, setDraggingKey] = useState<string | null>(null);

  useEffect(() => {
    setOrderedRows(rows);
  }, [rows]);

  const filteredRows = orderedRows.filter((row) => {
    if (statusFilter === "all") return row.status !== "archived";
    return row.status === statusFilter;
  });

  function handleDrop(targetKey: string) {
    if (!draggingKey || draggingKey === targetKey) return;

    setOrderedRows((current) => {
      const next = [...current];
      const fromIndex = next.findIndex((row) => row.key === draggingKey);
      const toIndex = next.findIndex((row) => row.key === targetKey);
      if (fromIndex === -1 || toIndex === -1) return current;

      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
    setDraggingKey(null);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.9375rem] text-[#666]">{description}</p>
        <Link
          to={addNewHref}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-[var(--dot-orange)] px-4 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus className="size-4" />
          Add New
        </Link>
      </div>

      <AdminSurface contentClassName="py-4">
        <Form method="get" className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <input
            type="search"
            name="q"
            defaultValue={searchValue}
            placeholder={searchPlaceholder}
            className="h-10 flex-1 rounded-md border border-[#e5e5e5] bg-white px-4 text-[0.9375rem] text-[#111] outline-none transition placeholder:text-[#aaa] focus:border-[var(--dot-orange)] focus:ring-1 focus:ring-[var(--dot-orange)]"
          />
          <select
            name="status"
            defaultValue={statusFilter}
            className="h-10 rounded-md border border-[#e5e5e5] bg-white px-3 text-sm text-[#333]"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="static">Website only</option>
            <option value="archived">Archived</option>
          </select>
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-md border border-[#e5e5e5] bg-white px-5 text-sm text-[#333] hover:border-[#d4d4d4]"
          >
            Apply
          </button>
        </Form>
      </AdminSurface>

      <AdminSurface contentClassName="p-0">
        {filteredRows.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.9375rem]">
                <thead>
                  <tr className="border-b border-[#e5e5e5] bg-[#f8f8f8] text-left text-sm font-medium text-[#888]">
                    <th className="w-10 px-3 py-4" />
                    <th className="px-6 py-4">{title}</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Updated</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
                    <tr
                      key={row.key}
                      draggable
                      onDragStart={() => setDraggingKey(row.key)}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() => handleDrop(row.key)}
                      className={cn(
                        "border-b border-[#e5e5e5] last:border-b-0",
                        draggingKey === row.key && "opacity-60",
                      )}
                    >
                      <td className="px-3 py-5 text-[#aaa]">
                        <GripVertical className="size-4 cursor-grab" />
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          {row.thumbnail ? (
                            <img
                              src={row.thumbnail}
                              alt=""
                              className="size-12 rounded-md border border-[#e5e5e5] object-cover"
                            />
                          ) : (
                            <div className="size-12 rounded-md border border-dashed border-[#e5e5e5]" />
                          )}
                          <div>
                            <p className="font-medium text-[#111]">{row.title}</p>
                            {row.subtitle ? (
                              <p className="text-sm text-[#888]">{row.subtitle}</p>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex rounded border border-[#e5e5e5] px-2.5 py-1 text-sm capitalize text-[#555]">
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-[#666]">
                        {row.updatedAt
                          ? new Date(row.updatedAt).toLocaleString()
                          : "—"}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap items-center justify-end gap-2">
                          <Link
                            to={editPath(row)}
                            className="inline-flex items-center gap-1 rounded-md border border-[#e5e5e5] px-3 py-1.5 text-sm text-[#333] hover:border-[#d4d4d4]"
                          >
                            <Pencil className="size-3.5" />
                            Edit
                          </Link>
                          {row.cmsKey ? (
                            <>
                              <Form method="post" action={collectionPath}>
                                <input type="hidden" name="key" value={row.cmsKey} />
                                <button
                                  type="submit"
                                  name="intent"
                                  value="duplicate"
                                  className="inline-flex items-center gap-1 rounded-md border border-[#e5e5e5] px-3 py-1.5 text-sm text-[#333] hover:border-[#d4d4d4]"
                                >
                                  <Copy className="size-3.5" />
                                  Duplicate
                                </button>
                              </Form>
                              <Form method="post" action={collectionPath}>
                                <input type="hidden" name="key" value={row.cmsKey} />
                                <button
                                  type="submit"
                                  name="intent"
                                  value="archive"
                                  className="inline-flex items-center gap-1 rounded-md border border-[#e5e5e5] px-3 py-1.5 text-sm text-[#333] hover:border-[#d4d4d4]"
                                >
                                  <Archive className="size-3.5" />
                                  Archive
                                </button>
                              </Form>
                            </>
                          ) : null}
                          {row.href ? (
                            <a
                              href={row.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--dot-orange)] hover:underline"
                            >
                              View
                              <ChevronRight className="size-3.5" />
                            </a>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Form method="post" action={collectionPath} className="border-t border-[#e5e5e5] px-5 py-4">
              <input
                type="hidden"
                name="orderedKeys"
                value={JSON.stringify(orderedRows.map((row) => row.key))}
              />
              <button
                type="submit"
                name="intent"
                value="reorder"
                className="rounded-md border border-[#e5e5e5] bg-white px-4 py-2 text-sm text-[#333] hover:border-[#d4d4d4]"
              >
                Save Order
              </button>
            </Form>
          </>
        ) : (
          <p className="px-6 py-10 text-center text-[0.9375rem] text-[#888]">
            {emptyMessage}
          </p>
        )}
      </AdminSurface>
    </div>
  );
}
