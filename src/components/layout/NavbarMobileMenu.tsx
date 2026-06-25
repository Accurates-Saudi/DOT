import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";

import { LanguageSwitcher, LocalizedLink } from "@/components/i18n";
import { Button } from "@/components/ui";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMainNavigation } from "@/i18n/content/hooks";
import { useDirection, useTranslation } from "@/i18n/hooks";
import { siteSettings } from "@/data/site";
import { transitionPresets } from "@/lib/animations";
import { cn } from "@/lib/utils";

import { LinkedInIcon } from "./NavbarIcons";

interface NavbarMobileMenuProps {
  isHeroState?: boolean;
}

export function NavbarMobileMenu({ isHeroState = false }: NavbarMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const mainNavigation = useMainNavigation();
  const direction = useDirection();
  const { t } = useTranslation("nav");

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "size-9 shrink-0 rounded-sm lg:hidden",
            transitionPresets.colors,
            "duration-300",
            isHeroState
              ? "text-white hover:bg-white/10 hover:text-white"
              : "text-foreground/70 hover:bg-muted hover:text-foreground",
          )}
          aria-label={t("openMenu")}
        >
          <Menu className="size-5 stroke-[1.5]" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side={direction === "rtl" ? "left" : "right"}
        className="w-[min(100vw-2.5rem,17.5rem)] gap-0 border-border/60 p-0 duration-300 data-open:duration-300 sm:max-w-[17.5rem]"
      >
        <SheetTitle className="sr-only">{t("mobileMenuTitle")}</SheetTitle>

        <nav
          className="flex flex-col px-5 pt-14 pb-6"
          aria-label={t("mobileAria")}
        >
          <ul className="flex flex-col">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  end={/\/(en|ar)$/.test(item.href)}
                  className={({ isActive }) =>
                    cn(
                      "mobile-nav-item block border-b border-border/50 py-3.5 text-[0.9375rem] font-medium tracking-[0.01em]",
                      isActive
                        ? cn(
                            "border-accent text-accent",
                            direction === "rtl"
                              ? "border-r-2 pr-2"
                              : "border-l-2 pl-2",
                          )
                        : "text-foreground/70 hover:text-accent",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 border-t border-border/50 pt-6">
            <LanguageSwitcher isHeroState={false} className="w-full" />

            {siteSettings.social.linkedin && (
              <a
                href={siteSettings.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 py-1 text-[0.9375rem] font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                <LinkedInIcon className="size-4" />
                {t("linkedIn")}
              </a>
            )}

            <Button
              variant="outline"
              className="h-10 w-full rounded-sm text-[0.8125rem] font-medium tracking-[0.02em]"
              asChild
            >
              <LocalizedLink to="/login">{t("login")}</LocalizedLink>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
