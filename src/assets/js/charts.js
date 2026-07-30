(function () {
  function readData(id) {
    const el = document.getElementById(id);
    return el ? JSON.parse(el.textContent) : null;
  }

  function paletteFor(count) {
    const base = ["#7a1f1f", "#3d3428", "#8a6d3b", "#4a443b", "#a35c5c", "#5f6b47", "#6b4f2a", "#7d6b52"];
    const out = [];
    for (let i = 0; i < count; i++) out.push(base[i % base.length]);
    return out;
  }

  function isDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function inkColor() {
    return isDark() ? "#ece4d3" : "#1c1a17";
  }

  document.querySelectorAll("canvas[data-chart]").forEach((canvas) => {
    const kind = canvas.dataset.chart;
    const data = readData(canvas.id + "-data");
    if (!data || !window.Chart) return;

    const commonOptions = {
      responsive: true,
      plugins: {
        legend: { labels: { color: inkColor() } },
      },
      scales:
        kind === "pie" || kind === "doughnut"
          ? {}
          : {
              x: { ticks: { color: inkColor() }, grid: { color: "rgba(128,128,128,0.15)" } },
              y: { ticks: { color: inkColor() }, grid: { color: "rgba(128,128,128,0.15)" } },
            },
    };

    if (kind === "bar") {
      new Chart(canvas, {
        type: "bar",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: data.label || "",
              data: data.values,
              backgroundColor: paletteFor(data.values.length),
            },
          ],
        },
        options: { ...commonOptions, plugins: { legend: { display: false } } },
      });
    } else if (kind === "line") {
      new Chart(canvas, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: data.series.map((s, i) => ({
            label: s.label,
            data: s.values,
            borderColor: paletteFor(data.series.length)[i],
            backgroundColor: "transparent",
            tension: 0.15,
          })),
        },
        options: commonOptions,
      });
    } else if (kind === "pie" || kind === "doughnut") {
      new Chart(canvas, {
        type: kind,
        data: {
          labels: data.labels,
          datasets: [{ data: data.values, backgroundColor: paletteFor(data.values.length) }],
        },
        options: commonOptions,
      });
    }
  });
})();
