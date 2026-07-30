import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "data", "fitchburg", "summary.json");

export default function () {
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
