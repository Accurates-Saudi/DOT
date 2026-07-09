import "dotenv/config";

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  inquiryTo: string;
  feedbackTo: string;
}

const REQUIRED_SMTP_ENV_KEYS = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
  "CONTACT_INQUIRY_TO",
] as const;

export function getMissingSmtpEnvKeys(): string[] {
  return REQUIRED_SMTP_ENV_KEYS.filter((key) => !process.env[key]?.trim());
}

export function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const portValue = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.SMTP_FROM?.trim();
  const inquiryTo = process.env.CONTACT_INQUIRY_TO?.trim();
  const feedbackTo =
    process.env.CONTACT_FEEDBACK_TO?.trim() || inquiryTo;

  if (!host || !portValue || !user || !pass || !from || !inquiryTo) {
    return null;
  }

  const port = Number.parseInt(portValue, 10);
  if (!Number.isFinite(port) || port <= 0) {
    return null;
  }

  const secure =
    process.env.SMTP_SECURE?.trim().toLowerCase() === "true" || port === 465;

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
    inquiryTo,
    feedbackTo: feedbackTo ?? inquiryTo,
  };
}

export function getSmtpConfigurationError(): string | null {
  const missingKeys = getMissingSmtpEnvKeys();
  if (missingKeys.length > 0) {
    return `SMTP is not configured. Missing environment variables: ${missingKeys.join(", ")}.`;
  }

  const portValue = process.env.SMTP_PORT?.trim();
  const port = Number.parseInt(portValue ?? "", 10);
  if (!Number.isFinite(port) || port <= 0) {
    return "SMTP is not configured. SMTP_PORT must be a valid port number.";
  }

  return null;
}
