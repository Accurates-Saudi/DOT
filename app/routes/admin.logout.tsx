import { redirect } from "react-router";

import type { Route } from "./+types/admin.logout";
import { getCmsUserCount, logoutCmsUser } from "@/server/cms/auth/service.server";

export async function loader() {
  return redirect("/admin");
}

export async function action({ request }: Route.ActionArgs) {
  const [setCookie, userCount] = await Promise.all([
    logoutCmsUser(request),
    getCmsUserCount(),
  ]);

  return redirect(userCount === 0 ? "/admin/setup" : "/admin/login", {
    status: 303,
    headers: { "Set-Cookie": setCookie },
  });
}

export default function AdminLogoutRoute() {
  return null;
}
