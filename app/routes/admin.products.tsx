import { redirect, useActionData, useLoaderData } from "react-router";

import type { Route } from "./+types/admin.products";
import { AdminCollectionListPage } from "@/pages/admin/AdminCollectionListPage";
import { defaultLocale } from "@/i18n/config";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { processCollectionArchiveAction, processCollectionUnarchiveAction } from "@/server/cms/content/admin-collection-actions.server";
import { CMS_COLLECTION_ORDER_KEYS } from "@/types/cms-entities";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const { buildAdminProductRows } = await import(
    "@/server/cms/content/admin-collection.server"
  );
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const status = url.searchParams.get("status") ?? "all";
  const rows = await buildAdminProductRows(defaultLocale, q);

  return { q, status, rows };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await requireCmsAuthSession(request, ["editor"]);
  const { duplicateContentEntry, saveCollectionOrder } = await import(
    "@/server/cms/content/entity-content.server"
  );
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");

  if (intent === "reorder") {
    const url = new URL(request.url);
    const orderedKeys = JSON.parse(String(formData.get("orderedKeys") ?? "[]")) as string[];
    await saveCollectionOrder({
      orderKey: CMS_COLLECTION_ORDER_KEYS.product,
      orderedKeys,
      actorId: session.user.id,
    });
    return redirect(`${url.pathname}${url.search}`);
  }

  const key = String(formData.get("key") ?? "");

  if (intent === "duplicate" && key) {
    const suffix = `${Date.now()}`;
    const targetKey = `${key}.copy-${suffix}`;
    await duplicateContentEntry({
      sourceKey: key,
      targetKey,
      actorId: session.user.id,
      slug: `${key.split(".").pop()}-copy-${suffix}`,
    });
    return redirect(`/admin/products/${encodeURIComponent(targetKey)}`);
  }

  if (intent === "archive" && key) {
    await processCollectionArchiveAction(session.user.id, key, "product");
    return redirect("/admin/products");
  }

  if (intent === "unarchive" && key) {
    await processCollectionUnarchiveAction(session.user.id, key);
    return redirect("/admin/products?status=archived");
  }

  return { ok: false, error: "Unsupported action." };
}

export default function AdminProductsRoute() {
  const { q, status, rows } = useLoaderData<typeof loader>();
  useActionData<typeof action>();

  return (
    <AdminCollectionListPage
      title="Products"
      description="Manage product entries. Order matches the public website."
      collectionPath="/admin/products"
      searchValue={q}
      searchPlaceholder="Search products by key or slug"
      addNewHref="/admin/products/new"
      rows={rows}
      statusFilter={status}
      emptyMessage="No product entries were found."
      editPath={(row) =>
        row.cmsKey
          ? `/admin/products/${encodeURIComponent(row.cmsKey)}`
          : `/admin/products/${encodeURIComponent(row.key)}`
      }
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Products | Admin | Dynamic Oil Tools" },
];
