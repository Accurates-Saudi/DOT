import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { Button } from "@/components/ui";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNavigation } from "@/data/navigation";
import { siteSettings } from "@/data/site";
import { cn } from "@/lib/utils";

import { LinkedInIcon } from "./NavbarIcons";

export function NavbarMobileMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
            "text-foreground/70 hover:bg-muted hover:text-foreground",
          )}
          aria-label="Open menu"
        >
          <Menu className="size-5 stroke-[1.5]" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[min(100vw-2.5rem,17.5rem)] gap-0 border-border/60 p-0 sm:max-w-[17.5rem]"
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>

        <nav
          className="flex flex-col px-5 pt-14 pb-6"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    cn(
                      "block border-b border-border/50 py-3.5 text-[0.9375rem] font-medium tracking-[0.01em] transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-foreground/70 hover:text-foreground",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 border-t border-border/50 pt-6">
            {siteSettings.social.linkedin && (
              <a
                href={siteSettings.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 py-1 text-[0.9375rem] font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                <LinkedInIcon className="size-4" />
                LinkedIn
              </a>
            )}

            <Button
              variant="outline"
              className="h-10 w-full rounded-sm text-[0.8125rem] font-medium tracking-[0.02em]"
              asChild
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
