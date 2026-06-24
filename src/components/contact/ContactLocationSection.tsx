import { MapPin } from "lucide-react";

import { Container, Section } from "@/components/shared";
import type { ContactLocationContent } from "@/types";

export interface ContactLocationSectionProps {
  content: ContactLocationContent;
}

export function ContactLocationSection({ content }: ContactLocationSectionProps) {
  return (
    <Section
      id="contact-location"
      padding="lg"
      aria-label="Office location"
      className="border-b border-[#0c1524]/8 bg-[#fafafa]"
    >
      <Container>
        <div className="mb-8 flex items-center gap-3 sm:mb-10">
          <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
          <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
            {content.label}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 className="text-xl font-bold tracking-tight text-[#0c1524] sm:text-2xl">
              {content.heading}
            </h2>
            <div className="mt-6 flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-[#0c1524]/10 bg-white text-[#F68E05]">
                <MapPin className="size-4" strokeWidth={2} aria-hidden />
              </span>
              <p className="pt-0.5 text-[0.9375rem] leading-relaxed text-[#0c1524]/75 sm:text-base">
                {content.address}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            {content.mapEmbedUrl ? (
              <div className="overflow-hidden rounded-sm border border-[#0c1524]/10 bg-white shadow-[0_12px_40px_-28px_rgba(12,21,36,0.2)]">
                <iframe
                  title="Dynamic Oil Tools office location"
                  src={content.mapEmbedUrl}
                  className="aspect-[16/9] w-full min-h-[280px] border-0 sm:min-h-[360px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            ) : (
              <MapPlaceholder label={content.mapPlaceholderLabel} />
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function MapPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex aspect-[16/9] min-h-[280px] flex-col items-center justify-center rounded-sm border border-dashed border-[#0c1524]/18 bg-white sm:min-h-[360px]"
      role="img"
      aria-label={label}
    >
      <span className="flex size-14 items-center justify-center rounded-sm border border-[#0c1524]/10 bg-[#0c1524]/[0.03] text-[#0c1524]/35">
        <MapPin className="size-6" strokeWidth={1.75} aria-hidden />
      </span>
      <p className="mt-4 text-[0.6875rem] font-bold tracking-[0.16em] text-[#0c1524]/45 uppercase sm:text-xs">
        {label}
      </p>
      <p className="mt-2 max-w-xs px-6 text-center text-sm leading-relaxed text-[#0c1524]/50">
        Map embed ready — configure mapEmbedUrl in CMS or site data.
      </p>
    </div>
  );
}
