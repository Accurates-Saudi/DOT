import { siteSettings, seoDefaults } from "@/data/site";
import { toAbsoluteUrl } from "@/i18n/seo";

export function buildOrganizationJsonLd() {
  const { contact, social } = siteSettings;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSettings.companyName,
    legalName: siteSettings.legalName,
    url: seoDefaults.siteUrl,
    logo: toAbsoluteUrl("/favicon.png"),
    description: siteSettings.description,
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: contact.city,
      addressCountry: contact.country,
    },
    sameAs: social.linkedin ? [social.linkedin] : [],
  };
}
