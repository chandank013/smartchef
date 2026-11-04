import { useEffect, useRef } from 'react';
import FoodImage from './FoodImage';
import { dietLabel } from '../lib';

export default function RecipeDetails({ recipe, diet, servings, saved, onToggle, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  const d = dietLabel(diet);
  return (
    <div className="scrim" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="dt" onClick={(e) => e.stopPropagation()}>
        <FoodImage className="modal-img" src={recipe.imageUrl} alt={recipe.title} />
        <div className="modal-body">
          <button ref={closeRef} className="close" aria-label="Close recipe details" onClick={onClose}>✕</button>
          <h2 id="dt">{recipe.title}</h2>
          <div className="meta"><span>⏱ {recipe.time}</span><span className="cal">🔥 {recipe.calories} kcal</span>{d && <span className="diet">🌿 {d}</span>}<span>🍽 {servings} servings</span></div>
          <div className="two">
            <section><h4>Ingredients ({servings} servings)</h4>
              <ul className="ings">{(recipe.ingredients || []).map((i, n) => <li key={n}><b>{i.quantity}</b><span>{i.name}</span></li>)}</ul></section>
            <section><h4>Steps</h4><ol className="steps">{(recipe.steps || []).map((s, n) => <li key={n}>{s}</li>)}</ol></section>
          </div>
          <button className={`btn ${saved ? 'danger' : 'primary'}`} onClick={onToggle}>{saved ? '🗑 Remove from favorites' : '♡ Save Recipe'}</button>
        </div>
      </div>
    </div>
  );
}
