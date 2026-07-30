import { listArchiveCategory, resolveArchiveFileUrl } from "./lib/civicplus.mjs";

/**
 * Catalog every document in a Fitchburg Archive Center category without
 * attempting to parse its contents - used for source types where we cite
 * and link the original document rather than extracting figures from it
 * (audited financial statements, actuarial valuations, OPEB reports).
 */
export async function fetchArchiveCatalog(amid, { yearRegex = /(\d{4})/, log = console.log } = {}) {
  const items = await listArchiveCategory(amid);
  const documents = [];
  const errors = [];

  for (const item of items) {
    const match = item.title.match(yearRegex);
    if (!match) {
      errors.push({ item, reason: "Could not determine a year from title" });
      continue;
    }
    try {
      const fileUrl = await resolveArchiveFileUrl(item.adid);
      documents.push({
        year: Number(match[1]),
        title: item.title.trim(),
        url: fileUrl,
        archivePage: item.detailUrl,
        retrievedAt: new Date().toISOString(),
      });
    } catch (err) {
      errors.push({ item, reason: err.message });
      log(`  ! failed to resolve ADID ${item.adid}: ${err.message}`);
    }
  }

  documents.sort((a, b) => b.year - a.year);
  return { documents, errors };
}
