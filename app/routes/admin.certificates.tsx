import { useLoaderData } from "react-router";

import type { Route } from "./+types/admin.certificates";
import { AdminListPage } from "@/pages/admin";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { listContentEntries } from "@/server/cms/content/service.server";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const rows = await listContentEntries({
    type: "certificate",
    ...(q ? { search: q } : {}),
  });

  return { q, rows };
}

export default function AdminCertificatesRoute() {
  const { q, rows } = useLoaderData<typeof loader>();

  return (
    <AdminListPage
      title="Certificates"
      description="Manage certificate entries from the dashboard. Homepage certificate section copy is edited on the website."
      searchValue={q}
      searchPlaceholder="Search certificates by key or slug"
      emptyMessage="No certificate entries were found."
      rows={rows.map((row) => ({
        id: row.id,
        title: row.key,
        subtitle: row.slug ? `Slug: ${row.slug}` : "Certificate entry",
        status: row.status,
        updatedAt: row.updatedAt,
      }))}
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Certificates | Admin | Dynamic Oil Tools" },
];
