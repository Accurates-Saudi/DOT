import type { ReactNode } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { EditableImage, EditableText } from "@/components/editable";
import { FormattedNumericText, LocalizedLink } from "@/components/i18n";
import { Container } from "@/components/shared";
import { useFooterContent } from "@/i18n/content/hooks";
import { useNumberFormat, useTranslation } from "@/i18n/hooks";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import type { FooterContactItem, FooterContent, LinkItem } from "@/types";
import { cn } from "@/lib/utils";

export interface FooterProps {
  content?: FooterContent;
}

const CONTACT_ICONS: Record<FooterContactItem["type"], LucideIcon> = {
  email: Mail,
  phone: Phone,
  address: MapPin,
};

export function Footer({ content: contentProp }: FooterProps) {
  const defaultContent = useFooterContent();
  const content = contentProp ?? defaultContent;
  const { t } = useTranslation("seo");
  const { formatNumber } = useNumberFormat();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0c1524] text-white">
      <Container size="wide" className="py-[72px]">
        <div className="sm:col-span-2 lg:col-span-4">
          <div className="flex items-center gap-3">
            <EditableImage
              contentId="shared.footer.logos.dot"
              src={content.logos.dot.src}
              alt={content.logos.dot.alt}
              className="h-9 w-auto object-contain brightness-0 invert sm:h-10"
            />
            <span className="h-7 w-px bg-white/20" aria-hidden />
            <EditableImage
              contentId="shared.footer.logos.saudi-made"
              src={content.logos.saudiMade.src}
              alt={content.logos.saudiMade.alt}
              className="h-8 w-auto object-contain sm:h-9"
            />
          </div>

          <p className="mt-5 max-w-sm text-[0.875rem] leading-relaxed text-white/68 sm:text-sm">
            <EditableText contentId="shared.footer.description">
              {content.description}
            </EditableText>
          </p>
        </div>

        <FooterLinkColumn
          title={content.quickLinks.title}
          items={content.quickLinks.items}
          className="mt-10 sm:mt-12"
        />

        <FooterLinkColumn
          title={content.services.title}
          items={content.services.items}
          className="mt-10 sm:mt-12"
        />

        <div className="mt-10 sm:mt-12">
          <FooterColumnTitle>{content.contact.title}</FooterColumnTitle>
          <ul className="mt-5 space-y-4">
            {content.contact.items.map((item) => {
              const Icon = CONTACT_ICONS[item.type] ?? Phone;
              const contentNode = (
                <>
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-white/10 text-[#F68E05]">
                    <Icon className="size-3.5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.6875rem] font-medium tracking-wide text-white/45 uppercase">
                      <EditableText
                        contentId={`shared.footer.contact.${item.type}.label`}
                      >
                        {item.label}
                      </EditableText>
                    </span>
                    <span className="mt-0.5 block text-[0.875rem] leading-relaxed text-white/78">
                      <FormattedNumericText value={item.value} />
                    </span>
                  </span>
                </>
              );

              return (
                <li key={`${item.type}-${item.label}`}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="group text-link-hover flex gap-3 hover:text-[#F68E05]"
                    >
                      {contentNode}
                    </a>
                  ) : (
                    <div className="flex gap-3">{contentNode}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:pt-7">
          <p className="text-[0.8125rem] text-white/55">
            &copy; {formatNumber(year)} {content.bottomBar.legalName}. {t("rightsReserved")}
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {content.bottomBar.legalLinks.map((item, index) => (
              <li key={`${item.href ?? item.label}-${index}`}>
                <FooterLink item={item} className="text-[0.8125rem]" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterLinkColumn({
  title,
  items,
  className,
}: {
  title: string;
  items: LinkItem[];
  className?: string;
}) {
  return (
    <div className={className}>
      <FooterColumnTitle>{title}</FooterColumnTitle>
      <ul className="mt-5 space-y-2.5">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            <FooterLink item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterColumnTitle({ children }: { children: ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-wide text-white">
        {children}
      </h2>
      <span className="mt-2 block h-px w-8 bg-[#F68E05]" aria-hidden />
    </div>
  );
}

function FooterLink({
  item,
  className,
}: {
  item: LinkItem;
  className?: string;
}) {
  const { openPreferences } = useCookieConsent();

  const linkClassName = cn(
    "text-link-hover text-[0.875rem] text-white/68 hover:text-[#F68E05]",
    className,
  );

  if (item.action === "cookie-preferences") {
    return (
      <button
        type="button"
        onClick={openPreferences}
        className={cn(linkClassName, "cursor-pointer bg-transparent text-left")}
      >
        {item.label}
      </button>
    );
  }

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {item.label}
      </a>
    );
  }

  if (!item.href) {
    return <span className={linkClassName}>{item.label}</span>;
  }

  return (
    <LocalizedLink to={item.href} className={linkClassName}>
      {item.label}
    </LocalizedLink>
  );
}
