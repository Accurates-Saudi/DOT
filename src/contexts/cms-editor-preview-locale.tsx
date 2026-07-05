import { createContext, useContext, type ReactNode } from "react";

import type { Locale } from "@/i18n/config";

const CmsEditorPreviewLocaleContext = createContext<Locale | null>(null);

export function CmsEditorPreviewLocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <CmsEditorPreviewLocaleContext.Provider value={locale}>
      {children}
    </CmsEditorPreviewLocaleContext.Provider>
  );
}

export function useCmsEditorPreviewLocale(): Locale | null {
  return useContext(CmsEditorPreviewLocaleContext);
}
