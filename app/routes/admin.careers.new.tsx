import { useLoaderData } from "react-router";

import type { Route } from "./+types/admin.careers.new";
import { AdminCareerEditorPage } from "@/pages/admin/AdminCareerEditorPage";
import { defaultLocale } from "@/i18n/config";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { createDefaultCareerPayload } from "@/utils/cms-entity-defaults";
import { slugifyInput } from "@/utils/cms-entities";
import { buildEntityKey } from "@/types/cms-entities";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const url = new URL(request.url);
  const slug = slugifyInput(url.searchParams.get("slug") ?? "new-job");

  return {
    contentKey: buildEntityKey("career", slug),
    slug,
    payload: createDefaultCareerPayload(slug),
    status: "draft",
  };
}

export default function AdminCareerNewRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <AdminCareerEditorPage
      contentKey={data.contentKey}
      slug={data.slug}
      initialPayload={data.payload}
      initialStatus={data.status}
      locale={defaultLocale}
      backTo="/admin/careers"
    />
  );
}
