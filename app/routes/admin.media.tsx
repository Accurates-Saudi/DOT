import { redirect, useActionData, useLoaderData } from "react-router";

import type { Route } from "./+types/admin.media";
import { AdminMediaLibraryPage } from "@/pages/admin/AdminMediaLibraryPage";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { listMediaGalleryItems } from "@/server/cms/media/gallery.server";
import { uploadMediaAsset } from "@/server/cms/media/service.server";
import { readUploadedFile, assertImageUpload } from "@/server/cms/request.server";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() ?? "";
  const items = await listMediaGalleryItems(q);

  return { q, items };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await requireCmsAuthSession(request, ["editor"]);
  const formData = await request.formData();
  const upload = await readUploadedFile(formData.get("file"));

  if (!upload) {
    return redirect("/admin/media?error=missing-file");
  }

  assertImageUpload(upload.mimeType);
  const keyInput = String(formData.get("key") ?? "").trim();
  const key =
    keyInput ||
    `upload.${upload.fileName.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  await uploadMediaAsset({
    key,
    actorId: session.user.id,
    ...upload,
  });

  return redirect("/admin/media");
}

export default function AdminMediaRoute() {
  const { q, items } = useLoaderData<typeof loader>();
  useActionData<typeof action>();

  return <AdminMediaLibraryPage items={items} searchValue={q} />;
}

export const meta: Route.MetaFunction = () => [
  { title: "Media Library | Admin | Dynamic Oil Tools" },
];
