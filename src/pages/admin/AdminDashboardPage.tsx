import {
  Activity,
  ArrowRight,
  FileText,
  Images,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router";

import { AdminMetricCard, AdminSurface } from "@/components/admin";

const dashboardCards = [
  {
    title: "Products",
    description:
      "Prepare future catalog and detail editing flows without changing the public website shell.",
    to: "/admin/products",
  },
  {
    title: "News",
    description:
      "Manage editorial content, publishing cadence, and article updates from one workspace.",
    to: "/admin/news",
  },
  {
    title: "Certificates",
    description:
      "Centralize certificate assets and supporting content for future review and publishing workflows.",
    to: "/admin/certificates",
  },
  {
    title: "Settings",
    description:
      "Extend into site-wide configuration and CMS controls when the next phase begins.",
    to: "/admin/settings",
  },
];

export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-4">
        <AdminMetricCard
          label="Security"
          value="Active"
          detail="Protected admin routes are gated by CMS session checks."
        />
        <AdminMetricCard
          label="Auth flow"
          value="Ready"
          detail="Login and logout now run through the CMS SDK and auth API."
        />
        <AdminMetricCard
          label="Publishing"
          value="Prepared"
          detail="The SDK already supports draft, publish, and media workflows."
        />
        <AdminMetricCard
          label="Expansion"
          value="Modular"
          detail="Sidebar sections are scaffolded for upcoming CMS modules."
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminSurface
          title="Dashboard overview"
          description="The first visible CMS interface is in place and ready to grow into editing and review workflows."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {dashboardCards.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className="group rounded-2xl border border-white/10 bg-black/10 p-5 transition hover:border-[var(--dot-orange)]/30 hover:bg-white/6"
              >
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  {card.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--dot-orange)]">
                  Open section
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </AdminSurface>

        <AdminSurface
          title="Foundation status"
          description="What this phase already establishes for the CMS."
        >
          <div className="space-y-4">
            <div className="flex gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">
              <ShieldCheck className="mt-0.5 size-5 text-[var(--dot-orange)]" />
              <div>
                <p className="font-medium text-white">Protected route shell</p>
                <p className="mt-1 text-sm leading-6 text-white/56">
                  All `/admin` screens now sit behind authenticated route loaders.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">
              <FileText className="mt-0.5 size-5 text-[var(--dot-orange)]" />
              <div>
                <p className="font-medium text-white">Content workflows ready</p>
                <p className="mt-1 text-sm leading-6 text-white/56">
                  The UI shell is already aligned with content CRUD and
                  publish/draft flows from the SDK.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">
              <Images className="mt-0.5 size-5 text-[var(--dot-orange)]" />
              <div>
                <p className="font-medium text-white">Media integration path</p>
                <p className="mt-1 text-sm leading-6 text-white/56">
                  Upload and replacement routes can plug into this shell without
                  bypassing the CMS SDK.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">
              <Activity className="mt-0.5 size-5 text-[var(--dot-orange)]" />
              <div>
                <p className="font-medium text-white">Expansion-friendly structure</p>
                <p className="mt-1 text-sm leading-6 text-white/56">
                  New modules can be added as protected child routes under the same
                  admin layout.
                </p>
              </div>
            </div>
          </div>
        </AdminSurface>
      </div>
    </div>
  );
}
