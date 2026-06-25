import type {
  CompanyOverviewFeature,
  CompanyOverviewStat,
  EngineeringManufacturingCapability,
} from "@/types";

export const aboutCompanyOverviewFeatures: Pick<
  CompanyOverviewFeature,
  "id" | "icon"
>[] = [
  { id: "saudi-made", icon: "saudi-made" },
  { id: "quality-driven", icon: "quality-driven" },
  { id: "client-focused", icon: "client-focused" },
  { id: "global-supply", icon: "global-supply" },
];

export const aboutCompanyOverviewStats: Pick<CompanyOverviewStat, "id" | "icon">[] =
  [
    { id: "experience", icon: "experience" },
    { id: "facility", icon: "facility" },
    { id: "professionals", icon: "professionals" },
    { id: "countries", icon: "countries" },
  ];

export const aboutCapabilitiesStructure: Pick<
  EngineeringManufacturingCapability,
  "id" | "icon"
>[] = [
  { id: "engineering-excellence", icon: "engineering" },
  { id: "advanced-manufacturing", icon: "manufacturing" },
  { id: "quality-assurance", icon: "quality" },
  { id: "continuous-innovation", icon: "innovation" },
];
