import type { ReactNode } from "react";
import { useLocation } from "react-router";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { cn } from "@/lib/utils";

export interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  useScrollToTop();

  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main
        className={cn(
          "flex-1",
          !isHome && "pt-16 lg:pt-[4.25rem] xl:pt-[4.75rem]",
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
