import { buildAboutPageContent } from "@/i18n/content/pages/about";
import type { AboutPageContent } from "@/types";
import { toCmsSource } from "@/utils/cms-content";

import { localeContentMessages } from "../shared";

export const aboutContentSource = toCmsSource<AboutPageContent>(
  buildAboutPageContent(localeContentMessages.en, "en"),
  buildAboutPageContent(localeContentMessages.ar, "ar"),
  ["about"],
);
