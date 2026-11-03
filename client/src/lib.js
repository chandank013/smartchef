export const DIETS = [['any', 'Any'], ['vegetarian', 'Vegetarian'], ['vegan', 'Vegan'], ['gluten-free', 'Gluten-Free'], ['keto', 'Keto']];
export const dietLabel = (v) => (v && v !== 'any' ? (DIETS.find((d) => d[0] === v) || [0, v])[1] : '');
export const keyOf = (r) => r.title.trim().toLowerCase();
const EMOJI = { rice: '🍚', tomato: '🍅', onion: '🧅', garlic: '🧄', egg: '🥚', cheese: '🧀', pasta: '🍝', potato: '🥔', chicken: '🍗', spinach: '🥬', pepper: '🫑', coriander: '🌿', basil: '🌿', oil: '🫒', milk: '🥛', carrot: '🥕', mushroom: '🍄' };
export const emojiFor = (name = '') => { const n = name.toLowerCase(); const k = Object.keys(EMOJI).find((x) => n.includes(x)); return k ? EMOJI[k] : '🥣'; };
