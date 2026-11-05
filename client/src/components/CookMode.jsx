import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { emojiFor } from '../lib';
import stepChickenPrep from '../assets/step-chicken-prep.png';

// Web Audio API chime sound
function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.85);
  } catch (e) {
    console.warn('Audio chime unavailable', e);
  }
}

const SpeakerIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const BowlIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 11c0 4.97 4.03 9 9 9s9-4.03 9-9H3z" />
    <path d="M16 4l-4 5" />
    <circle cx="16" cy="4" r="1.5" />
  </svg>
);

const ChiliOutlineSvg = () => (
  <svg viewBox="0 0 60 60" width="55" height="55" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M48 10 C46 16, 40 22, 35 28 C28 36, 18 42, 10 46 C8 47, 6 45, 8 43 C12 37, 20 28, 28 20 C34 14, 40 10, 48 10 Z" />
    <path d="M48 10 C50 6, 52 4, 56 4" />
  </svg>
);

const HerbOutlineSvg = () => (
  <svg viewBox="0 0 60 60" width="55" height="55" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M30 50 V15" />
    <path d="M30 40 C22 38, 16 32, 18 24 C26 24, 30 32, 30 40 Z" />
    <path d="M30 30 C38 28, 44 22, 42 14 C34 14, 30 22, 30 30 Z" />
    <path d="M30 15 C26 10, 24 5, 30 2 C36 5, 34 10, 30 15 Z" />
  </svg>
);

const RiceBowlOutlineSvg = () => (
  <svg viewBox="0 0 60 60" width="55" height="55" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 28 C12 42, 22 50, 30 50 C38 50, 48 42, 48 28 Z" />
    <path d="M8 28 H52" />
    <path d="M24 50 L22 54 H38 L36 50" />
    <path d="M24 20 Q22 14 26 10" />
    <path d="M30 22 Q32 15 29 8" />
    <path d="M36 20 Q38 14 34 10" />
  </svg>
);

export default function CookMode({ recipe, servings = 2, onClose }) {
  const { theme, toggle: toggleTheme } = useTheme();
  const steps = recipe?.steps || [];
  const [current, setCurrent] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  // Auto-detected step timer
  const [timerSeconds, setTimerSeconds] = useState(null);
  const [timerInitial, setTimerInitial] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const stepText = steps[current] || '';

  // Timer parsing from step text
  useEffect(() => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
    setIsRunning(false);

    const minMatch = stepText.match(/(\d+)\s*(?:mins?|minutes?)/i);
    const secMatch = stepText.match(/(\d+)\s*(?:secs?|seconds?)/i);
    let totalSecs = null;
    if (minMatch) {
      totalSecs = parseInt(minMatch[1], 10) * 60;
    } else if (secMatch) {
      totalSecs = parseInt(secMatch[1], 10);
    }
    setTimerSeconds(totalSecs);
    setTimerInitial(totalSecs);
  }, [current, stepText]);

  // Countdown effect
  useEffect(() => {
    if (!isRunning || timerSeconds === null || timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          playChime();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds]);

  // Speech synthesis
  const toggleSpeech = useCallback(() => {
    if (!window.speechSynthesis) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`Step ${current + 1}. ${stepText}`);
      utterance.rate = 0.95;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  }, [speaking, current, stepText]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && current < steps.length - 1) setCurrent((c) => c + 1);
      if (e.key === 'ArrowLeft' && current > 0) setCurrent((c) => c - 1);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [current, steps.length, onClose]);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const progressPercent = steps.length > 0 ? ((current + 1) / steps.length) * 100 : 0;

  // Filter ingredients needed for this specific step
  const getStepIngredients = () => {
    const allIngs = recipe?.ingredients || [];
    if (!allIngs.length) return [];
    const lowerStep = stepText.toLowerCase();

    const matched = allIngs.filter((i) => {
      const name = (i.name || '').toLowerCase();
      const words = name.split(/\s+/).filter((w) => w.length > 2);
      return lowerStep.includes(name) || words.some((w) => lowerStep.includes(w));
    });

    if (matched.length > 0) return matched;
    return allIngs.slice(0, 3);
  };

  const stepIngredients = getStepIngredients();

  // Image resolution for step
  const getStepImage = () => {
    if (recipe?.title?.includes('Spicy Chicken Fried Rice') && current === 0) {
      return stepChickenPrep;
    }
    if (recipe?.stepImages && recipe.stepImages[current]) {
      return recipe.stepImages[current];
    }
    return recipe?.imageUrl || stepChickenPrep;
  };

  const stepImgSrc = getStepImage();

  const servingsDisplay = recipe?.servings
    ? typeof recipe.servings === 'number'
      ? `${recipe.servings} servings`
      : recipe.servings
    : `${servings} servings`;

  return (
    <div className="cook-mode-overlay" role="dialog" aria-modal="true" aria-label="Interactive Cook Mode">
      {/* 1. Full-Width Header */}
      <header className="cook-mode-bar">
        <div className="cook-mode-title-wrap">
          <img
            src={recipe?.imageUrl || stepChickenPrep}
            alt={recipe?.title}
            className="cook-header-thumb"
          />
          <div>
            <h2 className="cook-recipe-title">{recipe?.title}</h2>
            <div className="cook-mode-meta">
              <span>🍽 {servingsDisplay}</span>
              <span>⏱ {recipe?.time || '30 mins'}</span>
              <span>🔥 {recipe?.calories ? `${recipe.calories} kcal` : '580 kcal'}</span>
            </div>
          </div>
        </div>

        <div className="cook-mode-bar-right">
          <span className="cook-step-pill">
            Step {current + 1} of {steps.length}
          </span>

          <button
            className="cook-theme-toggle"
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label="Toggle dark mode"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              width="17"
              height="17"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {theme === 'dark' ? (
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              ) : (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </>
              )}
            </svg>
          </button>

          <button className="cook-close-btn" onClick={onClose} aria-label="Exit Cook Mode" title="Exit Cook Mode (Esc)">
            ✕ Exit
          </button>
        </div>
      </header>

      {/* 2. Progress Indicator Bar */}
      <div className="cook-progress-track">
        <div className="cook-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* 3. Main Cooking Area with Decorative Corner Vectors */}
      <main className="cook-mode-body">
        {/* Decorative background food vectors */}
        <div className="cook-decor decor-top-left" aria-hidden="true">
          <ChiliOutlineSvg />
        </div>
        <div className="cook-decor decor-bottom-left" aria-hidden="true">
          <HerbOutlineSvg />
        </div>
        <div className="cook-decor decor-bottom-right" aria-hidden="true">
          <RiceBowlOutlineSvg />
        </div>

        {/* Large 2-Column Instruction Card */}
        <div className="cook-main-card">
          {/* Left Column: Instructions & Ingredients */}
          <div className="cook-left-col">
            <div className="cook-step-badge">
              <BowlIcon />
              <span>Step {current + 1}</span>
            </div>

            <h1 className="cook-instruction-text">
              {stepText}
            </h1>

            {/* "You'll Need" Section */}
            {stepIngredients.length > 0 && (
              <div className="cook-needed-box">
                <div className="cook-needed-header">
                  <span className="cook-needed-icon" aria-hidden="true">🥬</span>
                  <span className="cook-needed-title">You'll Need</span>
                </div>
                <div className="cook-needed-grid">
                  {stepIngredients.map((ing, idx) => (
                    <div key={idx} className="cook-needed-card">
                      <span className="cook-needed-emoji" aria-hidden="true">
                        {emojiFor(ing.name)}
                      </span>
                      <div className="cook-needed-info">
                        <span className="cook-needed-name">{ing.name}</span>
                        {ing.quantity && (
                          <span className="cook-needed-qty">{ing.quantity}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Step Image & Read Aloud & Timer */}
          <div className="cook-right-col">
            <div className="cook-right-top-bar">
              <button
                className={`cook-read-aloud-btn ${speaking ? 'speaking' : ''}`}
                onClick={toggleSpeech}
                title={speaking ? 'Stop speech' : 'Read step aloud'}
                aria-label={speaking ? 'Stop speech' : 'Read step aloud'}
                type="button"
              >
                <SpeakerIcon />
                <span>{speaking ? 'Speaking...' : 'Read Aloud'}</span>
              </button>
            </div>

            <div className="cook-photo-wrap">
              <img
                src={stepImgSrc}
                alt={`Step ${current + 1}`}
                className="cook-step-photo"
              />
              <span className="cook-photo-sparks" aria-hidden="true">彡</span>
            </div>

            {/* Step Timer (when step has duration) */}
            {timerInitial !== null && (
              <div className={`cook-timer-box ${timerSeconds === 0 ? 'finished' : ''}`}>
                <div className="cook-timer-left">
                  <span className="cook-timer-icon" aria-hidden="true">⏱️</span>
                  <div>
                    <div className="cook-timer-label">
                      {timerSeconds === 0 ? 'Time is up!' : 'Step Timer'}
                    </div>
                    <div className="cook-timer-display">{formatTimer(timerSeconds)}</div>
                  </div>
                </div>
                <div className="cook-timer-actions">
                  <button
                    className="btn-timer-toggle"
                    onClick={() => setIsRunning((r) => !r)}
                    type="button"
                  >
                    {isRunning ? '⏸ Pause' : timerSeconds === 0 ? '🔄 Restart' : '▶ Start'}
                  </button>
                  <button
                    className="btn-timer-reset"
                    onClick={() => {
                      setIsRunning(false);
                      setTimerSeconds(timerInitial);
                    }}
                    type="button"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 4. Bottom Navigation Bar */}
      <footer className="cook-mode-footer">
        <button
          className="cook-nav-btn prev"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          type="button"
        >
          ← Previous Step
        </button>

        <div className="cook-dots" aria-label="Step progress dots">
          {steps.map((_, idx) => (
            <button
              key={idx}
              className={`cook-dot ${idx === current ? 'active' : ''} ${idx < current ? 'done' : ''}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to step ${idx + 1}`}
              type="button"
            />
          ))}
        </div>

        {current < steps.length - 1 ? (
          <button
            className="cook-nav-btn next"
            onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
            type="button"
          >
            Next Step →
          </button>
        ) : (
          <button className="cook-nav-btn finish" onClick={onClose} type="button">
            🎉 Finish Cooking!
          </button>
        )}
      </footer>
    </div>
  );
}
