import {
  extractPageRows,
  splitLabelAndNumbers,
  combineHeaderRows,
} from "./pdf-table.mjs";

/**
 * Extract a "recap style" fiscal table (the format Massachusetts municipal
 * budget books use: a row of FY labels, a row of ACTUAL/BUDGET labels, then
 * one labeled numeric row per department/category) that may span multiple
 * consecutive pages sharing the same header.
 *
 * @param {import('pdfjs-dist').PDFDocumentProxy} doc
 * @param {number[]} pageIndexes 1-based page numbers to scan, in order
 * @param {RegExp} headerMatch matches the header row's label token
 * @param {RegExp} stopMatch matches the row that ends the table (inclusive)
 */
export async function extractRecapTable(doc, pageIndexes, headerMatch, stopMatch) {
  let columns = null;
  const rows = [];
  let stopped = false;

  for (const pageIndex of pageIndexes) {
    if (stopped) break;
    const pageRows = await extractPageRows(doc, pageIndex);

    // Require the specific two-row masthead these recap tables use
    // ("CITY OF FITCHBURG" over the table name) so we don't mistake a
    // Table of Contents entry or appendix mention for the real table.
    let headerBottomIdx = -1;
    for (let i = 1; i < pageRows.length; i++) {
      const label = pageRows[i].tokens[0]?.text || "";
      const aboveLabel = pageRows[i - 1].tokens[0]?.text || "";
      if (headerMatch.test(label) && /^city of fitchburg/i.test(aboveLabel)) {
        headerBottomIdx = i;
        break;
      }
    }
    if (headerBottomIdx === -1) continue;

    if (!columns) {
      columns = combineHeaderRows(pageRows[headerBottomIdx - 1], pageRows[headerBottomIdx]);
    }

    for (let i = headerBottomIdx + 1; i < pageRows.length; i++) {
      const split = splitLabelAndNumbers(pageRows[i]);
      if (!split) continue;
      rows.push(split);
      if (stopMatch.test(split.label)) {
        stopped = true;
        break;
      }
    }
  }

  return { columns: columns || [], rows, stopped };
}

/** Find the column index whose header names the given fiscal year's adopted amount. */
export function findAdoptedColumn(columns, fiscalYear) {
  const fy2 = String(fiscalYear).slice(-2);
  const fyRe = new RegExp(`FY\\s?0?${fy2}\\b`, "i");
  const keywords = ["MAYOR", "ADOPTED", "APPROVED", "FINAL", "BUDGET"];
  for (const kw of keywords) {
    const idx = columns.findIndex(
      (c) => fyRe.test(c) && new RegExp(kw, "i").test(c) && !/requested|\bvs\b/i.test(c)
    );
    if (idx !== -1) return idx;
  }
  return -1;
}
