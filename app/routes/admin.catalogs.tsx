import { useLoaderData } from "react-router";

import type { Route } from "./+types/admin.catalogs";
import { AdminListPage } from "@/pages/admin";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { getPrismaClient } from "@/server/cms/db.server";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const prisma = getPrismaClient();
  const rows = await prisma.cmsContentEntry.findMany({
    where: {
      OR: [
        { key: { contains: q || "catalog", mode: "insensitive" } },
        { slug: { contains: q || "catalog", mode: "insensitive" } },
      ],
      status: { not: "ARCHIVED" },
    },
    orderBy: { updatedAt: "desc" },
    take: 50,
  });

  return { q, rows };
}

export default function AdminCatalogsRoute() {
  const { q, rows } = useLoaderData<typeof loader>();

  return (
    <AdminListPage
      title="Catalogs"
      description="Manage catalog entries from the dashboard. Catalog items, downloads, and ordering belong here rather than in website edit mode."
      searchValue={q}
      searchPlaceholder="Search catalogs by key or slug"
      emptyMessage="No catalog entries were found."
      rows={rows.map((row) => ({
        id: row.id,
        title: row.key,
        subtitle: row.slug ? `Slug: ${row.slug}` : "Catalog entry",
        status: row.status.toLowerCase(),
        updatedAt: row.updatedAt.toISOString(),
      }))}
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Catalogs | Admin | Dynamic Oil Tools" },
];
