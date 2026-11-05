import FoodImage from './FoodImage';
import { dietLabel, emojiFor } from '../lib';

const ChefHatIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 13.8a4.5 4.5 0 1 1 2.6-8.2 4.5 4.5 0 0 1 6.8 0 4.5 4.5 0 1 1 2.6 8.2" />
    <path d="M6 14h12v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4z" />
    <line x1="6" y1="18" x2="18" y2="18" />
  </svg>
);

const LeafBadgeIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 20A7 7 0 0 1 4 13a7 7 0 0 1 7-7 7 7 0 0 1 7 7 7 7 0 0 1-7 7z" />
    <path d="M11 20v-7a4 4 0 0 1 4-4h5" />
  </svg>
);

const HeartIcon = ({ filled = false }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const FlameIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8.5 14.5A3.5 3.5 0 0 0 12 18a3.5 3.5 0 0 0 3.5-3.5c0-2-1.5-3.5-2-5-.5 1.5-1 2-1.5 2-.5 0-1-.5-1-1 0-2 2-4.5 2-6.5-2.5 1.5-5 5.5-4.5 10.5z" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const LeafSectionIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 20A7 7 0 0 1 4 13a7 7 0 0 1 7-7 7 7 0 0 1 7 7 7 7 0 0 1-7 7z" />
    <path d="M11 20v-7a4 4 0 0 1 4-4h5" />
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="9" y1="7" x2="15" y2="7" />
    <line x1="9" y1="11" x2="13" y2="11" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export default function RecipeCard({ recipe, diet, saved, mode = 'explore', onToggle, onView }) {
  const ings = recipe.ingredients || [];
  const desc = recipe.description || `Quick and delicious meal prepared with ${ings.slice(0, 3).map((i) => i.name.toLowerCase()).join(', ')}.`;

  // Macro calculation fallback
  const macros = recipe.macros || (recipe.calories ? {
    protein: `${Math.round(recipe.calories * 0.05)}g`,
    carbs: `${Math.round(recipe.calories * 0.12)}g`,
    fats: `${Math.round(recipe.calories * 0.03)}g`,
  } : null);

  // Category badge determination
  const getCategoryBadge = () => {
    if (Array.isArray(recipe.category) && recipe.category.length > 0) {
      const match = recipe.category.find((c) => c === 'Quick & Easy' || c === 'Healthy' || c === 'Popular' || c === 'Veg');
      return match || recipe.category[0];
    }
    if (typeof recipe.category === 'string' && recipe.category) {
      return recipe.category;
    }
    const d = dietLabel(diet || recipe.diet);
    if (d) return d;
    const timeNum = parseInt(recipe.time, 10);
    if (!isNaN(timeNum) && timeNum <= 30) return 'Quick & Easy';
    return 'Quick & Easy';
  };

  const badgeText = getCategoryBadge();
  const isVegBadge = badgeText.toLowerCase().includes('veg');

  // Servings formatting
  const getServingsDisplay = () => {
    if (recipe.servings) {
      if (typeof recipe.servings === 'number') {
        return `${recipe.servings} servings`;
      }
      if (recipe.servings.toString().includes('serving')) {
        return recipe.servings;
      }
      return `${recipe.servings} servings`;
    }
    return '2-3 servings';
  };

  return (
    <article className="card">
      {/* 1. Food Image with Badges */}
      <div className="card-img">
        <FoodImage src={recipe.imageUrl} alt={recipe.title} />

        {badgeText && (
          <span className="recipe-cat-badge">
            {isVegBadge ? <LeafBadgeIcon /> : <ChefHatIcon />}
            {badgeText}
          </span>
        )}

        <button
          className={`card-heart-btn${saved ? ' saved' : ''}`}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${recipe.title} from favorites` : `Save ${recipe.title} to favorites`}
          onClick={onToggle}
          type="button"
        >
          <HeartIcon filled={saved} />
        </button>
      </div>

      {/* 2. Card Content Body */}
      <div className="card-body">
        <h3 className="card-title">{recipe.title}</h3>
        <p className="card-desc">{desc}</p>

        {/* 3. Metadata Chips */}
        <div className="card-meta-chips" aria-label="Recipe details">
          <span className="meta-chip meta-chip-time" title="Cooking time">
            <ClockIcon /> {recipe.time || '30 mins'}
          </span>
          <span className="meta-chip meta-chip-cal" title="Calories">
            <FlameIcon /> {recipe.calories ? `${recipe.calories} kcal` : '420 kcal'}
          </span>
          <span className="meta-chip meta-chip-servings" title="Servings">
            <UsersIcon /> {getServingsDisplay()}
          </span>
        </div>

        {/* 4. Nutrition Panel */}
        {macros && (
          <div className="card-nutrition-panel" aria-label="Nutrition information">
            <div className="nutrition-col">
              <span className="nutrition-ico" aria-hidden="true">🍗</span>
              <div className="nutrition-info">
                <span className="nutrition-val">{macros.protein}</span>
                <span className="nutrition-lbl">Protein</span>
              </div>
            </div>

            <div className="nutrition-sep" aria-hidden="true" />

            <div className="nutrition-col">
              <span className="nutrition-ico" aria-hidden="true">🍞</span>
              <div className="nutrition-info">
                <span className="nutrition-val">{macros.carbs}</span>
                <span className="nutrition-lbl">Carbs</span>
              </div>
            </div>

            <div className="nutrition-sep" aria-hidden="true" />

            <div className="nutrition-col">
              <span className="nutrition-ico" aria-hidden="true">🥑</span>
              <div className="nutrition-info">
                <span className="nutrition-val">{macros.fats}</span>
                <span className="nutrition-lbl">Fats</span>
              </div>
            </div>
          </div>
        )}

        {/* 5. Key Ingredients */}
        {ings.length > 0 && (
          <div className="card-ingredients-wrap">
            <h4 className="card-ingredients-header">
              <LeafSectionIcon /> Key Ingredients
            </h4>
            <div className="ingredient-plates-row" aria-label="Key ingredients">
              {ings.slice(0, 4).map((i, n) => (
                <div
                  key={n}
                  className="ingredient-plate"
                  title={`${i.name}${i.quantity ? ` (${i.quantity})` : ''}`}
                  aria-label={i.name}
                >
                  <span>{emojiFor(i.name)}</span>
                </div>
              ))}
              {ings.length > 4 && (
                <span className="ingredient-more-badge">
                  +{ings.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* 6. Action Buttons */}
        <div className="card-actions">
          <button className="card-btn-view" type="button" onClick={onView}>
            <BookIcon /> View Recipe
          </button>

          {mode === 'favorites' ? (
            <button className="card-btn-remove" type="button" onClick={onToggle}>
              <TrashIcon /> Remove
            </button>
          ) : (
            <button
              className={`card-btn-save${saved ? ' saved' : ''}`}
              type="button"
              onClick={onToggle}
              aria-pressed={saved}
            >
              <HeartIcon filled={saved} /> {saved ? 'Saved' : 'Save'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
