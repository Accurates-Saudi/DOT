import { redirect, useLoaderData } from "react-router";

import type { Route } from "./+types/admin.products.$key";
import { AdminProductEditorPage } from "@/pages/admin/AdminProductEditorPage";
import { defaultLocale } from "@/i18n/config";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { getContentEntryByKey } from "@/server/cms/content/service.server";
import type { CmsProductPayload } from "@/types/cms-entities";
import { buildEntityKey, parseEntityId } from "@/types/cms-entities";

export async function loader({ request, params }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const key = decodeURIComponent(params.key);

  try {
    const detail = await getContentEntryByKey(key);
    const payload =
      (detail.entry.currentVersion?.payload as CmsProductPayload | undefined) ??
      (detail.publishedVersion?.payload as CmsProductPayload | undefined);

    if (!payload) {
      throw new Response("Product payload not found", { status: 404 });
    }

    return {
      contentKey: key,
      slug: detail.entry.slug ?? parseEntityId("product", key) ?? key,
      payload,
      status: detail.entry.status,
    };
  } catch {
    const { getStaticProductPayload } = await import(
      "@/server/cms/content/entity-content.server"
    );
    const slug = parseEntityId("product", key) ?? key.replace(/^product\./, "");
    const staticPayload = await getStaticProductPayload(slug);

    if (staticPayload) {
      return {
        contentKey: buildEntityKey("product", slug),
        slug,
        payload: staticPayload,
        status: "static",
      };
    }

    throw redirect("/admin/products");
  }
}

export default function AdminProductEditRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <AdminProductEditorPage
      contentKey={data.contentKey}
      slug={data.slug}
      initialPayload={data.payload}
      initialStatus={data.status}
      locale={defaultLocale}
      backTo="/admin/products"
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Edit Product | Admin | Dynamic Oil Tools" },
];
