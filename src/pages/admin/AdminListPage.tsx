import { ChevronRight } from "lucide-react";
import { Form } from "react-router";

import { AdminSurface } from "@/components/admin";

export interface AdminListPageRow {
  id: string;
  title: string;
  subtitle?: string;
  status?: string;
  updatedAt?: string;
  href?: string;
  hrefLabel?: string;
}

export function AdminListPage({
  title,
  description,
  searchValue,
  searchPlaceholder,
  rows,
  emptyMessage,
}: {
  title: string;
  description: string;
  searchValue: string;
  searchPlaceholder: string;
  rows: AdminListPageRow[];
  emptyMessage: string;
}) {
  return (
    <div className="space-y-5">
      <AdminSurface contentClassName="py-4">
        <Form method="get" className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            name="q"
            defaultValue={searchValue}
            placeholder={searchPlaceholder}
            className="h-10 flex-1 rounded-md border border-[#e5e5e5] bg-white px-4 text-[0.9375rem] text-[#111] outline-none transition placeholder:text-[#aaa] focus:border-[var(--dot-orange)] focus:ring-1 focus:ring-[var(--dot-orange)]"
          />
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-md border border-[#e5e5e5] bg-white px-5 text-sm text-[#333] transition hover:border-[#d4d4d4]"
          >
            Search
          </button>
        </Form>
      </AdminSurface>

      {description ? (
        <p className="text-[0.9375rem] text-[#666]">{description}</p>
      ) : null}

      <AdminSurface contentClassName="p-0">
        {rows.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-[0.9375rem]">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#f8f8f8] text-left text-sm font-medium text-[#888]">
                  <th className="px-6 py-4">{title}</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Updated</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-[#e5e5e5] last:border-b-0"
                  >
                    <td className="px-6 py-5">
                      <p className="font-medium text-[#111]">{row.title}</p>
                      {row.subtitle ? (
                        <p className="mt-0.5 text-sm text-[#888]">{row.subtitle}</p>
                      ) : null}
                    </td>
                    <td className="px-6 py-5">
                      {row.status ? (
                        <span className="inline-flex rounded border border-[#e5e5e5] px-2.5 py-1 text-sm capitalize text-[#555]">
                          {row.status}
                        </span>
                      ) : (
                        <span className="text-[#aaa]">—</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-[#666]">
                      {row.updatedAt
                        ? new Date(row.updatedAt).toLocaleString()
                        : "—"}
                    </td>
                    <td className="px-6 py-5 text-right">
                      {row.href ? (
                        <a
                          href={row.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--dot-orange)] hover:underline"
                        >
                          {row.hrefLabel ?? "Open"}
                          <ChevronRight className="size-4" />
                        </a>
                      ) : (
                        <span className="text-[#aaa]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-6 py-10 text-center text-[0.9375rem] text-[#888]">
            {emptyMessage}
          </p>
        )}
      </AdminSurface>
    </div>
  );
}
