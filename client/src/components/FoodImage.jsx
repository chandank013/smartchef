import { useState, useEffect } from 'react';

// Shows the backend-provided photo; falls back to a designed placeholder if missing or broken.
export default function FoodImage({ src, alt, className = '' }) {
  const [bad, setBad] = useState(!src);
  useEffect(() => setBad(!src), [src]);
  if (bad) return <div className={`fallback ${className}`} role="img" aria-label={`${alt} (image unavailable)`}><span>🍳</span><small>Recipe Image</small></div>;
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />;
}
