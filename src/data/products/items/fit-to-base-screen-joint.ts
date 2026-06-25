import type { ProductRecord } from "@/types";

import fitToBaseHero from "@/assets/products/Fit To Base Screen Joint with Passive or Active Control Device/1-1.webp";

export const fitToBaseScreenJoint: ProductRecord = {
  id: "fit-to-base-screen-joint",
  slug: "fit-to-base-screen-joint",
  category: "Flow Control",
  name: "Fit To Base Screen Joint with Passive or Active Control Device",
  listingTeaser:
    "Screen joint with passive or active flow control integrated on the basepipe.",
  introduction:
    "The basepipe is machined to accommodate different kinds of active or passive flow control valves, with the screen wrapped to client specifications directly on the pipe.",
  image: {
    src: fitToBaseHero,
    alt: "Fit to base screen joint with flow control device",
  },
  overview: [
    "The basepipe is machined to accommodate different kinds of active or passive flow control valves.",
    "The screen is then wrapped as per client specifications directly on the pipe.",
    "Rings and covers are manufactured with high precision as per client request, then assembled and welded into the basepipe.",
  ],
  applications: [
    "Suitable for flow control applications with or without sand control",
    "Suitable for vertical, deviated and horizontal completions",
  ],
  features: [
    "No elastomers, all-welded construction",
    "Simple construction",
    "Robust design",
  ],
  benefits: [
    "Installations with flow control devices",
    "Optimized flow performance into the basepipe",
    "Control of unwanted water and gas production",
    "Can be re-configured to fit other applications",
  ],
};
