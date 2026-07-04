import { useLoaderData } from "react-router";
import { Link } from "react-router";
import { ChevronRight, FilePenLine } from "lucide-react";

import { AdminSurface } from "@/components/admin";
import type { AdminDashboardItem } from "@/server/cms/content/admin-dashboard.server";

export function AdminDraftsPage({
  drafts,
  searchValue,
}: {
  drafts: AdminDashboardItem[];
  searchValue: string;
}) {
  return (
    <div className="space-y-6">
      <AdminSurface
        title="Drafts"
        description="Unpublished changes waiting for review or publish."
        contentClassName="p-0"
      >
        <form method="get" className="border-b border-[#e5e5e5] px-6 py-4">
          <input
            type="search"
            name="q"
            defaultValue={searchValue}
            placeholder="Search drafts..."
            className="h-10 w-full max-w-md rounded-md border border-[#e5e5e5] px-3 text-sm outline-none focus:border-[var(--dot-orange)]"
          />
        </form>

        {drafts.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <FilePenLine className="mx-auto size-8 text-[#ccc]" />
            <p className="mt-3 text-sm text-[#666]">No drafts found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[0.9375rem]">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#f8f8f8] text-left text-sm font-medium text-[#888]">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Change Summary</th>
                  <th className="px-6 py-4">Updated</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {drafts.map((draft) => (
                  <tr key={draft.id} className="border-b border-[#e5e5e5] last:border-b-0">
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#111]">{draft.title}</p>
                      <p className="text-xs text-[#888]">{draft.key}</p>
                    </td>
                    <td className="px-6 py-4 capitalize text-[#555]">{draft.type}</td>
                    <td className="max-w-sm px-6 py-4 text-[#555]">
                      {draft.changeSummary ?? "No summary provided"}
                    </td>
                    <td className="px-6 py-4 text-[#888]">
                      {new Date(draft.updatedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={draft.editPath}
                        className="inline-flex items-center gap-1 rounded-md border border-[#e5e5e5] bg-white px-4 py-2 text-sm text-[#333] hover:border-[#d4d4d4]"
                      >
                        Continue Editing
                        <ChevronRight className="size-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminSurface>
    </div>
  );
}
