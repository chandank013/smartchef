import cookingPot from '../assets/cooking-pot.png';

const ImageIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="38"
    height="38"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="skeleton-img-icon"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const FlameIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8.5 14.5A3.5 3.5 0 0 0 12 18a3.5 3.5 0 0 0 3.5-3.5c0-2-1.5-3.5-2-5-.5 1.5-1 2-1.5 2-.5 0-1-.5-1-1 0-2 2-4.5 2-6.5-2.5 1.5-5 5.5-4.5 10.5z" />
  </svg>
);

export function Empty({ icon = '🍲', title, text, action, onAction }) {
  return (
    <div className="state">
      <div className="state-ico" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      {action && <button className="btn primary" onClick={onAction}>{action}</button>}
    </div>
  );
}

export function Loading() {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-hero">
        <div className="loading-pot-wrap">
          <img
            src={cookingPot}
            alt="Steaming cooking pot"
            className="loading-pot-art"
            width="150"
            height="117"
          />
        </div>
        <h1 className="loading-title">
          Preparing Your <span className="highlight-green">Recipes</span>
        </h1>
        <p className="loading-sub">
          Finding delicious meals with your ingredients...
        </p>
      </div>

      <div className="skeleton-grid" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-img-box skeleton-shimmer">
              <ImageIcon />
            </div>

            <div className="skeleton-body">
              <div className="skeleton-line skeleton-title skeleton-shimmer" />

              <div className="skeleton-meta">
                <span className="skeleton-meta-item">
                  <ClockIcon />
                  <span className="skeleton-line skeleton-meta-pill skeleton-shimmer" style={{ width: 44 }} />
                </span>
                <span className="skeleton-divider" />
                <span className="skeleton-meta-item">
                  <FlameIcon />
                  <span className="skeleton-line skeleton-meta-pill skeleton-shimmer" style={{ width: 40 }} />
                </span>
              </div>

              <div className="skeleton-desc">
                <div className="skeleton-line skeleton-desc-1 skeleton-shimmer" />
                <div className="skeleton-line skeleton-desc-2 skeleton-shimmer" />
              </div>

              <div className="skeleton-tags">
                <div className="skeleton-tag skeleton-shimmer" />
                <div className="skeleton-tag skeleton-shimmer" />
                <div className="skeleton-tag skeleton-shimmer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ErrorState({ message, onRetry, onBack }) {
  return (
    <div className="state" role="alert">
      <div className="err-ico" aria-hidden="true">!</div>
      <h3 className="err">Oops! Something went wrong.</h3>
      <p>{message}</p>
      <div className="row">
        <button className="btn primary" onClick={onRetry}>↻ Retry</button>
        {onBack && <button className="btn ghost" onClick={onBack}>New search</button>}
      </div>
    </div>
  );
}
