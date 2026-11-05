import { useEffect, useRef } from 'react';

const CartIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const CookingPotIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 10h18v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-7z" />
    <path d="M2 10h20" />
    <path d="M9 6v4" />
    <path d="M15 6v4" />
    <path d="M12 4v6" />
    <circle cx="12" cy="3" r="1" />
  </svg>
);

const ChecklistPlusIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    <line x1="9" y1="17" x2="15" y2="17" />
  </svg>
);

const UtensilsIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
    <path d="M15 2v19" />
    <path d="M5 2c0 2 1 4 3 4s3-2 3-4" />
    <path d="M8 6v15" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const GroceryBasketIllustration = () => (
  <div className="grocery-basket-graphic-wrap" aria-hidden="true">
    <svg viewBox="0 0 220 220" width="170" height="170" className="grocery-basket-svg">
      <defs>
        <radialGradient id="basketCircleGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#45B77A" stopOpacity="0.25" />
          <stop offset="85%" stopColor="#2F8B5B" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="basketWicker" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C48E56" />
          <stop offset="50%" stopColor="#A8723C" />
          <stop offset="100%" stopColor="#7E5124" />
        </linearGradient>
        <linearGradient id="basketRim" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4A066" />
          <stop offset="100%" stopColor="#8C5C2C" />
        </linearGradient>
      </defs>

      {/* Background Soft Circle */}
      <circle cx="110" cy="110" r="95" fill="url(#basketCircleGlow)" />
      <circle cx="110" cy="110" r="82" className="grocery-basket-circle-bg" />

      {/* Baguette */}
      <g transform="rotate(35 150 90)">
        <rect x="145" y="40" width="22" height="75" rx="10" fill="#D89D52" />
        <ellipse cx="156" cy="55" rx="5" ry="2" fill="#B37834" opacity="0.6" />
        <ellipse cx="156" cy="75" rx="5" ry="2" fill="#B37834" opacity="0.6" />
        <ellipse cx="156" cy="95" rx="5" ry="2" fill="#B37834" opacity="0.6" />
      </g>

      {/* Milk Bottle */}
      <rect x="62" y="68" width="24" height="48" rx="4" fill="#FFFFFF" stroke="#DCE4DF" strokeWidth="1.5" />
      <rect x="66" y="58" width="16" height="12" rx="2" fill="#FFFFFF" stroke="#DCE4DF" strokeWidth="1" />
      <rect x="68" y="54" width="12" height="6" rx="2" fill="#3B82F6" />
      <rect x="64" y="80" width="20" height="14" fill="#93C5FD" opacity="0.5" rx="1" />

      {/* Lettuce / Greens Leaves */}
      <path d="M85 75 C80 50, 115 45, 120 70 C125 50, 150 55, 145 80 Z" fill="#45B77A" />
      <path d="M95 80 C95 60, 130 55, 135 85 Z" fill="#2F8B5B" />
      <path d="M102 68 Q110 58 116 78" stroke="#A7F3D0" strokeWidth="1.5" fill="none" />

      {/* Carrot */}
      <g transform="rotate(-25 100 85)">
        <path d="M100 60 L108 100 L94 100 Z" fill="#F28B35" />
        <line x1="97" y1="72" x2="103" y2="72" stroke="#D96E14" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="98" y1="84" x2="105" y2="84" stroke="#D96E14" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M100 60 C96 48 90 45 92 40 C97 45 99 50 100 58" fill="#10B981" />
        <path d="M100 60 C101 45 105 40 108 38 C107 46 104 52 101 58" fill="#059669" />
      </g>

      {/* Red Ripe Tomato */}
      <circle cx="82" cy="108" r="18" fill="#EF4444" />
      <ellipse cx="80" cy="104" rx="14" ry="12" fill="#DC2626" />
      <ellipse cx="76" cy="100" rx="4" ry="2" fill="#FCA5A5" opacity="0.6" />
      <path d="M82 92 L80 87 L84 89 L86 85 L85 91 L89 92 L84 94 L83 97 L81 93 Z" fill="#15803D" />

      {/* Yellow Bell Pepper */}
      <path d="M136 102 C132 94 148 94 146 102 C146 112 142 120 134 118 C128 118 126 108 136 102 Z" fill="#FBBF24" />
      <path d="M140 95 L141 89" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />

      {/* Basket Base */}
      <ellipse cx="110" cy="120" rx="55" ry="14" fill="#5C3B19" />
      <ellipse cx="110" cy="116" rx="56" ry="13" fill="url(#basketRim)" stroke="#664019" strokeWidth="1" />
      <path d="M57 118 C62 165, 80 174, 110 174 C140 174, 158 165, 163 118 Z" fill="url(#basketWicker)" stroke="#664019" strokeWidth="1.5" />
      <path d="M60 132 C78 142 142 142 160 132" stroke="#6B4119" strokeWidth="2.5" fill="none" opacity="0.75" />
      <path d="M65 146 C80 156 140 156 155 146" stroke="#6B4119" strokeWidth="2.5" fill="none" opacity="0.75" />
      <path d="M74 160 C86 168 134 168 146 160" stroke="#6B4119" strokeWidth="2.5" fill="none" opacity="0.75" />
      <path d="M82 122 L88 170" stroke="#523112" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <path d="M110 123 L110 174" stroke="#523112" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <path d="M138 122 L132 170" stroke="#523112" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <path d="M54 116 C60 128 160 128 166 116" stroke="#DDA86D" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

export default function GroceryDrawer({
  isOpen,
  onClose,
  items = [],
  onToggleItem,
  onRemoveItem,
  onClearAll,
  onExplore,
}) {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const checkedCount = items.filter((i) => i.checked).length;
  const uncheckedCount = items.length - checkedCount;
  const progressPct = items.length > 0 ? Math.round((checkedCount / items.length) * 100) : 0;

  const shareWhatsApp = () => {
    if (!items.length) return;
    const text = [
      '🛒 *SmartChef Grocery & Shopping List*',
      '',
      ...items.map(
        (i) => `${i.checked ? '✅' : '⬜'} ${i.quantity ? i.quantity + ' ' : ''}${i.name}${i.recipeTitle ? ` _(${i.recipeTitle})_` : ''}`
      ),
      '',
      'Generated with SmartChef 👨‍🍳',
    ].join('\n');
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleClearCompleted = () => {
    const checked = items.filter((i) => i.checked);
    checked.forEach((item) => onRemoveItem(item.id));
  };

  return (
    <div className="grocery-scrim" onClick={onClose}>
      <aside
        className="grocery-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Smart Grocery List"
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Header */}
        <div className="grocery-header">
          <div className="grocery-title-wrap">
            <div className="grocery-cart-icon-container" aria-hidden="true">
              <CartIcon />
            </div>
            <div>
              <h2 className="grocery-title">Shopping List</h2>
              <p className="grocery-sub">Your grocery list for selected recipes</p>
            </div>
          </div>
          <button className="grocery-close-btn" onClick={onClose} aria-label="Close Shopping List">
            <CloseIcon />
          </button>
        </div>

        {/* 2. Body: Empty State or Items List */}
        <div className="grocery-body">
          {items.length === 0 ? (
            /* Empty State */
            <div className="grocery-empty-container">
              {/* Corner Decorative Outlines */}
              <div className="grocery-decor decor-top-left" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="13" r="8" />
                  <path d="M12 5V2M10 4l4-1" />
                </svg>
              </div>
              <div className="grocery-decor decor-top-right" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M11 20A7 7 0 0 1 4 13a7 7 0 0 1 7-7 7 7 0 0 1 7 7 7 7 0 0 1-7 7z" />
                </svg>
              </div>

              {/* Basket Illustration */}
              <GroceryBasketIllustration />

              {/* Empty Message */}
              <h3 className="grocery-empty-title">No items to buy yet</h3>
              <p className="grocery-empty-desc">
                Open any recipe, check the ingredients you need, and{' '}
                <span className="grocery-highlight-pill">Add to Grocery List</span>.
              </p>

              {/* 3-Step "How It Works" Section */}
              <div className="grocery-how-it-works" aria-label="How it works">
                <div className="how-step-card">
                  <div className="how-step-icon-wrap" aria-hidden="true">
                    <CookingPotIcon />
                  </div>
                  <div className="how-step-content">
                    <h4 className="how-step-title">1. Open a Recipe</h4>
                    <p className="how-step-desc">Explore recipes you like</p>
                  </div>
                </div>

                <div className="how-step-arrow" aria-hidden="true">
                  <ArrowRightIcon />
                </div>

                <div className="how-step-card">
                  <div className="how-step-icon-wrap" aria-hidden="true">
                    <ChecklistPlusIcon />
                  </div>
                  <div className="how-step-content">
                    <h4 className="how-step-title">2. Add Ingredients</h4>
                    <p className="how-step-desc">Tap Add to Grocery List</p>
                  </div>
                </div>

                <div className="how-step-arrow" aria-hidden="true">
                  <ArrowRightIcon />
                </div>

                <div className="how-step-card">
                  <div className="how-step-icon-wrap" aria-hidden="true">
                    <CartIcon />
                  </div>
                  <div className="how-step-content">
                    <h4 className="how-step-title">3. Shop Easily</h4>
                    <p className="how-step-desc">Get a ready-to-buy list</p>
                  </div>
                </div>
              </div>

              {/* Prominent Explore Recipes Button */}
              <button
                className="btn-grocery-explore"
                type="button"
                onClick={onExplore || onClose}
              >
                <UtensilsIcon />
                <span>Explore Recipes</span>
              </button>

              {/* Bottom Decorative Outlines */}
              <div className="grocery-decor decor-bottom-left" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8 2 6 6 6 10c0 5 3 10 6 12 3-2 6-7 6-12 0-4-2-8-6-8z" />
                </svg>
              </div>
              <div className="grocery-decor decor-bottom-right" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <line x1="12" y1="3" x2="12" y2="21" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                </svg>
              </div>
            </div>
          ) : (
            /* Populated Grocery Checklist State */
            <div className="grocery-populated-wrap">
              {/* Progress Bar */}
              <div className="grocery-progress-card">
                <div className="grocery-progress-header">
                  <span className="grocery-progress-label">Shopping Progress</span>
                  <span className="grocery-progress-stats">
                    {checkedCount} of {items.length} completed ({progressPct}%)
                  </span>
                </div>
                <div className="grocery-progress-bar-track">
                  <div
                    className="grocery-progress-bar-fill"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Action Bar */}
              <div className="grocery-actions-bar">
                <button className="btn-grocery-wa" onClick={shareWhatsApp} title="Share to WhatsApp">
                  <span>💬</span> Send to WhatsApp
                </button>
                {checkedCount > 0 && (
                  <button className="btn-grocery-clear-done" onClick={handleClearCompleted} title="Clear purchased items">
                    ✓ Clear Done
                  </button>
                )}
                <button className="btn-grocery-clear" onClick={onClearAll} title="Clear all items">
                  <TrashIcon /> Clear All
                </button>
              </div>

              {/* Items List */}
              <ul className="grocery-list">
                {items.map((item) => (
                  <li key={item.id} className={`grocery-item ${item.checked ? 'checked' : ''}`}>
                    <label className="grocery-checkbox-label">
                      <input
                        type="checkbox"
                        checked={!!item.checked}
                        onChange={() => onToggleItem(item.id)}
                      />
                      <span className="grocery-custom-check" aria-hidden="true">
                        {item.checked && (
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      <div className="grocery-item-details">
                        <span className="grocery-item-name">{item.name}</span>
                        {item.quantity && (
                          <span className="grocery-item-qty">{item.quantity}</span>
                        )}
                        {item.recipeTitle && (
                          <span className="grocery-item-recipe">For: {item.recipeTitle}</span>
                        )}
                      </div>
                    </label>
                    <button
                      className="grocery-item-del"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      title="Remove item"
                    >
                      <TrashIcon />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
