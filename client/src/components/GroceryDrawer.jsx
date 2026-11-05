import { useEffect, useRef } from 'react';

export default function GroceryDrawer({
  isOpen,
  onClose,
  items = [],
  onToggleItem,
  onRemoveItem,
  onClearAll,
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

  const uncheckedCount = items.filter((i) => !i.checked).length;

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
        {/* Drawer Header */}
        <div className="grocery-header">
          <div className="grocery-title-wrap">
            <span className="grocery-cart-icon" aria-hidden="true">🛒</span>
            <div>
              <h2 className="grocery-title">Shopping List</h2>
              <p className="grocery-sub">
                {items.length === 0
                  ? 'Your list is empty'
                  : `${uncheckedCount} item${uncheckedCount === 1 ? '' : 's'} remaining (${items.length} total)`}
              </p>
            </div>
          </div>
          <button className="grocery-close-btn" onClick={onClose} aria-label="Close Shopping List">
            ✕
          </button>
        </div>

        {/* Action Bar */}
        {items.length > 0 && (
          <div className="grocery-actions-bar">
            <button className="btn-grocery-wa" onClick={shareWhatsApp} title="Share to WhatsApp">
              <span>💬</span> Send to WhatsApp
            </button>
            <button className="btn-grocery-clear" onClick={onClearAll} title="Clear all items">
              🗑 Clear All
            </button>
          </div>
        )}

        {/* Items List */}
        <div className="grocery-body">
          {items.length === 0 ? (
            <div className="grocery-empty">
              <span className="grocery-empty-icon" aria-hidden="true">🥦</span>
              <h3>No items to buy</h3>
              <p>
                Open any recipe, check the ingredients you need, and tap <b>"Add to Grocery List"</b>.
              </p>
            </div>
          ) : (
            <ul className="grocery-list">
              {items.map((item) => (
                <li key={item.id} className={`grocery-item ${item.checked ? 'checked' : ''}`}>
                  <label className="grocery-checkbox-label">
                    <input
                      type="checkbox"
                      checked={!!item.checked}
                      onChange={() => onToggleItem(item.id)}
                    />
                    <span className="grocery-custom-check" aria-hidden="true" />
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
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
