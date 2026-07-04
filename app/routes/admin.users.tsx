import { redirect, useLoaderData } from "react-router";

import type { Route } from "./+types/admin.users";
import { AdminListPage } from "@/pages/admin";
import { getPrismaClient } from "@/server/cms/db.server";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { CmsHttpError } from "@/server/cms/http.server";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    await requireCmsAuthSession(request, ["admin"]);
  } catch (error) {
    if (error instanceof CmsHttpError) {
      throw redirect("/admin");
    }

    throw error;
  }
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") ?? "").toLowerCase();
  const prisma = getPrismaClient();
  const rows = await prisma.cmsUser.findMany({
    orderBy: { createdAt: "desc" },
  });
  const filtered = q
    ? rows.filter(
        (row) =>
          row.email.toLowerCase().includes(q) ||
          row.name.toLowerCase().includes(q),
      )
    : rows;

  return { q, rows: filtered };
}

export default function AdminUsersRoute() {
  const { q, rows } = useLoaderData<typeof loader>();

  return (
    <AdminListPage
      title="Users"
      description="Administrators can manage CMS users. Editors do not have access to this section."
      searchValue={q}
      searchPlaceholder="Search users by name or email"
      emptyMessage="No CMS users were found."
      rows={rows.map((row) => ({
        id: row.id,
        title: row.name,
        subtitle: row.email,
        status: `${row.role.toLowerCase()}${row.isActive ? "" : " • inactive"}`,
        updatedAt: row.updatedAt.toISOString(),
      }))}
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Users | Admin | Dynamic Oil Tools" },
];
