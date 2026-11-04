import exploreArt from '../assets/explore-art.png';
import { DIETS, CATEGORIES, TIME_OPTIONS, CALORIE_OPTIONS, SORT_OPTIONS } from '../lib';

const SearchIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
  </svg>
);

const ClockIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
  </svg>
);

const FlameIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8.5 14.5A3.5 3.5 0 0 0 12 18a3.5 3.5 0 0 0 3.5-3.5c0-2-1.5-3.5-2-5-.5 1.5-1 2-1.5 2-.5 0-1-.5-1-1 0-2 2-4.5 2-6.5-2.5 1.5-5 5.5-4.5 10.5z" />
  </svg>
);

const UtensilsIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2M15 11v11M5 2v10a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2M7 14v8" />
  </svg>
);

export default function ExploreBar({
  searchQuery,
  onSearchQueryChange,
  selectedDiet,
  onDietChange,
  selectedTime,
  onTimeChange,
  selectedCalories,
  onCaloriesChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onSearchSubmit,
  busy,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
  };

  return (
    <div className="explore-container">
      {/* 1. Explore Hero Section */}
      <section className="explore-hero">
        <div className="explore-hero-left">
          <span className="explore-badge">EXPLORE RECIPES</span>
          <h1 className="explore-heading">
            Discover Delicious <span className="highlight-green">Recipes</span>
          </h1>
          <p className="explore-sub">
            Browse popular and trending recipes, or search for something specific.
          </p>
        </div>
        <div className="explore-hero-right">
          <img
            src={exploreArt}
            alt="Spices, herbs and fresh tomatoes"
            className="explore-hero-art"
            width="420"
            height="210"
          />
        </div>
      </section>

      {/* 2. Wide Search and Filter Section */}
      <form className="explore-filter-bar" onSubmit={handleSubmit} noValidate>
        {/* Search Input */}
        <div className="filter-input-wrap">
          <SearchIcon size={18} />
          <input
            type="text"
            className="filter-input"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Search recipes (e.g., chicken, pasta, veg, dessert...)"
            aria-label="Search recipes"
          />
        </div>

        {/* Dietary Filter */}
        <div className="filter-select-wrap">
          <UtensilsIcon size={16} />
          <select
            className="filter-select"
            value={selectedDiet}
            onChange={(e) => onDietChange(e.target.value)}
            aria-label="Dietary filter"
          >
            {DIETS.map(([val, label]) => (
              <option key={val} value={val}>
                {val === 'any' ? 'Dietary: Any' : `Dietary: ${label}`}
              </option>
            ))}
          </select>
        </div>

        {/* Cooking Time Filter */}
        <div className="filter-select-wrap">
          <ClockIcon size={16} />
          <select
            className="filter-select"
            value={selectedTime}
            onChange={(e) => onTimeChange(e.target.value)}
            aria-label="Cooking time filter"
          >
            {TIME_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Calories Filter */}
        <div className="filter-select-wrap">
          <FlameIcon size={16} />
          <select
            className="filter-select"
            value={selectedCalories}
            onChange={(e) => onCaloriesChange(e.target.value)}
            aria-label="Calories filter"
          >
            {CALORIE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button className="explore-search-btn" type="submit" disabled={busy}>
          <SearchIcon size={16} />
          <span>Search</span>
        </button>
      </form>

      {/* 3. Category Pills & Sort Bar */}
      <div className="explore-cat-bar">
        <div className="explore-pills" role="tablist" aria-label="Recipe categories">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                className={`explore-pill${active ? ' active' : ''}`}
                onClick={() => onCategoryChange(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="explore-sort">
          <span className="sort-label">Sort by:</span>
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort recipes by"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
