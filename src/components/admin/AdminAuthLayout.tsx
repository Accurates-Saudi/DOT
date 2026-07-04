import type { ReactNode } from "react";

import dotLogo from "@/assets/logos/dot.webp";
import { cn } from "@/lib/utils";

interface AdminAuthLayoutProps {
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
  asideTitle?: string;
  asideDescription?: string;
  helperItems?: readonly string[];
  notice?: ReactNode;
  footer?: ReactNode;
}

export function AdminAuthLayout({
  badge,
  title,
  description,
  children,
  helperItems = [],
  notice,
  footer,
}: AdminAuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f8f8] px-4 py-8">
      <div className="w-full max-w-md">
        <div className="rounded-md border border-[#e5e5e5] bg-white p-6 sm:p-8">
          <img
            src={dotLogo}
            alt="Dynamic Oil Tools"
            className="h-12 w-auto object-contain"
          />
          <div className="mt-6">
            <p className="text-xs font-medium text-[var(--dot-orange)]">{badge}</p>
            <h1 className="mt-2 text-xl font-semibold text-[#111]">{title}</h1>
            <p className="mt-2 text-sm text-[#666]">{description}</p>
          </div>

          {notice ? <div className="mt-4">{notice}</div> : null}

          <div className="mt-6">{children}</div>

          {footer ? <div className="mt-6">{footer}</div> : null}
        </div>

        {helperItems.length > 0 ? (
          <div className="mt-4 rounded-md border border-[#e5e5e5] bg-white px-4 py-3">
            {helperItems.map((item) => (
              <p key={item} className="text-sm text-[#888]">
                {item}
              </p>
            ))}
          </div>
        ) : null}

        <p className="mt-4 text-center text-xs text-[#aaa]">
          © {new Date().getFullYear()} DOT. All rights reserved.
        </p>
      </div>
    </main>
  );
}
