import { useState, useCallback } from 'react';

// Single place that talks to the backend: POST /api/generate-recipe, POST /api/scan-fridge
// Trims trailing slash from VITE_API_URL if present to avoid double-slashes
const rawBase = import.meta.env.VITE_API_URL || '';
const BASE = rawBase.replace(/\/+$/, '');

export default function useRecipeApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);

  const generate = useCallback(async ({ ingredients, diet, servings, mealType = 'any', maxTime = 'any' }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/api/generate-recipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, diet, servings, mealType, maxTime }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(
          data.error ||
            (res.status === 429
              ? 'Too many requests, please wait a moment.'
              : "We couldn't generate recipes right now.")
        );
      }
      return data.recipes || [];
    } catch (e) {
      setError(
        e instanceof TypeError
          ? 'Cannot reach the server. Check your connection and try again.'
          : e.message
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const scanFridge = useCallback(async (base64Image) => {
    setScanning(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/api/scan-fridge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to scan ingredients from image.');
      }
      return data.ingredients || [];
    } catch (e) {
      const msg =
        e instanceof TypeError
          ? 'Cannot reach the server. Check your connection.'
          : e.message;
      setError(msg);
      throw new Error(msg);
    } finally {
      setScanning(false);
    }
  }, []);

  return { generate, scanFridge, loading, scanning, error };
}
