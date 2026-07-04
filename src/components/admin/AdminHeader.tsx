import { useLocation } from "react-router";

import type { CMSUser } from "@/types";

import { AdminLanguageSwitcher } from "./AdminLanguageSwitcher";
import { AdminUserMenu } from "./AdminUserMenu";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/products": "Products",
  "/admin/news": "News",
  "/admin/certificates": "Certificates",
  "/admin/catalogs": "Catalogs",
  "/admin/media": "Media Library",
  "/admin/settings": "Settings",
  "/admin/users": "Users",
};

function getPageTitle(pathname: string) {
  return pageTitles[pathname] ?? "Admin";
}

interface AdminHeaderProps {
  user: CMSUser;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const { pathname } = useLocation();
  const title = getPageTitle(pathname);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#e5e5e5] bg-white px-8">
      <h1 className="text-lg font-medium text-[#111]">{title}</h1>
      <div className="flex items-center gap-3">
        <AdminLanguageSwitcher />
        <AdminUserMenu user={user} />
      </div>
    </header>
  );
}
