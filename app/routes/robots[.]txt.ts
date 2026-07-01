import type { Route } from "./+types/robots[.]txt";
import { renderRobotsTxt } from "@/lib/seo/sitemap";

export function loader(_args: Route.LoaderArgs) {
  return new Response(renderRobotsTxt(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
