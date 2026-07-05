import { buildCareersPageContent } from "@/i18n/content/pages/careers";
import {
  getLocalizedCareerJobBySlug,
  getLocalizedCareerJobs,
} from "@/i18n/content/careers";
import type { CareerJobDetail, CareersPageContent } from "@/types";
import { toCmsSource } from "@/utils/cms-content";

import { localeContentMessages } from "../shared";

const jobSlugs = getLocalizedCareerJobs(localeContentMessages.en, "en").map(
  (job) => job.slug,
);

function getLocalizedJobByLocale(
  slug: string,
  locale: "en" | "ar",
): CareerJobDetail {
  const messages =
    locale === "en" ? localeContentMessages.en : localeContentMessages.ar;
  const job = getLocalizedCareerJobBySlug(messages, slug);

  if (!job) {
    throw new Error(`[content] Missing localized career job for "${slug}".`);
  }

  return job;
}

export const careersPageContentSource = toCmsSource<CareersPageContent>(
  buildCareersPageContent(localeContentMessages.en, "en"),
  buildCareersPageContent(localeContentMessages.ar, "ar"),
  ["careers", "page"],
);

export const careerJobsContentSource = toCmsSource<CareerJobDetail[]>(
  jobSlugs.map((slug) => getLocalizedJobByLocale(slug, "en")),
  jobSlugs.map((slug) => getLocalizedJobByLocale(slug, "ar")),
  ["careers", "jobs"],
);
