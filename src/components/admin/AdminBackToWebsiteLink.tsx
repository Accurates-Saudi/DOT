import { ArrowLeft, ExternalLink } from "lucide-react";

import { useAdminWebsiteReturnUrl } from "@/hooks/use-admin-website-return";
import { cn } from "@/lib/utils";

interface AdminBackToWebsiteLinkProps {
  variant?: "header" | "sidebar" | "inline";
  className?: string;
  showIcon?: boolean;
}

export function AdminBackToWebsiteLink({
  variant = "header",
  className,
  showIcon = true,
}: AdminBackToWebsiteLinkProps) {
  const returnUrl = useAdminWebsiteReturnUrl();

  if (variant === "header") {
    return (
      <a
        href={returnUrl}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-md border border-[#e5e5e5] bg-white px-3.5 text-sm text-[#333] transition hover:border-[#d4d4d4]",
          className,
        )}
      >
        {showIcon ? <ArrowLeft className="size-4 shrink-0" aria-hidden /> : null}
        Back to Website
      </a>
    );
  }

  if (variant === "sidebar") {
    return (
      <a
        href={returnUrl}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2.5 text-[0.9375rem] text-[#555] transition hover:bg-[#f8f8f8] hover:text-[#111]",
          className,
        )}
      >
        {showIcon ? (
          <ExternalLink className="size-[1.125rem] shrink-0" aria-hidden />
        ) : null}
        Back to Website
      </a>
    );
  }

  return (
    <a
      href={returnUrl}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-[var(--dot-orange)] hover:underline",
        className,
      )}
    >
      {showIcon ? <ArrowLeft className="size-4 shrink-0" aria-hidden /> : null}
      Back to Website
    </a>
  );
}
