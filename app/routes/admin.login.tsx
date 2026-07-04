import { data, redirect } from "react-router";

import type { Route } from "./+types/admin.login";
import { AdminLoginPage } from "@/pages/admin";
import { getCmsAdminAccessState } from "@/server/cms/auth/admin-access.server";
import { CmsHttpError } from "@/server/cms/http.server";
import { getRequestMetadata } from "@/server/cms/request.server";
import { loginCmsUser } from "@/server/cms/auth/service.server";
import { sanitizeAdminRedirect } from "@/utils/admin-routing";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function loader({ request }: Route.LoaderArgs) {
  const { session, requiresSetup } = await getCmsAdminAccessState(request);

  if (requiresSetup) {
    throw redirect("/admin/setup");
  }

  if (session) {
    throw redirect("/admin");
  }

  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const rememberMe = formData.get("rememberMe") === "true";
  const redirectTo = sanitizeAdminRedirect(
    String(formData.get("redirectTo") ?? ""),
  );

  const fieldErrors = {
    ...(email ? {} : { email: "Email is required." }),
    ...(email && isValidEmail(email) ? {} : email ? { email: "Enter a valid email address." } : {}),
    ...(password ? {} : { password: "Password is required." }),
  };

  if (Object.keys(fieldErrors).length > 0) {
    return data(
      {
        fieldErrors,
        email,
        rememberMe,
        redirectTo,
      },
      { status: 400 },
    );
  }

  try {
    const { requiresSetup } = await getCmsAdminAccessState(request);

    if (requiresSetup) {
      return redirect("/admin/setup");
    }

    const metadata = getRequestMetadata(request);
    const result = await loginCmsUser({
      email,
      password,
      rememberMe,
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
    });

    return redirect(redirectTo, {
      status: 303,
      headers: { "Set-Cookie": result.setCookie },
    });
  } catch (error) {
    if (error instanceof CmsHttpError) {
      return data(
        {
          formError: error.message,
          email,
          rememberMe,
          redirectTo,
        },
        { status: error.status },
      );
    }

    throw error;
  }
}

export default function AdminLoginRoute() {
  return <AdminLoginPage />;
}

export const meta: Route.MetaFunction = () => [
  { title: "Admin Login | Dynamic Oil Tools" },
];
