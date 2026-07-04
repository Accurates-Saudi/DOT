import { useLoaderData } from "react-router";

import type { Route } from "./+types/admin.drafts";
import { AdminDraftsPage } from "@/pages/admin/AdminDraftsPage";
import { defaultLocale } from "@/i18n/config";
import { listAdminDraftItems } from "@/server/cms/content/admin-dashboard.server";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const url = new URL(request.url);
  const searchValue = url.searchParams.get("q")?.trim() ?? "";
  const drafts = await listAdminDraftItems(defaultLocale, searchValue);

  return { drafts, searchValue };
}

export default function AdminDraftsRoute() {
  const data = useLoaderData<typeof loader>();

  return <AdminDraftsPage drafts={data.drafts} searchValue={data.searchValue} />;
}

export const meta: Route.MetaFunction = () => [
  { title: "Drafts | Admin | Dynamic Oil Tools" },
];
