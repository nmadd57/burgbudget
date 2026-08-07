import MarkdownIt from "markdown-it";

const md = new MarkdownIt({ html: false, linkify: false });

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "node_modules/chart.js/dist/chart.umd.js": "assets/js/vendor/chart.umd.js" });
  eleventyConfig.addPassthroughCopy("data");

  eleventyConfig.addFilter("money", (value) => {
    if (value === null || value === undefined || Number.isNaN(value)) return "—";
    return "$" + Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 });
  });

  eleventyConfig.addFilter("moneyShort", (value) => {
    if (value === null || value === undefined || Number.isNaN(value)) return "—";
    const n = Number(value);
    if (Math.abs(n) >= 1_000_000) return "$" + (n / 1_000_000).toFixed(1) + "M";
    if (Math.abs(n) >= 1_000) return "$" + (n / 1_000).toFixed(0) + "K";
    return "$" + n.toLocaleString("en-US");
  });

  eleventyConfig.addFilter("pctChange", (from, to) => {
    if (!from) return "—";
    const pct = ((to - from) / Math.abs(from)) * 100;
    const sign = pct > 0 ? "+" : "";
    return sign + pct.toFixed(1) + "%";
  });

  eleventyConfig.addFilter("take", (arr, n) => (Array.isArray(arr) ? arr.slice(0, n) : arr));
  eleventyConfig.addFilter("pluck", (arr, key) => (Array.isArray(arr) ? arr.map((x) => x[key]) : arr));

  eleventyConfig.addFilter("md", (value) => (value ? md.renderInline(String(value)) : ""));

  eleventyConfig.addFilter("dateline", (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
}
