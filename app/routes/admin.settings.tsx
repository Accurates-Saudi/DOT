import type { LucideIcon } from "lucide-react";
import { Globe, Mail, MapPin, Phone, Settings } from "lucide-react";

import type { Route } from "./+types/admin.settings";
import { AdminSurface } from "@/components/admin";
import { siteSettings } from "@/data/site";
import { localeLabels } from "@/i18n/config";

export default function AdminSettingsRoute() {
  return (
    <div className="space-y-6">
      <AdminSurface
        title="Settings"
        description="Manage company details, contact information, social links, SEO, languages, and brand assets from one place."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <SettingsGroup
            title="Company"
            items={[
              { icon: Settings, label: "Company name", value: siteSettings.companyName },
              { icon: Settings, label: "Legal name", value: siteSettings.legalName },
            ]}
          />
          <SettingsGroup
            title="Contact"
            items={[
              { icon: Phone, label: "Phone", value: siteSettings.contact.phone },
              { icon: Mail, label: "Email", value: siteSettings.contact.email },
              { icon: MapPin, label: "Address", value: siteSettings.contact.address },
            ]}
          />
          <SettingsGroup
            title="Social"
            items={[
              { icon: Globe, label: "LinkedIn", value: siteSettings.social.linkedin ?? "Not set" },
            ]}
          />
          <SettingsGroup
            title="Languages"
            items={Object.entries(localeLabels).map(([key, value]) => ({
              icon: Globe,
              label: key.toUpperCase(),
              value,
            }))}
          />
        </div>
      </AdminSurface>
    </div>
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Settings | Admin | Dynamic Oil Tools" },
];

function SettingsGroup({
  title,
  items,
}: {
  title: string;
  items: Array<{
    icon: LucideIcon;
    label: string;
    value: string;
  }>;
}) {
  return (
    <section className="rounded-2xl border border-[#0c1524]/8 bg-[#f7f8fa] p-5">
      <h2 className="text-sm font-semibold tracking-[0.04em] text-[#0c1524]">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={`${title}-${item.label}`} className="flex gap-3">
              <span className="mt-0.5 flex size-8 items-center justify-center rounded-xl bg-white text-[var(--dot-orange)] shadow-[0_10px_20px_-16px_rgba(12,21,36,0.18)]">
                <Icon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#0c1524]">{item.label}</p>
                <p className="text-sm text-[#0c1524]/56">{item.value}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
