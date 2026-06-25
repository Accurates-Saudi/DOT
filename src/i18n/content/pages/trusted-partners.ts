import type { TranslationMessages } from "@/i18n/types";
import type { TrustedPartnersSectionContent } from "@/types";

import { clientLogos } from "../assets/trusted-partners";
import { getMessagesSection } from "../helpers";

export function buildTrustedPartnersContent(
  messages: TranslationMessages,
): TrustedPartnersSectionContent {
  const trustedPartners = getMessagesSection<TrustedPartnersSectionContent>(
    messages,
    "trustedPartners",
  );

  return {
    ...trustedPartners,
    logos: trustedPartners.logos.map((logo, index) => ({
      ...logo,
      logo: {
        ...logo.logo,
        src: clientLogos[index] ?? clientLogos[0],
      },
    })),
  };
}
