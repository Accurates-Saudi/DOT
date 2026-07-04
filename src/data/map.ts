import type { MapLocationContent } from "@/types";
import enMessagesJson from "@/i18n/locales/en.json";

const enMessages = enMessagesJson as {
  map: MapLocationContent;
};

export const dotMapLocation: MapLocationContent = enMessages.map;
