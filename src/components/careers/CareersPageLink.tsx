import type { ReactNode } from "react";

import { LocalizedLink } from "@/components/i18n";

interface CareersPageLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

/** Same-page anchors must use a native link — React Router treats `#id` as a route change. */
export function CareersPageLink({ href, className, children }: CareersPageLinkProps) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <LocalizedLink to={href} className={className}>
      {children}
    </LocalizedLink>
  );
}
