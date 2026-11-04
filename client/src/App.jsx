import { useState, useCallback, useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import useRecipeApi from './hooks/useRecipeApi';
import Header from './components/Header';
import IngredientForm from './components/IngredientForm';
import ExploreHero from './components/ExploreHero';
import FavoritesHero from './components/FavoritesHero';
import RecipeCard from './components/RecipeCard';
import RecipeDetails from './components/RecipeDetails';
import { Empty, Loading, ErrorState } from './components/States';
import {
  keyOf,
  CURATED_EXPLORE_RECIPES,
} from './lib';

const sameQ = (a, b) =>
  a.ingredients.join() === b.ingredients.join() &&
  a.diet === b.diet &&
  a.servings === b.servings;

export default function App() {
  const [view, setView] = useState('results'); // Explore view
  const [search, setSearch] = useLocalStorage('sc:search', null); // { query, recipes }
  const [history, setHistory] = useLocalStorage('sc:history', []); // last 5 searches
  const [favs, setFavs] = useLocalStorage('sc:favorites', []);
  const [req, setReq] = useState(null);
  const [open, setOpen] = useState(null);
  const api = useRecipeApi();
  const close = useCallback(() => setOpen(null), []);

  const run = async (q) => {
    setReq(q);
    setView('results');
    const recipes = await api.generate(q);
    if (recipes && recipes.length) {
      setSearch({ query: q, recipes });
      setHistory((h) => [q, ...h.filter((x) => !sameQ(x, q))].slice(0, 5));
    }
  };

  const isSaved = (r) => favs.some((f) => keyOf(f) === keyOf(r));
  const toggle = (r, diet = 'any', servings = 2) =>
    setFavs((f) =>
      f.some((x) => keyOf(x) === keyOf(r))
        ? f.filter((x) => keyOf(x) !== keyOf(r))
        : [{ ...r, diet, servings }, ...f]
    );

  const q = req || search?.query;

  // Combine any AI-generated recipes with the curated explore recipes
  const displayRecipes = useMemo(() => {
    const aiGenerated = search?.recipes || [];
    const seen = new Set();
    const combined = [];
    for (const r of [...aiGenerated, ...CURATED_EXPLORE_RECIPES]) {
      const k = keyOf(r);
      if (!seen.has(k)) {
        seen.add(k);
        combined.push(r);
      }
    }
    return combined;
  }, [search]);

  return (
    <>
      <Header view={view} setView={setView} favCount={favs.length} />
      <main className="wrap">
        {/* 1. Home View */}
        {view === 'home' && (
          <IngredientForm
            initial={q}
            history={history}
            busy={api.loading}
            onSubmit={run}
            onPick={run}
          />
        )}

        {/* 2. Explore Page (Hero + Recipe Cards) */}
        {view === 'results' && (
          <section aria-label="Explore Recipes">
            <ExploreHero />

            {api.loading ? (
              <Loading />
            ) : api.error ? (
              <ErrorState
                message={api.error}
                onRetry={() => (req ? run(req) : null)}
                onBack={() => setView('home')}
              />
            ) : !displayRecipes.length ? (
              <Empty
                title="No recipes found"
                text="Enter your ingredients on Home and let SmartChef suggest delicious recipes for you."
                action="Find Recipes"
                onAction={() => setView('home')}
              />
            ) : (
              <div className="explore-grid">
                {displayRecipes.map((r) => {
                  const dietType = r.diet || (search?.query?.diet) || 'any';
                  const srv = r.servings || (search?.query?.servings) || 2;
                  return (
                    <RecipeCard
                      key={keyOf(r)}
                      mode="explore"
                      recipe={r}
                      diet={dietType}
                      saved={isSaved(r)}
                      onToggle={() => toggle(r, dietType, srv)}
                      onView={() =>
                        setOpen({
                          recipe: r,
                          diet: dietType,
                          servings: srv,
                        })
                      }
                    />
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* 3. Favorites View */}
        {view === 'favorites' && (
          <section aria-label="Favorite Recipes">
            <FavoritesHero count={favs.length} />
            {!favs.length ? (
              <Empty
                icon="❤️"
                title="No Favorite Recipes Yet"
                text="Save recipes you love and they will appear here."
                action="Explore Recipes"
                onAction={() => setView('results')}
              />
            ) : (
              <div className="fav-grid">
                {favs.map((r) => (
                  <RecipeCard
                    key={keyOf(r)}
                    mode="favorites"
                    recipe={r}
                    diet={r.diet}
                    saved
                    onToggle={() => toggle(r)}
                    onView={() =>
                      setOpen({
                        recipe: r,
                        diet: r.diet,
                        servings: r.servings || 2,
                      })
                    }
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Recipe Details Modal Dialog */}
      {open && (
        <RecipeDetails
          recipe={open.recipe}
          diet={open.diet}
          servings={open.servings}
          saved={isSaved(open.recipe)}
          onToggle={() => toggle(open.recipe, open.diet, open.servings)}
          onClose={close}
        />
      )}
    </>
  );
}
