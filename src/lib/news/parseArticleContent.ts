export interface ParsedArticleContent {
  title: string;
  publishedAt: string;
  excerpt: string;
  content: string[];
}

function parseDateToIso(dateLine: string): string {
  const parsed = Date.parse(dateLine);

  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid news article date: "${dateLine}"`);
  }

  return new Date(parsed).toISOString().slice(0, 10);
}

function buildExcerpt(paragraph: string, maxLength = 160): string {
  const normalized = paragraph.trim().replace(/\s+/g, " ");

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

/**
 * Parses DOT news folder content.txt files.
 *
 * Expected format:
 * Line 1 — title
 * Line 2 — duplicate title (optional, skipped when identical)
 * Line 3 — date (e.g. "June 19, 2022")
 * Blank line
 * Body paragraph(s)
 */
export function parseArticleContent(raw: string): ParsedArticleContent {
  const normalized = raw.trim().replace(/\r\n/g, "\n");
  const sections = normalized.split(/\n\n+/).map((section) => section.trim());

  if (sections.length === 0) {
    throw new Error("News article content is empty.");
  }

  const headerLines = sections[0]
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (headerLines.length < 2) {
    throw new Error("News article content is missing title or date.");
  }

  const title = headerLines[0];
  const dateLine =
    headerLines.length >= 3 && headerLines[1] === title
      ? headerLines[2]
      : headerLines[1];
  const publishedAt = parseDateToIso(dateLine);

  const content = sections
    .slice(1)
    .flatMap((section) =>
      section
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    );

  if (content.length === 0) {
    throw new Error(`News article "${title}" is missing body content.`);
  }

  return {
    title,
    publishedAt,
    content,
    excerpt: buildExcerpt(content[0]),
  };
}
