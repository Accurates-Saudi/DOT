import { createHash, createHmac, randomBytes } from "node:crypto";

import { getCmsEnv } from "../env.server";

function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};

  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separatorIndex = part.indexOf("=");
        const key = separatorIndex >= 0 ? part.slice(0, separatorIndex) : part;
        const value = separatorIndex >= 0 ? part.slice(separatorIndex + 1) : "";
        return [key, decodeURIComponent(value)];
      }),
  );
}

function signValue(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function createSessionToken(): string {
  return randomBytes(32).toString("hex");
}

export function getSessionTokenFromRequest(request: Request): string | null {
  const { sessionCookieName, sessionSecret } = getCmsEnv();
  const cookies = parseCookies(request.headers.get("Cookie"));
  const value = cookies[sessionCookieName];

  if (!value) return null;

  const [token, signature] = value.split(".");
  if (!token || !signature) return null;

  const expectedSignature = signValue(token, sessionSecret);
  return signature === expectedSignature ? token : null;
}

export function createSessionCookie(token: string, expiresAt: Date): string {
  const { sessionCookieName, sessionSecret } = getCmsEnv();
  const signedValue = `${token}.${signValue(token, sessionSecret)}`;
  const cookie = [
    `${sessionCookieName}=${encodeURIComponent(signedValue)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    process.env.NODE_ENV === "production" ? "Secure" : "",
    `Expires=${expiresAt.toUTCString()}`,
  ]
    .filter(Boolean)
    .join("; ");

  return cookie;
}

export function destroySessionCookie(): string {
  const { sessionCookieName } = getCmsEnv();
  return [
    `${sessionCookieName}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    process.env.NODE_ENV === "production" ? "Secure" : "",
    "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    "Max-Age=0",
  ]
    .filter(Boolean)
    .join("; ");
}
