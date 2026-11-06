import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../hooks/useAuth';
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault(); setBusy(true); setError('');
    try { await login(form.email, form.password); navigate('/admin'); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return (
    <>
      <Helmet><title>Admin login — Sheeza Ansar</title></Helmet>
      <main className="admin wrap" style={{ maxWidth: 480 }}>
        <h1>Admin login</h1>
        <p style={{ color: 'var(--text-2)', marginTop: 8 }}>Sign in to manage the portfolio content.</p>
        <form className="form admin-form" onSubmit={submit} style={{ marginTop: 24 }}>
          <label>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="admin@example.com" /></label>
          <label>Password<input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Your admin password" /></label>
          {error && <p className="field-error" role="alert">{error}</p>}
          <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Log in'}</button>
        </form>
      </main>
    </>
  );
}
