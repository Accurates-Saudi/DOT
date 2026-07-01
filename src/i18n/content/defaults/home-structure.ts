import type {
  AboutServiceItem,
  CertificateItem,
  CompanyStatisticItem,
  EngineeringCapabilityStep,
  ServiceItem,
} from "@/types";

/** Non-translatable home page structure merged with locale message text. */
export const homeAboutMedia = {
  videoId: "yarNwqOcXKU",
  showPlayButton: true,
} as const;

export const homeAboutServiceIcons: Pick<AboutServiceItem, "icon">[] = [
  { icon: "maintenance" },
  { icon: "petroleum" },
  { icon: "engineering" },
  { icon: "plant" },
];

export const homeServiceItemsStructure: Pick<ServiceItem, "id" | "icon">[] = [
  { id: "oil-gas-equipment", icon: "oil-gas" },
  { id: "process-industry-screens", icon: "process" },
  { id: "downhole-screens", icon: "downhole" },
  { id: "screen-baskets-strainers", icon: "strainers" },
];

export const homeCompanyStatisticsStructure: Pick<
  CompanyStatisticItem,
  "id" | "icon"
>[] = [
  { id: "years-experience", icon: "experience" },
  { id: "projects-completed", icon: "projects" },
  { id: "clients-worldwide", icon: "clients" },
];

export const homeEngineeringStepIcons: Pick<
  EngineeringCapabilityStep,
  "icon"
>[] = [{ icon: "modeling" }, { icon: "cnc" }];

export const homeCertificateIds: Pick<CertificateItem, "id">[] = [
  { id: "voestalpine-vagt-vasuperior" },
  { id: "postle-hardbanding-level-1" },
  { id: "dpmaster-qualification" },
  { id: "iso-9001-2015" },
  { id: "iso-45001-2018" },
  { id: "saudi-aramco-supplier" },
];

export const homeTimingDefaults = {
  heroIntervalMs: 7000,
  featuredProductsAutoplayDelayMs: 2500,
  featuredProductsTransitionMs: 700,
  certificatesAutoplayDelayMs: 2000,
  certificatesTransitionMs: 800,
} as const;

export const homeStatisticsObjectPosition = "center center" as const;

export const homeHeroObjectPositions = [
  { objectPosition: "center center", mobileObjectPosition: "72% center" },
  { objectPosition: "center center", mobileObjectPosition: "center center" },
] as const;
