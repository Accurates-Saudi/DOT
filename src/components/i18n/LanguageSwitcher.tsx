import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import {
  createLocaleCookie,
  localeLabels,
  localeStorageKey,
  locales,
  type Locale,
} from "@/i18n";
import { useDirection, useI18n, useTranslation } from "@/i18n/hooks";
import { preloadMessages } from "@/i18n/loadMessages";
import { cn } from "@/lib/utils";
import { transitionPresets } from "@/lib/animations";
import { stripLocaleFromPath, localizePath } from "@/i18n/utils";

export interface LanguageSwitcherProps {
  isHeroState?: boolean;
  className?: string;
}

export function LanguageSwitcher({
  isHeroState = false,
  className,
}: LanguageSwitcherProps) {
  const { locale } = useI18n();
  const direction = useDirection();
  const { t } = useTranslation("language");
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    for (const nextLocale of locales) {
      if (nextLocale !== locale) {
        preloadMessages(nextLocale);
      }
    }
  }, [locale]);

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
      // localStorage may be unavailable in private mode
    }

    document.cookie = createLocaleCookie(nextLocale);

    const { pathname } = stripLocaleFromPath(location.pathname);
    const nextPath = localizePath(pathname, nextLocale);
    const nextUrl = `${nextPath}${location.search}${location.hash}`;

    setOpen(false);
    navigate(nextUrl);
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={t("current", { language: localeLabels[locale] })}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-[0.8125rem] font-medium tracking-[0.01em]",
          transitionPresets.colors,
          "duration-300",
          isHeroState
            ? "border-white/20 bg-white/5 text-white hover:border-white/35 hover:bg-white/10"
            : "border-border/70 bg-background/80 text-foreground/75 hover:border-border hover:bg-muted/60 hover:text-foreground",
        )}
      >
        <Globe className="size-3.5 shrink-0 opacity-80" aria-hidden />
        <span>{localeLabels[locale]}</span>
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 opacity-70 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <div
        id={listboxId}
        role="listbox"
        aria-label={t("label")}
        className={cn(
          "absolute top-[calc(100%+0.5rem)] z-50 min-w-[9.5rem] overflow-hidden rounded-xl border shadow-lg",
          transitionPresets.default,
          "duration-200",
          direction === "rtl" ? "left-0" : "right-0",
          isHeroState
            ? "border-white/15 bg-[#0c1524]/95 text-white backdrop-blur-md"
            : "border-border/70 bg-background/95 text-foreground backdrop-blur-md",
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
                "flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-start text-[0.8125rem] font-medium",
                transitionPresets.colors,
                "duration-200",
                selected
                  ? isHeroState
                    ? "bg-white/10 text-white"
                    : "bg-muted text-foreground"
                  : isHeroState
                    ? "text-white/80 hover:bg-white/8 hover:text-white"
                    : "text-foreground/75 hover:bg-muted/70 hover:text-foreground",
              )}
            >
              <span>{localeLabels[option]}</span>
              {selected ? (
                <Check className="size-3.5 shrink-0 text-[#F68E05]" aria-hidden />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
