import { useLoaderData } from "react-router";

import type { Route } from "./+types/admin.media";
import { AdminListPage } from "@/pages/admin";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { listMediaAssets } from "@/server/cms/media/service.server";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") ?? "").toLowerCase();
  const rows = await listMediaAssets();
  const filtered = q
    ? rows.filter((row) => row.key.toLowerCase().includes(q))
    : rows;

  return { q, rows: filtered };
}

export default function AdminMediaRoute() {
  const { q, rows } = useLoaderData<typeof loader>();

  return (
    <AdminListPage
      title="Media Library"
      description="Search, review, and manage media assets from the dashboard. Image replacement on the website should happen through section editor panels."
      searchValue={q}
      searchPlaceholder="Search media by key"
      emptyMessage="No media assets were found."
      rows={rows.map((row) => ({
        id: row.id,
        title: row.key,
        subtitle: row.currentVersion?.filename ?? "Media asset",
        status: row.type,
        updatedAt: row.updatedAt,
        href: row.currentVersion?.url,
        hrefLabel: row.currentVersion?.url ? "Preview" : undefined,
      }))}
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Media Library | Admin | Dynamic Oil Tools" },
];
