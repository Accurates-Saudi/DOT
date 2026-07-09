import nodemailer from "nodemailer";

import type { SanitizedContactInquiry } from "@/lib/contact/types";
import type { SanitizedFeedback } from "@/lib/feedback/types";
import { getSmtpConfig, getSmtpConfigurationError } from "./env.server";

export class EmailConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailConfigurationError";
  }
}

export class EmailDeliveryError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "EmailDeliveryError";
  }
}

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildInquiryEmail(inquiry: SanitizedContactInquiry) {
  const subject = sanitizeHeaderValue(
    `DOT Website Inquiry: ${inquiry.subject}`,
  );
  const replyTo = sanitizeHeaderValue(inquiry.email);

  const text = [
    "New contact inquiry from the DOT website",
    "",
    `Name: ${inquiry.name}`,
    `Company: ${inquiry.company || "—"}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || "—"}`,
    `Subject: ${inquiry.subject}`,
    inquiry.locale ? `Locale: ${inquiry.locale}` : null,
    "",
    "Message:",
    inquiry.message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0c1524; line-height: 1.6;">
      <h2 style="margin: 0 0 16px; color: #0c1524;">New Contact Inquiry</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tbody>
          <tr><td style="padding: 8px 0; font-weight: 700;">Name</td><td style="padding: 8px 0;">${escapeHtml(inquiry.name)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Company</td><td style="padding: 8px 0;">${escapeHtml(inquiry.company || "—")}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Email</td><td style="padding: 8px 0;">${escapeHtml(inquiry.email)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Phone</td><td style="padding: 8px 0;">${escapeHtml(inquiry.phone || "—")}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Subject</td><td style="padding: 8px 0;">${escapeHtml(inquiry.subject)}</td></tr>
          ${
            inquiry.locale
              ? `<tr><td style="padding: 8px 0; font-weight: 700;">Locale</td><td style="padding: 8px 0;">${escapeHtml(inquiry.locale)}</td></tr>`
              : ""
          }
        </tbody>
      </table>
      <p style="margin: 24px 0 8px; font-weight: 700;">Message</p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(inquiry.message)}</p>
    </div>
  `;

  return { subject, replyTo, text, html };
}

function formatFeedbackCategory(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function buildFeedbackEmail(feedback: SanitizedFeedback) {
  const subject = sanitizeHeaderValue(
    `DOT Website Feedback: ${formatFeedbackCategory(feedback.category)}`,
  );
  const replyTo = sanitizeHeaderValue(feedback.email);
  const ratingLabel = feedback.rating ? `${feedback.rating}/5` : "Not provided";

  const text = [
    "New website feedback from Dynamic Oil Tools",
    "",
    `Name: ${feedback.name}`,
    `Email: ${feedback.email}`,
    `Category: ${formatFeedbackCategory(feedback.category)}`,
    `Rating: ${ratingLabel}`,
    feedback.locale ? `Locale: ${feedback.locale}` : null,
    "",
    "Feedback:",
    feedback.message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0c1524; line-height: 1.6;">
      <h2 style="margin: 0 0 16px; color: #0c1524;">New Website Feedback</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tbody>
          <tr><td style="padding: 8px 0; font-weight: 700;">Name</td><td style="padding: 8px 0;">${escapeHtml(feedback.name)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Email</td><td style="padding: 8px 0;">${escapeHtml(feedback.email)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Category</td><td style="padding: 8px 0;">${escapeHtml(formatFeedbackCategory(feedback.category))}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Rating</td><td style="padding: 8px 0;">${escapeHtml(ratingLabel)}</td></tr>
          ${
            feedback.locale
              ? `<tr><td style="padding: 8px 0; font-weight: 700;">Locale</td><td style="padding: 8px 0;">${escapeHtml(feedback.locale)}</td></tr>`
              : ""
          }
        </tbody>
      </table>
      <p style="margin: 24px 0 8px; font-weight: 700;">Feedback</p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(feedback.message)}</p>
    </div>
  `;

  return { subject, replyTo, text, html };
}

export async function sendContactInquiryEmail(
  inquiry: SanitizedContactInquiry,
): Promise<void> {
  const configurationError = getSmtpConfigurationError();
  if (configurationError) {
    throw new EmailConfigurationError(configurationError);
  }

  const smtpConfig = getSmtpConfig();
  if (!smtpConfig) {
    throw new EmailConfigurationError(
      "SMTP is not configured. Contact form email delivery is unavailable.",
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });

  const email = buildInquiryEmail(inquiry);

  try {
    await transporter.sendMail({
      from: smtpConfig.from,
      to: smtpConfig.inquiryTo,
      replyTo: email.replyTo,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });
  } catch (error) {
    throw new EmailDeliveryError("Failed to send contact inquiry email.", {
      cause: error,
    });
  }
}

export async function sendFeedbackEmail(feedback: SanitizedFeedback): Promise<void> {
  const configurationError = getSmtpConfigurationError();
  if (configurationError) {
    throw new EmailConfigurationError(configurationError);
  }

  const smtpConfig = getSmtpConfig();
  if (!smtpConfig) {
    throw new EmailConfigurationError(
      "SMTP is not configured. Feedback email delivery is unavailable.",
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });

  const email = buildFeedbackEmail(feedback);

  try {
    await transporter.sendMail({
      from: smtpConfig.from,
      to: smtpConfig.feedbackTo,
      replyTo: email.replyTo,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });
  } catch (error) {
    throw new EmailDeliveryError("Failed to send feedback email.", {
      cause: error,
    });
  }
}
