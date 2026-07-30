const USER_AGENT =
  "BurgBudgetBot/1.0 (+https://github.com/nmadd57/burgbudget; civic transparency project, respectful low-volume crawler)";

export async function fetchText(url, { retries = 3 } = {}) {
  return fetchWithRetry(url, retries, async (res) => res.text());
}

export async function fetchBuffer(url, { retries = 3 } = {}) {
  return fetchWithRetry(url, retries, async (res) => Buffer.from(await res.arrayBuffer()));
}

async function fetchWithRetry(url, retries, read) {
  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": USER_AGENT, Accept: "*/*" },
        redirect: "follow",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return await read(res);
    } catch (err) {
      lastErr = err;
      if (attempt < retries) await sleep(attempt * 1000);
    }
  }
  throw lastErr;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
