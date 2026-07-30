import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "data", "fitchburg", "budgets.json");

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

  const revenueBreakdown = latestRevenue
    ? latestRevenue.revenue.lineItems
        .filter((li) => li.isSubtotal && !/^total\s+operating/i.test(li.label))
        .map((li) => ({ label: li.label.replace(/^sub\s?total\s*-?\s*/i, ""), value: li.values[latestRevenue.revenue.adoptedColumnIndex] }))
    : [];

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
    charts,
  };
}
