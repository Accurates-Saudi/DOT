import type { CSSProperties } from "react";

import type { ClientLogoItem } from "@/types";
import { cn } from "@/lib/utils";

const LOGO_BASE_CLASS =
  "h-9 w-auto max-w-[9.5rem] object-contain object-center opacity-[0.42] grayscale transition-[opacity,filter,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none sm:h-10 lg:h-[2.625rem] lg:max-w-[10.5rem]";

const LOGO_HOVER_CLASS =
  "group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:scale-[1.04] group-focus-visible:opacity-100 group-focus-visible:grayscale-0 motion-reduce:group-hover:scale-100";

export interface ClientLogoProps {
  item: ClientLogoItem;
  className?: string;
  revealClassName?: string;
  revealStyle?: CSSProperties;
  /** Hide duplicate marquee items from assistive tech */
  hiddenFromAssistiveTech?: boolean;
}

export function ClientLogo({
  item,
  className,
  revealClassName,
  revealStyle,
  hiddenFromAssistiveTech,
}: ClientLogoProps) {
  const image = (
    <img
      src={item.logo.src}
      alt={item.logo.alt}
      className={cn(LOGO_BASE_CLASS, LOGO_HOVER_CLASS)}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );

  const content = item.href ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 items-center justify-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-[#F68E05]/35 sm:h-14"
    >
      {image}
    </a>
  ) : (
    <div className="flex h-12 items-center justify-center sm:h-14">{image}</div>
  );

  return (
    <li
      className={cn(
        "group flex shrink-0 items-center justify-center px-2 sm:px-3",
        revealClassName,
        className,
      )}
      style={revealStyle}
      aria-hidden={hiddenFromAssistiveTech || undefined}
    >
      {content}
    </li>
  );
}
