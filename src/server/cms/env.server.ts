import path from "node:path";

function resolveStoragePath(input: string | undefined): string {
  const fallback = path.resolve(process.cwd(), "storage/cms-media");
  if (!input) return fallback;
  return path.isAbsolute(input) ? input : path.resolve(process.cwd(), input);
}

function getS3Config():
  | {
      accessKeyId: string;
      secretAccessKey: string;
      bucketName: string;
      region: string;
    }
  | undefined {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim();
  const bucketName = process.env.AWS_S3_BUCKET_NAME?.trim();
  const region = process.env.AWS_REGION?.trim();

  if (!accessKeyId || !secretAccessKey || !bucketName || !region) {
    return undefined;
  }

  return {
    accessKeyId,
    secretAccessKey,
    bucketName,
    region,
  };
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
    s3: getS3Config(),
  };
}
