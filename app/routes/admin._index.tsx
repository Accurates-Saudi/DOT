import { useLoaderData, useRouteLoaderData } from "react-router";

import type { Route } from "./+types/admin._index";
import { AdminDashboardPage } from "@/pages/admin";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { getPrismaClient } from "@/server/cms/db.server";
import type { loader as adminLoader } from "./admin";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const prisma = getPrismaClient();

  const [products, news, certificates, catalogs, media, users, recentContent, recentMedia] =
    await Promise.all([
      prisma.cmsContentEntry.count({
        where: { type: "PRODUCT", status: { not: "ARCHIVED" } },
      }),
      prisma.cmsContentEntry.count({
        where: { type: "NEWS", status: { not: "ARCHIVED" } },
      }),
      prisma.cmsContentEntry.count({
        where: { type: "CERTIFICATE", status: { not: "ARCHIVED" } },
      }),
      prisma.cmsContentEntry.count({
        where: {
          OR: [
            { key: { contains: "catalog", mode: "insensitive" } },
            { slug: { contains: "catalog", mode: "insensitive" } },
          ],
          status: { not: "ARCHIVED" },
        },
      }),
      prisma.cmsMediaAsset.count(),
      prisma.cmsUser.count(),
      prisma.cmsContentEntry.findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: {
          key: true,
          type: true,
          updatedAt: true,
          status: true,
        },
      }),
      prisma.cmsMediaAsset.findMany({
        orderBy: { updatedAt: "desc" },
        take: 3,
        select: {
          key: true,
          updatedAt: true,
          type: true,
        },
      }),
    ]);

  return {
    counts: {
      products,
      news,
      certificates,
      catalogs,
      media,
      users,
    },
    recentChanges: [
      ...recentContent.map((item) => ({
        id: `content:${item.key}`,
        label: item.key,
        type: item.type.toLowerCase(),
        updatedAt: item.updatedAt.toISOString(),
        status: item.status.toLowerCase(),
      })),
      ...recentMedia.map((item) => ({
        id: `media:${item.key}`,
        label: item.key,
        type: "media",
        updatedAt: item.updatedAt.toISOString(),
        status: item.type.toLowerCase(),
      })),
    ]
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, 6),
  };
}

export default function AdminDashboardIndexRoute() {
  const adminData = useRouteLoaderData<typeof adminLoader>("routes/admin");
  const data = useLoaderData<typeof loader>();

  return (
    <AdminDashboardPage
      userName={adminData?.session.user.name ?? "CMS User"}
      userRole={adminData?.session.user.role ?? "editor"}
      counts={data.counts}
      recentChanges={data.recentChanges}
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Admin Dashboard | Dynamic Oil Tools" },
];
