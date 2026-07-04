import type { LucideIcon } from "lucide-react";
import {
  Award,
  Factory,
  LayoutDashboard,
  Newspaper,
  Package2,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router";

import type { CMSUser } from "@/types";
import { cn } from "@/lib/utils";

import { AdminLogoutButton } from "./AdminLogoutButton";

interface AdminNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const adminNavItems: AdminNavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package2 },
  { to: "/admin/news", label: "News", icon: Newspaper },
  { to: "/admin/certificates", label: "Certificates", icon: Award },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminSidebarProps {
  user: CMSUser;
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  return (
    <aside className="flex w-full flex-col border-b border-white/10 bg-[rgba(6,12,20,0.9)] p-5 md:min-h-screen md:w-80 md:border-r md:border-b-0 md:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl border border-[var(--dot-orange)]/30 bg-[var(--dot-orange)]/12 text-[var(--dot-orange)]">
          <Factory className="size-5" />
        </div>
        <div>
          <p className="text-[0.72rem] font-semibold tracking-[0.26em] text-[var(--dot-orange)] uppercase">
            CMS Console
          </p>
          <p className="text-base font-semibold text-white">Dynamic Oil Tools</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/45 uppercase">
          Signed in as
        </p>
        <p className="mt-2 text-sm font-medium text-white">{user.name}</p>
        <p className="mt-1 text-sm text-white/52">{user.email}</p>
        <span className="mt-3 inline-flex rounded-full border border-[var(--dot-orange)]/30 bg-[var(--dot-orange)]/12 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.16em] text-[var(--dot-orange)] uppercase">
          {user.role}
        </span>
      </div>

      <nav className="mt-6 flex flex-col gap-2">
        {adminNavItems.map((item) => {
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
                    ? "border-[var(--dot-orange)]/40 bg-[var(--dot-orange)]/14 text-white"
                    : "border-transparent bg-transparent text-white/70 hover:border-white/10 hover:bg-white/6 hover:text-white",
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
