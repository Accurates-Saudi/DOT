import type { LocaleRouteData } from "@/i18n/types";

type RouteMatch = {
  id: string;
  loaderData?: unknown;
};

export function getLocaleRouteData(
  matches: readonly (RouteMatch | undefined)[],
): LocaleRouteData | undefined {
  const match = matches.find((entry) => entry?.id === "routes/_locale");
  return match?.loaderData as LocaleRouteData | undefined;
}
