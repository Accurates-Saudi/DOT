import type { LucideIcon } from "lucide-react";
import { Globe, Mail, MapPin, Phone, Settings } from "lucide-react";

import type { Route } from "./+types/admin.settings";
import { AdminSurface } from "@/components/admin";
import { siteSettings } from "@/data/site";
import { localeLabels } from "@/i18n/config";

export default function AdminSettingsRoute() {
  return (
    <div className="space-y-4">
      <AdminSurface
        title="Settings"
        description="Company details, contact information, and site configuration."
      >
        <div className="grid gap-4 lg:grid-cols-2">
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
    <section className="rounded-md border border-[#e5e5e5] bg-[#f8f8f8] p-4">
      <h2 className="text-sm font-semibold text-[#111]">{title}</h2>
      <ul className="mt-3 divide-y divide-[#e5e5e5]">
        {items.map((item) => (
          <li
            key={`${title}-${item.label}`}
            className="flex justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
          >
            <span className="text-sm text-[#666]">{item.label}</span>
            <span className="text-right text-sm font-medium text-[#111]">
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
