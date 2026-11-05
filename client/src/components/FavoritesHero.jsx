import exploreArt from '../assets/explore-art.png';

export default function FavoritesHero() {
  return (
    <section className="fav-hero">
      <div className="fav-hero-left">
        <div className="fav-heading-wrap">
          <h1 className="fav-heading">
            <span>Your Favorite <span className="highlight-green">Recipes</span></span>
          </h1>
          <span className="fav-sparkles" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F28B35" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="3" x2="12" y2="7" />
              <line x1="4.22" y1="6.22" x2="7.05" y2="9.05" />
              <line x1="19.78" y1="6.22" x2="16.95" y2="9.05" />
            </svg>
          </span>
        </div>

        <p className="fav-sub">
          All the recipes you've saved, gathered in one place.
        </p>
      </div>

      <div className="fav-hero-right">
        <img
          src={exploreArt}
          alt="Spices and fresh ingredients"
          className="fav-hero-art"
          width="420"
          height="210"
        />
      </div>
    </section>
  );
}
