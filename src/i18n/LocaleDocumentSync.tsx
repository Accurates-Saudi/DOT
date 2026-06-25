import { useLayoutEffect } from "react";

import { localeHtmlLang, type Locale } from "./config";
import { getDirection } from "./utils";

export function LocaleDocumentSync({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = localeHtmlLang[locale];
    root.dir = getDirection(locale);
    root.dataset.locale = locale;
  }, [locale]);

  return null;
}
