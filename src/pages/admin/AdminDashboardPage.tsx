import {
  ArrowRight,
  ExternalLink,
  FolderCog,
  Images,
  Newspaper,
  Package2,
  Settings,
  Sparkles,
  Users,
  Award,
} from "lucide-react";
import { Link } from "react-router";

import { AdminSurface } from "@/components/admin";
import { defaultLocale } from "@/i18n/config";
import type { CMSRole } from "@/types";

const managementCards = [
  {
    title: "Products",
    description:
      "Manage searchable product records, ordering, duplication, lifecycle actions, and the future structured editor.",
    to: "/admin/products",
    icon: Package2,
  },
  {
    title: "News",
    description:
      "Control article workflows, publishing cadence, and editorial collection management from one place.",
    to: "/admin/news",
    icon: Newspaper,
  },
  {
    title: "Certificates",
    description:
      "Maintain certificate collections and supporting metadata without editing page presentation here.",
    to: "/admin/certificates",
    icon: Award,
  },
  {
    title: "Media Library",
    description:
      "Upload, replace, search, preview, and track media usage while preserving ID-based references.",
    to: "/admin/media",
    icon: Images,
  },
  {
    title: "Settings",
    description:
      "Manage company details, SEO, social links, languages, and brand-level website settings.",
    to: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Users",
    description:
      "Admin-only user management for future role-based access and operational governance.",
    to: "/admin/users",
    icon: Users,
    roles: ["admin"] as CMSRole[],
  },
];

export function AdminDashboardPage({ userRole }: { userRole: CMSRole }) {
  const visibleManagementCards = managementCards.filter(
    (card) => !card.roles || card.roles.includes(userRole),
  );

  return (
    <div className="space-y-6">
      <AdminSurface className="overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr]">
          <div>
            <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-[var(--dot-orange)] uppercase">
              Site-first CMS
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0c1524] sm:text-[2.1rem]">
              The dashboard is your hub. The website is your editor.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#0c1524]/58">
              Use this workspace to manage structured collections, media, settings,
              and user access. For page content, head back to the live site and use
              Edit Mode directly on the website experience.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`/${defaultLocale}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--dot-orange)] px-5 text-sm font-medium text-white shadow-[0_18px_40px_-24px_rgba(246,142,5,0.65)] transition hover:bg-[#db7d04]"
              >
                View Website
                <ExternalLink className="size-4" />
              </a>
              <Link
                to="/admin/media"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-[#0c1524]/10 bg-white px-5 text-sm font-medium text-[#0c1524] transition hover:border-[var(--dot-orange)]/35 hover:bg-[var(--dot-orange)]/[0.04]"
              >
                Open Media Library
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[#0c1524]/8 bg-[#f5f6f8] p-6">
            <div className="inline-flex size-12 items-center justify-center rounded-2xl border border-[var(--dot-orange)]/20 bg-white text-[var(--dot-orange)]">
              <Sparkles className="size-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[#0c1524]">
              Recommended workflow
            </h3>
            <ol className="mt-4 space-y-3 text-sm leading-7 text-[#0c1524]/60">
              <li>1. Open the dashboard to manage collections and settings.</li>
              <li>2. Click View Website to move into the live brand experience.</li>
              <li>3. Enable Edit Mode from the website navbar.</li>
              <li>4. Update content directly where it appears to visitors.</li>
            </ol>
          </div>
        </div>
      </AdminSurface>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <AdminSurface
          title="Management hub"
          description="Use the dashboard for structured content, system configuration, and collection operations."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {visibleManagementCards.map((card) => {
              const Icon = card.icon;

              return (
              <Link
                key={card.to}
                to={card.to}
                className="group rounded-[1.5rem] border border-[#0c1524]/8 bg-[#f7f8fa] p-5 transition hover:border-[var(--dot-orange)]/28 hover:bg-[var(--dot-orange)]/[0.045]"
              >
                <div className="flex size-11 items-center justify-center rounded-2xl border border-white bg-white text-[var(--dot-orange)] shadow-[0_12px_28px_-20px_rgba(12,21,36,0.22)]">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#0c1524]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#0c1524]/58">
                  {card.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--dot-orange)]">
                  Open section
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
              );
            })}
          </div>
        </AdminSurface>

        <AdminSurface
          title="What lives on the website"
          description="Page presentation should be edited on the site itself, not recreated as generic back-office forms."
        >
          <div className="space-y-4">
            <div className="flex gap-3 rounded-2xl border border-[#0c1524]/8 bg-[#f7f8fa] p-4">
              <FolderCog className="mt-0.5 size-5 text-[var(--dot-orange)]" />
              <div>
                <p className="font-medium text-[#0c1524]">Edit pages on the live website</p>
                <p className="mt-1 text-sm leading-6 text-[#0c1524]/56">
                  Homepage sections, page copy, images, and calls to action belong
                  in the website editing experience, not in dashboard forms.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-[#0c1524]/8 bg-[#f7f8fa] p-4">
              <Images className="mt-0.5 size-5 text-[var(--dot-orange)]" />
              <div>
                <p className="font-medium text-[#0c1524]">Keep structured systems here</p>
                <p className="mt-1 text-sm leading-6 text-[#0c1524]/56">
                  Collections, media assets, SEO, languages, and access control are
                  better managed from the hub.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-[#0c1524]/8 bg-[#f7f8fa] p-4">
              <Sparkles className="mt-0.5 size-5 text-[var(--dot-orange)]" />
              <div>
                <p className="font-medium text-[#0c1524]">Use Edit Mode for content confidence</p>
                <p className="mt-1 text-sm leading-6 text-[#0c1524]/56">
                  Content editors should see updates in context, inside the real
                  layout, with less friction than a traditional admin form flow.
                </p>
              </div>
            </div>
          </div>
        </AdminSurface>
      </div>
    </div>
  );
}
