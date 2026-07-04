import { useLoaderData } from "react-router";

import type { Route } from "./+types/admin.news.new";
import { AdminNewsEditorPage } from "@/pages/admin/AdminNewsEditorPage";
import { defaultLocale } from "@/i18n/config";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { createDefaultNewsPayload } from "@/utils/cms-entity-defaults";
import { slugifyInput } from "@/utils/cms-entities";
import { buildEntityKey } from "@/types/cms-entities";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const url = new URL(request.url);
  const slug = slugifyInput(url.searchParams.get("slug") ?? "new-article");

  return {
    contentKey: buildEntityKey("news", slug),
    slug,
    payload: createDefaultNewsPayload(slug),
    status: "draft",
  };
}

export default function AdminNewsNewRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <AdminNewsEditorPage
      contentKey={data.contentKey}
      slug={data.slug}
      initialPayload={data.payload}
      initialStatus={data.status}
      locale={defaultLocale}
      backTo="/admin/news"
    />
  );
}
