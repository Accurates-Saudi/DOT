import { Link, NavLink, useLocation } from "react-router";

import dotLogo from "@/assets/logos/dot.webp";
import saudiMadeLogo from "@/assets/logos/saudi-made.png";
import { Container } from "@/components/shared";
import { Button } from "@/components/ui";
import { mainNavigation } from "@/data/navigation";
import { siteSettings } from "@/data/site";
import { useScrollThreshold } from "@/hooks";
import { transitionPresets } from "@/lib/animations";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 40;

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isScrolled = useScrollThreshold({
    threshold: SCROLL_THRESHOLD,
    enabled: isHome,
  });

  const isElevated = !isHome || isScrolled;

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
          "flex items-center justify-between",
          transitionPresets.default,
          "duration-500",
          isElevated ? "h-[4.25rem] lg:h-[4.75rem]" : "h-[4.75rem] lg:h-20",
        )}
      >
        <Link
          to="/"
          className={cn(
            "group flex shrink-0 items-center",
            transitionPresets.transform,
            "duration-500 ease-out",
            isElevated
              ? "-translate-x-1 gap-3 lg:-translate-x-1.5 lg:gap-3.5"
              : "translate-x-0 gap-2.5 lg:gap-3",
          )}
          aria-label={`${siteSettings.companyName} — Home`}
        >
          <img
            src={dotLogo}
            alt="Dynamic Oil Tools"
            className={cn(
              "w-auto object-contain",
              transitionPresets.default,
              "duration-500",
              isElevated ? "h-8 lg:h-9" : "h-9 lg:h-10",
            )}
          />
          <span
            className={cn(
              "hidden h-7 w-px sm:block",
              transitionPresets.colors,
              isElevated ? "bg-border" : "bg-white/25",
            )}
            aria-hidden
          />
          <img
            src={saudiMadeLogo}
            alt="Saudi Made"
            className={cn(
              "hidden w-auto object-contain sm:block",
              transitionPresets.default,
              "duration-500",
              isElevated ? "h-7 lg:h-8" : "h-8 lg:h-9",
            )}
          />
        </Link>

        <nav
          className={cn(
            "absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex",
            transitionPresets.default,
            "duration-500",
            isElevated ? "gap-0.5 xl:gap-1" : "gap-0",
          )}
          aria-label="Main navigation"
        >
          {mainNavigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                cn(
                  "relative px-3 py-2 text-[0.8125rem] font-medium tracking-[0.01em] xl:px-4",
                  transitionPresets.colors,
                  "duration-300",
                  isElevated
                    ? cn(
                        "text-foreground/75 hover:text-foreground",
                        isActive && "text-foreground",
                      )
                    : cn(
                        "text-white/80 hover:text-white",
                        isActive && "text-white",
                      ),
                  "after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300",
                  isActive && "after:scale-x-100",
                  !isActive && "hover:after:scale-x-100",
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
          {siteSettings.social.linkedin && (
            <a
              href={siteSettings.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dynamic Oil Tools on LinkedIn"
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-sm",
                transitionPresets.colors,
                "duration-300",
                isElevated
                  ? "text-foreground/60 hover:bg-muted hover:text-foreground"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              <LinkedInIcon className="size-[1.125rem]" />
            </a>
          )}

          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-9 min-w-[5.5rem] rounded-sm px-4 text-[0.8125rem] font-medium tracking-[0.02em]",
              transitionPresets.colors,
              "duration-300",
              isElevated
                ? "border-border bg-transparent text-foreground hover:bg-muted"
                : "border-white/35 bg-transparent text-white hover:border-white/55 hover:bg-white/10",
            )}
            asChild
          >
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
