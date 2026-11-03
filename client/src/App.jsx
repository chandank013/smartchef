import { useState, useCallback } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import useRecipeApi from './hooks/useRecipeApi';
import Header from './components/Header';
import IngredientForm from './components/IngredientForm';
import RecipeCard from './components/RecipeCard';
import RecipeDetails from './components/RecipeDetails';
import { Empty, Loading, ErrorState } from './components/States';
import { keyOf, dietLabel } from './lib';

const sameQ = (a, b) => a.ingredients.join() === b.ingredients.join() && a.diet === b.diet && a.servings === b.servings;

export default function App() {
  const [view, setView] = useState('home');
  const [search, setSearch] = useLocalStorage('sc:search', null);   // { query, recipes } - survives navigation + refresh
  const [history, setHistory] = useLocalStorage('sc:history', []);  // last 5 searches
  const [favs, setFavs] = useLocalStorage('sc:favorites', []);
  const [req, setReq] = useState(null);
  const [open, setOpen] = useState(null);
  const api = useRecipeApi();
  const close = useCallback(() => setOpen(null), []);

  const run = async (q) => {
    setReq(q); setView('results');
    const recipes = await api.generate(q);
    if (recipes) { setSearch({ query: q, recipes }); setHistory((h) => [q, ...h.filter((x) => !sameQ(x, q))].slice(0, 5)); }
  };
  const isSaved = (r) => favs.some((f) => keyOf(f) === keyOf(r));
  const toggle = (r, diet, servings) => setFavs((f) => (f.some((x) => keyOf(x) === keyOf(r)) ? f.filter((x) => keyOf(x) !== keyOf(r)) : [{ ...r, diet, servings }, ...f]));

  const q = req || search?.query;
  const recipes = search?.recipes || [];

  return (
    <>
      <Header view={view} setView={setView} favCount={favs.length} />
      <main className="wrap">
        {view === 'home' && <IngredientForm initial={q} history={history} busy={api.loading} onSubmit={run} onPick={run} />}

        {view === 'results' && (
          <section aria-labelledby="rt">
            <button className="back" onClick={() => setView('home')}>← New Search</button>
            <div className="head">
              <div><h2 id="rt">Here are your recipes!</h2>
                {q && <p className="muted">Based on: {q.ingredients.join(', ')} • Serves {q.servings}{dietLabel(q.diet) && ` • ${dietLabel(q.diet)}`}</p>}</div>
            <button className="btn ghost" onClick={() => setView('home')}>⚙ Refine Search</button>
            </div>
            {api.loading ? <Loading />
              : api.error ? <ErrorState message={api.error} onRetry={() => run(req)} onBack={() => setView('home')} />
              : !recipes.length ? <Empty title="No recipes yet!" text="Enter your ingredients and let SmartChef suggest delicious recipes for you." action="Add Ingredients" onAction={() => setView('home')} />
              : <div className="grid">{recipes.map((r) => (
                  <RecipeCard key={keyOf(r)} recipe={r} diet={search.query.diet} saved={isSaved(r)}
                    onToggle={() => toggle(r, search.query.diet, search.query.servings)}
                    onView={() => setOpen({ recipe: r, diet: search.query.diet, servings: search.query.servings })} />))}</div>}
          </section>
        )}

        {view === 'favorites' && (
          <section aria-labelledby="ft">
            <div className="head"><div><h2 id="ft"><span className="red">♥</span> Your Favorite Recipes</h2>
              <p className="muted">Recipes you've saved will appear here. You can remove them anytime.</p></div></div>
            {!favs.length ? <Empty title="No favorites yet" text="Tap the heart on any recipe to save it here." action="Find Recipes" onAction={() => setView('home')} />
              : <div className="grid">{favs.map((r) => (
                  <RecipeCard key={keyOf(r)} mode="favorites" recipe={r} diet={r.diet} saved
                    onToggle={() => toggle(r)} onView={() => setOpen({ recipe: r, diet: r.diet, servings: r.servings || 2 })} />))}</div>}
          </section>
        )}
      </main>

      {open && <RecipeDetails recipe={open.recipe} diet={open.diet} servings={open.servings} saved={isSaved(open.recipe)}
        onToggle={() => toggle(open.recipe, open.diet, open.servings)} onClose={close} />}
    </>
  );
}
