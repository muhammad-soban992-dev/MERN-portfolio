import { Link } from 'react-router-dom';
import { Skeleton, SectionError } from '../ui/Loader';
export default function Projects({ items, loading, error, onRetry }) {
  if (loading) return <section id="projects"><div className="wrap"><Skeleton lines={3} /></div></section>;
  if (error) return <section id="projects"><div className="wrap"><SectionError message={error} onRetry={onRetry} /></div></section>;
  return (
    <section id="projects">
      <div className="wrap">
        <div className="sec-head reveal in"><p className="kicker">Projects</p><h2>Selected work</h2><p>Projects added from the admin dashboard appear here.</p></div>
        {!(items || []).length ? (
          <p className="empty">Projects coming soon — no projects have been published yet.</p>
        ) : (
          <div className="cards" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
            {items.map((p) => (
              <article className="project-card" key={p._id || p.slug}>
                {p.images?.[0] && <img src={p.images[0]} alt={p.title} />}
                <h3>{p.title}</h3>
                <p style={{ color: 'var(--text-2)', marginTop: 8 }}>{p.summary}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>{(p.stack || []).map((s) => <span className="tag" key={s}>{s}</span>)}</div>
                <Link className="btn btn-ghost btn-sm" style={{ marginTop: 16 }} to={`/projects/${p.slug}`}>View project →</Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
