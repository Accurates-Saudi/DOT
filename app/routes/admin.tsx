import { Outlet, redirect, useLoaderData } from "react-router";

import type { Route } from "./+types/admin";
import { AdminShell } from "@/components/admin";
import { getCmsAdminAccessState } from "@/server/cms/auth/admin-access.server";
import {
  changeOwnCmsPassword,
  requireCmsAuthSession,
} from "@/server/cms/auth/service.server";
import { CmsHttpError } from "@/server/cms/http.server";
import { buildAdminLoginRedirect } from "@/utils/admin-routing";

export async function loader({ request }: Route.LoaderArgs) {
  const { session, requiresSetup } = await getCmsAdminAccessState(request);

  if (requiresSetup) {
    throw redirect("/admin/setup");
  }

  if (!session) {
    throw redirect(buildAdminLoginRedirect(request.url));
  }

  return { session };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await requireCmsAuthSession(request);
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");

  if (intent !== "change-password") {
    return null;
  }

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const fieldErrors: {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  } = {};

  if (!currentPassword) {
    fieldErrors.currentPassword = "Enter your current password.";
  }

  if (!newPassword) {
    fieldErrors.newPassword = "Enter a new password.";
  } else if (newPassword.length < 12) {
    fieldErrors.newPassword = "Password must be at least 12 characters long.";
  }

  if (!confirmPassword) {
    fieldErrors.confirmPassword = "Confirm your new password.";
  } else if (newPassword !== confirmPassword) {
    fieldErrors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  try {
    await changeOwnCmsPassword({
      userId: session.user.id,
      currentPassword,
      newPassword,
    });
  } catch (error) {
    if (error instanceof CmsHttpError) {
      if (error.code === "invalid_password") {
        return {
          fieldErrors: { currentPassword: error.message },
        };
      }

      return { formError: error.message };
    }

    throw error;
  }

  throw redirect(new URL(request.url).pathname);
}

export default function AdminLayoutRoute() {
  const { session } = useLoaderData<typeof loader>();

  return (
    <AdminShell session={session}>
      <Outlet />
    </AdminShell>
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Admin Dashboard | Dynamic Oil Tools" },
];
