import type { ContactInfoItem } from "@/types";

export const contactInfoItemsStructure: Pick<ContactInfoItem, "id" | "type">[] = [
  { id: "phone", type: "phone" },
  { id: "email", type: "email" },
  { id: "address", type: "address" },
  { id: "hours", type: "hours" },
];
