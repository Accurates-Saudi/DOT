const SECTION_HEADERS = new Set([
  "overview",
  "design",
  "applications",
  "features",
  "benefits",
  "advantages",
  "benefits & features",
  "benefits and features",
  "technical specification",
  "technical specifications",
  "specifications",
]);

export type ContentSectionKey =
  | "overview"
  | "applications"
  | "features"
  | "benefits"
  | "technicalSpecification";

export interface ParsedProductContent {
  industry?: string;
  productLine?: string;
  category: string;
  name: string;
  overview: string[];
  applications: string[];
  features: string[];
  benefits: string[];
  technicalSpecification: string[];
}

function normalizeHeader(line: string): string {
  return line.trim().toLowerCase();
}

function isSectionHeader(line: string): boolean {
  return SECTION_HEADERS.has(normalizeHeader(line));
}

function mapSectionHeader(line: string): ContentSectionKey | null {
  const header = normalizeHeader(line);

  if (header === "overview" || header === "design") return "overview";
  if (header === "applications") return "applications";
  if (header === "features") return "features";
  if (header === "benefits") return "benefits";
  if (
    header === "advantages" ||
    header === "benefits & features" ||
    header === "benefits and features"
  ) {
    return "features";
  }
  if (
    header === "technical specification" ||
    header === "technical specifications" ||
    header === "specifications"
  ) {
    return "technicalSpecification";
  }

  return null;
}

function cleanLine(line: string): string {
  return line.trim().replace(/\s+/g, " ");
}

function isSkippableLine(line: string, folderName: string, metaLines: string[]): boolean {
  const cleaned = cleanLine(line);
  if (!cleaned) return true;
  if (isSectionHeader(cleaned)) return true;
  if (cleaned === folderName) return true;
  if (metaLines.some((meta) => cleanLine(meta) === cleaned)) return true;
  return false;
}

function deriveCategory(metaLines: string[], folderName: string): string {
  const cleaned = metaLines.map(cleanLine).filter(Boolean);

  if (cleaned.length >= 4) return cleaned[2];
  if (cleaned.length === 3) return cleaned[1];
  if (cleaned.length === 2) return cleaned[0];
  if (cleaned.length === 1) {
    const name = deriveRecordedName(metaLines, folderName);
    if (cleaned[0] === folderName || cleaned[0] === name) {
      return "Products";
    }
    return cleaned[0];
  }

  return "Products";
}

function deriveRecordedName(metaLines: string[], folderName: string): string {
  const cleaned = metaLines.map(cleanLine).filter(Boolean);

  if (cleaned.length >= 4) return cleaned[3];
  if (cleaned.length === 3) return cleaned[2];
  if (cleaned.length === 2) return cleaned[1];
  if (cleaned.length === 1 && !isSectionHeader(cleaned[0])) {
    return cleaned[0];
  }

  return folderName;
}

export function parseProductContent(
  raw: string,
  folderName: string,
): ParsedProductContent {
  const lines = raw.replace(/^\uFEFF/, "").split(/\r?\n/);

  const metaLines: string[] = [];
  const sections: Record<ContentSectionKey, string[]> = {
    overview: [],
    applications: [],
    features: [],
    benefits: [],
    technicalSpecification: [],
  };

  let currentSection: ContentSectionKey | null = null;
  let seenSection = false;

  for (const line of lines) {
    const section = mapSectionHeader(line);
    if (section) {
      currentSection = section;
      seenSection = true;
      continue;
    }

    if (isSectionHeader(line)) {
      continue;
    }

    const cleaned = cleanLine(line);
    if (!cleaned) continue;

    if (!seenSection) {
      metaLines.push(line);
      continue;
    }

    if (!currentSection || isSkippableLine(line, folderName, metaLines)) {
      continue;
    }

    sections[currentSection].push(cleaned);
  }

  const category = deriveCategory(metaLines, folderName);
  const name = deriveRecordedName(metaLines, folderName);

  const features = [...sections.features];
  const benefits = [...sections.benefits];

  return {
    industry: metaLines[0] ? cleanLine(metaLines[0]) : undefined,
    productLine: metaLines[1] ? cleanLine(metaLines[1]) : undefined,
    category,
    name,
    overview: sections.overview,
    applications: sections.applications,
    features,
    benefits,
    technicalSpecification: sections.technicalSpecification,
  };
}

export function firstSentence(text: string): string {
  const match = text.match(/[^.!?]+[.!?]+/);
  return match ? match[0].trim() : text.trim();
}

export function slugifyFolderName(folderName: string): string {
  return folderName
    .toLowerCase()
    .replace(/#/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
