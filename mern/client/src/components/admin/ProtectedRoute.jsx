import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="admin wrap"><p>Checking your session…</p></div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}
