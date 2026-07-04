import { buildContactPageContent } from "@/i18n/content/pages/contact";
import type { ContactPageContent } from "@/types";
import { toCmsSource } from "@/utils/cms-content";

import { localeContentMessages } from "../shared";

export const contactContentSource = toCmsSource<ContactPageContent>(
  buildContactPageContent(localeContentMessages.en, "en"),
  buildContactPageContent(localeContentMessages.ar, "ar"),
  ["contact"],
);
