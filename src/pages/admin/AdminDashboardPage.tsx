import {
  ExternalLink,
  Award,
  Boxes,
  Images,
  Newspaper,
  Package2,
  Settings,
  Users,
} from "lucide-react";
import { Link } from "react-router";

import { AdminSurface } from "@/components/admin";
import { defaultLocale } from "@/i18n/config";
import type { CMSRole } from "@/types";

const quickLinks = [
  {
    title: "Products",
    to: "/admin/products",
    icon: Package2,
  },
  {
    title: "News",
    to: "/admin/news",
    icon: Newspaper,
  },
  {
    title: "Certificates",
    to: "/admin/certificates",
    icon: Award,
  },
  {
    title: "Catalogs",
    to: "/admin/catalogs",
    icon: Boxes,
  },
  {
    title: "Media Library",
    to: "/admin/media",
    icon: Images,
  },
  {
    title: "Settings",
    to: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Users",
    to: "/admin/users",
    icon: Users,
    roles: ["admin"] as CMSRole[],
  },
];

export function AdminDashboardPage({
  userName,
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
  const visibleQuickLinks = quickLinks.filter(
    (item) => !item.roles || item.roles.includes(userRole),
  );

  return (
    <div className="space-y-6">
      <AdminSurface title="Welcome" description={`Signed in as ${userName}.`}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-7 text-[#0c1524]/58">
            Use the dashboard to manage collections and settings. Use the website
            itself to edit page content.
          </p>
          <a
            href={`/${defaultLocale}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--dot-orange)] px-5 text-sm font-medium text-white transition hover:bg-[#db7d04]"
          >
            View Website
            <ExternalLink className="size-4" />
          </a>
        </div>
      </AdminSurface>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <AdminSurface title="Quick links">
          <div className="grid gap-3 sm:grid-cols-2">
            {visibleQuickLinks.map((item) => {
              const Icon = item.icon;
              return (
              <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 rounded-2xl border border-[#0c1524]/8 bg-[#f7f8fa] px-4 py-4 text-sm font-medium text-[#0c1524] transition hover:border-[var(--dot-orange)]/28 hover:bg-[var(--dot-orange)]/[0.04]"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white text-[var(--dot-orange)] shadow-[0_10px_24px_-18px_rgba(12,21,36,0.18)]">
                    <Icon className="size-4" />
                  </span>
                  <span>{item.title}</span>
                  <ExternalLink className="ml-auto size-4 text-[#0c1524]/35" />
                </Link>
              );
            })}
          </div>
        </AdminSurface>

        <AdminSurface title="Collection counts">
          <dl className="divide-y divide-[#0c1524]/6 text-sm">
            <CountRow label="Products" value={counts.products} />
            <CountRow label="News" value={counts.news} />
            <CountRow label="Certificates" value={counts.certificates} />
            <CountRow label="Catalogs" value={counts.catalogs} />
            <CountRow label="Media Library" value={counts.media} />
            {userRole === "admin" ? <CountRow label="Users" value={counts.users} /> : null}
          </dl>
        </AdminSurface>
      </div>

      <AdminSurface title="Recent changes">
        {recentChanges.length > 0 ? (
          <ul className="space-y-3">
            {recentChanges.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-1 rounded-2xl border border-[#0c1524]/8 bg-[#f7f8fa] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-[#0c1524]">{item.label}</p>
                  <p className="text-sm text-[#0c1524]/52">
                    {item.type} • {item.status}
                  </p>
                </div>
                <p className="text-sm text-[#0c1524]/48">
                  {new Date(item.updatedAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#0c1524]/56">No recent CMS changes yet.</p>
        )}
      </AdminSurface>
    </div>
  );
}

function CountRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between py-3">
      <dt className="text-[#0c1524]/62">{label}</dt>
      <dd className="font-medium text-[#0c1524]">{value}</dd>
    </div>
  );
}
