import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
const LINKS = [
  ['/admin', 'Dashboard'], ['/admin/profile', 'Profile'], ['/admin/skills', 'Skills'],
  ['/admin/expertise', 'Expertise'], ['/admin/highlights', 'Highlights'], ['/admin/education', 'Education'],
  ['/admin/projects', 'Projects'], ['/admin/messages', 'Messages'],
];
export default function AdminLayout({ title, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  async function handleLogout() { await logout(); navigate('/admin/login'); }
  return (
    <div className="admin wrap">
      <p><Link to="/">← Back to portfolio</Link></p>
      <h1 style={{ marginTop: 12 }}>{title}</h1>
      <p style={{ color: 'var(--muted)' }}>Signed in as {user?.email}</p>
      <nav className="admin-nav" aria-label="Admin sections">
        {LINKS.map(([to, label]) => <NavLink key={to} to={to} end={to === '/admin'} className={({ isActive }) => (isActive ? 'active' : '')}>{label}</NavLink>)}
        <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>Log out</button>
      </nav>
      {children}
    </div>
  );
}
