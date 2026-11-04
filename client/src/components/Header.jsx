import { useState } from 'react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const ITEMS = [['home', 'Home'], ['results', 'Explore'], ['favorites', 'Favorites']];

export default function Header({ view, setView, favCount }) {
  const { theme, toggle } = useTheme();
  const [menu, setMenu] = useState(false);
  const go = (v) => { setView(v); setMenu(false); };
  return (
    <header className="header"><div className="wrap bar">
      <button className="logo" onClick={() => go('home')} aria-label="SmartChef - home"><Logo /></button>
      <nav className={menu ? 'nav open' : 'nav'} aria-label="Main">
        {ITEMS.map(([v, label]) => (
          <button key={v} className={view === v ? 'active' : ''} aria-current={view === v ? 'page' : undefined} onClick={() => go(v)}>
            {label}{v === 'favorites' && favCount > 0 && <> <span className="heart-ico" aria-hidden="true">♥</span><span className="count">{favCount}</span></>}
          </button>
        ))}
      </nav>
      <button className="switch" role="switch" aria-checked={theme === 'dark'} aria-label="Dark mode" title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggle}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          {theme === 'dark' ? <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /> : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>}
        </svg>
      </button>
      <button className="burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>☰</button>
    </div></header>
  );
}
