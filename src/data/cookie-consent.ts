import type { CookieCategoryDefinition } from "@/types/cookie-consent";

export const cookieConsentCopy = {
  banner: {
    title: "We value your privacy",
    description:
      "We use cookies to improve your experience, analyze site traffic, and support our marketing efforts. You can accept all cookies, reject non-essential cookies, or customize your preferences.",
    acceptAll: "Accept All",
    rejectNonEssential: "Reject Non-Essential",
    customize: "Customize Preferences",
  },
  modal: {
    title: "Cookie Preferences",
    description:
      "Manage how Dynamic Oil Tools uses cookies and similar technologies. Necessary cookies are always active because they are required for the website to function.",
    save: "Save Preferences",
    acceptAll: "Accept All",
    rejectNonEssential: "Reject Non-Essential",
  },
} as const;

export const cookieCategoryDefinitions: CookieCategoryDefinition[] = [
  {
    id: "necessary",
    label: "Necessary",
    description:
      "Required for core site functionality such as security, network management, and accessibility. These cannot be disabled.",
    required: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    description:
      "Help us understand how visitors interact with our website so we can improve performance and content.",
  },
  {
    id: "marketing",
    label: "Marketing",
    description:
      "Used to deliver relevant advertisements and measure the effectiveness of our marketing campaigns.",
  },
  {
    id: "preferences",
    label: "Preferences",
    description:
      "Remember your settings and choices to provide a more personalized experience on future visits.",
  },
];
