import { useState } from 'react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

export default function Header({
  view,
  setView,
  favCount = 0,
  groceryCount = 0,
  onOpenGrocery,
  groceryOpen = false,
  isLoading = false,
}) {
  const { theme, toggle } = useTheme();
  const [menu, setMenu] = useState(false);

  const go = (v) => {
    setView(v);
    setMenu(false);
  };

  const getTagline = () => {
    if (groceryOpen) return 'Smart Grocery List';
    if (isLoading) return 'AI Recipe & Meal Planner';
    if (view === 'results') return 'Discover Recipes & Flavours';
    if (view === 'favorites') return 'Your Personal Recipe Collection';
    return 'AI Recipe & Meal Planner';
  };

  return (
    <header className="header-wrapper">
      <div className="navbar-pill">
        {/* Left Section – Branding */}
        <div className="nav-brand-section">
          <button
            className="nav-logo-btn"
            onClick={() => go('home')}
            aria-label="SmartChef Home"
          >
            <Logo />
          </button>
          <div className="nav-divider" aria-hidden="true" />
          <span className="nav-tagline">{getTagline()}</span>
        </div>

        {/* Center Section – Navigation Links */}
        <nav
          className={`nav-center ${menu ? 'open' : ''}`}
          aria-label="Main Navigation"
        >
          {/* Home Link */}
          <button
            type="button"
            className={`nav-pill ${view === 'home' ? 'active' : ''}`}
            aria-current={view === 'home' ? 'page' : undefined}
            onClick={() => go('home')}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Home</span>
          </button>

          {/* Explore Link */}
          <button
            type="button"
            className={`nav-pill ${view === 'results' ? 'active' : ''}`}
            aria-current={view === 'results' ? 'page' : undefined}
            onClick={() => go('results')}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            <span>Explore</span>
          </button>

          {/* Favorites Link */}
          <button
            type="button"
            className={`nav-pill ${view === 'favorites' ? 'active' : ''}`}
            aria-current={view === 'favorites' ? 'page' : undefined}
            onClick={() => go('favorites')}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <span>Favorites</span>
            {favCount > 0 && <span className="nav-fav-badge">{favCount}</span>}
          </button>
        </nav>

        {/* Right Section – Utility Actions */}
        <div className="nav-utility-actions">
          <div className="nav-divider nav-divider-utility" aria-hidden="true" />

          {/* Grocery List Action */}
          {onOpenGrocery && (
            <button
              type="button"
              className="nav-btn-grocery"
              onClick={onOpenGrocery}
              aria-label="Open Grocery Checklist"
              title="Open Grocery Checklist"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span>Grocery List</span>
              {groceryCount > 0 && (
                <span className="nav-grocery-badge">{groceryCount}</span>
              )}
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            type="button"
            className="nav-btn-theme"
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggle}
          >
            {theme === 'dark' ? (
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            )}
          </button>

          {/* Profile Control */}
          <button
            type="button"
            className="nav-btn-profile"
            aria-label="User Profile"
            title="Profile"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="nav-mobile-burger"
            aria-label="Toggle navigation menu"
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {menu ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
