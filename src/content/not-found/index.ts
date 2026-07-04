import { buildNotFoundPageContent } from "@/i18n/content/pages/not-found";
import type { NotFoundPageContent } from "@/types";
import { toCmsSource } from "@/utils/cms-content";

import { localeContentMessages } from "../shared";

export const notFoundContentSource = toCmsSource<NotFoundPageContent>(
  buildNotFoundPageContent(localeContentMessages.en, "en"),
  buildNotFoundPageContent(localeContentMessages.ar, "ar"),
  ["not-found"],
);
