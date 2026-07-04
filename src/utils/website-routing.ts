import { defaultLocale } from "@/i18n/config";

export const ADMIN_RETURN_TO_STORAGE_KEY = "dot-admin-return-to";

export function sanitizeWebsiteReturnPath(
  target: string | null | undefined,
  fallback = `/${defaultLocale}`,
): string {
  if (!target) return fallback;
  if (!target.startsWith("/") || target.startsWith("//")) return fallback;
  if (target.startsWith("/admin")) return fallback;

  try {
    const url = new URL(target, "https://site.local");
    if (url.origin !== "https://site.local") return fallback;

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export function buildAdminHref(pathname: string, search = ""): string {
  const returnTo = `${pathname}${search}`;
  const params = new URLSearchParams({ returnTo });
  return `/admin?${params.toString()}`;
}

export function persistAdminReturnTo(path: string) {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(ADMIN_RETURN_TO_STORAGE_KEY, path);
  } catch {
    // storage may be unavailable
  }
}

export function readAdminReturnTo(fallback = `/${defaultLocale}`): string {
  if (typeof window === "undefined") return fallback;

  try {
    const stored = sessionStorage.getItem(ADMIN_RETURN_TO_STORAGE_KEY);
    return stored ? sanitizeWebsiteReturnPath(stored, fallback) : fallback;
  } catch {
    return fallback;
  }
}
