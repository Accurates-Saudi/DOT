import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useRouteLoaderData } from "react-router";

import {
  createLocaleCookie,
  defaultLocale,
  getDirection,
  localeHtmlLang,
  localeLabels,
  localeStorageKey,
  locales,
  type Locale,
} from "@/i18n";
import { cn } from "@/lib/utils";

export function AdminLanguageSwitcher({ className }: { className?: string }) {
  const rootData = useRouteLoaderData("root") as { locale?: Locale } | undefined;
  const locale = rootData?.locale ?? defaultLocale;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      setOpen(false);
      return;
    }

    try {
      localStorage.setItem(localeStorageKey, nextLocale);
    } catch {
      // storage may be unavailable in private mode
    }

    document.documentElement.lang = localeHtmlLang[nextLocale];
    document.documentElement.dir = getDirection(nextLocale);
    document.documentElement.dataset.locale = nextLocale;
    document.cookie = createLocaleCookie(nextLocale);
    setOpen(false);
    window.location.reload();
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 items-center gap-2 rounded-md border border-[#e5e5e5] bg-white px-3.5 text-sm text-[#333] transition hover:border-[#d4d4d4]"
      >
        <Globe className="size-3.5 shrink-0 text-[#666]" aria-hidden />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 text-[#666] transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <div
        id={listboxId}
        role="listbox"
        className={cn(
          "absolute top-[calc(100%+0.25rem)] right-0 z-50 min-w-[9rem] overflow-hidden rounded-md border border-[#e5e5e5] bg-white shadow-sm transition",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        {locales.map((option) => {
          const selected = option === locale;
          return (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => switchLocale(option)}
              className={cn(
                "flex w-full items-center justify-between gap-3 px-3 py-2 text-sm transition",
                selected
                  ? "bg-[#f8f8f8] font-medium text-[#111]"
                  : "text-[#555] hover:bg-[#f8f8f8]",
              )}
            >
              <span>{localeLabels[option]}</span>
              {selected ? (
                <Check className="size-3.5 shrink-0 text-[var(--dot-orange)]" aria-hidden />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
