import { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const Ctx = createContext({ theme: 'light', toggle: () => {} });
export const useTheme = () => useContext(Ctx);

export function ThemeProvider({ children }) {
  const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('sc:theme', prefersDark ? 'dark' : 'light');
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  return <Ctx.Provider value={{ theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }}>{children}</Ctx.Provider>;
}
