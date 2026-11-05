import { useState, useRef, useLayoutEffect } from 'react';
import heroArt from '../assets/hero-art.webp';

// Icons
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
  </svg>
);

const ClockIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
  </svg>
);

const CameraIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const ForkKnifeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#45E08F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

const ClocheIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#E8C547" stroke="#E8C547" strokeWidth="1" aria-hidden="true">
    <path d="M12 4a2 2 0 0 0-2 2h4a2 2 0 0 0-2-2zM4 14h16a8 8 0 0 0-16 0zM2 18h20v2H2z" />
  </svg>
);

const TimerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#45E08F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2.5" />
    <path d="M10 2h4" />
    <path d="M12 2v3" />
  </svg>
);

const LeafIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#45E08F" stroke="#45E08F" strokeWidth="1.2" aria-hidden="true">
    <path d="M11 20A7 7 0 0 1 4 13C4 7 11 2 20 2c0 9-5 16-11 18z" />
    <path d="M11 20c0-4 3-8 9-11" />
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#45E08F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SparklesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function IngredientForm({ initial, history = [], onSubmit, busy, onScanFridge, scanning }) {
  const [text, setText] = useState(initial ? initial.ingredients.join(', ') : '');
  const [diet, setDiet] = useState(initial?.diet || 'any');
  const [servings, setServings] = useState(Number(initial?.servings) || 2);
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
    const el = chipsRef.current;
    if (!el) return undefined;
    const check = () => {
      if (!showAll) setOverflow(el.scrollWidth > el.clientWidth + 1);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
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
    if (!ingredients.length) {
      return setErr('Please enter at least one ingredient, or snap a fridge photo!');
    }
    setErr('');
    onSubmit({
      ingredients,
      diet,
      servings: Number(servings),
      mealType,
      maxTime,
    });
  };

  // Recent-search chips fill the form so the user can tweak and re-run it.
  const pick = (q) => {
    setText(q.ingredients.join(', '));
    setDiet(q.diet || 'any');
    setServings(Number(q.servings) || 2);
    setMealType(q.mealType || 'any');
    setMaxTime(q.maxTime || 'any');
    setErr('');
    inputRef.current?.focus();
  };

  return (
    <>
      <section className="hero">
        <div className="hero-main">
          <h1>Make something <em>delicious.</em></h1>
          <p className="sub">Tell us what's in your kitchen or snap a fridge photo. We'll find your next favorite meal.</p>

          <form className="panel redesigned-panel" onSubmit={submit} noValidate>
            {/* Top Row: Heading and Scan Fridge button */}
            <div className="panel-top-bar">
              <div className="panel-heading-wrap">
                <ForkKnifeIcon />
                <h2 className="panel-heading-text">What ingredients do you have?</h2>
              </div>

              <label className={`btn-fridge-scan-pill ${scanning ? 'scanning' : ''}`} title="Scan fridge photo using Multimodal AI">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoUpload}
                  disabled={scanning}
                  style={{ display: 'none' }}
                />
                <CameraIcon />
                <span>{scanning ? 'Scanning...' : 'Scan Fridge Photo'}</span>
              </label>
            </div>

            {/* Ingredient Search Input */}
            <div className="panel-search-field">
              <SearchIcon />
              <input
                id="ing"
                ref={inputRef}
                className="panel-search-input"
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

            {/* Helper text row */}
            <div className="panel-helper-row" id="ing-help">
              <span className="panel-helper-tip">
                <span className="sparkle-amber" aria-hidden="true">✦</span> Tip: Separate ingredients with commas or use{' '}
                <strong className="amber-text">Scan Fridge</strong>
              </span>
              <span className="panel-char-counter">{text.length}/200</span>
            </div>

            {scanToast && <p className="scan-toast" role="status">{scanToast}</p>}
            {err && <p className="field-err" role="alert">{err}</p>}

            {/* First Row – Three Dropdowns */}
            <div className="dropdowns-row-three">
              {/* Dropdown 1: Meal Type */}
              <div className="dropdown-col">
                <label htmlFor="mealTypeSelect" className="dropdown-label">
                  <ClocheIcon />
                  <span>Meal Type</span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="mealTypeSelect"
                    className="styled-select"
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                  >
                    <option value="any">Any Meal</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
              </div>

              {/* Dropdown 2: Cooking Time */}
              <div className="dropdown-col">
                <label htmlFor="cookingTimeSelect" className="dropdown-label">
                  <TimerIcon />
                  <span>Cooking Time</span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="cookingTimeSelect"
                    className="styled-select"
                    value={maxTime}
                    onChange={(e) => setMaxTime(e.target.value)}
                  >
                    <option value="any">Any Time</option>
                    <option value="20">Quick (&lt; 20 mins)</option>
                    <option value="45">Normal (&lt; 45 mins)</option>
                  </select>
                </div>
              </div>

              {/* Dropdown 3: Dietary Preference */}
              <div className="dropdown-col">
                <label htmlFor="dietSelect" className="dropdown-label">
                  <LeafIcon />
                  <span>Dietary Preference</span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="dietSelect"
                    className="styled-select"
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                  >
                    <option value="any">Any</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Gluten-Free</option>
                    <option value="keto">Keto</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Second Row – Two Elements: Servings Dropdown & Generate Button */}
            <div className="dropdowns-row-two">
              {/* Servings Dropdown */}
              <div className="dropdown-col servings-col">
                <label htmlFor="servingsSelect" className="dropdown-label">
                  <UsersIcon />
                  <span>Number of Servings</span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="servingsSelect"
                    className="styled-select"
                    value={servings}
                    onChange={(e) => setServings(Number(e.target.value))}
                  >
                    <option value={1}>1 Serving</option>
                    <option value={2}>2 Servings</option>
                    <option value={3}>3 Servings</option>
                    <option value={4}>4 Servings</option>
                    <option value={5}>5 Servings</option>
                    <option value={6}>6 Servings</option>
                    <option value={7}>7 Servings</option>
                    <option value={8}>8 Servings</option>
                  </select>
                </div>
              </div>

              {/* Generate Recipes Button */}
              <div className="generate-col">
                <button
                  className="btn-generate-emerald"
                  type="submit"
                  disabled={busy || scanning}
                  aria-label="Generate Recipes"
                >
                  {busy ? (
                    <>
                      <span className="spin" aria-hidden="true" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon />
                      <span className="btn-generate-text">Generate Recipes</span>
                      <ArrowRightIcon />
                    </>
                  )}
                </button>
              </div>
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
      </section>

      {/* Recent Searches */}
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
    </>
  );
}
