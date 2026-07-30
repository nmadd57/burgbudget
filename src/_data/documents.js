import fs from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "data", "fitchburg");

function load(file) {
  const p = path.join(DIR, file);
  if (!fs.existsSync(p)) return { generatedAt: null, label: file, documents: [], errors: [] };
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

export default function () {
  return {
    financialStatements: load("financial-statements.json"),
    retirementValuations: load("retirement-valuations.json"),
    opebReports: load("opeb-reports.json"),
  };
}
