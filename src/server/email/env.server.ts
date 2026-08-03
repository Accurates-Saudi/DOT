import "dotenv/config";

export interface EmailDeliveryConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  from: string;
  mailTo: string;
}

const REQUIRED_EMAIL_ENV_KEYS = [
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_REGION",
  "MAIL_FROM",
  "MAIL_TO",
] as const;

export function getMissingEmailEnvKeys(): string[] {
  return REQUIRED_EMAIL_ENV_KEYS.filter((key) => !process.env[key]?.trim());
}

export function getEmailDeliveryConfig(): EmailDeliveryConfig | null {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim();
  const region = process.env.AWS_SES_REGION?.trim() || process.env.AWS_REGION?.trim();
  const from = process.env.MAIL_FROM?.trim();
  const mailTo = process.env.MAIL_TO?.trim();

  if (!accessKeyId || !secretAccessKey || !region || !from || !mailTo) {
    return null;
  }

  return {
    accessKeyId,
    secretAccessKey,
    region,
    from,
    mailTo,
  };
}

export function getEmailConfigurationError(): string | null {
  const missingKeys = getMissingEmailEnvKeys();
  if (missingKeys.length > 0) {
    return `Email delivery is not configured. Missing environment variables: ${missingKeys.join(", ")}.`;
  }

  return null;
}
