import { useLoaderData } from "react-router";

import type { Route } from "./+types/admin.partners.new";
import { AdminPartnerEditorPage } from "@/pages/admin/AdminPartnerEditorPage";
import { defaultLocale } from "@/i18n/config";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { createDefaultPartnerPayload } from "@/utils/cms-entity-defaults";
import { buildEntityKey } from "@/types/cms-entities";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const id = `partner-${Date.now()}`;
  return {
    contentKey: buildEntityKey("partner", id),
    payload: createDefaultPartnerPayload(id),
    status: "draft",
  };
}

export default function AdminPartnerNewRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <AdminPartnerEditorPage
      contentKey={data.contentKey}
      initialPayload={data.payload}
      initialStatus={data.status}
      locale={defaultLocale}
      backTo="/admin/partners"
    />
  );
}
