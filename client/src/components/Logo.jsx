// Inline SVG so the wordmark can use the page's CSS variables (an <img> SVG cannot inherit them).
// Mascot colours are fixed; "Smart"/"Chef" follow --logo-text / --logo-accent, set per theme in styles.css.
export default function Logo() {
  return (
    <svg viewBox="0 0 360 84" aria-hidden="true" focusable="false">
      <defs>
      <linearGradient id="sc-hat" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#fffdf6"/><stop offset="1" stopColor="#e7dece"/>
      </linearGradient>
      <linearGradient id="sc-coat" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#34885b"/><stop offset="1" stopColor="#17452f"/>
      </linearGradient>
      </defs>
      <g transform="translate(5 5)">
      <path d="M13 68 Q15 51 27 47 L43 47 Q55 51 57 68Z" fill="url(#sc-coat)"/>
      <path d="M27 48 L35 57 L43 48" fill="#fff8ec"/>
      <path d="M32 56 L35 60 L38 56 L37 68 L33 68Z" fill="#e87935"/>
      <circle cx="27" cy="60" r="1.8" fill="#f8f0df"/><circle cx="43" cy="60" r="1.8" fill="#f8f0df"/>
      <rect x="30" y="38" width="10" height="13" rx="4" fill="#e9aa7d"/>
      <circle cx="21" cy="32" r="4.2" fill="#e9aa7d"/><circle cx="49" cy="32" r="4.2" fill="#e9aa7d"/>
      <ellipse cx="35" cy="30" rx="14.5" ry="17" fill="#f3bd8d"/>
      <path d="M27 26 Q30 23 33 26 M38 26 Q41 23 44 26" fill="none" stroke="#50342b" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="30.5" cy="30" r="1.7" fill="#35251f"/><circle cx="40" cy="30" r="1.7" fill="#35251f"/>
      <path d="M31 36 Q35 40 39 36" fill="none" stroke="#753b2c" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="25.5" cy="34" r="2.5" fill="#ed8d7b" opacity=".65"/><circle cx="44.5" cy="34" r="2.5" fill="#ed8d7b" opacity=".65"/>
      <path d="M22 18 C16 14 19 7 25 8 C25 1 33 -1 37 5 C42 -1 50 3 49 9 C56 8 58 15 52 19 L52 22 L22 22Z" fill="url(#sc-hat)" stroke="#cfc5b4" strokeWidth="1"/>
      <path d="M22 18 Q37 22 52 18 L52 23 Q37 27 22 23Z" fill="#2f8b5b"/>
      <path d="M27 45 Q35 49 43 45 L39 52 L35 55 L31 52Z" fill="#e87935"/>
      <path d="M54 44 Q62 36 62 29 Q54 32 54 44Z" fill="#75ad57"/>
      <path d="M54 44 L60 34" stroke="#2e7547" strokeWidth="1.2" fill="none"/>
      </g>
      {/* One text run with two tspans: "Chef" always starts where "Smart" ends, so they can never overlap, whatever font is used. */}
      <text x="77" y="53" fontFamily="Georgia, 'Times New Roman', serif" fontSize="34" fontWeight="700" letterSpacing="-0.6">
        <tspan fill="var(--logo-text, #17452f)">Smart</tspan>
        <tspan fill="var(--logo-accent, #e87935)" dx="2">Chef</tspan>
      </text>
    </svg>
  );
}
