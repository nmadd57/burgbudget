import { listArchiveCategory, resolveArchiveFileUrl } from "./lib/civicplus.mjs";
import { fetchBuffer } from "./lib/http.mjs";
import { loadPdf, getPageTexts } from "./lib/pdf-table.mjs";
import { extractRecapTable, findAdoptedColumn } from "./lib/recap-table.mjs";

const AMID_MAYORS_BUDGETS = 58;

/**
 * Build the department-spending and revenue-source datasets from every
 * Mayor's Budget PDF the city has published in its Archive Center. Each
 * budget book is treated as authoritative only for its own fiscal year's
 * adopted column - trailing "actual" columns are for the site's trend
 * display, but the adopted-appropriation figure always comes from that
 * year's own budget book, never restated by a later one.
 */
export async function fetchMayorsBudgets({ log = console.log } = {}) {
  const items = await listArchiveCategory(AMID_MAYORS_BUDGETS);
  const budgets = [];
  const errors = [];

  for (const item of items) {
    const match = item.title.match(/FY\s*(\d{4})/i);
    if (!match) {
      errors.push({ item, reason: "Could not determine fiscal year from title" });
      continue;
    }
    const fiscalYear = Number(match[1]);
    log(`Fetching FY${fiscalYear} budget (ADID ${item.adid}): ${item.title}`);

    try {
      const fileUrl = await resolveArchiveFileUrl(item.adid);
      const buffer = await fetchBuffer(fileUrl);
      const doc = await loadPdf(buffer);
      const pageTexts = await getPageTexts(doc);

      const source = {
        id: `mayors-budget-fy${fiscalYear}`,
        title: item.title,
        fiscalYear,
        url: fileUrl,
        archivePage: item.detailUrl,
        retrievedAt: new Date().toISOString(),
      };

      const expenditures = await extractExpenditures(doc, pageTexts, fiscalYear);
      const revenue = await extractRevenue(doc, pageTexts, fiscalYear);

      budgets.push({ fiscalYear, source, expenditures, revenue });
    } catch (err) {
      errors.push({ item, reason: err.message });
      log(`  ! failed: ${err.message}`);
    }
  }

  budgets.sort((a, b) => a.fiscalYear - b.fiscalYear);
  return { budgets, errors };
}

async function extractExpenditures(doc, pageTexts, fiscalYear) {
  // Some years render this header as "GENERAL FUND EXPEND" (truncated by
  // the source template), so match on the stable prefix rather than the
  // full word.
  const headerMatch = /general\s+fund\s+expend/i;
  const pageIndexes = findPages(pageTexts, headerMatch);
  if (pageIndexes.length === 0) {
    return { status: "not_found", note: "No page matched 'General Fund Expenditures'" };
  }

  const { columns, rows, stopped } = await extractRecapTable(
    doc,
    pageIndexes,
    headerMatch,
    /^total\s+expenditures$/i
  );

  if (!stopped || rows.length < 2) {
    return { status: "incomplete", columns, note: "Did not reach a TOTAL EXPENDITURES row" };
  }

  const totalRow = rows[rows.length - 1];
  const departmentRows = rows.slice(0, -1);
  const adoptedColumnIndex = findAdoptedColumn(columns, fiscalYear);

  let confidence = "low";
  let note = "";
  if (adoptedColumnIndex === -1) {
    note = "Could not identify the adopted-budget column for this fiscal year";
  } else {
    const sum = departmentRows.reduce((s, d) => s + (d.numbers[adoptedColumnIndex] || 0), 0);
    const total = totalRow.numbers[adoptedColumnIndex];
    const diff = Math.abs(sum - total);
    confidence = diff <= Math.max(5, total * 0.0005) ? "high" : "low";
    note = confidence === "low" ? `Department rows summed to ${sum}, PDF total was ${total}` : "";
  }

  return {
    status: "ok",
    columns,
    adoptedColumnIndex,
    adoptedColumnLabel: adoptedColumnIndex !== -1 ? columns[adoptedColumnIndex] : null,
    departments: departmentRows.map((d) => ({ name: titleCase(d.label), values: d.numbers })),
    total: totalRow.numbers,
    confidence,
    note,
  };
}

async function extractRevenue(doc, pageTexts, fiscalYear) {
  const pageIndexes = findPages(pageTexts, /general\s+fund\s+revenue/i);
  if (pageIndexes.length === 0) {
    return { status: "not_found", note: "No page matched 'General Fund Revenue'" };
  }

  const { columns, rows, stopped } = await extractRecapTable(
    doc,
    pageIndexes,
    /general\s+fund\s+revenue/i,
    /^total\s+(operating\s+)?revenue$/i
  );

  if (!stopped || rows.length < 2) {
    return { status: "incomplete", columns, note: "Did not reach a TOTAL REVENUE row" };
  }

  const adoptedColumnIndex = findAdoptedColumn(columns, fiscalYear);
  const lineItems = rows.map((r) => ({
    label: r.label,
    // Category-level subtotals are printed in full caps ("SUB TOTAL - TAXATION").
    // Nested intermediate subtotals like "Subtotal - Levy Limit" are mixed-case
    // and would double-count against their parent category if included here.
    isSubtotal: /^(sub\s?total|total)/i.test(r.label) && r.label === r.label.toUpperCase(),
    values: r.numbers,
  }));

  return {
    status: "ok",
    columns,
    adoptedColumnIndex,
    adoptedColumnLabel: adoptedColumnIndex !== -1 ? columns[adoptedColumnIndex] : null,
    lineItems,
  };
}

function findPages(pageTexts, regex) {
  const indexes = [];
  pageTexts.forEach((text, i) => {
    if (regex.test(text)) indexes.push(i + 1);
  });
  return indexes;
}

function titleCase(label) {
  return label
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bDpw\b/, "DPW")
    .replace(/\bP\.s\.\b/i, "P.S.");
}
