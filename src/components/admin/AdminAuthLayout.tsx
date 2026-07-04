import type { ReactNode } from "react";

import dotLogo from "@/assets/logos/dot.webp";
import industrialVisual from "@/assets/about/about.jpg";
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
  asideTitle,
  asideDescription,
  helperItems = [],
  notice,
  footer,
}: AdminAuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.05fr)_minmax(440px,0.95fr)]">
        <section className="hidden border-l border-black/6 bg-[#0c1524] text-white lg:flex lg:flex-col">
          <div className="relative flex-1 overflow-hidden">
            <img
              src={industrialVisual}
              alt="Industrial operations"
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,21,36,0.45),rgba(12,21,36,0.92))]" />
            <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
              <div className="inline-flex items-center gap-3 self-start rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-white/84 backdrop-blur-sm">
                <span className="size-2 rounded-full bg-[var(--dot-orange)]" />
                {badge}
              </div>

              <div className="max-w-xl">
                {asideTitle ? (
                  <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white">
                    {asideTitle}
                  </h2>
                ) : null}
                {asideDescription ? (
                  <p className="mt-5 text-lg leading-8 text-white/68">
                    {asideDescription}
                  </p>
                ) : null}
                {helperItems.length > 0 ? (
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {helperItems.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-white/72 backdrop-blur-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-10 xl:px-14">
          <div className="w-full max-w-xl">
            <div className="rounded-[2rem] border border-black/7 bg-white p-6 shadow-[0_32px_90px_-48px_rgba(12,21,36,0.28)] sm:p-8 lg:p-10">
              <img
                src={dotLogo}
                alt="Dynamic Oil Tools"
                className="h-12 w-auto object-contain"
              />
              <div className="mt-8">
                <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-[var(--dot-orange)] uppercase">
                  {badge}
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0c1524] sm:text-4xl">
                  {title}
                </h1>
                <p className="mt-4 text-base leading-7 text-[#0c1524]/62">
                  {description}
                </p>
              </div>

              {notice ? <div className="mt-6">{notice}</div> : null}

              <div className="mt-8">{children}</div>

              {footer ? <div className="mt-8">{footer}</div> : null}
            </div>

            <div
              className={cn(
                "mt-6 rounded-2xl border border-black/6 bg-white/70 px-4 py-3 text-sm leading-6 text-[#0c1524]/56 shadow-[0_18px_40px_-36px_rgba(12,21,36,0.22)] backdrop-blur-sm lg:hidden",
                helperItems.length === 0 && "hidden",
              )}
            >
              {helperItems.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
