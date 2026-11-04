import exploreArt from '../assets/explore-art.png';

export default function FavoritesHero({ count = 0 }) {
  return (
    <section className="fav-hero">
      <div className="fav-hero-left">
        <span className="fav-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#F28B35" stroke="#F28B35" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          YOUR COLLECTION
        </span>

        <div className="fav-heading-wrap">
          <h1 className="fav-heading">
            <span className="fav-heart-ico" aria-hidden="true">❤️</span>
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

        <div className="fav-counter-badge">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <span>{count} saved recipe{count !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="fav-hero-right">
        <img
          src={exploreArt}
          alt="Fresh culinary ingredients"
          className="fav-hero-art"
          width="420"
          height="210"
        />
      </div>
    </section>
  );
}
