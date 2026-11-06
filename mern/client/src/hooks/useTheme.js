import { useCallback, useEffect, useState } from 'react';
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); try { localStorage.setItem('sa-theme', theme); } catch (_e) {} }, [theme]);
  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return { theme, toggle };
}
export default useTheme;
