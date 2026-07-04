import { data, redirect } from "react-router";

import type { Route } from "./+types/admin.login";
import { AdminLoginPage } from "@/pages/admin";
import { CmsApiError, createCmsActionClient, createCmsLoaderClient } from "@/sdk/cms";
import { sanitizeAdminRedirect } from "@/utils/admin-routing";

export async function loader({ request }: Route.LoaderArgs) {
  const cms = createCmsLoaderClient(request);
  const session = await cms.auth.getSession();

  if (session) {
    throw redirect("/admin");
  }

  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = sanitizeAdminRedirect(
    String(formData.get("redirectTo") ?? ""),
  );

  const fieldErrors = {
    ...(email ? {} : { email: "Email is required." }),
    ...(password ? {} : { password: "Password is required." }),
  };

  if (Object.keys(fieldErrors).length > 0) {
    return data(
      {
        fieldErrors,
        email,
        redirectTo,
      },
      { status: 400 },
    );
  }

  try {
    const cms = createCmsActionClient(request);
    const response = await cms.request<Response>("/api/cms/auth/login", {
      method: "POST",
      json: { email, password },
      responseType: "response",
    });
    const setCookie = response.headers.get("Set-Cookie");

    return redirect(redirectTo, {
      headers: setCookie ? { "Set-Cookie": setCookie } : undefined,
    });
  } catch (error) {
    if (error instanceof CmsApiError) {
      return data(
        {
          formError: error.message,
          email,
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
