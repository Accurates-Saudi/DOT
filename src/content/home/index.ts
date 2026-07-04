import { buildHomePageContent } from "@/i18n/content/pages/home";
import type { HomePageContent } from "@/types";
import { toCmsSource } from "@/utils/cms-content";

import { localeContentMessages } from "../shared";

export const homeContentSource = toCmsSource<HomePageContent>(
  buildHomePageContent(localeContentMessages.en, "en"),
  buildHomePageContent(localeContentMessages.ar, "ar"),
  ["home"],
);
