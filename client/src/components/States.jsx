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
    <div role="status" aria-live="polite">
      <div className="state">
        <div className="state-ico" aria-hidden="true">👨‍🍳</div>
        <h3>Generating your recipes...</h3>
        <p>This may take a few seconds. Our AI is cooking up something special for you!</p>
      </div>
      <div className="grid" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="card skel">
            <div className="sk sk-img" />
            <div className="sk sk-l" />
            <div className="sk sk-s" />
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
        <button className="btn ghost" onClick={onBack}>New search</button>
      </div>
    </div>
  );
}
