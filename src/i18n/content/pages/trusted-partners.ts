import type { TranslationMessages } from "@/i18n/types";
import type { TrustedPartnersSectionContent } from "@/types";

import { clientLogos } from "../assets/trusted-partners";
import {
  trustedPartnerLogoIds,
  trustedPartnersMarqueeDurationMs,
} from "../defaults/trusted-partners-structure";
import { getMessagesSection, mergeIndexed } from "../helpers";

export function buildTrustedPartnersContent(
  messages: TranslationMessages,
): TrustedPartnersSectionContent {
  const trustedPartners = getMessagesSection<TrustedPartnersSectionContent>(
    messages,
    "trustedPartners",
  );

  return {
    ...trustedPartners,
    marqueeDurationMs:
      trustedPartners.marqueeDurationMs ?? trustedPartnersMarqueeDurationMs,
    logos: mergeIndexed(trustedPartners.logos, trustedPartnerLogoIds).map(
      (logo, index) => ({
        ...logo,
        logo: {
          ...logo.logo,
          src: clientLogos[index] ?? clientLogos[0],
        },
      }),
    ),
  };
}
