import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "fitchburg");

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf8"));
}

let failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

const budgets = readJson("budgets.json");
check(budgets.budgets.length > 0, "No budget years were fetched at all");

const ok = budgets.budgets.filter((b) => b.expenditures.status === "ok");
check(ok.length >= 1, "No fiscal year's expenditures could be extracted");

for (const b of ok) {
  const idx = b.expenditures.adoptedColumnIndex;
  check(idx !== -1, `FY${b.fiscalYear}: could not identify the adopted-budget column`);
  check(b.expenditures.departments.length > 0, `FY${b.fiscalYear}: zero departments extracted`);
  check(!!b.source.url, `FY${b.fiscalYear}: missing source URL`);
}

for (const file of ["financial-statements.json", "retirement-valuations.json", "opeb-reports.json"]) {
  const cat = readJson(file);
  check(Array.isArray(cat.documents), `${file}: documents is not an array`);
}

if (failures.length) {
  console.error("Data validation FAILED:");
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}

console.log(`Data validation passed. ${ok.length}/${budgets.budgets.length} fiscal years extracted cleanly.`);
