import fs from "fs/promises";
import path from "path";
import { fetchMayorsBudgets } from "./fetch-mayors-budget.mjs";
import { fetchArchiveCatalog } from "./fetch-archive-catalog.mjs";

const DATA_DIR = path.join(process.cwd(), "data", "fitchburg");

const ARCHIVE_CATALOGS = [
  { amid: 50, file: "financial-statements.json", label: "Auditor Financial Statements" },
  { amid: 53, file: "retirement-valuations.json", label: "Retirement Actuarial Valuations" },
  { amid: 54, file: "opeb-reports.json", label: "OPEB Reports" },
];

async function main() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  console.log("Fetching Mayor's Budgets (department spending & revenue)...");
  const { budgets, errors: budgetErrors } = await fetchMayorsBudgets();
  await writeJson("budgets.json", { generatedAt: new Date().toISOString(), budgets, errors: budgetErrors });
  console.log(`  -> ${budgets.length} fiscal years, ${budgetErrors.length} errors`);

  const catalogs = {};
  for (const cat of ARCHIVE_CATALOGS) {
    console.log(`Cataloging ${cat.label} (AMID=${cat.amid})...`);
    const { documents, errors } = await fetchArchiveCatalog(cat.amid);
    await writeJson(cat.file, { generatedAt: new Date().toISOString(), label: cat.label, documents, errors });
    console.log(`  -> ${documents.length} documents, ${errors.length} errors`);
    catalogs[cat.file] = { documents, errors };
  }

  await writeJson("summary.json", buildSummary(budgets, budgetErrors, catalogs));
}

function buildSummary(budgets, budgetErrors, catalogs) {
  const latest = budgets[budgets.length - 1];
  return {
    generatedAt: new Date().toISOString(),
    latestFiscalYear: latest?.fiscalYear ?? null,
    latestAdoptedTotal: latest?.expenditures?.status === "ok"
      ? latest.expenditures.total[latest.expenditures.adoptedColumnIndex]
      : null,
    fiscalYearsCovered: budgets.filter((b) => b.expenditures.status === "ok").map((b) => b.fiscalYear),
    fiscalYearsWithLowConfidence: budgets
      .filter((b) => b.expenditures.status === "ok" && b.expenditures.confidence === "low")
      .map((b) => b.fiscalYear),
    fiscalYearsFailed: budgets.filter((b) => b.expenditures.status !== "ok").map((b) => b.fiscalYear),
    pipelineErrorCount: budgetErrors.length + Object.values(catalogs).reduce((s, c) => s + c.errors.length, 0),
  };
}

async function writeJson(file, data) {
  await fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(data, null, 2) + "\n", "utf8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
