import { useState, useEffect, useRef } from 'react';
import FoodImage from './FoodImage';
import { dietLabel } from '../lib';

export default function RecipeDetails({
  recipe,
  diet,
  servings,
  saved,
  onToggle,
  onClose,
  onCook,
  onAddGrocery,
}) {
  const closeRef = useRef(null);
  const [selectedIngs, setSelectedIngs] = useState({});
  const [addedMsg, setAddedMsg] = useState(false);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const d = dietLabel(diet);
  const ingredients = recipe.ingredients || [];

  // Toggle selection for grocery list
  const toggleSelect = (idx) => {
    setSelectedIngs((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleAddGrocery = () => {
    const missing = ingredients.filter((_, idx) => selectedIngs[idx]);
    if (!missing.length) return;
    if (onAddGrocery) {
      onAddGrocery(
        missing.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          recipeTitle: recipe.title,
        }))
      );
      setAddedMsg(true);
      setTimeout(() => setAddedMsg(false), 2500);
      setSelectedIngs({});
    }
  };

  const handleShareWhatsApp = () => {
    const text = [
      `🍳 *${recipe.title}* on SmartChef`,
      `⏱ Time: ${recipe.time} | 🔥 ${recipe.calories} kcal | 🍽 ${servings} servings`,
      '',
      '*Ingredients:*',
      ...ingredients.map((i) => `• ${i.quantity} ${i.name}`),
      '',
      '*Instructions:*',
      ...(recipe.steps || []).map((s, n) => `${n + 1}. ${s}`),
      '',
      'Made with SmartChef 👨‍🍳',
    ].join('\n');
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const macros = recipe.macros || {
    protein: `${Math.round((recipe.calories || 400) * 0.05)}g`,
    carbs: `${Math.round((recipe.calories || 400) * 0.12)}g`,
    fats: `${Math.round((recipe.calories || 400) * 0.03)}g`,
  };

  const selectedCount = Object.values(selectedIngs).filter(Boolean).length;

  return (
    <div className="scrim" onClick={onClose}>
      <div
        className="modal recipe-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dt"
        onClick={(e) => e.stopPropagation()}
      >
        <FoodImage className="modal-img" src={recipe.imageUrl} alt={recipe.title} />

        <div className="modal-body">
          <button ref={closeRef} className="close" aria-label="Close recipe details" onClick={onClose}>
            ✕
          </button>

          <h2 id="dt" className="modal-title">{recipe.title}</h2>

          {/* Quick Meta */}
          <div className="meta">
            <span>⏱ {recipe.time}</span>
            <span className="cal">🔥 {recipe.calories} kcal</span>
            {d && <span className="diet">🌿 {d}</span>}
            <span>🍽 {servings} servings</span>
          </div>

          {/* Nutritional Macros Bar */}
          <div className="macros-bar" aria-label="Nutritional Macronutrients">
            <div className="macro-chip macro-p" title="Estimated Protein">
              <span className="macro-icon">🍗</span>
              <span className="macro-label">Protein</span>
              <b className="macro-val">{macros.protein}</b>
            </div>
            <div className="macro-chip macro-c" title="Estimated Carbohydrates">
              <span className="macro-icon">🍞</span>
              <span className="macro-label">Carbs</span>
              <b className="macro-val">{macros.carbs}</b>
            </div>
            <div className="macro-chip macro-f" title="Estimated Healthy Fats">
              <span className="macro-icon">🥑</span>
              <span className="macro-label">Fats</span>
              <b className="macro-val">{macros.fats}</b>
            </div>
          </div>

          {/* Action Row: Cook Mode, Print, Share */}
          <div className="modal-utility-actions">
            {onCook && (
              <button
                className="btn-cook-mode"
                onClick={() => onCook(recipe)}
                title="Open fullscreen hands-free cooking assistant"
              >
                👨‍🍳 Start Cooking
              </button>
            )}
            <button
              className="btn-util"
              onClick={() => window.print()}
              title="Print friendly recipe card or save as PDF"
            >
              🖨️ Print
            </button>
            <button
              className="btn-util"
              onClick={handleShareWhatsApp}
              title="Share recipe via WhatsApp"
            >
              💬 WhatsApp
            </button>
          </div>

          {/* Two-Column Ingredients & Steps */}
          <div className="two">
            <section className="modal-ings-sec">
              <div className="ings-sec-head">
                <h4>Ingredients ({servings} servings)</h4>
                <span className="ings-hint">Check missing items</span>
              </div>

              <ul className="ings checklist-ings">
                {ingredients.map((i, n) => (
                  <li
                    key={n}
                    className={`checklist-item ${selectedIngs[n] ? 'selected-missing' : ''}`}
                    onClick={() => toggleSelect(n)}
                  >
                    <input
                      type="checkbox"
                      checked={!!selectedIngs[n]}
                      onChange={() => toggleSelect(n)}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Mark ${i.name} as needed`}
                    />
                    <b>{i.quantity}</b>
                    <span>{i.name}</span>
                  </li>
                ))}
              </ul>

              {/* Add Missing to Grocery List */}
              <div className="grocery-add-wrap">
                <button
                  className="btn-add-grocery"
                  disabled={selectedCount === 0}
                  onClick={handleAddGrocery}
                >
                  🛒 Add {selectedCount > 0 ? selectedCount : ''} to Grocery List
                </button>
                {addedMsg && <span className="grocery-toast">✓ Added to Shopping List!</span>}
              </div>
            </section>

            <section className="modal-steps-sec">
              <h4>Instructions</h4>
              <ol className="steps">
                {(recipe.steps || []).map((s, n) => (
                  <li key={n}>{s}</li>
                ))}
              </ol>
            </section>
          </div>

          {/* Footer Favorite Action */}
          <div className="modal-footer-action">
            <button
              className={`btn ${saved ? 'danger' : 'primary'}`}
              onClick={onToggle}
            >
              {saved ? '🗑 Remove from favorites' : '♡ Save to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
