import type { LucideIcon } from "lucide-react";
import {
  Award,
  Boxes,
  FilePenLine,
  Images,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Package2,
  Settings,
  Users,
} from "lucide-react";
import { Form, NavLink, useNavigation } from "react-router";

import dotLogo from "@/assets/logos/dot.webp";
import { AdminBackToWebsiteLink } from "@/components/admin/AdminBackToWebsiteLink";
import { useAdminWebsiteReturnUrl } from "@/hooks/use-admin-website-return";
import type { CMSUser } from "@/types";
import { cn } from "@/lib/utils";

interface AdminNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  roles?: CMSUser["role"][];
  badge?: string;
}

const adminNavItems: AdminNavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/drafts", label: "Drafts", icon: FilePenLine },
  { to: "/admin/products", label: "Products", icon: Package2 },
  { to: "/admin/news", label: "News", icon: Newspaper },
  { to: "/admin/certificates", label: "Certificates", icon: Award },
  { to: "/admin/catalogs", label: "Catalogs", icon: Boxes },
  { to: "/admin/media", label: "Media Library", icon: Images },
  { to: "/admin/settings", label: "Settings", icon: Settings },
  {
    to: "/admin/users",
    label: "Users",
    icon: Users,
    roles: ["admin"],
    badge: "Admin Only",
  },
];

interface AdminSidebarProps {
  user: CMSUser;
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const returnUrl = useAdminWebsiteReturnUrl();
  const navigation = useNavigation();
  const isLoggingOut =
    navigation.state === "submitting" &&
    navigation.formAction?.endsWith("/admin/logout");

  const visibleItems = adminNavItems.filter(
    (item) => !item.roles || item.roles.includes(user.role),
  );

  return (
    <aside className="sticky top-0 flex h-svh w-64 shrink-0 flex-col self-start overflow-y-auto border-r border-[#e5e5e5] bg-white">
      <div className="border-b border-[#e5e5e5] px-6 py-5">
        <a
          href={returnUrl}
          className="inline-block rounded-md transition hover:opacity-80"
          aria-label="Back to website"
        >
          <img
            src={dotLogo}
            alt="Dynamic Oil Tools"
            className="h-11 w-auto max-w-full object-contain object-left"
          />
        </a>
      </div>

      <nav className="flex-1 px-4 py-5">
        <ul className="space-y-1">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/admin"}
                  className={({ isActive }) =>
                    cn(
                      "relative flex items-center gap-3 rounded-md px-3 py-2.5 text-[0.9375rem] transition",
                      isActive
                        ? "bg-[#fff7ed] font-medium text-[var(--dot-orange)]"
                        : "text-[#555] hover:bg-[#f8f8f8] hover:text-[#111]",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive ? (
                        <span className="absolute top-1/2 left-0 h-6 w-0.5 -translate-y-1/2 rounded-full bg-[var(--dot-orange)]" />
                      ) : null}
                      <Icon className="size-[1.125rem] shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge ? (
                        <span className="rounded border border-[#e5e5e5] px-1.5 py-0.5 text-[0.6875rem] text-[#888]">
                          {item.badge}
                        </span>
                      ) : null}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-[#e5e5e5] px-4 py-4">
        <AdminBackToWebsiteLink variant="sidebar" />
        <Form method="post" action="/admin/logout">
          <button
            type="submit"
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[0.9375rem] text-[#555] transition hover:bg-[#f8f8f8] hover:text-[#111] disabled:opacity-60"
          >
            <LogOut className="size-[1.125rem] shrink-0" />
            {isLoggingOut ? "Signing out..." : "Logout"}
          </button>
        </Form>
        <p className="px-3 pt-4 text-xs text-[#aaa]">
          © {new Date().getFullYear()} DOT. All rights reserved.
        </p>
      </div>
    </aside>
  );
}
