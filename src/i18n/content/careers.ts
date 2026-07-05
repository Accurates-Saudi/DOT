import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type { CareerJobDetail } from "@/types";

import { careerJobs } from "@/data/careers/jobs";

import { getMessagesSection } from "./helpers";

interface CareerJobTranslation {
  title?: string;
  department?: string;
  location?: string;
  employmentType?: string;
  experience?: string;
  overview?: string;
  responsibilities?: string[];
  requirements?: string[];
  preferredSkills?: string[];
  meta?: { title: string; description: string };
}

interface CareerJobsMessages {
  [slug: string]: CareerJobTranslation | undefined;
}

function applyCareerTranslation(
  job: CareerJobDetail,
  translation: CareerJobTranslation | undefined,
): CareerJobDetail {
  if (!translation) return job;

  return {
    ...job,
    title: translation.title ?? job.title,
    department: translation.department ?? job.department,
    location: translation.location ?? job.location,
    employmentType: translation.employmentType ?? job.employmentType,
    experience: translation.experience ?? job.experience,
    overview: translation.overview ?? job.overview,
    responsibilities: translation.responsibilities ?? job.responsibilities,
    requirements: translation.requirements ?? job.requirements,
    preferredSkills: translation.preferredSkills ?? job.preferredSkills,
    meta: translation.meta ?? job.meta,
  };
}

function getLocalizedJobs(messages: TranslationMessages): CareerJobDetail[] {
  const translations = getMessagesSection<CareerJobsMessages>(messages, "careerJobs");

  return careerJobs
    .map((job) =>
      applyCareerTranslation(job, translations[job.slug]),
    )
    .sort((a, b) => (a.listingOrder ?? 0) - (b.listingOrder ?? 0));
}

export function getLocalizedCareerJobs(
  messages: TranslationMessages,
  _locale: Locale,
): CareerJobDetail[] {
  return getLocalizedJobs(messages);
}

export function getLocalizedCareerJobBySlug(
  messages: TranslationMessages,
  slug: string,
): CareerJobDetail | undefined {
  return getLocalizedJobs(messages).find((job) => job.slug === slug);
}
