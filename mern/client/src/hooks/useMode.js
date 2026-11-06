import { useCallback, useEffect, useState } from 'react';
export function useMode() {
  const [mode, setModeState] = useState(() => {
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    try { const saved = localStorage.getItem('sa-mode'); if (saved === '2d' || saved === '3d') return saved; } catch (_e) {}
    return reduced ? '2d' : '3d';
  });
  useEffect(() => { document.body.setAttribute('data-mode', mode); try { localStorage.setItem('sa-mode', mode); } catch (_e) {} }, [mode]);
  const setMode = useCallback((m) => setModeState(m === '3d' ? '3d' : '2d'), []);
  return { mode, setMode };
}
export default useMode;
