import type { FeedbackInput, FeedbackResponse } from "./types";

export async function submitFeedback(
  payload: FeedbackInput,
): Promise<FeedbackResponse> {
  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return (await response.json()) as FeedbackResponse;
  } catch {
    throw new Error("network_error");
  }
}
