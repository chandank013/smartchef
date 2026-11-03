const TIMEOUT = 8000;

async function getJson(url, headers) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT);
  try {
    const r = await fetch(url, { headers, signal: ctl.signal });
    if (!r.ok) throw new Error(`image API ${r.status}`);
    return await r.json();
  } finally { clearTimeout(timer); }
}

const providers = {
  async unsplash(q, key) {
    const d = await getJson(`https://api.unsplash.com/search/photos?per_page=1&orientation=landscape&query=${encodeURIComponent(q)}`, { Authorization: `Client-ID ${key}` });
    return d.results?.[0]?.urls?.regular || null;
  },
  async pexels(q, key) {
    const d = await getJson(`https://api.pexels.com/v1/search?per_page=1&orientation=landscape&query=${encodeURIComponent(q)}`, { Authorization: key });
    return d.photos?.[0]?.src?.large || null;
  },
};

// Never fails the request: returns null on any problem (the React client shows its own fallback).
export async function getImageUrl(title) {
  const provider = (process.env.IMAGE_PROVIDER || 'none').toLowerCase();
  const key = process.env.IMAGE_API_KEY;
  if (!providers[provider] || !key) return null;
  try { return await providers[provider](`${title} food`, key); }
  catch (e) { console.error('Image lookup failed:', e.message); return null; }
}

export const attachImages = (recipes) =>
  Promise.all(recipes.map(async (r) => ({ ...r, imageUrl: (await getImageUrl(r.title)) || null })));
