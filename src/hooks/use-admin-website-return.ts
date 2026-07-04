import { useEffect, useMemo } from "react";
import { useRouteLoaderData, useSearchParams } from "react-router";

import { defaultLocale, type Locale } from "@/i18n/config";
import {
  persistAdminReturnTo,
  readAdminReturnTo,
  sanitizeWebsiteReturnPath,
} from "@/utils/website-routing";

function readReferrerReturnPath(fallback: string): string | null {
  if (typeof document === "undefined" || !document.referrer) return null;

  try {
    const refUrl = new URL(document.referrer);
    if (refUrl.origin !== window.location.origin) return null;
    if (refUrl.pathname.startsWith("/admin")) return null;

    return sanitizeWebsiteReturnPath(
      `${refUrl.pathname}${refUrl.search}${refUrl.hash}`,
      fallback,
    );
  } catch {
    return null;
  }
}

export function useAdminWebsiteReturnUrl(): string {
  const [searchParams] = useSearchParams();
  const rootData = useRouteLoaderData("root") as { locale?: Locale } | undefined;
  const fallback = `/${rootData?.locale ?? defaultLocale}`;
  const returnToParam = searchParams.get("returnTo");

  const returnUrl = useMemo(() => {
    if (returnToParam) {
      return sanitizeWebsiteReturnPath(returnToParam, fallback);
    }

    const stored = readAdminReturnTo(fallback);
    if (stored !== fallback) {
      return stored;
    }

    return readReferrerReturnPath(fallback) ?? fallback;
  }, [returnToParam, fallback]);

  useEffect(() => {
    if (returnUrl !== fallback) {
      persistAdminReturnTo(returnUrl);
    }
  }, [returnUrl, fallback]);

  return returnUrl;
}
