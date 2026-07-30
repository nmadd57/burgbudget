import * as cheerio from "cheerio";
import { fetchText } from "./http.mjs";

const BASE = "https://www.fitchburgma.gov";

/**
 * List documents in a Fitchburg CivicPlus Archive Center category.
 * Returns [{ adid, title, detailUrl }]
 */
export async function listArchiveCategory(amid) {
  const html = await fetchText(`${BASE}/Archive.aspx?AMID=${amid}`);
  const $ = cheerio.load(html);
  const items = [];
  $("a[href*='ADID=']").each((_, el) => {
    const href = $(el).attr("href");
    const match = href.match(/ADID=(\d+)/);
    if (!match) return;
    const adid = Number(match[1]);
    const title = $(el).find("span").first().text().trim() || $(el).text().trim();
    if (!title) return;
    if (!items.find((it) => it.adid === adid)) {
      items.push({ adid, title, detailUrl: `${BASE}/Archive.aspx?ADID=${adid}` });
    }
  });
  return items;
}

/**
 * Resolve an Archive Center ADID to its final downloadable file URL by
 * following the redirect chain (Archive.aspx?ADID=N -> /ArchiveCenter/ViewFile/Item/N).
 */
export async function resolveArchiveFileUrl(adid) {
  const res = await fetch(`${BASE}/Archive.aspx?ADID=${adid}`, {
    headers: { "User-Agent": "BurgBudgetBot/1.0 (+https://github.com/nmadd57/burgbudget)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} resolving ADID=${adid}`);
  return res.url;
}
