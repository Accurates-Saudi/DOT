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

function BrandLogos({
  footerContent,
  isElevated,
  isHeroState,
  homeAria,
}: {
  footerContent: ReturnType<typeof useFooterContent>;
  isElevated: boolean;
  isHeroState: boolean;
  homeAria: string;
}) {
  return (
    <LocalizedLink
      to="/"
      className={cn(
        "group flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3",
        transitionPresets.transform,
        "duration-500 ease-out",
      )}
      aria-label={homeAria}
    >
      <img
        src={footerContent.logos.dot.src}
        alt={footerContent.logos.dot.alt}
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
        src={footerContent.logos.saudiMade.src}
        alt={footerContent.logos.saudiMade.alt}
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
  );
}

function LinkedInLink({
  isHeroState,
  label,
}: {
  isHeroState: boolean;
  label: string;
}) {
  if (!siteSettings.social.linkedin) return null;

  return (
    <a
      href={siteSettings.social.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
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
  );
}

function NavLinks({
  mainNavigation,
  isHeroState,
  mainAria,
}: {
  mainNavigation: ReturnType<typeof useMainNavigation>;
  isHeroState: boolean;
  mainAria: string;
}) {
  return (
    <nav
      className={cn(
        "hidden min-w-0 items-center justify-center gap-1 lg:flex xl:gap-2",
        transitionPresets.default,
        "duration-500",
      )}
      aria-label={mainAria}
    >
      {mainNavigation.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          end={/\/(en|ar)$/.test(item.href)}
          className={({ isActive }) =>
            cn(
              "nav-link-underline relative shrink-0 whitespace-nowrap px-2.5 py-2 text-[0.875rem] font-medium tracking-[0.01em] transition-colors duration-300 ease-out xl:px-3.5 xl:text-[0.9375rem]",
              isHeroState
                ? cn("text-white/75 hover:text-white", isActive && "text-white")
                : cn(
                    "text-foreground/70 hover:text-accent",
                    isActive && "text-foreground",
                  ),
              "after:absolute after:inset-x-2.5 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 xl:after:inset-x-3.5 rtl:after:origin-right",
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

  const headerHeight = cn(
    transitionPresets.default,
    "duration-500",
    isElevated
      ? "h-16 lg:h-[4.25rem] xl:h-[4.75rem]"
      : "h-16 lg:h-20",
  );

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
      <Container as="div" size="wide" className={headerHeight}>
        {isAuthenticated ? (
          /* Admin — no inline nav; menu holds all page links */
          <div className="flex h-full w-full items-center justify-between gap-6 lg:gap-8 xl:gap-10">
            <div className="flex min-w-0 items-center gap-5 sm:gap-6 lg:gap-8 xl:gap-10">
              <BrandLogos
                footerContent={footerContent}
                isElevated={isElevated}
                isHeroState={isHeroState}
                homeAria={navigationCopy.homeAria}
              />

              <div className="hidden items-center sm:flex sm:gap-4 lg:gap-5 xl:gap-6">
                <LanguageSwitcher isHeroState={isHeroState} />
                <LinkedInLink
                  isHeroState={isHeroState}
                  label={navigationCopy.linkedInAria}
                />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
              <div className="hidden items-center sm:gap-4 lg:flex lg:gap-5 xl:gap-6">
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

              <div className="flex items-center gap-2.5 sm:gap-3 lg:hidden">
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
                  className="h-9 shrink-0 rounded-full px-3 text-sm font-medium tracking-[0.02em] sm:min-w-[6rem] sm:px-4"
                  asChild
                >
                  <Link to={adminHref}>Dashboard</Link>
                </Button>
              </div>

              <LanguageSwitcher
                isHeroState={isHeroState}
                className="sm:hidden"
              />
              <NavbarMobileMenu
                isHeroState={isHeroState}
                toggleClassName="flex"
              />
            </div>
          </div>
        ) : (
          /* Guest — logo | centered nav | utilities */
          <div
            className={cn(
              "grid h-full w-full items-center",
              "grid-cols-[auto_minmax(0,1fr)_auto]",
              "gap-x-4 sm:gap-x-6 lg:gap-x-8 xl:gap-x-10",
            )}
          >
            <BrandLogos
              footerContent={footerContent}
              isElevated={isElevated}
              isHeroState={isHeroState}
              homeAria={navigationCopy.homeAria}
            />

            <NavLinks
              mainNavigation={mainNavigation}
              isHeroState={isHeroState}
              mainAria={navigationCopy.mainAria}
            />

            <div className="flex shrink-0 items-center justify-self-end gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
              <div className="hidden items-center lg:flex lg:gap-4 xl:gap-5">
                <LanguageSwitcher isHeroState={isHeroState} />
                <LinkedInLink
                  isHeroState={isHeroState}
                  label={navigationCopy.linkedInAria}
                />
                <Button
                  variant={isHeroState ? "inverse" : "outline"}
                  size="sm"
                  className="h-9 min-w-[5.5rem] shrink-0 rounded-full px-4 text-sm font-medium tracking-[0.02em]"
                  asChild
                >
                  <Link to="/admin/login">{navigationCopy.login}</Link>
                </Button>
              </div>

              <LanguageSwitcher isHeroState={isHeroState} className="lg:hidden" />
              <NavbarMobileMenu
                isHeroState={isHeroState}
                toggleClassName="flex lg:hidden"
              />
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
