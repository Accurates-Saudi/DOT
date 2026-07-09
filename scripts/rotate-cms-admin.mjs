/**
 * Rotates the sole CMS administrator account with new strong random credentials.
 *
 * Usage:
 *   node scripts/rotate-cms-admin.mjs
 *
 * Optional env:
 *   CMS_INITIAL_ADMIN_EMAIL  (default: cms-admin@dynamicoiltools.com)
 *   CMS_INITIAL_ADMIN_NAME   (default: DOT CMS Administrator)
 *
 * Writes credentials once to storage/cms-initial-credentials.txt (gitignored).
 */
import "dotenv/config";
import { randomBytes, scryptSync } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const SCRYPT_KEY_LENGTH = 64;
const PASSWORD_LENGTH = 28;

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, SCRYPT_KEY_LENGTH).toString("hex");
  return `${salt}:${derivedKey}`;
}

function generatePassword(length = PASSWORD_LENGTH) {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghijkmnopqrstuvwxyz";
  const digits = "23456789";
  const symbols = "!@#$%&*-_";
  const all = upper + lower + digits + symbols;
  const bytes = randomBytes(length + 8);

  const required = [
    upper[bytes[0] % upper.length],
    lower[bytes[1] % lower.length],
    digits[bytes[2] % digits.length],
    symbols[bytes[3] % symbols.length],
  ];

  const rest = Array.from({ length: length - required.length }, (_, index) => {
    return all[bytes[index + 4] % all.length];
  });

  const chars = [...required, ...rest];
  for (let index = chars.length - 1; index > 0; index -= 1) {
    const swapIndex = bytes[index + 4] % (index + 1);
    [chars[index], chars[swapIndex]] = [chars[swapIndex], chars[index]];
  }

  return chars.join("");
}

function generateLoginId() {
  return randomBytes(4).toString("hex");
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required.");
  }

  const email = (
    process.env.CMS_INITIAL_ADMIN_EMAIL ?? "cms-admin@dynamicoiltools.com"
  )
    .trim()
    .toLowerCase();
  const name = (process.env.CMS_INITIAL_ADMIN_NAME ?? "DOT CMS Administrator").trim();
  const password = generatePassword();
  const passwordHash = hashPassword(password);
  const loginId = generateLoginId();

  const client = new pg.Client({ connectionString });
  await client.connect();

  try {
    await client.query("BEGIN");

    const existing = await client.query(
      `SELECT id, email, name, role FROM "CmsUser" ORDER BY "createdAt" ASC`,
    );

    await client.query(`DELETE FROM "CmsSession"`);
    const deleted = await client.query(`DELETE FROM "CmsUser"`);

    await client.query(
      `INSERT INTO "CmsUser" (id, email, "passwordHash", name, role, "isActive", "mustChangePassword", "createdAt", "updatedAt")
       VALUES (gen_random_uuid()::text, $1, $2, $3, 'ADMIN', true, true, NOW(), NOW())`,
      [email, passwordHash, name],
    );

    await client.query("COMMIT");

    const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
    const credentialsPath = path.join(rootDir, "storage", "cms-initial-credentials.txt");
    await mkdir(path.dirname(credentialsPath), { recursive: true });

    const issuedAt = new Date().toISOString();
    const credentialsBody = [
      "DOT CMS — Initial Administrator Credentials",
      "============================================",
      `Issued: ${issuedAt}`,
      `Login ID: ${loginId}`,
      "",
      `Email:    ${email}`,
      `Password: ${password}`,
      "",
      "Store these credentials in your team password manager.",
      "Delete this file after saving them securely.",
      "",
      `Previous accounts removed: ${deleted.rowCount}`,
      ...(existing.rows.length
        ? ["Removed emails:", ...existing.rows.map((row) => `- ${row.email} (${row.role})`)]
        : ["No previous CMS users were found."]),
      "",
    ].join("\n");

    await writeFile(credentialsPath, credentialsBody, { encoding: "utf8", mode: 0o600 });

    console.log("CMS administrator rotated successfully.");
    console.log("");
    console.log(credentialsBody);
    console.log(`Saved to: ${credentialsPath}`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
