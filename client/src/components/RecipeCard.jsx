import FoodImage from './FoodImage';
import { dietLabel, emojiFor } from '../lib';

// Used by both Results and Favorites (mode = 'results' | 'favorites').
export default function RecipeCard({ recipe, diet, saved, mode = 'results', onToggle, onView }) {
  const ings = recipe.ingredients || [];
  const d = dietLabel(diet);
  const desc = recipe.description || `Made with ${ings.slice(0, 3).map((i) => i.name.toLowerCase()).join(', ')}.`;
  return (
    <article className="card">
      <div className="card-img">
        <FoodImage src={recipe.imageUrl} alt={recipe.title} />
        <button className={`heart${saved ? ' on' : ''}`} aria-pressed={saved} aria-label={saved ? `Remove ${recipe.title} from favorites` : `Save ${recipe.title} to favorites`} onClick={onToggle}>{saved ? '♥' : '♡'}</button>
      </div>
      <div className="card-body">
        <h3>{recipe.title}</h3>
        <div className="meta"><span>⏱ {recipe.time}</span><span className="cal">🔥 {recipe.calories} kcal</span>{d && <span className="diet">🌿 {d}</span>}</div>
        <p className="desc">{desc}</p>
        <h4>Key Ingredients</h4>
        <ul className="dots">{ings.slice(0, 4).map((i, n) => <li key={n} title={i.name} aria-label={i.name}>{emojiFor(i.name)}</li>)}</ul>
        <div className="row">
          <button className="btn ghost" onClick={onView}>View Recipe</button>
          {mode === 'favorites'
            ? <button className="btn danger" onClick={onToggle}>🗑 Remove</button>
            : <button className="btn primary" onClick={onToggle} aria-pressed={saved}>{saved ? '♥ Saved' : '♡ Save Recipe'}</button>}
        </div>
      </div>
    </article>
  );
}
