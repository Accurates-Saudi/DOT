import type { ProductRecord } from "@/types";

import openholeHero from "@/assets/products/Openhole System/2-1.webp";
import openholeSpecification from "@/assets/products/Openhole System/specification.webp";

export const openholeSystem: ProductRecord = {
  id: "openhole-system",
  slug: "openhole-system",
  category: "Sand Control",
  name: "Openhole System",
  listingTeaser:
    "Profile wire screen completion for laminar flow in long horizontal wells.",
  introduction:
    "The DynamicLink Screen open hole system is a profile wire screen completion system, designed to achieve laminar flow conditions primarily in long horizontal wells.",
  image: {
    src: openholeHero,
    alt: "DynamicLink openhole screen system",
  },
  overview: [
    "The DynamicLink Screen open hole system is a profile wire screen completion system, designed to achieve laminar flow conditions primarily in long horizontal wells. The profile wire design helps maximize sand free production that resists damage and erosion for effective, long term sand control.",
    "The DynamicLink no base pipe screen is robust yet lightweight. It is suitable for high mechanical loads, short radius wellbores, and wells with high rate gas flow conditions. It can also be used with or instead of current completion systems.",
    "Whereas conventional sand screens are affected by high inflow velocity of gas or liquid, DynamicLink screens feature specially engineered profiles that force inflow to be distributed more uniformly over a longer length of screens compared with that of conventional screens. This reduces velocity and eliminates erosion hot spots through laminar flow regimes without the need to choke production.",
  ],
  applications: [
    "Onshore and offshore wells",
    "Stand-alone completions",
    "High rate gas environment",
    "Thermal applications, including heavy-oil and steam assisted wells",
  ],
  features: [
    "No base pipe — minimal flow restriction",
    "Robust design",
    "Suitability for short-radius well profiles",
    "Ability to clear and stimulate through entire joint",
  ],
  benefits: [
    "Higher reservoir drainage",
    "Longer laminar flow preventing erosion",
    "Longer well life and optimized production",
  ],
  specifications: {
    image: {
      src: openholeSpecification,
      alt: "Openhole System technical specification table",
    },
  },
};
