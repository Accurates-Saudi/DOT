import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function readJsonLike(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function parseProductContent(raw, folderName) {
  const lines = raw.split(/\r?\n/).map((line) => line.trim());
  const sections = {
    name: folderName,
    category: "",
    subcategory: "",
    overview: [],
    applications: [],
    features: [],
    benefits: [],
    technicalSpecification: [],
  };

  let current = null;

  for (const line of lines) {
    if (!line) continue;
    const lower = line.toLowerCase();
    if (lower === "category:" || lower.startsWith("category:")) {
      sections.category = line.split(":").slice(1).join(":").trim();
      current = null;
      continue;
    }
    if (lower === "subcategory:" || lower.startsWith("subcategory:")) {
      sections.subcategory = line.split(":").slice(1).join(":").trim();
      current = null;
      continue;
    }
    if (lower === "overview") { current = "overview"; continue; }
    if (lower === "applications") { current = "applications"; continue; }
    if (lower === "features") { current = "features"; continue; }
    if (lower === "benefits") { current = "benefits"; continue; }
    if (lower.includes("technical specification")) { current = "technicalSpecification"; continue; }
    if (current === null && !sections.name) {
      sections.name = line;
      continue;
    }
    if (current && sections[current]) {
      sections[current].push(line.startsWith("-") ? line.slice(1).trim() : line);
    }
  }

  return sections;
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function firstSentence(text) {
  const match = text.match(/[^.!?]+[.!?]+/);
  return match ? match[0].trim() : text;
}

function loadProducts() {
  const productsDir = path.join(root, "src/assets/products");
  const items = {};

  for (const folder of fs.readdirSync(productsDir, { withFileTypes: true })) {
    if (!folder.isDirectory()) continue;
    const folderPath = path.join(productsDir, folder.name);
    const contentFile = fs
      .readdirSync(folderPath)
      .find((name) => name.toLowerCase() === "content.txt") ??
      fs.readdirSync(folderPath).find((name) => name.endsWith(".txt"));

    if (!contentFile) continue;

    const parsed = parseProductContent(
      fs.readFileSync(path.join(folderPath, contentFile), "utf8"),
      folder.name,
    );
    const slug = slugify(folder.name);
    const introduction = parsed.overview[0] ?? firstSentence(parsed.name);
    items[slug] = {
      name: parsed.name,
      category: parsed.category,
      ...(parsed.subcategory ? { subcategory: parsed.subcategory } : {}),
      introduction,
      listingTeaser: firstSentence(introduction),
      overview: parsed.overview.length ? parsed.overview : [introduction],
      applications: parsed.applications,
      features: parsed.features,
      benefits: parsed.benefits,
      specifications: parsed.technicalSpecification.length
        ? {
            heading: "Technical Data",
            rows: parsed.technicalSpecification.map((line) => {
              const idx = line.indexOf(":");
              if (idx > 0) {
                return {
                  label: line.slice(0, idx).trim(),
                  value: line.slice(idx + 1).trim(),
                };
              }
              return { label: "Specification", value: line };
            }),
          }
        : undefined,
      meta: { title: parsed.name, description: introduction },
    };
  }

  return items;
}

function loadNews() {
  const newsDir = path.join(root, "src/assets/news");
  const items = {};

  for (const folder of fs.readdirSync(newsDir, { withFileTypes: true })) {
    if (!folder.isDirectory()) continue;
    const contentPath = path.join(newsDir, folder.name, "content.txt");
    if (!fs.existsSync(contentPath)) continue;

    const raw = fs.readFileSync(contentPath, "utf8");
    const lines = raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const title = lines[0] ?? folder.name;
    const slug = slugify(folder.name.replace(/^article\s*/i, ""));
    const content = lines.slice(1);
    items[slug] = {
      title,
      excerpt: content[0] ?? title,
      category: folder.name.includes("1") ? "Corporate" : "Event",
      content,
      meta: { title, description: content[0] ?? title },
    };
  }

  return items;
}

async function main() {
  const enPath = path.join(root, "src/i18n/locales/en.json");
  const base = JSON.parse(fs.readFileSync(enPath, "utf8"));
  base.productsCatalog.items = loadProducts();
  base.newsArticles = { ...base.newsArticles, ...loadNews() };
  fs.writeFileSync(enPath, `${JSON.stringify(base, null, 2)}\n`);
  console.log(
    "Updated products:",
    Object.keys(base.productsCatalog.items).length,
    "news:",
    Object.keys(base.newsArticles).length,
  );
}

main();
