import { createContext, useCallback, useEffect, useState } from 'react';
import { authApi } from '../api';
export const AuthContext = createContext({ user: null, loading: true, login: async () => {}, logout: async () => {} });
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authApi.me().then(setUser).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);
  const login = useCallback(async (email, password) => { const u = await authApi.login({ email, password }); setUser(u); return u; }, []);
  const logout = useCallback(async () => { await authApi.logout().catch(() => {}); setUser(null); }, []);
  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}
