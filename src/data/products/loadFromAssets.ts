import type { ImageAsset, ProductRecord, SpecificationRow } from "@/types";

import {
  firstSentence,
  parseProductContent,
  slugifyFolderName,
} from "./parseContent";

type RawModule = string;
type ImageModule = string;

const contentModules = import.meta.glob<RawModule>(
  "../../assets/products/*/*.txt",
  { query: "?raw", import: "default", eager: true },
);

const imageModules = import.meta.glob<ImageModule>(
  "../../assets/products/*/*.{webp,png,jpg,jpeg}",
  { eager: true, import: "default" },
);

/** Matches specification, common typos (e.g. specificcation), and spec-table filenames */
const SPEC_IMAGE_PATTERN = /specif[a-z]*cat/i;
const LINEAR_RANGE_IMAGE_PATTERN = /linear[\s_-]?range/i;

function pickSpecificationImage(
  imageNames: string[],
  folderImages: Map<string, string>,
  hasSpecRows: boolean,
): string | undefined {
  const specificationFile = imageNames.find((name) =>
    SPEC_IMAGE_PATTERN.test(name),
  );
  if (specificationFile) return folderImages.get(specificationFile);

  if (!hasSpecRows) return undefined;

  const linearRangeFile = imageNames.find((name) =>
    LINEAR_RANGE_IMAGE_PATTERN.test(name),
  );
  return linearRangeFile ? folderImages.get(linearRangeFile) : undefined;
}

function getFolderName(assetPath: string): string {
  const match = assetPath.match(/products\/(.+?)\/[^/]+$/);
  return match?.[1] ?? "";
}

function getFileName(assetPath: string): string {
  return assetPath.split("/").pop() ?? assetPath;
}

function isSpecificationImage(fileName: string): boolean {
  return SPEC_IMAGE_PATTERN.test(fileName) || LINEAR_RANGE_IMAGE_PATTERN.test(fileName);
}

function pickCoverImage(fileNames: string[]): string | undefined {
  const candidates = fileNames.filter((name) => !isSpecificationImage(name));

  const dashNumber = candidates.find((name) => /\d-\d\.(webp|png|jpe?g)$/i.test(name));
  if (dashNumber) return dashNumber;

  const numbered = candidates
    .filter((name) => /^\d+\.(webp|png|jpe?g)$/i.test(name))
    .sort((a, b) => {
      const aNum = Number.parseInt(a, 10);
      const bNum = Number.parseInt(b, 10);
      return aNum - bNum;
    });

  if (numbered[0]) return numbered[0];

  return candidates.sort()[0];
}

function parseSpecificationRows(lines: string[]): SpecificationRow[] {
  return lines
    .map((line) => {
      const colonIndex = line.indexOf(":");
      if (colonIndex > 0) {
        return {
          label: line.slice(0, colonIndex).trim(),
          value: line.slice(colonIndex + 1).trim(),
        };
      }

      return { label: "Specification", value: line.trim() };
    })
    .filter((row) => row.value.length > 0);
}

function pickContentFile(
  entries: [string, RawModule][],
  folderName: string,
): [string, RawModule] | undefined {
  const folderEntries = entries.filter(([path]) => getFolderName(path) === folderName);

  return (
    folderEntries.find(([path]) => getFileName(path).toLowerCase() === "content.txt") ??
    folderEntries.sort(([pathA], [pathB]) => pathA.localeCompare(pathB))[0]
  );
}

function buildImageMap(): Map<string, Map<string, string>> {
  const byFolder = new Map<string, Map<string, string>>();

  for (const [path, src] of Object.entries(imageModules)) {
    const folderName = getFolderName(path);
    const fileName = getFileName(path);

    if (!folderName) continue;

    const folderMap = byFolder.get(folderName) ?? new Map<string, string>();
    folderMap.set(fileName, src);
    byFolder.set(folderName, folderMap);
  }

  return byFolder;
}

function toImageAsset(src: string, alt: string): ImageAsset {
  return { src, alt };
}

export function loadProductRecordsFromAssets(): ProductRecord[] {
  const imageMap = buildImageMap();
  const contentEntries = Object.entries(contentModules);
  const folderNames = new Set<string>();

  for (const path of contentEntries.map(([entryPath]) => getFolderName(entryPath))) {
    if (path) folderNames.add(path);
  }

  const records = [...folderNames]
    .map((folderName) => {
      const contentEntry = pickContentFile(contentEntries, folderName);
      if (!contentEntry) return null;

      const [, rawContent] = contentEntry;
      const parsed = parseProductContent(rawContent, folderName);
      const folderImages = imageMap.get(folderName) ?? new Map<string, string>();
      const imageNames = [...folderImages.keys()];
      const coverFileName = pickCoverImage(imageNames);

      if (!coverFileName) {
        console.warn(`[products] Skipping "${folderName}" — no cover image found.`);
        return null;
      }

      const coverSrc = folderImages.get(coverFileName)!;
      const specRows = parseSpecificationRows(parsed.technicalSpecification);
      const specImageSrc = pickSpecificationImage(
        imageNames,
        folderImages,
        specRows.length > 0,
      );
      const introduction =
        parsed.overview[0] ?? firstSentence(parsed.name) ?? parsed.name;

      const record: ProductRecord = {
        id: slugifyFolderName(folderName),
        slug: slugifyFolderName(folderName),
        category: parsed.category,
        ...(parsed.subcategory ? { subcategory: parsed.subcategory } : {}),
        name: parsed.name,
        listingTeaser: firstSentence(introduction),
        introduction,
        image: toImageAsset(coverSrc, parsed.name),
        overview:
          parsed.overview.length > 0 ? parsed.overview : [introduction],
        applications: parsed.applications,
        features: parsed.features,
        benefits: parsed.benefits,
        ...(parsed.productLine === "Product Treatments"
          ? { listingOrder: 1 }
          : {}),
      };

      if (specImageSrc || specRows.length > 0) {
        record.specifications = {
          ...(specRows.length > 0 ? { rows: specRows } : {}),
          ...(specImageSrc
            ? {
                image: toImageAsset(
                  specImageSrc,
                  `${parsed.name} technical specification table`,
                ),
              }
            : {}),
        };
      }

      return record;
    })
    .filter((record): record is ProductRecord => record !== null)
    .sort((a, b) => a.name.localeCompare(b.name));

  return records;
}
