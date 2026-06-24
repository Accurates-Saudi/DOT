import { Link, NavLink } from "react-router";

import { Container } from "@/components/shared";
import { Button } from "@/components/ui";
import { mainNavigation } from "@/data/navigation";
import { siteSettings } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container as="div" className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-primary">
            DOT
          </span>
          <span className="hidden text-sm font-medium text-muted-foreground sm:inline">
            {siteSettings.companyName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {mainNavigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}
