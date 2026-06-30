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

export const LISTING_CATEGORY_ORDER = [
  "Oil & Gas Equipment",
  "Ground Water Well Screens",
  "Process Industry Screens",
  "Product Treatments",
] as const;

const OIL_GAS_EQUIPMENT = "Oil & Gas Equipment";
const PROCESS_INDUSTRY = "Process Industry Screens";
const GROUND_WATER = "Ground Water Well Screens";
const PRODUCT_TREATMENTS = "Product Treatments";

const PROCESS_SUBCATEGORIES = new Set([
  "Oil & Gas Industry",
  "Mining and Mineral Processes",
  "Chemical and Pharmaceutical Industry",
  "Food and Beverage Industry",
  "Water Treatment Processes",
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
  /** Top-level grouping for the products listing page */
  category: string;
  /** Secondary label shown on the product detail hero */
  subcategory?: string;
  name: string;
  overview: string[];
  applications: string[];
  features: string[];
  benefits: string[];
  technicalSpecification: string[];
}

interface ParsedMetadata {
  category: string;
  subcategory?: string;
  productLine?: string;
  name: string;
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

function normalizeMetaLine(line: string): string {
  const cleaned = cleanLine(line);
  if (/^ocess Industry Screens$/i.test(cleaned)) return PROCESS_INDUSTRY;
  return cleaned;
}

function namesMatch(a: string, b: string): boolean {
  return (
    normalizeMetaLine(a).toLowerCase() === normalizeMetaLine(b).toLowerCase()
  );
}

function fuzzyFolderMatch(name: string, folderName: string): boolean {
  const normalize = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, "");

  const a = normalize(name);
  const b = normalize(folderName);

  return a === b || a.includes(b) || b.includes(a);
}

function isOilGasFolder(folderName: string): boolean {
  return /screen|downhole|openhole|open hole|fit to base|liner|flow control/i.test(
    folderName,
  );
}

function inferOilGasProduct(folderName: string): ParsedMetadata {
  const isFlowControl =
    /passive or active control|flow control/i.test(folderName);

  return {
    category: OIL_GAS_EQUIPMENT,
    productLine: "DynamicLink Downhole Screen",
    subcategory: isFlowControl ? "Flow Control" : "Sand Control",
    name: folderName,
  };
}

function parseMetadata(metaLines: string[], folderName: string): ParsedMetadata {
  const cleaned = metaLines.map(normalizeMetaLine).filter(Boolean);

  if (cleaned[0] === OIL_GAS_EQUIPMENT && cleaned.length >= 4) {
    return {
      category: cleaned[0],
      productLine: cleaned[1],
      subcategory: cleaned[2],
      name: cleaned[3],
    };
  }

  if (cleaned[0] === PRODUCT_TREATMENTS && cleaned.length >= 3) {
    return {
      category: PRODUCT_TREATMENTS,
      subcategory: cleaned[1],
      name: cleaned[2],
    };
  }

  if (cleaned[0] === PROCESS_INDUSTRY && cleaned.length >= 3) {
    return {
      category: PROCESS_INDUSTRY,
      subcategory: cleaned[1],
      name: cleaned[2],
    };
  }

  if (
    cleaned.length >= 4 &&
    cleaned[1] === PROCESS_INDUSTRY &&
    PROCESS_SUBCATEGORIES.has(cleaned[0])
  ) {
    return {
      category: PROCESS_INDUSTRY,
      subcategory: cleaned[0],
      name: cleaned[cleaned.length - 1],
    };
  }

  if (cleaned.length === 3 && PROCESS_SUBCATEGORIES.has(cleaned[1])) {
    return {
      category: PROCESS_INDUSTRY,
      subcategory: cleaned[1],
      name: cleaned[2],
    };
  }

  if (
    cleaned[0] === GROUND_WATER ||
    cleaned[0]?.includes("Ground Water")
  ) {
    const name =
      cleaned.length >= 3
        ? cleaned[cleaned.length - 1]
        : cleaned[1] ?? folderName;

    return {
      category: GROUND_WATER,
      name:
        name === GROUND_WATER || name === cleaned[0] ? folderName : name,
    };
  }

  if (cleaned.length === 2) {
    if (PROCESS_SUBCATEGORIES.has(cleaned[0])) {
      return {
        category: PROCESS_INDUSTRY,
        subcategory: cleaned[0],
        name: cleaned[1],
      };
    }

    return {
      category: cleaned[0],
      name: cleaned[1],
    };
  }

  if (cleaned.length === 1) {
    const line = cleaned[0];

    if (line === PROCESS_INDUSTRY && namesMatch(line, folderName)) {
      return { category: PROCESS_INDUSTRY, name: line };
    }

    if (PROCESS_SUBCATEGORIES.has(line)) {
      return {
        category: PROCESS_INDUSTRY,
        subcategory: line,
        name: folderName,
      };
    }

    if (namesMatch(line, folderName) || line.includes("DynamicLink")) {
      return inferOilGasProduct(folderName);
    }

    if (line === OIL_GAS_EQUIPMENT) {
      return inferOilGasProduct(folderName);
    }

    return {
      category: PROCESS_INDUSTRY,
      subcategory: line,
      name: line,
    };
  }

  if (
    cleaned.length >= 3 &&
    cleaned.some((line) => line.includes("DynamicLink"))
  ) {
    const nameLine =
      cleaned.find((line) => fuzzyFolderMatch(line, folderName)) ?? folderName;

    return {
      ...inferOilGasProduct(folderName),
      subcategory: "DynamicLink Screen Liner",
      name: nameLine,
    };
  }

  if (cleaned.length === 0 && isOilGasFolder(folderName)) {
    return inferOilGasProduct(folderName);
  }

  if (isOilGasFolder(folderName)) {
    return inferOilGasProduct(folderName);
  }

  return {
    category: PROCESS_INDUSTRY,
    subcategory: cleaned[0],
    name: folderName,
  };
}

function isSkippableLine(
  line: string,
  folderName: string,
  metaLines: string[],
): boolean {
  const cleaned = cleanLine(line);
  if (!cleaned) return true;
  if (isSectionHeader(cleaned)) return true;
  if (cleaned === folderName) return true;
  if (metaLines.some((meta) => cleanLine(meta) === cleaned)) return true;
  return false;
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

  const metadata = parseMetadata(metaLines, folderName);

  return {
    industry: metadata.category,
    productLine: metadata.productLine,
    category: metadata.category,
    subcategory: metadata.subcategory,
    name: metadata.name,
    overview: sections.overview,
    applications: sections.applications,
    features: [...sections.features],
    benefits: [...sections.benefits],
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

export function sortListingCategories(categories: string[]): string[] {
  const order = LISTING_CATEGORY_ORDER as readonly string[];
  const rank = new Map(order.map((category, index) => [category, index]));

  return [...categories].sort((a, b) => {
    const aRank = rank.get(a) ?? Number.MAX_SAFE_INTEGER;
    const bRank = rank.get(b) ?? Number.MAX_SAFE_INTEGER;

    if (aRank !== bRank) return aRank - bRank;
    return a.localeCompare(b);
  });
}
