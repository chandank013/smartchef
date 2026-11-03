import { Router } from 'express';
import rateLimiter from '../middleware/rateLimiter.js';
import validateInput from '../middleware/validateInput.js';
import { makeKey, getCached, setCached } from '../utils/cache.js';
import { generateRecipes } from '../services/llmService.js';
import { attachImages } from '../services/imageService.js';

const router = Router();

// POST /api/generate-recipe  { ingredients: string[], diet, servings }
router.post('/generate-recipe', rateLimiter, validateInput, async (req, res, next) => {
  try {
    const reqData = req.recipeRequest;
    const key = makeKey(reqData);

    const hit = getCached(key);
    if (hit) return res.json({ success: true, recipes: hit, cached: true });

    const recipes = await attachImages(await generateRecipes(reqData));
    setCached(key, recipes);
    res.json({ success: true, recipes, cached: false });
  } catch (err) { next(err); }
});

export default router;
