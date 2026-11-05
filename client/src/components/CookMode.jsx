import { useState, useEffect, useRef, useCallback } from 'react';

// Web Audio API beep sound generator
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

export default function CookMode({ recipe, servings = 2, onClose }) {
  const steps = recipe?.steps || [];
  const [current, setCurrent] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  // Timer state for current step
  const [timerSeconds, setTimerSeconds] = useState(null);
  const [timerInitial, setTimerInitial] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const stepText = steps[current] || '';

  // Auto-detect timer from current step text
  useEffect(() => {
    // Stop any ongoing speech
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

  // Keyboard navigation
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

  return (
    <div className="cook-mode-overlay" role="dialog" aria-modal="true" aria-label="Interactive Cook Mode">
      {/* Top Bar */}
      <header className="cook-mode-bar">
        <div className="cook-mode-title-wrap">
          <span className="cook-chef-icon" aria-hidden="true">👨‍🍳</span>
          <div>
            <h2 className="cook-recipe-title">{recipe.title}</h2>
            <div className="cook-mode-meta">
              <span>🍽 {servings} servings</span>
              <span>⏱ {recipe.time}</span>
              {recipe.calories && <span>🔥 {recipe.calories} kcal</span>}
            </div>
          </div>
        </div>

        <div className="cook-mode-bar-right">
          <span className="cook-step-pill">
            Step {current + 1} of {steps.length}
          </span>
          <button className="cook-close-btn" onClick={onClose} aria-label="Exit Cook Mode" title="Exit Cook Mode (Esc)">
            ✕ Exit
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="cook-progress-track">
        <div className="cook-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Main Content Area */}
      <main className="cook-mode-body">
        <div className="cook-step-card">
          <div className="cook-step-header">
            <span className="cook-step-number">STEP {current + 1}</span>
            <button
              className={`cook-voice-btn ${speaking ? 'speaking' : ''}`}
              onClick={toggleSpeech}
              title={speaking ? 'Stop speech' : 'Read step aloud'}
              aria-label={speaking ? 'Stop speech' : 'Read step aloud'}
            >
              {speaking ? '🔊 Speaking...' : '🔈 Read Aloud'}
            </button>
          </div>

          <p className="cook-step-text">{stepText}</p>

          {/* Auto-detected timer */}
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
                >
                  {isRunning ? '⏸ Pause' : timerSeconds === 0 ? '🔄 Restart' : '▶ Start'}
                </button>
                <button
                  className="btn-timer-reset"
                  onClick={() => {
                    setIsRunning(false);
                    setTimerSeconds(timerInitial);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="cook-mode-footer">
        <button
          className="cook-nav-btn prev"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          ← Previous Step
        </button>

        <div className="cook-dots">
          {steps.map((_, idx) => (
            <button
              key={idx}
              className={`cook-dot ${idx === current ? 'active' : ''} ${idx < current ? 'done' : ''}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>

        {current < steps.length - 1 ? (
          <button
            className="cook-nav-btn next"
            onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
          >
            Next Step →
          </button>
        ) : (
          <button className="cook-nav-btn finish" onClick={onClose}>
            🎉 Finish Cooking!
          </button>
        )}
      </footer>
    </div>
  );
}
