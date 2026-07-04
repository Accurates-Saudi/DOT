import { redirect, useLoaderData } from "react-router";

import type { Route } from "./+types/admin.products.new";
import { AdminProductEditorPage } from "@/pages/admin/AdminProductEditorPage";
import { defaultLocale } from "@/i18n/config";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { createDefaultProductPayload } from "@/utils/cms-entity-defaults";
import { slugifyInput } from "@/utils/cms-entities";
import { buildEntityKey } from "@/types/cms-entities";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const url = new URL(request.url);
  const slug = slugifyInput(url.searchParams.get("slug") ?? "new-product");
  const contentKey = buildEntityKey("product", slug);

  return {
    contentKey,
    slug,
    payload: createDefaultProductPayload(slug, defaultLocale),
    status: "draft",
  };
}

export async function action({ request }: Route.ActionArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const formData = await request.formData();
  const slug = slugifyInput(String(formData.get("slug") ?? "new-product"));
  return redirect(`/admin/products/new?slug=${encodeURIComponent(slug)}`);
}

export default function AdminProductNewRoute() {
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
  { title: "New Product | Admin | Dynamic Oil Tools" },
];
