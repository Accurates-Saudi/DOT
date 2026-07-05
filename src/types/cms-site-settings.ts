import type { ImageAsset, SiteSettings } from "@/types";

export interface CmsSiteSettingsPayload extends SiteSettings {
  logos: {
    dot: ImageAsset;
    saudiMade: ImageAsset;
  };
}
