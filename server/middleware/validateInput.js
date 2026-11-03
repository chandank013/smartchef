const DIETS = ['any', 'vegetarian', 'vegan', 'gluten-free', 'keto'];

// Strips characters that could be used to break out of the prompt template.
const clean = (s) => s.replace(/[<>{}`$\\\u0000-\u001f]/g, ' ').replace(/\s+/g, ' ').trim();

export default function validateInput(req, res, next) {
  const { ingredients, diet = 'any', servings = 2 } = req.body || {};
  const fail = (msg) => res.status(400).json({ success: false, error: msg });

  if (!Array.isArray(ingredients)) return fail('Ingredients must be a list.');
  const list = [...new Set(ingredients.filter((i) => typeof i === 'string').map(clean).filter(Boolean))];
  if (!list.length) return fail('Ingredient list cannot be empty.');
  if (list.length > 20) return fail('Please use 20 ingredients or fewer.');
  if (list.some((i) => i.length > 40) || list.join(', ').length > 200) return fail('Ingredient list is too long (max 200 characters).');
  if (!DIETS.includes(diet)) return fail(`Diet must be one of: ${DIETS.join(', ')}.`);
  const n = Number(servings);
  if (!Number.isInteger(n) || n < 1 || n > 8) return fail('Servings must be a whole number from 1 to 8.');

  req.recipeRequest = { ingredients: list, diet, servings: n };
  next();
}
