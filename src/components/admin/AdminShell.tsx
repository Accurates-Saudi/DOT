import type { ReactNode } from "react";

import type { CMSAuthSession } from "@/types";
import { AdminWorkspaceProvider } from "@/contexts/admin-workspace-context";

import { AdminPasswordChangeDialog } from "./AdminPasswordChangeDialog";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

interface AdminShellProps {
  session: CMSAuthSession;
  children: ReactNode;
}

export function AdminShell({ session, children }: AdminShellProps) {
  return (
    <AdminWorkspaceProvider>
      <div className="min-h-screen bg-[#f8f8f8] text-[#111]">
        <div className="flex min-h-screen">
          <AdminSidebar user={session.user} />
          <div className="flex min-w-0 flex-1 flex-col">
            <AdminHeader user={session.user} />
            <main className="flex-1 px-8 py-8">{children}</main>
          </div>
        </div>
        {session.user.mustChangePassword ? (
          <AdminPasswordChangeDialog userEmail={session.user.email} />
        ) : null}
      </div>
    </AdminWorkspaceProvider>
  );
}
