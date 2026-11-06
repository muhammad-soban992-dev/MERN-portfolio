import { useCallback, useEffect, useState } from 'react';
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setData(await fetcher()); } catch (e) { setError(e.message || 'Could not load this section.'); }
    finally { setLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEffect(() => { let alive = true; load(); return () => { alive = false; }; }, [load]);
  return { data, loading, error, retry: load };
}
export default useFetch;
