import exploreArt from '../assets/explore-art.png';

export default function ExploreHero() {
  return (
    <section className="explore-hero">
      <div className="explore-hero-left">
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
  );
}
