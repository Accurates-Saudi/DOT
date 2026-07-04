import { useLoaderData } from "react-router";

import type { Route } from "./+types/admin.news";
import { AdminListPage } from "@/pages/admin";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { listContentEntries } from "@/server/cms/content/service.server";
import { defaultLocale } from "@/i18n/config";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const rows = await listContentEntries({
    type: "news",
    ...(q ? { search: q } : {}),
  });

  return { q, rows };
}

export default function AdminNewsRoute() {
  const { q, rows } = useLoaderData<typeof loader>();

  return (
    <AdminListPage
      title="News"
      description="Manage news entries from the dashboard. Homepage news section copy is edited on the website."
      searchValue={q}
      searchPlaceholder="Search news by key or slug"
      emptyMessage="No news entries were found."
      rows={rows.map((row) => ({
        id: row.id,
        title: row.key,
        subtitle: row.slug ? `Slug: ${row.slug}` : "No slug assigned",
        status: row.status,
        updatedAt: row.updatedAt,
        href: row.slug ? `/${defaultLocale}/news/${row.slug}` : undefined,
        hrefLabel: row.slug ? "View on website" : undefined,
      }))}
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "News | Admin | Dynamic Oil Tools" },
];
