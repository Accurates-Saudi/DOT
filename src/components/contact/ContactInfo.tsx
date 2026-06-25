import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

import { useNumberFormat } from "@/i18n/hooks";
import type { ContactInfoContent, ContactInfoItem } from "@/types";
import { cn } from "@/lib/utils";

const CONTACT_ICONS: Record<ContactInfoItem["type"], LucideIcon> = {
  phone: Phone,
  email: Mail,
  address: MapPin,
  hours: Clock,
};

export interface ContactInfoProps {
  content: ContactInfoContent;
  className?: string;
}

export function ContactInfo({ content, className }: ContactInfoProps) {
  const { formatNumericText } = useNumberFormat();

  return (
    <div className={cn(className)}>
      <div className="mb-8 flex items-center gap-3">
        <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
        <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
          {content.label}
        </p>
      </div>

      <h2 className="text-xl font-bold tracking-tight text-[#0c1524] sm:text-2xl">
        {content.heading}
      </h2>

      <ul className="mt-8 space-y-6">
        {content.items.map((item) => {
          const Icon = CONTACT_ICONS[item.type];

          return (
            <li key={item.id} className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-[#0c1524]/10 bg-[#0c1524]/[0.03] text-[#F68E05]">
                <Icon className="size-4" strokeWidth={2} aria-hidden />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-[0.6875rem] font-bold tracking-[0.12em] text-[#0c1524]/50 uppercase sm:text-xs">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-1 block text-[0.9375rem] leading-relaxed text-[#0c1524] transition-colors hover:text-[#F68E05] sm:text-base"
                  >
                    {formatNumericText(item.value)}
                  </a>
                ) : (
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-[#0c1524] sm:text-base">
                    {formatNumericText(item.value)}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
