import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

import { localeScrollStorageKey } from "@/i18n/locale-scroll";

export function useRestoreLocaleScroll() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    try {
      const saved = sessionStorage.getItem(localeScrollStorageKey);
      if (saved === null) return;

      const scrollY = Number(saved);
      sessionStorage.removeItem(localeScrollStorageKey);

      if (!Number.isFinite(scrollY)) return;

      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, behavior: "instant" as ScrollBehavior });
      });
    } catch {
      // sessionStorage unavailable
    }
  }, [pathname]);
}
