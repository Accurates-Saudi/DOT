import { redirect, useActionData, useLoaderData, useRouteLoaderData } from "react-router";

import type { Route } from "./+types/admin.users";
import { AdminUsersPage, type AdminUsersActionData } from "@/pages/admin/AdminUsersPage";
import { prisma } from "@/server/cms/db.server";
import {
  createCmsUser,
  deleteCmsUser,
  requireCmsAuthSession,
  resetCmsUserPasswordByAdmin,
  setCmsUserActive,
} from "@/server/cms/auth/service.server";
import { CmsHttpError } from "@/server/cms/http.server";
import type { loader as adminLoader } from "./admin";

export type { AdminUsersActionData } from "@/pages/admin/AdminUsersPage";

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

  try {
    if (intent === "create") {
      const password = String(formData.get("password") ?? "");
      const user = await createCmsUser({
        email: String(formData.get("email") ?? ""),
        password,
        name: String(formData.get("name") ?? ""),
        role: String(formData.get("role") ?? "editor") === "admin" ? "admin" : "editor",
      });

      return {
        ok: true,
        intent: "create",
        userEmail: user.email,
        userName: user.name,
        temporaryPassword: password,
        message: "User created. Share this temporary password once — it will not be shown again.",
      } satisfies AdminUsersActionData;
    }

    const userId = String(formData.get("userId") ?? "");
    if (!userId) {
      return { ok: false, error: "User not found." } satisfies AdminUsersActionData;
    }

    if (userId === session.user.id) {
      return { ok: false, error: "You cannot modify your own account from this screen." } satisfies AdminUsersActionData;
    }

    if (intent === "activate") {
      await setCmsUserActive({ userId, isActive: true });
      return redirect("/admin/users");
    }

    if (intent === "deactivate") {
      await setCmsUserActive({ userId, isActive: false });
      return redirect("/admin/users");
    }

    if (intent === "delete") {
      await deleteCmsUser({ userId, actorId: session.user.id });
      return redirect("/admin/users");
    }

    if (intent === "reset-password") {
      const result = await resetCmsUserPasswordByAdmin({ userId });
      return {
        ok: true,
        intent: "reset-password",
        userEmail: result.user.email,
        userName: result.user.name,
        temporaryPassword: result.temporaryPassword,
        message: "Password reset. Share this temporary password once — it will not be shown again.",
      } satisfies AdminUsersActionData;
    }
  } catch (error) {
    if (error instanceof CmsHttpError) {
      return { ok: false, error: error.message } satisfies AdminUsersActionData;
    }

    throw error;
  }

  return redirect("/admin/users");
}

export default function AdminUsersRoute() {
  const adminData = useRouteLoaderData<typeof adminLoader>("routes/admin");
  const { q, rows } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <AdminUsersPage
      users={rows.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        role: row.role.toLowerCase() as "admin" | "editor",
        isActive: row.isActive,
        mustChangePassword: row.mustChangePassword,
        createdAt: row.createdAt.toISOString(),
      }))}
      searchValue={q}
      currentUserId={adminData?.session.user.id ?? ""}
      actionData={actionData}
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Users | Admin | Dynamic Oil Tools" },
];
