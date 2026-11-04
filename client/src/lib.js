export const DIETS = [
  ['any', 'Any'],
  ['vegetarian', 'Vegetarian'],
  ['vegan', 'Vegan'],
  ['gluten-free', 'Gluten-Free'],
  ['keto', 'Keto'],
];

export const CATEGORIES = [
  'All Recipes',
  'Popular',
  'Quick & Easy',
  'Healthy',
  'Veg',
  'Non-Veg',
];

export const TIME_OPTIONS = [
  { value: 'any', label: 'Time: Any' },
  { value: '25', label: 'Time: < 25 mins' },
  { value: '40', label: 'Time: < 40 mins' },
  { value: '50', label: 'Time: < 50 mins' },
  { value: '60plus', label: 'Time: 60+ mins' },
];

export const CALORIE_OPTIONS = [
  { value: 'any', label: 'Calories: Any' },
  { value: '400', label: 'Calories: < 400 kcal' },
  { value: '600', label: 'Calories: < 600 kcal' },
  { value: '750', label: 'Calories: < 750 kcal' },
  { value: '800plus', label: 'Calories: 800+ kcal' },
];

export const SORT_OPTIONS = [
  { value: 'relevant', label: 'Most Relevant' },
  { value: 'quickest', label: 'Quickest' },
  { value: 'cal-asc', label: 'Lowest Calories' },
  { value: 'cal-desc', label: 'Highest Calories' },
];

export const dietLabel = (v) =>
  v && v !== 'any' ? (DIETS.find((d) => d[0] === v) || [0, v])[1] : '';

export const keyOf = (r) => r.title.trim().toLowerCase();

const EMOJI = {
  rice: '🍚',
  tomato: '🍅',
  onion: '🧅',
  garlic: '🧄',
  egg: '🥚',
  cheese: '🧀',
  pasta: '🍝',
  potato: '🥔',
  chicken: '🍗',
  spinach: '🥬',
  pepper: '🫑',
  coriander: '🌿',
  basil: '🌿',
  oil: '🫒',
  milk: '🥛',
  carrot: '🥕',
  mushroom: '🍄',
  chili: '🌶️',
  lemon: '🍋',
  turmeric: '🧂',
  curry: '🍛',
};

export const emojiFor = (name = '') => {
  const n = name.toLowerCase();
  const k = Object.keys(EMOJI).find((x) => n.includes(x));
  return k ? EMOJI[k] : '🥣';
};

// Initial featured recipes shown on the Explore page matching the reference design
export const CURATED_EXPLORE_RECIPES = [
  {
    title: 'Spicy Chicken Fried Rice',
    description: 'A quick, flavorful fried rice with tender chicken and a kick of spice.',
    time: '30 mins',
    calories: 720,
    diet: 'any',
    category: ['Popular', 'Quick & Easy', 'Non-Veg'],
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'chicken', quantity: '250g diced' },
      { name: 'rice', quantity: '2 cups cooked' },
      { name: 'onion', quantity: '1 medium' },
      { name: 'garlic', quantity: '3 cloves' },
      { name: 'chili', quantity: '1 tsp flakes' },
      { name: 'oil', quantity: '2 tbsp' },
    ],
    steps: [
      'Heat oil in a wok over high heat and sauté minced garlic and chopped onion.',
      'Add diced chicken and stir-fry until cooked through and lightly golden.',
      'Toss in cooked rice and chili flakes, stirring rapidly for 3-4 minutes.',
      'Season with soy sauce, garnish with green onions, and serve hot.',
    ],
  },
  {
    title: 'Chicken Turmeric Rice Pilaf',
    description: 'A comforting one-pot meal of chicken simmered with aromatic tumeric rice.',
    time: '45 mins',
    calories: 680,
    diet: 'gluten-free',
    category: ['Popular', 'Healthy', 'Non-Veg'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'chicken', quantity: '300g pieces' },
      { name: 'rice', quantity: '1.5 cups basmati' },
      { name: 'turmeric', quantity: '1.5 tsp' },
      { name: 'onion', quantity: '1 sliced' },
      { name: 'garlic', quantity: '2 cloves' },
      { name: 'lemon', quantity: '1/2 wedge' },
    ],
    steps: [
      'Brown seasoned chicken thighs in a skillet until crisp on both sides, then set aside.',
      'In the same skillet, soften sliced onions with garlic and turmeric powder.',
      'Stir in basmati rice to coat in the fragrant golden oil.',
      'Pour in broth, nestle chicken back on top, cover tightly, and simmer on low for 20 minutes.',
      'Fluff with a fork, squeeze fresh lemon over the top, and serve warm.',
    ],
  },
  {
    title: 'Chicken Curry',
    description: 'A rich and flavorful chicken curry made with everyday spices.',
    time: '40 mins',
    calories: 560,
    diet: 'gluten-free',
    category: ['Popular', 'Non-Veg'],
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'chicken', quantity: '400g bone-in or boneless' },
      { name: 'tomato', quantity: '2 ripe pureed' },
      { name: 'onion', quantity: '2 finely chopped' },
      { name: 'garlic', quantity: '4 cloves minced' },
      { name: 'coriander', quantity: 'handful chopped' },
      { name: 'oil', quantity: '2 tbsp' },
    ],
    steps: [
      'Heat oil in a heavy-bottomed pot and brown chopped onions until deep caramel golden.',
      'Add ginger garlic paste and sauté for 1 minute until fragrant.',
      'Stir in pureed tomatoes, ground turmeric, coriander, and chili powder.',
      'Add chicken pieces, coat thoroughly in masala, and simmer covered for 25 minutes until tender.',
      'Garnish generously with chopped cilantro and serve with warm rice or flatbread.',
    ],
  },
  {
    title: 'Chicken Biryani',
    description: 'A classic, aromatic biryani with tender chicken and fragrant basmati rice.',
    time: '60 mins',
    calories: 840,
    diet: 'any',
    category: ['Popular', 'Non-Veg'],
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'chicken', quantity: '500g marinated' },
      { name: 'rice', quantity: '2 cups aged basmati' },
      { name: 'onion', quantity: '2 large fried crisp' },
      { name: 'garlic', quantity: '1 tbsp paste' },
      { name: 'coriander', quantity: 'fresh mint & cilantro' },
      { name: 'curry', quantity: 'whole spices' },
    ],
    steps: [
      'Marinate chicken in yogurt, garlic, ginger, turmeric, and biryani spices for 30 minutes.',
      'Parboil soaked basmati rice with whole cardamom, cloves, and bay leaf until 70% cooked.',
      'Layer marinated chicken at the base of a heavy pot, top with fragrant parboiled rice.',
      'Scatter crispy fried onions (birista), fresh mint, coriander, and a drizzle of saffron milk.',
      'Seal pot with lid and cook on low heat (dum) for 25-30 minutes until steaming and tender.',
    ],
  },
];

// Helper to filter recipes by search keyword, category, diet, time, calories, and sort
export function filterAndSortRecipes(recipes, { search, category, diet, time, calories, sortBy }) {
  let list = [...recipes];

  // 1. Search keyword (matches title or ingredient name)
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter((r) => {
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchDesc = r.description && r.description.toLowerCase().includes(q);
      const matchIng = (r.ingredients || []).some((i) => i.name.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchIng;
    });
  }

  // 2. Category Filter
  if (category && category !== 'All Recipes') {
    list = list.filter((r) => {
      const title = r.title.toLowerCase();
      const desc = (r.description || '').toLowerCase();
      const ings = (r.ingredients || []).map((i) => i.name.toLowerCase()).join(' ');

      if (category === 'Popular') {
        return (r.category && r.category.includes('Popular')) || r.calories > 500;
      }
      if (category === 'Quick & Easy') {
        const mins = parseInt(r.time, 10) || 30;
        return mins <= 30;
      }
      if (category === 'Healthy') {
        return r.calories <= 550 || r.diet === 'vegan' || r.diet === 'vegetarian';
      }
      if (category === 'Veg') {
        return (
          r.diet === 'vegetarian' ||
          r.diet === 'vegan' ||
          (!title.includes('chicken') && !title.includes('meat') && !ings.includes('chicken'))
        );
      }
      if (category === 'Non-Veg') {
        return (
          title.includes('chicken') ||
          title.includes('meat') ||
          title.includes('fish') ||
          ings.includes('chicken') ||
          ings.includes('meat')
        );
      }
      return true;
    });
  }

  // 3. Dietary Filter
  if (diet && diet !== 'any') {
    list = list.filter((r) => r.diet === diet || r.diet === 'any');
  }

  // 4. Time Filter
  if (time && time !== 'any') {
    list = list.filter((r) => {
      const m = parseInt(r.time, 10) || 30;
      if (time === '25') return m <= 25;
      if (time === '40') return m <= 40;
      if (time === '50') return m <= 50;
      if (time === '60plus') return m >= 55;
      return true;
    });
  }

  // 5. Calories Filter
  if (calories && calories !== 'any') {
    list = list.filter((r) => {
      const c = r.calories || 0;
      if (calories === '400') return c <= 400;
      if (calories === '600') return c <= 600;
      if (calories === '750') return c <= 750;
      if (calories === '800plus') return c >= 750;
      return true;
    });
  }

  // 6. Sort
  if (sortBy === 'quickest') {
    list.sort((a, b) => (parseInt(a.time, 10) || 30) - (parseInt(b.time, 10) || 30));
  } else if (sortBy === 'cal-asc') {
    list.sort((a, b) => (a.calories || 0) - (b.calories || 0));
  } else if (sortBy === 'cal-desc') {
    list.sort((a, b) => (b.calories || 0) - (a.calories || 0));
  }

  return list;
}
