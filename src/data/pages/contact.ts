import type { ContactPageContent } from "@/types";

import { siteSettings } from "@/data/site";

const { contact } = siteSettings;

export const contactPageContent: ContactPageContent = {
  meta: {
    title: "Contact",
    description:
      "Get in touch with Dynamic Oil Tools for engineering support, product inquiries, and partnership opportunities.",
  },
  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Contact Us" },
    ],
    label: "Contact Us",
    title: "Get in Touch",
    introduction:
      "Reach out to our engineering and manufacturing team for product inquiries, technical support, and partnership opportunities.",
  },
  main: {
    info: {
      label: "Company Information",
      heading: "How to Reach Us",
      items: [
        {
          id: "phone",
          type: "phone",
          label: "Phone Number",
          value: contact.phone,
          href: `tel:${contact.phone.replace(/\s/g, "")}`,
        },
        {
          id: "email",
          type: "email",
          label: "Email Address",
          value: contact.email,
          href: `mailto:${contact.email}`,
        },
        {
          id: "address",
          type: "address",
          label: "Office Location",
          value: `${contact.address}, ${contact.city}, ${contact.country}`,
        },
        {
          id: "hours",
          type: "hours",
          label: "Working Hours",
          value: "Sunday – Thursday: 8:00 AM – 5:00 PM",
        },
      ],
    },
    form: {
      heading: "Send an Inquiry",
      description:
        "Complete the form below and our team will respond to your request promptly.",
      fields: {
        name: "Name",
        company: "Company Name",
        email: "Email",
        phone: "Phone",
        subject: "Subject",
        message: "Message",
      },
      placeholders: {
        name: "Your full name",
        company: "Company or organization",
        email: "you@company.com",
        phone: "+966 XX XXX XXXX",
        subject: "Brief subject line",
        message: "Describe your inquiry or project requirements",
      },
      submitLabel: "Send Inquiry",
    },
  },
  location: {
    label: "Our Location",
    heading: "Visit Our Facility",
    address: `${contact.address}, ${contact.city}, ${contact.country}`,
    mapPlaceholderLabel: "Google Maps embed",
    mapEmbedUrl:
      "https://www.google.com/maps?q=25.9235182,49.9488192&hl=en&z=17&output=embed",
  },
  engineeringCta: {
    heading: "Need Technical Support?",
    body: "Our engineering team is ready to assist with product selection, specifications, and custom solutions.",
    ctaPrimary: { label: "Contact Our Team", href: "#contact-form" },
  },
};

export const contactPageMeta = contactPageContent.meta;
