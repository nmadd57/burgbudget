# BurgBudget — The Fitchburg Ledger

An independent, automatically-updated look at the spending of the City of Fitchburg, Massachusetts, styled
like an old newspaper. Not affiliated with, operated by, or endorsed by the City of Fitchburg.

Every figure comes directly from documents the city has already published — no manual data entry. A scheduled
job re-fetches and re-parses those documents, validates the results, and rebuilds the static site.

## How it works

- **`scripts/`** — the data pipeline. `build-data.mjs` orchestrates fetchers that scrape Fitchburg's CivicPlus
  Archive Center (`fetch-mayors-budget.mjs` for department spending & revenue, `fetch-archive-catalog.mjs` for
  audited financial statements and retirement/OPEB reports), extract tables from the underlying PDFs using
  positional text extraction (`scripts/lib/pdf-table.mjs`, `scripts/lib/recap-table.mjs`), and write normalized
  JSON to `data/fitchburg/`.
- **`scripts/validate.mjs`** — sanity-checks the generated data before it's allowed to ship.
- **`src/`** — an [Eleventy](https://www.11ty.dev/) static site that reads `data/fitchburg/*.json` and renders it.
- **`.github/workflows/`** — `update-data.yml` refreshes the data weekly and commits changes; `deploy.yml`
  builds and publishes to GitHub Pages on every push to `main`; `security.yml` runs `npm audit` and CodeQL.

See [`/methodology/`](src/methodology.njk) on the live site for data sources, extraction method, validation
logic, and known limitations in plain language.

## Local development

```sh
npm ci
npm run data:fetch   # pulls fresh data from fitchburgma.gov and writes data/fitchburg/*.json
npm run validate
npm run serve        # http://localhost:8080
```

## Contributing

Found a figure that looks wrong, or a public document this should be reading but isn't? Issues and pull
requests are welcome.
