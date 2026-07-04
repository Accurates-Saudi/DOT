export class CmsHttpError extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "CmsHttpError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function jsonResponse<T>(body: T, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(init?.headers ?? {}),
    },
  });
}

export async function readJsonBody<T>(request: Request): Promise<T> {
  const contentType = request.headers.get("Content-Type") ?? "";

  if (!contentType.includes("application/json")) {
    throw new CmsHttpError(415, "unsupported_media_type", "Expected JSON request body.");
  }

  try {
    return (await request.json()) as T;
  } catch (error) {
    throw new CmsHttpError(400, "invalid_json", "Request body is not valid JSON.", {
      cause: error instanceof Error ? error.message : String(error),
    });
  }
}

export function assertMethod(
  request: Request,
  allowed: readonly string[],
): void {
  if (!allowed.includes(request.method.toUpperCase())) {
    throw new CmsHttpError(
      405,
      "method_not_allowed",
      `Expected one of: ${allowed.join(", ")}.`,
    );
  }
}

export function toErrorResponse(error: unknown): Response {
  if (error instanceof CmsHttpError) {
    return jsonResponse(
      {
        error: {
          code: error.code,
          message: error.message,
          ...(error.details !== undefined ? { details: error.details } : {}),
        },
      },
      { status: error.status },
    );
  }

  if (error instanceof Response) {
    return error;
  }

  return jsonResponse(
    {
      error: {
        code: "internal_error",
        message: error instanceof Error ? error.message : "Unexpected CMS server error.",
      },
    },
    { status: 500 },
  );
}
