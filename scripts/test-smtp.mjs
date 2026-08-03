import "dotenv/config";
import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST;
const port = Number.parseInt(process.env.SMTP_PORT ?? "", 10);
const user = process.env.SMTP_USERNAME;
const pass = process.env.SMTP_PASSWORD;
const encryption = (process.env.SMTP_ENCRYPTION ?? "").toLowerCase();
const mailTo = process.env.MAIL_TO;

const missing = ["SMTP_HOST", "SMTP_PORT", "SMTP_USERNAME", "SMTP_PASSWORD", "MAIL_TO"].filter(
  (key) => !process.env[key]?.trim(),
);

if (missing.length > 0) {
  console.error(`Missing env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const secure = encryption === "ssl" || (!encryption && port === 465);

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  requireTLS: encryption === "tls",
  auth: { user, pass },
});

console.log(`Testing SMTP login for ${user} at ${host}:${port} (encryption: ${encryption || "auto"})...`);

try {
  await transporter.verify();
  console.log("LOGIN OK — SMTP AUTH succeeded.");
} catch (error) {
  console.error("LOGIN FAILED:", error.message);
  process.exit(1);
}

try {
  const info = await transporter.sendMail({
    from: user,
    to: mailTo,
    subject: "SMTP test email",
    text: "This is a test email sent by scripts/test-smtp.mjs to verify SMTP delivery.",
  });
  console.log(`SEND OK — message accepted for delivery to ${mailTo}.`);
  console.log(`Server response: ${info.response}`);
} catch (error) {
  console.error("SEND FAILED:", error.message);
  process.exit(1);
}
