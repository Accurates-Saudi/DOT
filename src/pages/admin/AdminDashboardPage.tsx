import {
  Award,
  Boxes,
  ChevronRight,
  ExternalLink,
  Images,
  Newspaper,
  Package2,
  Upload,
} from "lucide-react";
import { Link } from "react-router";

import { AdminSurface } from "@/components/admin";
import { defaultLocale } from "@/i18n/config";
import type { CMSRole } from "@/types";

const contentRows = [
  {
    label: "Products",
    to: "/admin/products",
    icon: Package2,
    countKey: "products" as const,
  },
  {
    label: "News",
    to: "/admin/news",
    icon: Newspaper,
    countKey: "news" as const,
  },
  {
    label: "Certificates",
    to: "/admin/certificates",
    icon: Award,
    countKey: "certificates" as const,
  },
  {
    label: "Catalogs",
    to: "/admin/catalogs",
    icon: Boxes,
    countKey: "catalogs" as const,
  },
  {
    label: "Media Files",
    to: "/admin/media",
    icon: Images,
    countKey: "media" as const,
  },
];

const quickActions: Array<
  | { label: string; to: string; icon: typeof Package2 }
  | { label: string; href: string; icon: typeof ExternalLink }
> = [
  {
    label: "Add New Product",
    to: "/admin/products",
    icon: Package2,
  },
  {
    label: "Add New News",
    to: "/admin/news",
    icon: Newspaper,
  },
  {
    label: "Upload Media",
    to: "/admin/media",
    icon: Upload,
  },
  {
    label: "View Website",
    href: `/${defaultLocale}`,
    icon: ExternalLink,
  },
];

export function AdminDashboardPage({
  userRole,
  counts,
  recentChanges,
}: {
  userName: string;
  userRole: CMSRole;
  counts: {
    products: number;
    news: number;
    certificates: number;
    catalogs: number;
    media: number;
    users: number;
  };
  recentChanges: Array<{
    id: string;
    label: string;
    type: string;
    updatedAt: string;
    status: string;
  }>;
}) {
  const drafts = recentChanges.filter((item) => item.status === "draft");

  return (
    <div className="space-y-8">
      <AdminSurface title="Content" contentClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-[0.9375rem]">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#f8f8f8] text-left text-sm font-medium text-[#888]">
                <th className="px-6 py-4">Content Type</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {contentRows.map((row) => {
                const Icon = row.icon;
                return (
                  <tr
                    key={row.to}
                    className="border-b border-[#e5e5e5] last:border-b-0"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <Icon className="size-5 shrink-0 text-[#888]" />
                        <span className="font-medium text-[#111]">{row.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[#555]">
                      {counts[row.countKey]}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link
                        to={row.to}
                        className="inline-flex items-center gap-1 rounded-md border border-[#e5e5e5] bg-white px-4 py-2 text-sm text-[#333] transition hover:border-[#d4d4d4]"
                      >
                        Manage
                        <ChevronRight className="size-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {userRole === "admin" ? (
                <tr className="border-b border-[#e5e5e5] last:border-b-0">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-[#111]">Users</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-[#555]">{counts.users}</td>
                  <td className="px-6 py-5 text-right">
                    <Link
                      to="/admin/users"
                      className="inline-flex items-center gap-1 rounded-md border border-[#e5e5e5] bg-white px-4 py-2 text-sm text-[#333] transition hover:border-[#d4d4d4]"
                    >
                      Manage
                      <ChevronRight className="size-3.5" />
                    </Link>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </AdminSurface>

      {drafts.length > 0 ? (
        <AdminSurface title="Recent Drafts" contentClassName="p-0">
          <ul className="divide-y divide-[#e5e5e5]">
            {drafts.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 px-6 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-[0.9375rem] font-medium text-[#111]">
                    {item.label}
                  </p>
                  <p className="text-sm text-[#888] capitalize">{item.type}</p>
                </div>
                <p className="shrink-0 text-sm text-[#888]">
                  {new Date(item.updatedAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </AdminSurface>
      ) : null}

      <div>
        <h2 className="mb-4 text-base font-semibold text-[#111]">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const className =
              "flex items-center gap-3 rounded-md border border-[#e5e5e5] bg-white px-5 py-4 text-[0.9375rem] text-[#333] transition hover:border-[#d4d4d4]";

            if ("href" in action) {
              return (
                <a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noreferrer"
                  className={className}
                >
                  <Icon className="size-5 shrink-0 text-[#888]" />
                  {action.label}
                </a>
              );
            }

            return (
              <Link key={action.label} to={action.to} className={className}>
                <Icon className="size-5 shrink-0 text-[#888]" />
                {action.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
