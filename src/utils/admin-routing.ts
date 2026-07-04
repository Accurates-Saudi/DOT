const DEFAULT_ADMIN_REDIRECT = "/admin";

export function sanitizeAdminRedirect(
  target: string | null | undefined,
  fallback = DEFAULT_ADMIN_REDIRECT,
): string {
  if (!target) return fallback;
  if (!target.startsWith("/admin") || target.startsWith("//")) {
    return fallback;
  }

  try {
    const url = new URL(target, "https://admin.local");
    if (url.origin !== "https://admin.local") {
      return fallback;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export function buildAdminLoginRedirect(requestUrl: string): string {
  const url = new URL(requestUrl);
  const redirectTo = sanitizeAdminRedirect(`${url.pathname}${url.search}`);

  return `/admin/login?${new URLSearchParams({ redirectTo }).toString()}`;
}
