import { useState, useCallback } from 'react';

const BASE = import.meta.env.VITE_API_URL || '';

// Single place that talks to the backend: POST /api/generate-recipe
export default function useRecipeApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = useCallback(async ({ ingredients, diet, servings }) => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${BASE}/api/generate-recipe`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, diet, servings }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || (res.status === 429 ? 'Too many requests, please wait a moment.' : "We couldn't generate recipes right now."));
      }
      return data.recipes || [];
    } catch (e) {
      setError(e instanceof TypeError ? 'Cannot reach the server. Check your connection and try again.' : e.message);
      return null;
    } finally { setLoading(false); }
  }, []);

  return { generate, loading, error };
}
