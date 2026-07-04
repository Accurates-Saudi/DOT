import { Outlet, redirect, useLoaderData } from "react-router";

import type { Route } from "./+types/admin";
import { AdminShell } from "@/components/admin";
import { createCmsLoaderClient } from "@/sdk/cms";
import { buildAdminLoginRedirect } from "@/utils/admin-routing";

export async function loader({ request }: Route.LoaderArgs) {
  const cms = createCmsLoaderClient(request);
  const session = await cms.auth.getSession();

  if (!session) {
    throw redirect(buildAdminLoginRedirect(request.url));
  }

  return { session };
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
