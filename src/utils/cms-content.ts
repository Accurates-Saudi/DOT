import type { Locale } from "@/i18n/config";
import { registerMedia, resolveMedia } from "@/media/registry";
import type {
  CmsSource,
  LinkReference,
  LocalizedValue,
  MediaReference,
} from "@/types/cms-content";
import type { ImageAsset } from "@/types/content";

type Primitive = string | number | boolean | null | undefined;
type UnknownRecord = Record<string, unknown>;

function isPlainObject(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isImageAsset(value: unknown): value is ImageAsset {
  return (
    isPlainObject(value) &&
    typeof value.src === "string" &&
    typeof value.alt === "string"
  );
}

function isLinkLike(value: unknown): value is {
  label: string;
  href?: string;
  external?: boolean;
  action?: string;
} {
  const allowedKeys = new Set(["label", "href", "external", "action"]);

  return (
    isPlainObject(value) &&
    typeof value.label === "string" &&
    ("href" in value || "external" in value || "action" in value) &&
    Object.keys(value).every((key) => allowedKeys.has(key))
  );
}

function isLocalizedValue(value: unknown): value is LocalizedValue<unknown> {
  return (
    isPlainObject(value) &&
    Object.keys(value).length === 2 &&
    "en" in value &&
    "ar" in value
  );
}

function isMediaReference(value: unknown): value is MediaReference {
  return (
    isPlainObject(value) &&
    typeof value.id === "string" &&
    isLocalizedValue(value.alt)
  );
}

function isLinkReference(value: unknown): value is LinkReference {
  const allowedKeys = new Set(["label", "href", "external", "action"]);

  return (
    isPlainObject(value) &&
    isLocalizedValue(value.label) &&
    ("href" in value || "external" in value || "action" in value) &&
    Object.keys(value).every((key) => allowedKeys.has(key))
  );
}

function createLocalizedValue<T>(en: T, ar: T): LocalizedValue<T> {
  return { en, ar };
}

function sanitizeSegment(segment: string): string {
  return segment
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function getArrayItemSegment(value: unknown, index: number): string {
  if (isPlainObject(value)) {
    const itemId = value.id;
    if (typeof itemId === "string" && itemId.trim()) {
      return sanitizeSegment(itemId);
    }

    const slug = value.slug;
    if (typeof slug === "string" && slug.trim()) {
      return sanitizeSegment(slug);
    }
  }

  return `item-${index + 1}`;
}

function createMediaReference(
  en: ImageAsset,
  ar: ImageAsset,
  path: string[],
): MediaReference {
  const id = path.map(sanitizeSegment).join(".");
  registerMedia(id, en.src);

  return {
    id,
    alt: createLocalizedValue(en.alt, ar.alt),
    ...(en.width ? { width: en.width } : {}),
    ...(en.height ? { height: en.height } : {}),
    ...(en.objectPosition || ar.objectPosition
      ? { objectPosition: en.objectPosition ?? ar.objectPosition }
      : {}),
    ...(en.mobileObjectPosition || ar.mobileObjectPosition
      ? {
          mobileObjectPosition:
            en.mobileObjectPosition ?? ar.mobileObjectPosition,
        }
      : {}),
  };
}

export function toCmsSource<T>(
  enValue: T,
  arValue: T,
  path: string[] = [],
): CmsSource<T> {
  if (typeof enValue === "string" || typeof arValue === "string") {
    return createLocalizedValue(
      String(enValue ?? ""),
      String(arValue ?? ""),
    ) as CmsSource<T>;
  }

  if (
    typeof enValue === "number" ||
    typeof enValue === "boolean" ||
    enValue == null
  ) {
    return (enValue ?? arValue) as CmsSource<T>;
  }

  if (isImageAsset(enValue) && isImageAsset(arValue)) {
    return createMediaReference(enValue, arValue, path) as CmsSource<T>;
  }

  if (isLinkLike(enValue) && isLinkLike(arValue)) {
    return {
      label: createLocalizedValue(enValue.label, arValue.label),
      ...(enValue.href || arValue.href
        ? {
            href: createLocalizedValue(
              enValue.href ?? arValue.href ?? "",
              arValue.href ?? enValue.href ?? "",
            ),
          }
        : {}),
      ...(enValue.external || arValue.external
        ? { external: Boolean(enValue.external ?? arValue.external) }
        : {}),
      ...(enValue.action || arValue.action
        ? { action: (enValue.action ?? arValue.action) as LinkReference["action"] }
        : {}),
    } as CmsSource<T>;
  }

  if (Array.isArray(enValue) && Array.isArray(arValue)) {
    const length = Math.max(enValue.length, arValue.length);

    return Array.from({ length }, (_, index) => {
      const enItem = enValue[index] ?? arValue[index];
      const arItem = arValue[index] ?? enValue[index];
      const segment = getArrayItemSegment(enItem ?? arItem, index);

      return toCmsSource(enItem, arItem, [...path, segment]);
    }) as CmsSource<T>;
  }

  if (isPlainObject(enValue) && isPlainObject(arValue)) {
    const left = enValue as UnknownRecord;
    const right = arValue as UnknownRecord;
    const keys = new Set([
      ...Object.keys(left),
      ...Object.keys(right),
    ]);

    return Object.fromEntries(
      [...keys].map((key) => [
        key,
        toCmsSource(
          left[key] as T,
          right[key] as T,
          [...path, key],
        ),
      ]),
    ) as CmsSource<T>;
  }

  return (enValue ?? arValue) as CmsSource<T>;
}

function resolveLocalizedString(
  value: string | LocalizedValue<string>,
  locale: Locale,
): string {
  return typeof value === "string" ? value : value[locale];
}

export function resolveCmsSource<T>(value: CmsSource<T>, locale: Locale): T {
  if (isLocalizedValue(value)) {
    return value[locale] as T;
  }

  if (isMediaReference(value)) {
    return {
      src: resolveMedia(value.id),
      alt: value.alt[locale],
      ...(value.width ? { width: value.width } : {}),
      ...(value.height ? { height: value.height } : {}),
      ...(value.objectPosition ? { objectPosition: value.objectPosition } : {}),
      ...(value.mobileObjectPosition
        ? { mobileObjectPosition: value.mobileObjectPosition }
        : {}),
    } as T;
  }

  if (isLinkReference(value)) {
    return {
      label: value.label[locale],
      ...(value.href
        ? { href: resolveLocalizedString(value.href, locale) }
        : {}),
      ...(value.external ? { external: value.external } : {}),
      ...(value.action ? { action: value.action } : {}),
    } as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) =>
      resolveCmsSource(item as CmsSource<unknown>, locale),
    ) as T;
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        resolveCmsSource(entry as CmsSource<unknown>, locale),
      ]),
    ) as T;
  }

  return value as T;
}
