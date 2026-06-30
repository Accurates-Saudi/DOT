import { LocalizedLink } from "@/components/i18n";
import { Container } from "@/components/shared";
import { Button } from "@/components/ui";
import { LanguageSwitcher } from "@/components/i18n";
import { useMainNavigation, useSiteCopy } from "@/i18n/content/hooks";
import { useDirection } from "@/i18n/hooks";
import { useTranslation } from "@/i18n/hooks";
import { siteSettings } from "@/data/site";
import { useScrollThreshold } from "@/hooks";
import { transitionPresets } from "@/lib/animations";
import { cn } from "@/lib/utils";
import dotLogo from "@/assets/logos/dot.webp";
import saudiMadeLogo from "@/assets/logos/saudi-made.png";
import { NavLink, useLocation } from "react-router";

import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { LinkedInIcon } from "./NavbarIcons";

const SCROLL_THRESHOLD = 40;

export function Navbar() {
  const location = useLocation();
  const mainNavigation = useMainNavigation();
  const site = useSiteCopy();
  const direction = useDirection();
  const { t } = useTranslation("nav");
  const isHome = /\/(en|ar)\/?$/.test(location.pathname);
  const isScrolled = useScrollThreshold({
    threshold: SCROLL_THRESHOLD,
    enabled: isHome,
  });

  const isElevated = !isHome || isScrolled;
  const isHeroState = !isElevated;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        transitionPresets.default,
        "duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isElevated
          ? "border-b border-border/50 bg-background/92 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] backdrop-blur-[6px]"
          : "border-b border-transparent bg-transparent shadow-none",
      )}
    >
      <Container
        as="div"
        size="wide"
        className={cn(
          "flex items-center justify-between gap-3",
          transitionPresets.default,
          "duration-500",
          isElevated
            ? "h-16 lg:h-[4.25rem] xl:h-[4.75rem]"
            : "h-16 lg:h-20",
        )}
      >
        <LocalizedLink
          to="/"
          className={cn(
            "group flex min-w-0 shrink items-center",
            transitionPresets.transform,
            "duration-500 ease-out",
            isElevated
              ? cn(
                  "gap-1.5 sm:gap-2 lg:gap-3",
                  direction === "rtl"
                    ? "lg:translate-x-1 xl:translate-x-1.5"
                    : "lg:-translate-x-1 xl:-translate-x-1.5",
                )
              : "translate-x-0 gap-1.5 sm:gap-2 lg:gap-3",
          )}
          aria-label={`${site.companyName} — Home`}
        >
          <img
            src={dotLogo}
            alt={site.companyName}
            className={cn(
              "w-auto max-w-[5.5rem] object-contain sm:max-w-none",
              transitionPresets.default,
              "duration-500",
              isElevated
                ? "h-7 sm:h-8 lg:h-8 xl:h-9"
                : "h-7 sm:h-8 lg:h-9 xl:h-10",
            )}
          />
          <span
            className={cn(
              "h-5 w-px shrink-0 sm:h-7",
              transitionPresets.colors,
              "duration-300",
              isHeroState ? "bg-white/25" : "bg-border/70",
            )}
            aria-hidden
          />
          <img
            src={saudiMadeLogo}
            alt="Saudi Made"
            className={cn(
              "w-auto max-w-[4.5rem] shrink-0 object-contain sm:max-w-none",
              transitionPresets.default,
              "duration-500",
              isElevated
                ? "h-6 sm:h-7 lg:h-7 xl:h-8"
                : "h-6 sm:h-7 lg:h-8 xl:h-9",
            )}
          />
        </LocalizedLink>

        <nav
          className={cn(
            "absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex",
            transitionPresets.default,
            "duration-500",
            isElevated ? "gap-0.5 xl:gap-1" : "gap-0",
          )}
          aria-label={t("mainAria")}
        >
          {mainNavigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={/\/(en|ar)$/.test(item.href)}
              className={({ isActive }) =>
                cn(
                  "nav-link-underline relative px-3 py-2 text-[0.9375rem] font-medium tracking-[0.01em] transition-colors duration-300 ease-out xl:px-4 xl:text-base",
                  isHeroState
                    ? cn(
                        "text-white/75 hover:text-white",
                        isActive && "text-white",
                      )
                    : cn(
                        "text-foreground/70 hover:text-accent",
                        isActive && "text-foreground",
                      ),
                  "after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 rtl:after:origin-right",
                  isActive
                    ? "after:scale-x-100 after:bg-accent"
                    : cn(
                        "hover:after:scale-x-100",
                        isHeroState
                          ? "after:bg-white/50 hover:after:bg-white/70"
                          : "after:bg-accent/60 hover:after:bg-accent",
                      ),
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div
          className={cn(
            "flex shrink-0 items-center",
            transitionPresets.default,
            "duration-500",
            isElevated ? "gap-2.5 lg:gap-3" : "gap-2 lg:gap-2.5",
          )}
        >
          <div className="hidden items-center gap-2.5 lg:flex lg:gap-3">
            <LanguageSwitcher isHeroState={isHeroState} />

            {siteSettings.social.linkedin && (
              <a
                href={siteSettings.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("linkedInAria")}
                className={cn(
                  "inline-flex size-9 items-center justify-center rounded-sm",
                  transitionPresets.colors,
                  "duration-300",
                  isHeroState
                    ? "text-white transition-[color,background-color] duration-250 ease-out hover:bg-white/10"
                    : "text-foreground/60 transition-[color,background-color] duration-250 ease-out hover:bg-muted hover:text-foreground",
                )}
              >
                <LinkedInIcon className="size-[1.125rem]" />
              </a>
            )}

            <Button
              variant={isHeroState ? "inverse" : "outline"}
              size="sm"
              className="h-9 min-w-[5.5rem] rounded-full px-4 text-sm font-medium tracking-[0.02em]"
              asChild
            >
              <LocalizedLink to="/login">{t("login")}</LocalizedLink>
            </Button>
          </div>

          <LanguageSwitcher isHeroState={isHeroState} className="lg:hidden" />
          <NavbarMobileMenu isHeroState={isHeroState} />
        </div>
      </Container>
    </header>
  );
}
