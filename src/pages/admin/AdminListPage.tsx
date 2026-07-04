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
    <div className="space-y-6">
      <AdminSurface title={title} description={description}>
        <Form method="get" className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            name="q"
            defaultValue={searchValue}
            placeholder={searchPlaceholder}
            className="h-11 flex-1 rounded-2xl border border-[#0c1524]/10 bg-white px-4 text-sm text-[#0c1524] outline-none transition focus:border-[var(--dot-orange)] focus:ring-4 focus:ring-[color:rgba(246,142,5,0.12)]"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-[#0c1524]/10 bg-[#f7f8fa] px-5 text-sm font-medium text-[#0c1524] transition hover:border-[var(--dot-orange)]/28 hover:bg-[var(--dot-orange)]/[0.04]"
          >
            Search
          </button>
        </Form>
      </AdminSurface>

      <AdminSurface>
        {rows.length > 0 ? (
          <ul className="space-y-3">
            {rows.map((row) => (
              <li
                key={row.id}
                className="flex flex-col gap-3 rounded-2xl border border-[#0c1524]/8 bg-[#f7f8fa] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#0c1524]">
                    {row.title}
                  </p>
                  {row.subtitle ? (
                    <p className="mt-1 text-sm text-[#0c1524]/52">{row.subtitle}</p>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  {row.status ? (
                    <span className="rounded-full border border-[#0c1524]/8 bg-white px-2.5 py-1 text-[#0c1524]/62">
                      {row.status}
                    </span>
                  ) : null}
                  {row.updatedAt ? (
                    <span className="text-[#0c1524]/45">
                      {new Date(row.updatedAt).toLocaleString()}
                    </span>
                  ) : null}
                  {row.href ? (
                    <a
                      href={row.href}
                      className="font-medium text-[var(--dot-orange)]"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {row.hrefLabel ?? "Open"}
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#0c1524]/56">{emptyMessage}</p>
        )}
      </AdminSurface>
    </div>
  );
}
