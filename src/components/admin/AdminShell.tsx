import type { ReactNode } from "react";

import type { CMSAuthSession } from "@/types";

import { AdminSidebar } from "./AdminSidebar";

interface AdminShellProps {
  session: CMSAuthSession;
  children: ReactNode;
}

export function AdminShell({ session, children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[#f3f5f7] text-[#0c1524]">
      <div className="flex min-h-screen flex-col md:flex-row">
        <AdminSidebar user={session.user} />
        <div className="flex flex-1 flex-col">
          <header className="border-b border-[#0c1524]/6 bg-white px-5 py-5 sm:px-8 lg:px-10">
            <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-[var(--dot-orange)] uppercase">
              Website Management Hub
            </p>
            <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-[#0c1524] sm:text-3xl">
                  Manage collections. Edit the site where it lives.
                </h1>
                <p className="mt-1 max-w-3xl text-sm leading-7 text-[#0c1524]/58 sm:text-base">
                  Use this hub for structured collections, media, settings, and
                  users. The public website remains the primary editing surface for
                  page content.
                </p>
              </div>
              <div className="rounded-2xl border border-[#0c1524]/8 bg-[#f5f6f8] px-4 py-3 text-sm text-[#0c1524]/62">
                Session valid until{" "}
                <span className="font-medium text-[#0c1524]">
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
