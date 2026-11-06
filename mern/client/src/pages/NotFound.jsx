import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
export default function NotFound() {
  return (
    <>
      <Helmet><title>Page not found — Sheeza Ansar</title></Helmet>
      <main className="wrap" style={{ paddingTop: 160, paddingBottom: 80, textAlign: 'center' }}>
        <h1>404 — Page not found</h1>
        <p style={{ color: 'var(--text-2)', marginTop: 12 }}>The page you were looking for does not exist.</p>
        <Link className="btn btn-primary" style={{ marginTop: 24 }} to="/">Back to home</Link>
      </main>
    </>
  );
}
