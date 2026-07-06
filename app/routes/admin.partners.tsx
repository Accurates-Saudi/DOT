import { redirect, useLoaderData } from "react-router";

import type { Route } from "./+types/admin.partners";
import { AdminCollectionListPage } from "@/pages/admin/AdminCollectionListPage";
import { defaultLocale } from "@/i18n/config";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import {
  processCollectionArchiveAction,
  processCollectionUnarchiveAction,
} from "@/server/cms/content/admin-collection-actions.server";
import { CMS_COLLECTION_ORDER_KEYS } from "@/types/cms-entities";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const { buildAdminPartnerRows } = await import(
    "@/server/cms/content/admin-collection.server"
  );
  const url = new URL(request.url);
  const rows = await buildAdminPartnerRows(defaultLocale, url.searchParams.get("q") ?? "");
  return { q: url.searchParams.get("q") ?? "", status: url.searchParams.get("status") ?? "all", rows };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await requireCmsAuthSession(request, ["editor"]);
  const { duplicateContentEntry, saveCollectionOrder } = await import(
    "@/server/cms/content/entity-content.server"
  );
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");

  if (intent === "reorder") {
    await saveCollectionOrder({
      orderKey: CMS_COLLECTION_ORDER_KEYS.partner,
      orderedKeys: JSON.parse(String(formData.get("orderedKeys") ?? "[]")) as string[],
      actorId: session.user.id,
    });
    return { ok: true };
  }

  const key = String(formData.get("key") ?? "");
  if (intent === "duplicate" && key) {
    const suffix = `${Date.now()}`;
    await duplicateContentEntry({
      sourceKey: key,
      targetKey: `${key}.copy-${suffix}`,
      actorId: session.user.id,
    });
    return redirect(`/admin/partners/${encodeURIComponent(`${key}.copy-${suffix}`)}`);
  }
  if (intent === "archive" && key) {
    await processCollectionArchiveAction(session.user.id, key, "partner");
    return redirect("/admin/partners");
  }
  if (intent === "unarchive" && key) {
    await processCollectionUnarchiveAction(session.user.id, key);
    return redirect("/admin/partners?status=archived");
  }

  return { ok: false };
}

export default function AdminPartnersRoute() {
  const { q, status, rows } = useLoaderData<typeof loader>();
  return (
    <AdminCollectionListPage
      title="Partners"
      description="Manage client logos shown in the Trusted by Industry Leaders section on the home page."
      collectionPath="/admin/partners"
      searchValue={q}
      searchPlaceholder="Search partner logos"
      addNewHref="/admin/partners/new"
      rows={rows}
      statusFilter={status}
      emptyMessage="No partner logos were found."
      editPath={(row) => `/admin/partners/${encodeURIComponent(row.cmsKey ?? row.key)}`}
    />
  );
}

export const meta: Route.MetaFunction = () => [{ title: "Partners | Admin | Dynamic Oil Tools" }];
