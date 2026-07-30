import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

/** Load a PDF buffer and return the pdfjs document proxy. */
export async function loadPdf(buffer) {
  const data = new Uint8Array(buffer);
  return getDocument({ data, useSystemFonts: true }).promise;
}

/** Get all page texts (lowercase) so callers can locate a target page. */
export async function getPageTexts(doc) {
  const texts = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    texts.push(content.items.map((it) => it.str).join(" "));
  }
  return texts;
}

/**
 * Extract a page's text items grouped into visual rows (by rounded y),
 * each row's tokens sorted left-to-right by x. Mirrors how the PDF
 * actually lays the table out, since these budget books have no
 * underlying "table" structure in the PDF itself - just positioned text.
 */
export async function extractPageRows(doc, pageIndex) {
  const page = await doc.getPage(pageIndex);
  const content = await page.getTextContent();
  const rows = new Map();
  for (const it of content.items) {
    const y = Math.round(it.transform[5]);
    if (!rows.has(y)) rows.set(y, []);
    if (it.str.trim()) rows.get(y).push({ x: it.transform[4], text: it.str.trim() });
  }
  return [...rows.keys()]
    .sort((a, b) => b - a)
    .map((y) => ({ y, tokens: rows.get(y).sort((a, b) => a.x - b.x) }))
    .filter((row) => row.tokens.length > 0);
}

const NUMERIC_RE = /^\(?-?\$?[\d,]+(\.\d+)?\)?$/;

export function isNumericToken(text) {
  return text === "-" || NUMERIC_RE.test(text);
}

/** Parse "1,234", "(1,234)", "-" (=0), "$1,234" into a number. */
export function parseNumber(text) {
  if (text === "-" || text === "") return 0;
  const negative = text.startsWith("(") && text.endsWith(")");
  const cleaned = text.replace(/[()$,]/g, "");
  const n = Number(cleaned);
  if (Number.isNaN(n)) return null;
  return negative ? -n : n;
}

/**
 * Split a row's tokens into a leading label and trailing numeric columns.
 * Fitchburg's recap tables render each department/line-item name as a
 * single text run followed by one numeric run per fiscal-year column.
 */
export function splitLabelAndNumbers(row) {
  const numbers = [];
  let labelParts = [];
  for (const tok of row.tokens) {
    if (isNumericToken(tok.text) && labelParts.length > 0) {
      numbers.push(parseNumber(tok.text));
    } else if (isNumericToken(tok.text) && numbers.length === 0 && labelParts.length === 0) {
      // A row that starts with a number isn't a labeled data row (e.g. stray page furniture).
      return null;
    } else {
      labelParts.push(tok.text);
    }
  }
  const label = labelParts.join(" ").replace(/\s+/g, " ").trim();
  if (!label || numbers.length === 0) return null;
  return { label, numbers };
}

/**
 * Combine two stacked header rows (e.g. "CITY OF FITCHBURG | FY21 | FY22 ..."
 * over "GENERAL FUND EXPENDITURES | ACTUAL | ACTUAL ...") into column labels
 * by positional pairing, dropping each row's leading label token.
 */
export function combineHeaderRows(topRow, bottomRow) {
  const topTokens = topRow.tokens.slice(1).map((t) => t.text);
  const bottomTokens = bottomRow.tokens.slice(1).map((t) => t.text);
  const count = Math.max(topTokens.length, bottomTokens.length);
  const labels = [];
  for (let i = 0; i < count; i++) {
    labels.push([topTokens[i], bottomTokens[i]].filter(Boolean).join(" ").trim());
  }
  return labels;
}
