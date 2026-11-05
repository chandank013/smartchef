import { useState, useRef, useLayoutEffect } from 'react';
import heroArt from '../assets/hero-art.webp';
import { DIETS } from '../lib';

const Icon = ({ children, size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{children}</svg>
);
const SearchIcon = (p) => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>;
const ClockIcon = (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>;
const WandIcon = (p) => <Icon {...p}><path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8 19 13M17.8 6.2 19 5M3 21l9-9M12.2 6.2 11 5" /></Icon>;
const CameraIcon = (p) => (
  <Icon {...p}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </Icon>
);

const MEAL_TYPES = [
  ['any', 'Any Meal'],
  ['breakfast', '🍳 Breakfast'],
  ['lunch', '🥗 Lunch'],
  ['dinner', '🍲 Dinner'],
  ['snack', '🥨 Snack'],
];

const MAX_TIMES = [
  ['any', 'Any Time'],
  ['20', '⚡ Quick (< 20 mins)'],
  ['45', '⏱ Normal (< 45 mins)'],
];

export default function IngredientForm({ initial, history, onSubmit, busy, onScanFridge, scanning }) {
  const [text, setText] = useState(initial ? initial.ingredients.join(', ') : '');
  const [diet, setDiet] = useState(initial?.diet || 'any');
  const [servings, setServings] = useState(initial?.servings || 2);
  const [mealType, setMealType] = useState(initial?.mealType || 'any');
  const [maxTime, setMaxTime] = useState(initial?.maxTime || 'any');
  const [err, setErr] = useState('');
  const [scanToast, setScanToast] = useState('');
  const [showAll, setShowAll] = useState(false);
  const inputRef = useRef(null);
  const chipsRef = useRef(null);
  const fileInputRef = useRef(null);
  const [overflow, setOverflow] = useState(false);

  // "See all" only appears when the single chip row is too narrow to show every search.
  useLayoutEffect(() => {
    const el = chipsRef.current; if (!el) return undefined;
    const check = () => { if (!showAll) setOverflow(el.scrollWidth > el.clientWidth + 1); };
    check();
    const ro = new ResizeObserver(check); ro.observe(el);
    return () => ro.disconnect();
  }, [history, showAll]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !onScanFridge) return;
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const detected = await onScanFridge(reader.result);
          if (detected && detected.length) {
            const combined = [...new Set([
              ...text.split(',').map((s) => s.trim()).filter(Boolean),
              ...detected,
            ])];
            setText(combined.join(', '));
            setScanToast(`✓ Vision AI detected: ${detected.join(', ')}`);
            setTimeout(() => setScanToast(''), 6000);
          }
        } catch (err) {
          setErr(err.message || 'Could not scan photo');
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setErr('Failed to read image file');
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const ingredients = [...new Set(text.split(',').map((s) => s.trim()).filter(Boolean))];
    if (!ingredients.length) return setErr('Please enter at least one ingredient, or snap a fridge photo!');
    setErr('');
    onSubmit({ ingredients, diet, servings, mealType, maxTime });
  };

  const step = (d) => setServings((s) => Math.min(8, Math.max(1, s + d)));

  // Recent-search chips fill the form so the user can tweak and re-run it.
  const pick = (q) => {
    setText(q.ingredients.join(', '));
    setDiet(q.diet || 'any');
    setServings(q.servings || 2);
    setMealType(q.mealType || 'any');
    setMaxTime(q.maxTime || 'any');
    setErr('');
    inputRef.current?.focus();
  };

  return (
    <>
    <section className="hero">
      <div className="hero-main">
        <p className="eyebrow">AI-POWERED RECIPE &amp; MEAL PLANNING ASSISTANT</p>
        <h1>Make something <em>delicious.</em></h1>
        <p className="sub">Tell us what's in your kitchen or snap a fridge photo. We'll find your next favorite meal.</p>

        <form className="panel" onSubmit={submit} noValidate>
          <div className="field-lbl-wrap">
            <label htmlFor="ing" className="lbl">What ingredients do you have?</label>
            <label className={`btn-fridge-scan ${scanning ? 'scanning' : ''}`} title="Scan fridge photo using Multimodal AI">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoUpload}
                disabled={scanning}
                style={{ display: 'none' }}
              />
              <CameraIcon size={16} />
              <span>{scanning ? 'Scanning Fridge...' : '📷 Scan Fridge Photo'}</span>
            </label>
          </div>

          <div className="field">
            <SearchIcon />
            <input
              id="ing"
              ref={inputRef}
              className="txt"
              type="text"
              maxLength={200}
              value={text}
              autoComplete="off"
              placeholder="e.g. rice, tomato, onion, cheese, chicken..."
              aria-invalid={!!err}
              aria-describedby="ing-help"
              onChange={(e) => { setText(e.target.value); setErr(''); }}
            />
          </div>

          <div className="help" id="ing-help">
            <span>Tip: Separate ingredients with commas or use <b>Scan Fridge</b></span>
            <span>{text.length}/200</span>
          </div>

          {scanToast && <p className="scan-toast" role="status">{scanToast}</p>}
          {err && <p className="field-err" role="alert">{err}</p>}

          {/* Smart Filters: Meal Type & Time Limit */}
          <div className="smart-filters-wrap">
            <div className="smart-filter-group">
              <span className="lbl-smart">Meal Type:</span>
              <div className="smart-chips-row">
                {MEAL_TYPES.map(([val, label]) => (
                  <button
                    type="button"
                    key={val}
                    className={`smart-chip ${mealType === val ? 'active' : ''}`}
                    onClick={() => setMealType(val)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="smart-filter-group">
              <span className="lbl-smart">Cooking Time:</span>
              <div className="smart-chips-row">
                {MAX_TIMES.map(([val, label]) => (
                  <button
                    type="button"
                    key={val}
                    className={`smart-chip ${maxTime === val ? 'active' : ''}`}
                    onClick={() => setMaxTime(val)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="controls">
            <div>
              <label htmlFor="diet" className="lbl">Dietary preference</label>
              <select id="diet" value={diet} onChange={(e) => setDiet(e.target.value)}>
                {DIETS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <span className="lbl" id="srv">Number of servings</span>
              <div className="stepper" role="group" aria-labelledby="srv">
                <button type="button" aria-label="Decrease servings" onClick={() => step(-1)} disabled={servings <= 1}>−</button>
                <output aria-live="polite">{servings}</output>
                <button type="button" aria-label="Increase servings" onClick={() => step(1)} disabled={servings >= 8}>+</button>
              </div>
            </div>
            <button className="btn primary big" type="submit" disabled={busy || scanning}>
              {busy ? <><span className="spin" aria-hidden="true" /> Generating...</> : <><WandIcon /> Generate Recipes</>}
            </button>
          </div>
        </form>
      </div>

      <img
        className="hero-image"
        src={heroArt}
        width="760"
        height="618"
        alt="Cheerful chef tossing tomatoes, basil, chili and mushrooms from a pan"
      />

      <section className="recent" aria-labelledby="rs">
        <div className="recent-head">
          <h2 id="rs"><ClockIcon size={16} /> Recent Searches</h2>
          {(overflow || showAll) && (
            <button
              type="button"
              className="link"
              aria-expanded={showAll}
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? 'Show less' : 'See all'}
            </button>
          )}
        </div>
        {history.length === 0 ? (
          <p className="recent-empty">Your recent searches will appear here</p>
        ) : (
          <div className={`chips${showAll ? ' wrap' : ''}`} ref={chipsRef}>
            {history.map((q, i) => (
              <button
                key={i}
                type="button"
                className="chip"
                onClick={() => pick(q)}
                title={`${q.ingredients.join(', ')} - ${q.servings} serving${q.servings > 1 ? 's' : ''}`}
              >
                <SearchIcon size={13} />
                <span className="chip-t">{q.ingredients.join(', ')}</span>
                <small>{q.servings} serving{q.servings > 1 ? 's' : ''}</small>
              </button>
            ))}
          </div>
        )}
      </section>
    </section>
    </>
  );
}
