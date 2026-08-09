import { useLayoutEffect, useRef, useState } from "react";

import { LocalizedLink } from "@/components/i18n";
import { Container } from "@/components/shared";
import { Button } from "@/components/ui";
import { CmsEditModeToggle } from "@/components/cms/CmsEditModeToggle";
import { LanguageSwitcher } from "@/components/i18n";
import { useCmsExperience } from "@/contexts/cms-experience-context";
import {
  useFooterContent,
  useMainNavigation,
  useNavigationCopy,
} from "@/i18n/content/hooks";
import { siteSettings } from "@/data/site";
import { useScrollThreshold } from "@/hooks";
import { transitionPresets } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { buildAdminHref } from "@/utils/website-routing";
import { Link, NavLink, useLocation } from "react-router";

import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { LinkedInIcon } from "./NavbarIcons";

const SCROLL_THRESHOLD = 40;
// Extra breathing room (px) required between the logo, the nav links, and the
// right-side controls before we trust that the desktop nav actually fits.
const NAV_FIT_BUFFER = 24;

function dotLogoClassName(isElevated: boolean, compact: boolean) {
  return cn(
    "w-auto max-w-[5.5rem] object-contain sm:max-w-none",
    transitionPresets.default,
    "duration-500",
    isElevated
      ? compact
        ? "h-7 sm:h-8 lg:h-6 xl:h-7"
        : "h-7 sm:h-8 lg:h-8 xl:h-9"
      : compact
        ? "h-7 sm:h-8 lg:h-7 xl:h-8"
        : "h-7 sm:h-8 lg:h-9 xl:h-10",
  );
}

function saudiLogoClassName(isElevated: boolean, compact: boolean) {
  return cn(
    "w-auto max-w-[4.5rem] shrink-0 object-contain sm:max-w-none",
    transitionPresets.default,
    "duration-500",
    isElevated
      ? compact
        ? "h-6 sm:h-7 lg:h-5 xl:h-6"
        : "h-6 sm:h-7 lg:h-7 xl:h-8"
      : compact
        ? "h-6 sm:h-7 lg:h-6 xl:h-7"
        : "h-6 sm:h-7 lg:h-8 xl:h-9",
  );
}

export function Navbar() {
  const location = useLocation();
  const mainNavigation = useMainNavigation();
  const navigationCopy = useNavigationCopy();
  const footerContent = useFooterContent();
  const { isAuthenticated, canEditWebsite, isEditMode, toggleEditMode } =
    useCmsExperience();
  const isHome = /\/(en|ar)\/?$/.test(location.pathname);
  const isScrolled = useScrollThreshold({
    threshold: SCROLL_THRESHOLD,
    enabled: isHome,
  });

  const isElevated = !isHome || isScrolled;
  const isHeroState = !isElevated;
  const adminHref = buildAdminHref(location.pathname, location.search);

  // The desktop nav is only ever shown once we've measured that the logo,
  // the nav links, and the right-side controls actually fit side by side.
  // If they don't fit at full size, we first try a smaller ("compact") logo
  // to reclaim space before giving up and falling back to the hamburger
  // menu. Defaults to a full-size, nav-visible layout (the CSS `lg:`
  // baseline) so server-rendered markup matches the client's first paint.
  const rowRef = useRef<HTMLDivElement>(null);
  const navMeasureRef = useRef<HTMLDivElement>(null);
  const controlsMeasureRef = useRef<HTMLDivElement>(null);
  const logoNormalMeasureRef = useRef<HTMLDivElement>(null);
  const logoCompactMeasureRef = useRef<HTMLDivElement>(null);
  const [navFits, setNavFits] = useState(true);
  const [logoCompact, setLogoCompact] = useState(false);

  useLayoutEffect(() => {
    const rowEl = rowRef.current;
    const navMeasureEl = navMeasureRef.current;
    const controlsMeasureEl = controlsMeasureRef.current;
    const logoNormalEl = logoNormalMeasureRef.current;
    const logoCompactEl = logoCompactMeasureRef.current;
    if (
      !rowEl ||
      !navMeasureEl ||
      !controlsMeasureEl ||
      !logoNormalEl ||
      !logoCompactEl
    )
      return;

    function measure() {
      const rowStyle = getComputedStyle(rowEl!);
      const paddingLeft = parseFloat(rowStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(rowStyle.paddingRight) || 0;
      const gap = parseFloat(rowStyle.columnGap || rowStyle.gap) || 0;
      const available = rowEl!.clientWidth - paddingLeft - paddingRight;
      const nonLogoRequired =
        navMeasureEl!.scrollWidth +
        controlsMeasureEl!.scrollWidth +
        gap * 2 +
        NAV_FIT_BUFFER;

      if (nonLogoRequired + logoNormalEl!.scrollWidth <= available) {
        setNavFits(true);
        setLogoCompact(false);
      } else if (nonLogoRequired + logoCompactEl!.scrollWidth <= available) {
        setNavFits(true);
        setLogoCompact(true);
      } else {
        setNavFits(false);
        setLogoCompact(false);
      }
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rowEl);
    observer.observe(navMeasureEl);
    observer.observe(controlsMeasureEl);
    observer.observe(logoNormalEl);
    observer.observe(logoCompactEl);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [mainNavigation, isElevated]);

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
        ref={rowRef}
        as="div"
        size="wide"
        className={cn(
          "relative flex items-center justify-between gap-3 lg:gap-4",
          transitionPresets.default,
          "duration-500",
          isElevated
            ? "h-16 lg:h-[4.25rem] xl:h-[4.75rem]"
            : "h-16 lg:h-20",
        )}
      >
        <LocalizedLink
          to="/"
          className="group relative z-10 flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-4 xl:gap-5"
          aria-label={navigationCopy.homeAria}
        >
          <img
            src={footerContent.logos.dot.src}
            alt={footerContent.logos.dot.alt}
            className={dotLogoClassName(isElevated, logoCompact)}
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
            src={footerContent.logos.saudiMade.src}
            alt={footerContent.logos.saudiMade.alt}
            className={saudiLogoClassName(isElevated, logoCompact)}
          />
        </LocalizedLink>

        <nav
          className={cn(
            "hidden min-w-0 flex-1 items-center justify-center lg:flex",
            transitionPresets.default,
            "duration-500",
            isElevated ? "gap-0.5 xl:gap-1" : "gap-0",
            !navFits && "lg:hidden",
          )}
          aria-label={navigationCopy.mainAria}
        >
          {mainNavigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={/\/(en|ar)$/.test(item.href)}
              className={({ isActive }) =>
                cn(
                  "nav-link-underline relative whitespace-nowrap px-3 py-2 text-[0.9375rem] font-medium tracking-[0.01em] transition-colors duration-300 ease-out xl:px-4 xl:text-base",
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

        {/* Invisible clones used only to measure the desktop nav links' and
            controls' natural (unconstrained) width, so we can detect ahead
            of time whether the real desktop nav would overlap the logo. */}
        <div
          ref={navMeasureRef}
          aria-hidden
          className={cn(
            "invisible absolute left-0 top-0 flex items-center",
            isElevated ? "gap-0.5 xl:gap-1" : "gap-0",
          )}
        >
          {mainNavigation.map((item) => (
            <span
              key={item.href}
              className="whitespace-nowrap px-3 py-2 text-[0.9375rem] font-medium tracking-[0.01em] xl:px-4 xl:text-base"
            >
              {item.label}
            </span>
          ))}
        </div>
        <div
          ref={controlsMeasureRef}
          aria-hidden
          className={cn(
            "invisible absolute left-0 top-0 flex items-center",
            "lg:gap-3 xl:gap-4",
          )}
        >
          <LanguageSwitcher isHeroState={isHeroState} />
          {siteSettings.social.linkedin ? (
            <span className="inline-flex size-9 shrink-0" />
          ) : null}
        </div>
        <div
          ref={logoNormalMeasureRef}
          aria-hidden
          className="invisible absolute left-0 top-0 flex items-center gap-1.5 sm:gap-2 lg:gap-4 xl:gap-5"
        >
          <img
            src={footerContent.logos.dot.src}
            alt=""
            className={dotLogoClassName(isElevated, false)}
          />
          <span className="h-5 w-px shrink-0 sm:h-7" aria-hidden />
          <img
            src={footerContent.logos.saudiMade.src}
            alt=""
            className={saudiLogoClassName(isElevated, false)}
          />
        </div>
        <div
          ref={logoCompactMeasureRef}
          aria-hidden
          className="invisible absolute left-0 top-0 flex items-center gap-1.5 sm:gap-2 lg:gap-4 xl:gap-5"
        >
          <img
            src={footerContent.logos.dot.src}
            alt=""
            className={dotLogoClassName(isElevated, true)}
          />
          <span className="h-5 w-px shrink-0 sm:h-7" aria-hidden />
          <img
            src={footerContent.logos.saudiMade.src}
            alt=""
            className={saudiLogoClassName(isElevated, true)}
          />
        </div>

        <div
          className={cn(
            "relative z-10 ms-auto flex shrink-0 items-center",
            transitionPresets.default,
            "duration-500",
            "gap-2.5 lg:gap-3",
            isElevated && "lg:gap-3 xl:gap-4",
          )}
        >
          {!isAuthenticated ? (
            <div
              className={cn(
                "hidden items-center lg:flex lg:gap-3 xl:gap-4",
                !navFits && "lg:hidden",
              )}
            >
              <LanguageSwitcher isHeroState={isHeroState} />
              {siteSettings.social.linkedin ? (
                <a
                  href={siteSettings.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={navigationCopy.linkedInAria}
                  className={cn(
                    "inline-flex size-9 shrink-0 items-center justify-center rounded-sm",
                    transitionPresets.colors,
                    "duration-300",
                    isHeroState
                      ? "text-white transition-[color,background-color] duration-250 ease-out hover:bg-white/10"
                      : "text-foreground/60 transition-[color,background-color] duration-250 ease-out hover:bg-muted hover:text-foreground",
                  )}
                >
                  <LinkedInIcon className="size-[1.125rem]" />
                </a>
              ) : null}

            </div>
          ) : null}

          {isAuthenticated ? (
            <div
              className={cn(
                "flex items-center gap-2 sm:gap-2.5 lg:hidden",
                !navFits && "lg:flex",
              )}
            >
              {canEditWebsite ? (
                <CmsEditModeToggle
                  isActive={isEditMode}
                  onToggle={toggleEditMode}
                  tone={isHeroState ? "dark" : "light"}
                  compact
                />
              ) : null}
              <Button
                variant={isHeroState ? "inverse" : "outline"}
                size="sm"
                className="h-9 shrink-0 rounded-full px-3 text-sm font-medium sm:px-4"
                asChild
              >
                <Link to={adminHref}>Dashboard</Link>
              </Button>
            </div>
          ) : null}

          <LanguageSwitcher
            isHeroState={isHeroState}
            className={cn("lg:hidden", !navFits && "lg:flex")}
            compact
          />
          <NavbarMobileMenu
            isHeroState={isHeroState}
            toggleClassName={!navFits ? "lg:flex" : undefined}
          />
        </div>
      </Container>

      {isAuthenticated ? (
        <div
          className={cn(
            "absolute inset-y-0 end-0 z-20 hidden items-center pe-4 sm:pe-6 lg:flex lg:pe-8",
            !navFits && "lg:hidden",
          )}
        >
          <div className="flex items-center gap-4 xl:gap-6">
            <div className="flex items-center gap-3 xl:gap-4">
              <LanguageSwitcher isHeroState={isHeroState} />
              {siteSettings.social.linkedin ? (
                <a
                  href={siteSettings.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={navigationCopy.linkedInAria}
                  className={cn(
                    "inline-flex size-9 shrink-0 items-center justify-center rounded-sm",
                    transitionPresets.colors,
                    "duration-300",
                    isHeroState
                      ? "text-white transition-[color,background-color] duration-250 ease-out hover:bg-white/10"
                      : "text-foreground/60 transition-[color,background-color] duration-250 ease-out hover:bg-muted hover:text-foreground",
                  )}
                >
                  <LinkedInIcon className="size-[1.125rem]" />
                </a>
              ) : null}
            </div>
            <div className="flex items-center gap-3 xl:gap-4">
              {canEditWebsite ? (
                <CmsEditModeToggle
                  isActive={isEditMode}
                  onToggle={toggleEditMode}
                  tone={isHeroState ? "dark" : "light"}
                />
              ) : null}
              <Button
                variant={isHeroState ? "inverse" : "outline"}
                size="sm"
                className="h-9 shrink-0 rounded-full px-4 text-sm font-medium tracking-[0.02em]"
                asChild
              >
                <Link to={adminHref}>Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
