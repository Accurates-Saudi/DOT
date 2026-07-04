import { redirect } from "react-router";
import { Users } from "lucide-react";

import type { Route } from "./+types/admin.users";
import { AdminSectionPlaceholderPage } from "@/pages/admin";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    await requireCmsAuthSession(request, ["admin"]);
    return null;
  } catch (error) {
    if (error instanceof Error && "status" in error) {
      return redirect("/admin");
    }

    throw error;
  }
}

export default function AdminUsersRoute() {
  return (
    <AdminSectionPlaceholderPage
      eyebrow="Users"
      title="User management is reserved for administrators."
      description="This admin-only space will manage team members, role assignments, and future permission controls without exposing that responsibility to editors."
      icon={Users}
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Users | Admin | Dynamic Oil Tools" },
];
