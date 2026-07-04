import type { ReactNode } from "react";

import type { Locale } from "@/i18n/config";
import { getDirection } from "@/i18n/utils";
import { I18nProvider } from "@/i18n/provider";
import type { TranslationMessages } from "@/i18n/types";

import arMessages from "@/i18n/locales/ar.json";
import enMessages from "@/i18n/locales/en.json";

const previewMessages: Record<Locale, TranslationMessages> = {
  en: enMessages as TranslationMessages,
  ar: arMessages as TranslationMessages,
};

interface AdminPreviewFrameProps {
  locale: Locale;
  children: ReactNode;
}

export function AdminPreviewFrame({ locale, children }: AdminPreviewFrameProps) {
  return (
    <I18nProvider locale={locale} messages={previewMessages[locale]}>
      <div
        dir={getDirection(locale)}
        className="admin-preview-frame min-h-full bg-white [&_a]:pointer-events-none [&_button]:pointer-events-none"
      >
        {children}
      </div>
    </I18nProvider>
  );
}
