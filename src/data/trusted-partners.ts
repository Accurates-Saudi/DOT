import type { TrustedPartnersSectionContent } from "@/types";

import client01 from "@/assets/clients/client-01.svg";
import client02 from "@/assets/clients/client-02.svg";
import client03 from "@/assets/clients/client-03.svg";
import client04 from "@/assets/clients/client-04.svg";
import client05 from "@/assets/clients/client-05.svg";
import client06 from "@/assets/clients/client-06.svg";
import client07 from "@/assets/clients/client-07.svg";
import client08 from "@/assets/clients/client-08.svg";

export const trustedPartnersContent: TrustedPartnersSectionContent = {
  label: "Trusted Worldwide",
  heading: "Trusted by Industry Leaders",
  description:
    "Engineering precision. Manufacturing excellence. Delivering reliable oilfield solutions for clients across multiple industries and international markets.",
  marqueeDurationMs: 48000,
  logos: [
    {
      id: "apex-energy",
      name: "Apex Energy",
      logo: { src: client01, alt: "Apex Energy" },
    },
    {
      id: "gulf-industrial",
      name: "Gulf Industrial",
      logo: { src: client02, alt: "Gulf Industrial" },
    },
    {
      id: "petroline",
      name: "Petroline",
      logo: { src: client03, alt: "Petroline" },
    },
    {
      id: "meridian-drilling",
      name: "Meridian Drilling",
      logo: { src: client04, alt: "Meridian Drilling" },
    },
    {
      id: "orinoco-fields",
      name: "Orinoco Fields",
      logo: { src: client05, alt: "Orinoco Fields" },
    },
    {
      id: "steel-basin",
      name: "Steel Basin Co.",
      logo: { src: client06, alt: "Steel Basin Co." },
    },
    {
      id: "horizon-petroleum",
      name: "Horizon Petroleum",
      logo: { src: client07, alt: "Horizon Petroleum" },
    },
    {
      id: "titan-well",
      name: "Titan Well Services",
      logo: { src: client08, alt: "Titan Well Services" },
    },
  ],
};
