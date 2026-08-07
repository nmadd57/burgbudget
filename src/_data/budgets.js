import fs from "fs";
import path from "path";
import { revenueCategoryContent } from "../content/revenue-categories.js";

const file = path.join(process.cwd(), "data", "fitchburg", "budgets.json");

function slugify(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Fitchburg's revenue recap has no explicit category tag per line - the
 * category boundary is implicit: every line item up to and including a
 * category-level subtotal (an all-caps "SUB TOTAL - X" row) belongs to
 * that category, matching how the row order literally prints in the PDF.
 */
function groupRevenueByCategory(lineItems) {
  const categories = [];
  let current = [];
  for (const item of lineItems) {
    if (item.isSubtotal) {
      if (/^total\s+operating/i.test(item.label)) break; // grand total ends the table
      const label = item.label.replace(/^sub\s?total\s*-?\s*/i, "").trim();
      categories.push({ slug: slugify(label), label, total: item, lineItems: current });
      current = [];
    } else {
      current.push(item);
    }
  }
  return categories;
}

export default function () {
  if (!fs.existsSync(file)) {
    return { generatedAt: null, budgets: [], errors: [], ok: [], latest: null, departmentTotals: [] };
  }
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  const ok = raw.budgets.filter((b) => b.expenditures.status === "ok");
  const latest = ok[ok.length - 1] || null;
  const prior = ok[ok.length - 2] || null;

  const departmentTotals = latest
    ? latest.expenditures.departments
        .map((d) => ({ name: d.name, value: d.values[latest.expenditures.adoptedColumnIndex] }))
        .sort((a, b) => b.value - a.value)
    : [];

  const expenditureTrend = ok.map((b) => ({
    fiscalYear: b.fiscalYear,
    total: b.expenditures.total[b.expenditures.adoptedColumnIndex],
    confidence: b.expenditures.confidence,
  }));

  const departmentHistory = latest
    ? latest.expenditures.departments.map((d) => ({
        name: d.name,
        history: ok.map((b) => {
          const match = b.expenditures.departments.find(
            (x) => x.name.toUpperCase() === d.name.toUpperCase()
          );
          return {
            fiscalYear: b.fiscalYear,
            value: match ? match.values[b.expenditures.adoptedColumnIndex] : null,
          };
        }),
      }))
    : [];

  const revenueOk = raw.budgets.filter((b) => b.revenue.status === "ok");
  const latestRevenue = revenueOk[revenueOk.length - 1] || null;
  const revenueTrend = revenueOk.map((b) => {
    const totalItem = b.revenue.lineItems.find((li) => /^total/i.test(li.label));
    return {
      fiscalYear: b.fiscalYear,
      total: totalItem ? totalItem.values[b.revenue.adoptedColumnIndex] : null,
    };
  });

  // Per-fiscal-year category groupings, oldest to newest, for building
  // per-category history trends and the category sub-pages.
  const revenueCategoriesByYear = revenueOk.map((b) => ({
    fiscalYear: b.fiscalYear,
    categories: groupRevenueByCategory(b.revenue.lineItems).map((c) => ({
      ...c,
      totalValue: c.total.values[b.revenue.adoptedColumnIndex],
    })),
  }));

  const latestCategories = latestRevenue
    ? groupRevenueByCategory(latestRevenue.revenue.lineItems)
    : [];

  const grandTotalRevenue = latestRevenue
    ? latestRevenue.revenue.lineItems.find((li) => /^total\s+operating/i.test(li.label))
        ?.values[latestRevenue.revenue.adoptedColumnIndex]
    : null;

  const revenueCategories = latestCategories.map((cat) => {
    const history = revenueCategoriesByYear.map((y) => {
      const match = y.categories.find((c) => c.slug === cat.slug);
      return { fiscalYear: y.fiscalYear, value: match ? match.totalValue : null };
    });
    const content = revenueCategoryContent[cat.slug] || {};
    const adoptedColumnIndex = latestRevenue.revenue.adoptedColumnIndex;
    const total = cat.total.values[adoptedColumnIndex];
    return {
      slug: cat.slug,
      label: cat.label,
      total,
      lineItems: cat.lineItems.map((li) => ({ label: li.label, value: li.values[adoptedColumnIndex] })),
      history,
      shareOfRevenue: grandTotalRevenue ? total / grandTotalRevenue : null,
      ...content,
    };
  });

  const revenueBreakdown = revenueCategories.map((c) => ({ label: c.label, value: c.total }));

  const charts = {
    departmentBar: {
      label: latest ? `FY${latest.fiscalYear} Adopted` : "",
      labels: departmentTotals.map((d) => d.name),
      values: departmentTotals.map((d) => d.value),
    },
    totalTrend: {
      labels: expenditureTrend.map((e) => e.fiscalYear),
      series: [{ label: "Total Adopted Budget", values: expenditureTrend.map((e) => e.total) }],
    },
    revenueTrend: {
      labels: revenueTrend.map((r) => r.fiscalYear),
      series: [{ label: "Total Operating Revenue", values: revenueTrend.map((r) => r.total) }],
    },
    revenueBreakdown: {
      labels: revenueBreakdown.map((r) => r.label),
      values: revenueBreakdown.map((r) => r.value),
    },
  };

  return {
    ...raw,
    ok,
    latest,
    prior,
    departmentTotals,
    expenditureTrend,
    departmentHistory,
    latestRevenue,
    revenueTrend,
    revenueBreakdown,
    revenueCategories,
    charts,
  };
}
