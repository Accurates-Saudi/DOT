import path from "node:path";

function resolveStoragePath(input: string | undefined): string {
  const fallback = path.resolve(process.cwd(), "storage/cms-media");
  if (!input) return fallback;
  return path.isAbsolute(input) ? input : path.resolve(process.cwd(), input);
}

export function getCmsEnv() {
  const sessionSecret = process.env.CMS_SESSION_SECRET;

  if (!sessionSecret && process.env.NODE_ENV === "production") {
    throw new Error("CMS_SESSION_SECRET is required in production.");
  }

  return {
    sessionCookieName: "cms_session",
    sessionSecret: sessionSecret ?? "dev-only-cms-session-secret",
    mediaStoragePath: resolveStoragePath(process.env.CMS_MEDIA_STORAGE_PATH),
  };
}
