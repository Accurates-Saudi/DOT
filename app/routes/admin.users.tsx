import { redirect, useActionData, useLoaderData, useRouteLoaderData } from "react-router";

import type { Route } from "./+types/admin.users";
import { AdminUsersPage } from "@/pages/admin/AdminUsersPage";
import { prisma } from "@/server/cms/db.server";
import {
  createCmsUser,
  requireCmsAuthSession,
  setCmsUserActive,
} from "@/server/cms/auth/service.server";
import { CmsHttpError } from "@/server/cms/http.server";
import type { loader as adminLoader } from "./admin";

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

export async function action({ request }: Route.ActionArgs) {
  const session = await requireCmsAuthSession(request, ["admin"]);
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");

  if (intent === "create") {
    await createCmsUser({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      name: String(formData.get("name") ?? ""),
      role: String(formData.get("role") ?? "editor") === "admin" ? "admin" : "editor",
    });
    return redirect("/admin/users");
  }

  const userId = String(formData.get("userId") ?? "");
  if (!userId || userId === session.user.id) {
    return redirect("/admin/users");
  }

  if (intent === "activate") {
    await setCmsUserActive({ userId, isActive: true });
  }

  if (intent === "deactivate") {
    await setCmsUserActive({ userId, isActive: false });
  }

  return redirect("/admin/users");
}

export default function AdminUsersRoute() {
  const adminData = useRouteLoaderData<typeof adminLoader>("routes/admin");
  const { q, rows } = useLoaderData<typeof loader>();
  useActionData<typeof action>();

  return (
    <AdminUsersPage
      users={rows.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        role: row.role.toLowerCase() as "admin" | "editor",
        isActive: row.isActive,
        createdAt: row.createdAt.toISOString(),
      }))}
      searchValue={q}
      currentUserId={adminData?.session.user.id ?? ""}
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Users | Admin | Dynamic Oil Tools" },
];
