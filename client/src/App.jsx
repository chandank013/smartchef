import { useState, useCallback, useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import useRecipeApi from './hooks/useRecipeApi';
import Header from './components/Header';
import IngredientForm from './components/IngredientForm';
import ExploreHero from './components/ExploreHero';
import FavoritesHero from './components/FavoritesHero';
import RecipeCard from './components/RecipeCard';
import RecipeDetails from './components/RecipeDetails';
import CookMode from './components/CookMode';
import GroceryDrawer from './components/GroceryDrawer';
import { Empty, Loading, ErrorState } from './components/States';
import {
  keyOf,
  CURATED_EXPLORE_RECIPES,
} from './lib';

const sameQ = (a, b) =>
  a.ingredients.join() === b.ingredients.join() &&
  a.diet === b.diet &&
  a.servings === b.servings &&
  (a.mealType || 'any') === (b.mealType || 'any') &&
  (a.maxTime || 'any') === (b.maxTime || 'any');

export default function App() {
  // Main landing is 'home', and persists in localStorage on refresh
  const [view, setView] = useLocalStorage('sc:view', 'home');
  const [search, setSearch] = useLocalStorage('sc:search', null); // { query, recipes }
  const [history, setHistory] = useLocalStorage('sc:history', []); // last 5 searches
  const [favs, setFavs] = useLocalStorage('sc:favorites', []);
  const [groceries, setGroceries] = useLocalStorage('sc:grocery', []);
  const [groceryOpen, setGroceryOpen] = useState(false);
  const [cookRecipe, setCookRecipe] = useState(null);
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

  // Smart Grocery List operations
  const addGroceryItems = (newItems) => {
    setGroceries((prev) => {
      const existingNames = new Set(prev.map((p) => p.name.toLowerCase()));
      const filtered = newItems.filter((i) => !existingNames.has(i.name.toLowerCase()));
      const mapped = (filtered.length ? filtered : newItems).map((i) => ({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        name: i.name,
        quantity: i.quantity,
        recipeTitle: i.recipeTitle,
        checked: false,
      }));
      return [...prev, ...mapped];
    });
  };

  const toggleGroceryItem = (id) => {
    setGroceries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
    );
  };

  const removeGroceryItem = (id) => {
    setGroceries((prev) => prev.filter((i) => i.id !== id));
  };

  const clearGroceries = () => {
    setGroceries([]);
  };

  const q = req || search?.query;

  // Recipe display list for Explore page
  const displayRecipes = useMemo(() => {
    if (search?.recipes && search.recipes.length) {
      return search.recipes;
    }
    return CURATED_EXPLORE_RECIPES;
  }, [search]);

  return (
    <>
      <Header
        view={view}
        setView={setView}
        favCount={favs.length}
        groceryCount={groceries.filter((g) => !g.checked).length}
        onOpenGrocery={() => setGroceryOpen(true)}
      />

      <main className="wrap">
        {/* 1. Home View */}
        {view === 'home' && (
          <IngredientForm
            loading={api.loading}
            history={history}
            onSubmit={run}
            onPickHistory={(h) => run(h)}
            onScanFridge={api.scanFridge}
            scanning={api.scanning}
          />
        )}

        {/* 2. Explore / Recipe Results View */}
        {view === 'results' && (
          <section aria-label="Explore Recipes">
            <ExploreHero />

            {api.loading ? (
              <Loading />
            ) : api.error ? (
              <ErrorState message={api.error} onRetry={() => q && run(q)} />
            ) : (
              <div className="explore-grid">
                {displayRecipes.map((r) => {
                  const dietType = r.diet || search?.query?.diet || 'any';
                  const srv = Number(r.servings || search?.query?.servings) || 2;
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
          onCook={(rec) => {
            setCookRecipe({ recipe: rec, servings: open.servings });
            close();
          }}
          onAddGrocery={addGroceryItems}
        />
      )}

      {/* Fullscreen Interactive Cook Mode */}
      {cookRecipe && (
        <CookMode
          recipe={cookRecipe.recipe}
          servings={cookRecipe.servings}
          onClose={() => setCookRecipe(null)}
        />
      )}

      {/* Smart Grocery / Shopping List Drawer */}
      <GroceryDrawer
        isOpen={groceryOpen}
        onClose={() => setGroceryOpen(false)}
        items={groceries}
        onToggleItem={toggleGroceryItem}
        onRemoveItem={removeGroceryItem}
        onClearAll={clearGroceries}
      />
    </>
  );
}
