import { redirect, useLoaderData } from "react-router";

import type { Route } from "./+types/admin.careers";
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
  const { buildAdminCareerRows } = await import(
    "@/server/cms/content/admin-collection.server"
  );
  const url = new URL(request.url);
  const rows = await buildAdminCareerRows(defaultLocale, url.searchParams.get("q") ?? "");
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
      orderKey: CMS_COLLECTION_ORDER_KEYS.career,
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
      slug: `${key.split(".").pop()}-copy-${suffix}`,
    });
    return redirect(`/admin/careers/${encodeURIComponent(`${key}.copy-${suffix}`)}`);
  }
  if (intent === "archive" && key) {
    await processCollectionArchiveAction(session.user.id, key, "career");
    return redirect("/admin/careers");
  }
  if (intent === "unarchive" && key) {
    await processCollectionUnarchiveAction(session.user.id, key);
    return redirect("/admin/careers?status=archived");
  }
  if (intent === "activate" && key) {
    const { setCareerActiveStatus } = await import(
      "@/server/cms/content/entity-content.server"
    );
    await setCareerActiveStatus({ key, actorId: session.user.id, isActive: true });
    return redirect("/admin/careers");
  }
  if (intent === "deactivate" && key) {
    const { setCareerActiveStatus } = await import(
      "@/server/cms/content/entity-content.server"
    );
    await setCareerActiveStatus({ key, actorId: session.user.id, isActive: false });
    return redirect("/admin/careers");
  }
  return { ok: false };
}

export default function AdminCareersRoute() {
  const { q, status, rows } = useLoaderData<typeof loader>();
  return (
    <AdminCollectionListPage
      title="Job Postings"
      description="Manage career listings. Order matches the public careers page."
      collectionPath="/admin/careers"
      searchValue={q}
      searchPlaceholder="Search jobs by title or slug"
      addNewHref="/admin/careers/new"
      rows={rows}
      statusFilter={status}
      emptyMessage="No job postings were found."
      editPath={(row) => `/admin/careers/${encodeURIComponent(row.cmsKey ?? row.key)}`}
      enableActiveToggle
    />
  );
}

export const meta: Route.MetaFunction = () => [{ title: "Careers | Admin | Dynamic Oil Tools" }];
