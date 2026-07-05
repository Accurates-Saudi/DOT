import type { ImageAsset } from "@/types";

import careerDetailHeroImage from "@/assets/engineering/cnc.png";

export const defaultCareerDetailHeroImage = careerDetailHeroImage;

export const DEFAULT_CAREER_DETAIL_HERO: ImageAsset = {
  src: defaultCareerDetailHeroImage,
  alt: "Dynamic Oil Tools manufacturing and engineering",
};

export function resolveCareerDetailHeroImage(job: {
  title?: string;
  heroImage?: ImageAsset;
}): ImageAsset {
  if (job.heroImage?.src?.trim()) {
    return {
      src: job.heroImage.src,
      alt: job.heroImage.alt?.trim() || job.title || DEFAULT_CAREER_DETAIL_HERO.alt,
    };
  }

  return {
    src: DEFAULT_CAREER_DETAIL_HERO.src,
    alt: job.title || DEFAULT_CAREER_DETAIL_HERO.alt,
  };
}

export function isUsingDefaultCareerDetailHero(job: { heroImage?: ImageAsset }): boolean {
  return !job.heroImage?.src?.trim();
}
