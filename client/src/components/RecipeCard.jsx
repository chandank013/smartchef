import FoodImage from './FoodImage';
import { dietLabel, emojiFor } from '../lib';

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
  </svg>
);

const FlameIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8.5 14.5A3.5 3.5 0 0 0 12 18a3.5 3.5 0 0 0 3.5-3.5c0-2-1.5-3.5-2-5-.5 1.5-1 2-1.5 2-.5 0-1-.5-1-1 0-2 2-4.5 2-6.5-2.5 1.5-5 5.5-4.5 10.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

// Used by Explore, Home Results, and Favorites (mode = 'explore' | 'results' | 'favorites')
export default function RecipeCard({ recipe, diet, saved, mode = 'explore', onToggle, onView }) {
  const ings = recipe.ingredients || [];
  const d = dietLabel(diet);
  const desc = recipe.description || `Made with ${ings.slice(0, 3).map((i) => i.name.toLowerCase()).join(', ')}.`;
  const macros = recipe.macros || (recipe.calories ? {
    protein: `${Math.round(recipe.calories * 0.05)}g`,
    carbs: `${Math.round(recipe.calories * 0.12)}g`,
    fats: `${Math.round(recipe.calories * 0.03)}g`,
  } : null);

  return (
    <article className="card">
      <div className="card-img">
        <FoodImage src={recipe.imageUrl} alt={recipe.title} />
        <button
          className={`heart-btn${saved ? ' on' : ''}`}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${recipe.title} from favorites` : `Save ${recipe.title} to favorites`}
          onClick={onToggle}
        >
          {saved ? '♥' : '♡'}
        </button>
      </div>

      <div className="card-body">
        <h3 className="card-title">{recipe.title}</h3>

        <div className="card-meta">
          <span className="card-time">
            <ClockIcon /> {recipe.time}
          </span>
          <span className="card-cal">
            <FlameIcon /> {recipe.calories} kcal
          </span>
          {d && <span className="diet-tag">🌿 {d}</span>}
        </div>

        {macros && (
          <div className="card-macros" aria-label="Nutritional macros">
            <span title="Protein">🍗 {macros.protein}</span>
            <span className="macro-dot">·</span>
            <span title="Carbohydrates">🍞 {macros.carbs}</span>
            <span className="macro-dot">·</span>
            <span title="Fats">🥑 {macros.fats}</span>
          </div>
        )}

        <p className="card-desc">{desc}</p>

        <h4 className="card-ings-title">Key Ingredients</h4>
        <ul className="dots" aria-label="Key ingredients">
          {ings.slice(0, 4).map((i, n) => (
            <li key={n} title={i.name} aria-label={i.name}>
              {emojiFor(i.name)}
            </li>
          ))}
        </ul>

        <div className="card-actions">
          <button className="btn-outline-green" type="button" onClick={onView}>
            View Recipe
          </button>
          {mode === 'favorites' ? (
            <button className="btn-outline-danger" type="button" onClick={onToggle}>
              <TrashIcon /> Remove
            </button>
          ) : (
            <button
              className={`btn-solid-green${saved ? ' saved' : ''}`}
              type="button"
              onClick={onToggle}
              aria-pressed={saved}
            >
              {saved ? '♥ Saved' : '♡ Save'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
