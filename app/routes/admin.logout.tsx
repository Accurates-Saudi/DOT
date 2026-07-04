import { redirect } from "react-router";

import type { Route } from "./+types/admin.logout";
import { CmsApiError, createCmsActionClient } from "@/sdk/cms";

export async function loader() {
  return redirect("/admin");
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const cms = createCmsActionClient(request);
    const response = await cms.request<Response>("/api/cms/auth/logout", {
      method: "POST",
      responseType: "response",
    });
    const setCookie = response.headers.get("Set-Cookie");

    return redirect("/admin/login", {
      headers: setCookie ? { "Set-Cookie": setCookie } : undefined,
    });
  } catch (error) {
    if (error instanceof CmsApiError && error.status === 401) {
      return redirect("/admin/login");
    }

    throw error;
  }
}

export default function AdminLogoutRoute() {
  return null;
}
