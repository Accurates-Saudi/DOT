import type { Route } from "./+types/sitemap[.]xml";
import { getSitemapEntries, renderSitemapXml } from "@/lib/seo/sitemap";

export function loader(_args: Route.LoaderArgs) {
  const xml = renderSitemapXml(getSitemapEntries());

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
