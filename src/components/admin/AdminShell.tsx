import type { ReactNode } from "react";

import type { CMSAuthSession } from "@/types";

import { AdminSidebar } from "./AdminSidebar";

interface AdminShellProps {
  session: CMSAuthSession;
  children: ReactNode;
}

export function AdminShell({ session, children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(246,142,5,0.12),_transparent_24%),linear-gradient(180deg,#07111d_0%,#0c1524_48%,#101c2e_100%)] text-white">
      <div className="flex min-h-screen flex-col md:flex-row">
        <AdminSidebar user={session.user} />
        <div className="flex flex-1 flex-col">
          <header className="border-b border-white/8 px-5 py-5 sm:px-8 lg:px-10">
            <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-[var(--dot-orange)] uppercase">
              Industrial Content Management
            </p>
            <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Admin workspace
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-white/55 sm:text-base">
                  Manage website content, publishing flow, and media operations from
                  a secure CMS shell built for future expansion.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/72">
                Session active until{" "}
                <span className="font-medium text-white">
                  {new Date(session.expiresAt).toLocaleString()}
                </span>
              </div>
            </div>
          </header>

          <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
