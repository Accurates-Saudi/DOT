import { buildCatalogsPageContent } from "@/i18n/content/pages/catalogs";
import type { CatalogsPageContent } from "@/types";
import { toCmsSource } from "@/utils/cms-content";

import { localeContentMessages } from "../shared";

export const catalogsContentSource = toCmsSource<CatalogsPageContent>(
  buildCatalogsPageContent(localeContentMessages.en, "en"),
  buildCatalogsPageContent(localeContentMessages.ar, "ar"),
  ["catalogs"],
);
