import type {
  ContactInquiryInput,
  ContactInquiryResponse,
} from "./types";

export async function submitContactInquiry(
  payload: ContactInquiryInput,
): Promise<ContactInquiryResponse> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const body = (await response.json()) as ContactInquiryResponse;
    return body;
  } catch {
    throw new Error("network_error");
  }
}
