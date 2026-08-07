import fs from "fs";
import path from "path";
import { revenueCategoryContent } from "../content/revenue-categories.js";
import { revenueLineItemContent } from "../content/revenue-line-items.js";
import { departmentContent } from "../content/departments.js";
import { mayorByFiscalYear, mayoralSource } from "../content/mayors.js";

const file = path.join(process.cwd(), "data", "fitchburg", "budgets.json");

function slugify(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatMoney(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  const sign = n < 0 ? "-" : "";
  return sign + "$" + Math.abs(Math.round(n)).toLocaleString("en-US");
}

/**
 * Generate a conversational, deterministic sentence describing how a
 * figure changed year over year, plus (with enough history) a longer-run
 * read on the trend. Deliberately not hand-written: this is a pure
 * function of the `history` array pulled from data/fitchburg/budgets.json
 * each build, so the wording updates on its own whenever a new fiscal
 * year's figures come in - never stored, never stale. The phrasing varies
 * by the size of the swing (not randomly - same inputs always produce the
 * same sentence) so 70-plus line items don't all read identically.
 */
function describeTrend(history) {
  const points = (history || []).filter((h) => h.value !== null && h.value !== undefined);
  if (points.length === 0) return null;
  if (points.length === 1) {
    // Not enough history for a year-over-year comparison, but a brand-new
    // line item showing up for the first time is itself worth saying.
    return describeNotable(history);
  }

  // Some lines (state assessments, "Less: Offset" rows) are charges printed
  // as negative numbers throughout their history. Describing those by raw
  // sign ("fell 10% to -$4.8M") reads backwards - the bill actually grew.
  // When every known value is zero-or-negative, describe the size of the
  // charge instead, using absolute values, so "grew"/"shrank" match reality.
  const isCharge = points.every((p) => p.value <= 0) && points.some((p) => p.value < 0);
  const magnitude = (v) => (isCharge ? Math.abs(v) : v);
  const subject = isCharge ? "The size of this charge" : "This";

  const latest = points[points.length - 1];
  const prior = points[points.length - 2];
  const consecutiveYears = prior.fiscalYear === latest.fiscalYear - 1;
  const diff = magnitude(latest.value) - magnitude(prior.value);
  const priorMag = magnitude(prior.value);
  const pct = priorMag !== 0 ? (diff / Math.abs(priorMag)) * 100 : null;
  const absPct = pct !== null ? Math.abs(pct) : null;

  let verb;
  if (absPct !== null && absPct < 1) {
    verb = diff > 0 ? "ticked up just slightly" : "ticked down just slightly";
  } else if (absPct !== null && absPct < 5) {
    verb = diff > 0 ? "inched up" : "eased down";
  } else if (absPct !== null && absPct < 15) {
    verb = diff > 0 ? "rose" : "fell";
  } else if (absPct !== null && absPct < 35) {
    verb = diff > 0 ? "climbed" : "dropped";
  } else if (absPct !== null) {
    verb = diff > 0 ? "jumped" : "plunged";
  } else {
    verb = diff > 0 ? "grew" : "shrank";
  }

  const yearPhrase = consecutiveYears
    ? `FY${prior.fiscalYear}`
    : `the last year with data on record (FY${prior.fiscalYear})`;
  const pctPhrase =
    absPct !== null ? `, about ${absPct < 1 ? "less than 1%" : Math.round(absPct) + "%"}` : "";

  let sentence;
  if (diff === 0) {
    sentence = `${subject} stayed exactly flat this year at ${formatMoney(magnitude(latest.value))}, same as ${yearPhrase}.`;
  } else if (absPct !== null) {
    sentence = `${subject} ${verb} to ${formatMoney(magnitude(latest.value))} this year${pctPhrase} ${diff > 0 ? "more" : "less"} than the ${formatMoney(magnitude(prior.value))} it was in ${yearPhrase}.`;
  } else {
    sentence = `${subject} ${verb} to ${formatMoney(magnitude(latest.value))} this year, ${diff > 0 ? "up" : "down"} from ${formatMoney(magnitude(prior.value))} in ${yearPhrase}.`;
  }

  if (points.length >= 4) {
    let ups = 0;
    let downs = 0;
    for (let i = 1; i < points.length; i++) {
      const d = magnitude(points[i].value) - magnitude(points[i - 1].value);
      if (d > 0) ups++;
      else if (d < 0) downs++;
    }
    const climbedOrGrew = isCharge ? "gotten bigger" : "climbed";
    const declinedOrShrank = isCharge ? "gotten smaller" : "gone down";
    let longRun;
    if (ups >= points.length - 2) {
      longRun = `Zoom out and the pattern holds: it's ${climbedOrGrew} almost every single year going back to FY${points[0].fiscalYear}.`;
    } else if (downs >= points.length - 2) {
      longRun = `Zoom out and the pattern holds: it's ${declinedOrShrank} almost every single year going back to FY${points[0].fiscalYear}.`;
    } else if (Math.abs(ups - downs) <= 1) {
      longRun = `Zoom out, though, and there's no clear pattern - it's bounced up and down from year to year rather than moving steadily one way.`;
    } else if (ups > downs) {
      longRun = `Zoom out and the trend is ${isCharge ? "bigger" : "upward"} since FY${points[0].fiscalYear}, even with a few down years mixed in.`;
    } else {
      longRun = `Zoom out and the trend is ${isCharge ? "smaller" : "downward"} since FY${points[0].fiscalYear}, even with a few up years mixed in.`;
    }
    sentence += ` ${longRun}`;
  }

  const notable = describeNotable(history);
  if (notable) sentence += ` ${notable}`;

  return sentence;
}

/**
 * Spot a handful of specific, purely data-driven patterns worth calling
 * out - same deal as describeTrend: computed fresh from `history` every
 * build, nothing hand-written or cached. Checks (in priority order, picks
 * at most one so the paragraph doesn't get cluttered):
 *   1. This line just showed up in the budget for the first time.
 *   2. This line went quiet (a zero year) in the middle of an otherwise
 *      active history, then came back.
 *   3. This year broke a streak of 3+ consecutive years all moving the
 *      same direction.
 */
function describeNotable(history) {
  const all = (history || []).slice().sort((a, b) => a.fiscalYear - b.fiscalYear);
  const points = all.filter((h) => h.value !== null && h.value !== undefined);
  if (points.length < 1) return null;

  const firstIdxInAll = all.findIndex((h) => h.value !== null && h.value !== undefined);
  if (firstIdxInAll > 0) {
    const firstPoint = all[firstIdxInAll];
    if (firstIdxInAll === all.length - 1) {
      return `FY${firstPoint.fiscalYear} is the first year this has shown up in the budget at all.`;
    }
    if (all.length - firstIdxInAll <= 3) {
      return `This is a fairly new addition to the budget - it didn't appear in years before FY${firstPoint.fiscalYear}.`;
    }
  }

  if (points.length < 2) return null;

  for (let i = points.length - 2; i >= 1; i--) {
    if (points[i].value === 0 && points[i - 1].value !== 0 && points[i + 1].value !== 0) {
      return `It dropped to zero in FY${points[i].fiscalYear} before coming back the following year.`;
    }
  }

  if (points.length >= 5) {
    const moves = [];
    for (let i = 1; i < points.length; i++) {
      const d = points[i].value - points[i - 1].value;
      moves.push(d > 0 ? 1 : d < 0 ? -1 : 0);
    }
    const latestMove = moves[moves.length - 1];
    if (latestMove !== 0) {
      let streak = 0;
      let dir = null;
      for (let i = moves.length - 2; i >= 0; i--) {
        if (moves[i] === 0) break;
        if (dir === null) {
          dir = moves[i];
          streak = 1;
        } else if (moves[i] === dir) {
          streak++;
        } else {
          break;
        }
      }
      if (streak >= 3 && dir !== null && dir !== latestMove) {
        return `Worth noting: that's a change of direction - it had gone the other way for ${streak} years straight before this.`;
      }
    }
  }

  return null;
}

/**
 * Proposition 2½ lets the levy limit grow by at most 2.5% a year
 * automatically - the "Add: 2 1/2%" line should always equal exactly
 * 2.5% of the prior year's levy limit unless the City Council chose to
 * take less than the full increase that year. Computed fresh from the
 * same parsed figures as everything else (no hand-curated year list) by
 * comparing "Add: 2 1/2%" against 2.5% of "Prior Year's Levy Limit" for
 * every fiscal year on record.
 */
function describeLevyUnderride(categoriesByYear) {
  const shortfalls = [];
  for (const y of categoriesByYear) {
    const cat = y.categories.find((c) => c.slug === "taxation");
    if (!cat) continue;
    const prior = cat.lineItems.find((li) => /prior year.*levy/i.test(li.label));
    const add25 = cat.lineItems.find((li) => /^add:\s*2\s*1\/2/i.test(li.label));
    if (!prior || !add25) continue;
    const expected = prior.values[y.adoptedColumnIndex] * 0.025;
    const actual = add25.values[y.adoptedColumnIndex];
    const diff = actual - expected;
    if (Math.abs(diff) > 1000) {
      shortfalls.push({ fiscalYear: y.fiscalYear, diff, expected, actual });
    }
  }
  if (shortfalls.length === 0) return null;
  const latest = shortfalls[shortfalls.length - 1];
  const action = latest.diff < 0 ? "chose not to take the full" : "took more than the standard";
  return `Worth noting: in FY${latest.fiscalYear} the city ${action} 2.5% property tax increase it's allowed to add each year under Proposition 2½. It added ${formatMoney(
    latest.actual
  )} instead of the full ${formatMoney(Math.round(latest.expected))} - about ${formatMoney(Math.abs(latest.diff))} ${
    latest.diff < 0 ? "less" : "more"
  } than the maximum.`;
}

/**
 * The one computation that's meaningful for literally every line on this
 * site, not just "Add: 2 1/2%": how big a slice of its parent total is
 * this, and is that slice growing or shrinking? A department eating a
 * bigger share of the city budget than it used to, or a revenue source
 * the city is leaning on more (or less) heavily than a decade ago, is
 * exactly the kind of thing worth surfacing - and unlike a hand-picked
 * fact, it's cheap to compute correctly for all 70-plus items and stays
 * correct automatically as new fiscal years are added. Skipped when the
 * shift is under a percentage point, so it only speaks up when it's
 * actually worth mentioning.
 */
function describeShareOfWhole(itemHistory, wholeHistory, wholeLabel) {
  const wholeByYear = new Map((wholeHistory || []).map((w) => [w.fiscalYear, w.value]));
  const points = (itemHistory || [])
    .filter((h) => h.value !== null && h.value !== undefined)
    .map((h) => ({ fiscalYear: h.fiscalYear, value: h.value, whole: wholeByYear.get(h.fiscalYear) }))
    .filter((h) => h.whole !== null && h.whole !== undefined && h.whole !== 0);
  if (points.length < 2) return null;

  const share = (p) => (Math.abs(p.value) / Math.abs(p.whole)) * 100;
  const earliest = points[0];
  const latest = points[points.length - 1];
  if (earliest.fiscalYear === latest.fiscalYear) return null;

  const earliestShare = share(earliest);
  const latestShare = share(latest);
  const diff = latestShare - earliestShare;
  if (Math.abs(diff) < 1) return null;

  const fmt = (n) => (n < 1 ? "under 1" : n.toFixed(1));
  const dir = diff > 0 ? "bigger" : "smaller";
  return `Put another way: back in FY${earliest.fiscalYear} this made up about ${fmt(earliestShare)}% of ${wholeLabel} - today it's ${fmt(latestShare)}%, a ${dir} slice than before.`;
}

function mayoralSpanText(pts) {
  if (pts.length === 1) return `FY${pts[0].fiscalYear}`;
  return `FY${pts[0].fiscalYear} through FY${pts[pts.length - 1].fiscalYear}`;
}

/**
 * Only meaningful for departments the Mayor actually appoints the head of
 * (see the "mayoralDiscretion" flag in src/content/departments.js) - for
 * those, compares the sitting mayor's average budget for this department
 * against the immediately preceding mayor's average, using the verified
 * fiscal-year-to-mayor mapping in src/content/mayors.js. Only fires when
 * the department's own history actually spans a mayoral transition; a
 * department whose recorded years all fall under one mayor has nothing to
 * compare yet.
 */
function describeMayoralComparison(history) {
  const points = (history || [])
    .filter((h) => h.value !== null && h.value !== undefined && mayorByFiscalYear[h.fiscalYear])
    .map((h) => ({ fiscalYear: h.fiscalYear, value: h.value, mayor: mayorByFiscalYear[h.fiscalYear] }))
    .sort((a, b) => a.fiscalYear - b.fiscalYear);
  if (points.length === 0) return null;

  const order = [];
  const byMayor = new Map();
  for (const p of points) {
    if (!byMayor.has(p.mayor)) {
      byMayor.set(p.mayor, []);
      order.push(p.mayor);
    }
    byMayor.get(p.mayor).push(p);
  }
  if (order.length < 2) return null;

  const currentMayor = order[order.length - 1];
  const previousMayor = order[order.length - 2];
  const currentPts = byMayor.get(currentMayor);
  const previousPts = byMayor.get(previousMayor);

  const avg = (pts) => pts.reduce((s, p) => s + p.value, 0) / pts.length;
  const currentAvg = avg(currentPts);
  const previousAvg = avg(previousPts);
  if (previousAvg === 0) return null;

  const diffPct = ((currentAvg - previousAvg) / Math.abs(previousAvg)) * 100;
  const absPct = Math.abs(diffPct);
  const currentAmountPhrase =
    currentPts.length === 1 ? formatMoney(currentPts[0].value) : `an average of ${formatMoney(currentAvg)} a year`;
  const previousAmountPhrase = `an average of ${formatMoney(previousAvg)} a year`;

  if (absPct < 1) {
    return `Mayor ${currentMayor} has kept this at almost exactly what Mayor ${previousMayor} did: ${currentAmountPhrase} over ${mayoralSpanText(
      currentPts
    )}, versus ${previousAmountPhrase} under Mayor ${previousMayor} over ${mayoralSpanText(previousPts)}.`;
  }
  const dir = diffPct > 0 ? "more" : "less";
  return `Since taking office, Mayor ${currentMayor} has budgeted ${currentAmountPhrase} for this over ${mayoralSpanText(
    currentPts
  )} - about ${Math.round(absPct)}% ${dir} than Mayor ${previousMayor} budgeted (${previousAmountPhrase} over ${mayoralSpanText(
    previousPts
  )}).`;
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

  const expenditureTrend = ok.map((b) => ({
    fiscalYear: b.fiscalYear,
    total: b.expenditures.total[b.expenditures.adoptedColumnIndex],
    confidence: b.expenditures.confidence,
  }));
  const totalBudgetHistory = expenditureTrend.map((e) => ({ fiscalYear: e.fiscalYear, value: e.total }));

  const departmentTotals = latest
    ? latest.expenditures.departments
        .map((d) => {
          const slug = slugify(d.name);
          const content = departmentContent[slug] || {};
          const history = ok.map((b) => {
            const match = b.expenditures.departments.find(
              (x) => x.name.toUpperCase() === d.name.toUpperCase()
            );
            return {
              fiscalYear: b.fiscalYear,
              value: match ? match.values[b.expenditures.adoptedColumnIndex] : null,
            };
          });
          let trend = describeTrend(history);
          const share = describeShareOfWhole(history, totalBudgetHistory, "the total city budget");
          if (share) trend = trend ? `${trend} ${share}` : share;
          let mayoralCitation = null;
          if (content.mayoralDiscretion) {
            const mayoral = describeMayoralComparison(history);
            if (mayoral) {
              trend = trend ? `${trend} ${mayoral}` : mayoral;
              mayoralCitation = mayoralSource;
            }
          }
          return {
            slug,
            name: d.name,
            value: d.values[latest.expenditures.adoptedColumnIndex],
            history,
            trend,
            mayoralCitation,
            ...content,
          };
        })
        .sort((a, b) => b.value - a.value)
    : [];

  const departmentHistory = departmentTotals.map((d) => ({ name: d.name, history: d.history }));

  const revenueOk = raw.budgets.filter((b) => b.revenue.status === "ok");
  const latestRevenue = revenueOk[revenueOk.length - 1] || null;
  const revenueTrend = revenueOk.map((b) => {
    const totalItem = b.revenue.lineItems.find((li) => /^total/i.test(li.label));
    return {
      fiscalYear: b.fiscalYear,
      total: totalItem ? totalItem.values[b.revenue.adoptedColumnIndex] : null,
    };
  });
  const totalRevenueHistory = revenueTrend.map((r) => ({ fiscalYear: r.fiscalYear, value: r.total }));

  // Per-fiscal-year category groupings, oldest to newest, for building
  // per-category history trends and the category sub-pages.
  const revenueCategoriesByYear = revenueOk.map((b) => ({
    fiscalYear: b.fiscalYear,
    adoptedColumnIndex: b.revenue.adoptedColumnIndex,
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

  const adoptedColumnIndex = latestRevenue ? latestRevenue.revenue.adoptedColumnIndex : -1;

  const revenueCategories = latestCategories.map((cat) => {
    const catHistory = revenueCategoriesByYear.map((y) => {
      const match = y.categories.find((c) => c.slug === cat.slug);
      return { fiscalYear: y.fiscalYear, value: match ? match.totalValue : null };
    });
    const content = revenueCategoryContent[cat.slug] || {};
    const total = cat.total.values[adoptedColumnIndex];

    // De-dupe line-item slugs within a category (rare, but "Less: Offset"
    // style labels could theoretically repeat).
    const seenSlugs = new Map();
    const lineItems = cat.lineItems.map((li) => {
      let slug = slugify(li.label);
      const seen = seenSlugs.get(slug) || 0;
      seenSlugs.set(slug, seen + 1);
      if (seen > 0) slug = `${slug}-${seen + 1}`;

      const history = revenueCategoriesByYear.map((y) => {
        const yCat = y.categories.find((c) => c.slug === cat.slug);
        const match = yCat?.lineItems.find((x) => x.label.toLowerCase() === li.label.toLowerCase());
        return { fiscalYear: y.fiscalYear, value: match ? match.values[y.adoptedColumnIndex] : null };
      });

      let trend = describeTrend(history);
      if (slug === "add-2-1-2") {
        const underride = describeLevyUnderride(revenueCategoriesByYear);
        if (underride) trend = trend ? `${trend} ${underride}` : underride;
      }
      const categoryLabel = content.label || cat.label;
      const share = describeShareOfWhole(history, catHistory, categoryLabel);
      if (share) trend = trend ? `${trend} ${share}` : share;

      return {
        slug,
        categorySlug: cat.slug,
        categoryLabel,
        label: li.label,
        value: li.values[adoptedColumnIndex],
        history,
        trend,
        ...(revenueLineItemContent[slug] || {}),
      };
    });

    let categoryTrend = describeTrend(catHistory);
    const categoryShare = describeShareOfWhole(catHistory, totalRevenueHistory, "total operating revenue");
    if (categoryShare) categoryTrend = categoryTrend ? `${categoryTrend} ${categoryShare}` : categoryShare;

    return {
      slug: cat.slug,
      label: cat.label,
      total,
      lineItems,
      history: catHistory,
      trend: categoryTrend,
      shareOfRevenue: grandTotalRevenue ? total / grandTotalRevenue : null,
      ...content,
    };
  });

  const revenueLineItems = revenueCategories.flatMap((c) => c.lineItems);

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
    revenueLineItems,
    charts,
  };
}
