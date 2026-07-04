import type { LucideIcon } from "lucide-react";
import {
  Award,
  Factory,
  LayoutDashboard,
  Images,
  Newspaper,
  Package2,
  Settings,
  Users,
  ExternalLink,
} from "lucide-react";
import { NavLink } from "react-router";

import type { CMSUser } from "@/types";
import { defaultLocale } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { AdminLogoutButton } from "./AdminLogoutButton";

interface AdminNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  roles?: CMSUser["role"][];
}

const adminNavItems: AdminNavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package2 },
  { to: "/admin/news", label: "News", icon: Newspaper },
  { to: "/admin/certificates", label: "Certificates", icon: Award },
  { to: "/admin/media", label: "Media Library", icon: Images },
  { to: "/admin/settings", label: "Settings", icon: Settings },
  { to: "/admin/users", label: "Users", icon: Users, roles: ["admin"] },
];

interface AdminSidebarProps {
  user: CMSUser;
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const visibleItems = adminNavItems.filter(
    (item) => !item.roles || item.roles.includes(user.role),
  );

  return (
    <aside className="flex w-full flex-col border-b border-[#0c1524]/6 bg-white p-5 md:min-h-screen md:w-[19rem] md:border-r md:border-b-0 md:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl border border-[var(--dot-orange)]/25 bg-[var(--dot-orange)]/10 text-[var(--dot-orange)]">
          <Factory className="size-5" />
        </div>
        <div>
          <p className="text-[0.72rem] font-semibold tracking-[0.26em] text-[var(--dot-orange)] uppercase">
            Website Management
          </p>
          <p className="text-base font-semibold text-[#0c1524]">Dynamic Oil Tools</p>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-[#0c1524]/8 bg-[#f5f6f8] p-4">
        <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-[#0c1524]/42 uppercase">
          Signed in as
        </p>
        <p className="mt-2 text-sm font-medium text-[#0c1524]">{user.name}</p>
        <p className="mt-1 text-sm text-[#0c1524]/52">{user.email}</p>
        <span className="mt-3 inline-flex rounded-full border border-[var(--dot-orange)]/22 bg-[var(--dot-orange)]/10 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.16em] text-[var(--dot-orange)] uppercase">
          {user.role}
        </span>
      </div>

      <a
        href={`/${defaultLocale}`}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex h-12 items-center justify-between rounded-2xl border border-[var(--dot-orange)]/18 bg-[var(--dot-orange)]/8 px-4 text-sm font-medium text-[#0c1524] transition hover:border-[var(--dot-orange)]/40 hover:bg-[var(--dot-orange)]/12"
      >
        <span>View Website</span>
        <ExternalLink className="size-4 text-[var(--dot-orange)]" />
      </a>

      <nav className="mt-6 flex flex-col gap-2">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "border-[var(--dot-orange)]/35 bg-[var(--dot-orange)]/10 text-[#0c1524]"
                    : "border-transparent bg-transparent text-[#0c1524]/66 hover:border-[#0c1524]/8 hover:bg-[#f5f6f8] hover:text-[#0c1524]",
                )
              }
            >
              <Icon className="size-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-6 md:mt-auto">
        <AdminLogoutButton />
      </div>
    </aside>
  );
}
