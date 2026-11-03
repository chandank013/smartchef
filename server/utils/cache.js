import NodeCache from 'node-cache';
import crypto from 'crypto';

// In-memory only: a cost/performance optimisation, NOT a database. Resets on restart.
const cache = new NodeCache({ stdTTL: Number(process.env.CACHE_TTL_SECONDS) || 600, checkperiod: 120, useClones: false });

export const makeKey = ({ ingredients, diet, servings }) =>
  crypto.createHash('sha256')
    .update(`${ingredients.map((s) => s.toLowerCase()).sort().join(',')}|${diet}|${servings}`)
    .digest('hex');

export const getCached = (key) => cache.get(key);
export const setCached = (key, value) => cache.set(key, value);
