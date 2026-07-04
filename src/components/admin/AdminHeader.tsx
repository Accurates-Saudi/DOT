import { Eye } from "lucide-react";
import { useLocation } from "react-router";

import { AdminPreviewPanel } from "@/components/admin/collection/AdminPreviewPanel";
import { useAdminWorkspace } from "@/contexts/admin-workspace-context";
import type { CMSUser } from "@/types";

import { AdminBackToWebsiteLink } from "./AdminBackToWebsiteLink";
import { AdminLanguageSwitcher } from "./AdminLanguageSwitcher";
import { AdminUserMenu } from "./AdminUserMenu";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/drafts": "Drafts",
  "/admin/products": "Products",
  "/admin/news": "News",
  "/admin/certificates": "Certificates",
  "/admin/catalogs": "Catalogs",
  "/admin/media": "Media Library",
  "/admin/settings": "Settings",
  "/admin/users": "Users",
};

function getPageTitle(pathname: string) {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith("/admin/products/")) return "Edit Product";
  if (pathname.startsWith("/admin/news/")) return "Edit News";
  if (pathname.startsWith("/admin/certificates/")) return "Edit Certificate";
  if (pathname.startsWith("/admin/catalogs/")) return "Edit Catalog";
  return "Admin";
}

interface AdminHeaderProps {
  user: CMSUser;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const { pathname } = useLocation();
  const title = getPageTitle(pathname);
  const { preview, previewOpen, togglePreview, closePreview } = useAdminWorkspace();

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#e5e5e5] bg-white px-8">
        <h1 className="text-lg font-medium text-[#111]">{title}</h1>
        <div className="flex items-center gap-3">
          {preview ? (
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-[#e5e5e5] bg-white px-3 text-sm text-[#333] hover:border-[#d4d4d4]"
              onClick={togglePreview}
            >
              <Eye className="size-4" />
              {previewOpen ? "Hide Preview" : "Preview"}
            </button>
          ) : null}
          <AdminBackToWebsiteLink variant="header" />
          <AdminLanguageSwitcher />
          <AdminUserMenu user={user} />
        </div>
      </header>

      {preview && previewOpen ? (
        <AdminPreviewPanel
          open
          variant="overlay"
          onClose={closePreview}
          locale={preview.locale}
          title={preview.title}
        >
          {preview.render()}
        </AdminPreviewPanel>
      ) : null}
    </>
  );
}
