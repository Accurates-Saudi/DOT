import { ArrowRight, X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { forwardRef, useEffect, useState, type ComponentPropsWithoutRef } from "react";
import { NavLink, useLocation } from "react-router";

import { LanguageSwitcher, LocalizedLink } from "@/components/i18n";
import { Button } from "@/components/ui/button";
import { useMainNavigation, useSiteCopy } from "@/i18n/content/hooks";
import { useDirection, useTranslation } from "@/i18n/hooks";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { siteSettings } from "@/data/site";
import { cn } from "@/lib/utils";
import dotLogo from "@/assets/logos/dot.webp";

import { LinkedInIcon } from "./NavbarIcons";

interface NavbarMobileMenuProps {
  isHeroState?: boolean;
}

export function NavbarMobileMenu({ isHeroState = false }: NavbarMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const mainNavigation = useMainNavigation();
  const site = useSiteCopy();
  const direction = useDirection();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { t } = useTranslation("nav");

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <MobileMenuToggle
          isOpen={open}
          isHeroState={isHeroState}
          label={t("openMenu")}
        />
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-[60] bg-[#0c1524]/45 supports-backdrop-filter:backdrop-blur-[3px]",
            !prefersReducedMotion &&
              "data-open:animate-in data-open:fade-in-0 data-open:duration-300 data-closed:animate-out data-closed:fade-out-0 data-closed:duration-200",
          )}
        />

        <DialogPrimitive.Content
          aria-label={t("mobileMenuTitle")}
          className={cn(
            "fixed z-[70] flex max-h-[min(32rem,calc(100dvh-5.25rem))] w-[min(calc(100vw-1.5rem),22rem)] flex-col overflow-hidden rounded-2xl border border-[#0c1524]/10 bg-white shadow-[0_24px_80px_-24px_rgba(12,21,36,0.45)] outline-none",
            "top-[calc(4rem+0.625rem)]",
            direction === "rtl" ? "left-3 sm:left-4" : "right-3 sm:right-4",
            !prefersReducedMotion &&
              "origin-top data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-open:slide-in-from-top-3 data-open:duration-300 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:slide-out-to-top-2 data-closed:duration-200",
            direction === "rtl" ? "origin-top-left" : "origin-top-right",
          )}
          style={
            prefersReducedMotion
              ? undefined
              : { animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }
          }
        >
          <div className="flex items-center justify-between border-b border-[#0c1524]/8 px-4 py-3.5 sm:px-5">
            <div className="flex min-w-0 items-center gap-2.5">
              <img
                src={dotLogo}
                alt={site.companyName}
                className="h-7 w-auto object-contain"
              />
              <span className="truncate text-[0.6875rem] font-semibold tracking-[0.14em] text-[#0c1524]/45 uppercase">
                {t("mobileMenuTitle")}
              </span>
            </div>

            <DialogPrimitive.Close asChild>
              <button
                type="button"
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#0c1524]/10 text-[#0c1524]/70 transition-colors hover:border-[#0c1524]/15 hover:bg-[#0c1524]/5 hover:text-[#0c1524] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#F68E05]/35"
                aria-label={t("closeMenu")}
              >
                <X className="size-4" strokeWidth={2.25} />
              </button>
            </DialogPrimitive.Close>
          </div>

          <nav
            className="flex-1 overflow-y-auto overscroll-contain px-3 py-3 sm:px-4 sm:py-4"
            aria-label={t("mobileAria")}
          >
            <ul className="flex flex-col gap-1.5">
              {mainNavigation.map((item, index) => (
                <li
                  key={item.href}
                  className={cn(!prefersReducedMotion && open && "mobile-menu-item-enter")}
                  style={
                    prefersReducedMotion || !open
                      ? undefined
                      : { animationDelay: `${80 + index * 45}ms` }
                  }
                >
                  <NavLink
                    to={item.href}
                    end={/\/(en|ar)$/.test(item.href)}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center justify-between rounded-xl px-3.5 py-3 text-[0.9375rem] font-medium tracking-[0.01em] transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] sm:px-4 sm:py-3.5 sm:text-base",
                        isActive
                          ? "bg-[#F68E05]/10 text-[#0c1524]"
                          : "text-[#0c1524]/72 hover:bg-[#0c1524]/[0.04] hover:text-[#0c1524]",
                      )
                    }
                  >
                    <span>{item.label}</span>
                    <ArrowRight
                      className={cn(
                        "size-4 shrink-0 text-[#F68E05]/70 transition-transform duration-300 ease-out",
                        direction === "rtl"
                          ? "rotate-180 group-hover:-translate-x-0.5"
                          : "group-hover:translate-x-0.5",
                      )}
                      aria-hidden
                    />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={cn(
              "border-t border-[#0c1524]/8 bg-[#faf9f8] px-3 py-3.5 sm:px-4 sm:py-4",
              !prefersReducedMotion && open && "mobile-menu-item-enter",
            )}
            style={
              prefersReducedMotion || !open
                ? undefined
                : { animationDelay: `${80 + mainNavigation.length * 45}ms` }
            }
          >
            <div className="flex flex-col gap-3">
              <LanguageSwitcher isHeroState={false} className="w-full" />

              {siteSettings.social.linkedin && (
                <a
                  href={siteSettings.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#0c1524]/72 transition-colors hover:bg-white hover:text-[#0c1524]"
                >
                  <LinkedInIcon className="size-4" />
                  {t("linkedIn")}
                </a>
              )}

              <Button
                variant="accent"
                className="h-11 w-full rounded-full text-sm font-medium"
                asChild
              >
                <LocalizedLink to="/login" onClick={() => setOpen(false)}>
                  {t("login")}
                </LocalizedLink>
              </Button>
            </div>
          </div>

          <DialogPrimitive.Title className="sr-only">
            {t("mobileMenuTitle")}
          </DialogPrimitive.Title>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

const MobileMenuToggle = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button"> & {
    isOpen: boolean;
    isHeroState: boolean;
    label: string;
  }
>(function MobileMenuToggle(
  { isOpen, isHeroState, label, className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={isOpen}
      aria-label={label}
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center rounded-full transition-[color,background-color,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#F68E05]/35",
        isHeroState
          ? "text-white hover:bg-white/10"
          : "text-[#0c1524]/75 hover:bg-[#0c1524]/5 hover:text-[#0c1524]",
        isOpen && !isHeroState && "bg-[#0c1524]/5 text-[#0c1524]",
        isOpen && isHeroState && "bg-white/12 text-white",
        className,
      )}
      {...props}
    >
      <span className="relative block size-4" aria-hidden>
        <span
          className={cn(
            "absolute top-1/2 left-1/2 block h-[1.5px] w-[1.125rem] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isOpen ? "-translate-y-1/2 rotate-45" : "-translate-y-[5px]",
          )}
        />
        <span
          className={cn(
            "absolute top-1/2 left-1/2 block h-[1.5px] w-[1.125rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100",
          )}
        />
        <span
          className={cn(
            "absolute top-1/2 left-1/2 block h-[1.5px] w-[1.125rem] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isOpen ? "-translate-y-1/2 -rotate-45" : "translate-y-[3px]",
          )}
        />
      </span>
    </button>
  );
});
