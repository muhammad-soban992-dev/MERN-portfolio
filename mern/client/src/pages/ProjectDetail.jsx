import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { projectsApi } from '../api';
import useFetch from '../hooks/useFetch';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Skeleton, SectionError } from '../components/ui/Loader';
import useMode from '../hooks/useMode';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { mode, setMode } = useMode();
  const { data, loading, error, retry } = useFetch(() => projectsApi.getBySlug(slug), [slug]);
  return (
    <>
      <Helmet><title>{data ? `${data.title} — Sheeza Ansar` : 'Project — Sheeza Ansar'}</title>{data && <meta name="description" content={data.summary} />}</Helmet>
      <Navbar mode={mode} onModeChange={setMode} />
      <main className="wrap" style={{ paddingTop: 120, paddingBottom: 60 }}>
        {loading && <Skeleton lines={6} />}
        {error && <SectionError message={error} onRetry={retry} />}
        {!loading && !error && !data && <SectionError message="This project could not be found." />}
        {data && (
          <article>
            <Link to="/#projects">← Back to projects</Link>
            <h1 style={{ marginTop: 16 }}>{data.title}</h1>
            <p style={{ color: 'var(--text-2)', marginTop: 10 }}>{data.summary}</p>
            {data.images?.[0] && <img src={data.images[0]} alt={data.title} style={{ width: '100%', borderRadius: 16, marginTop: 20 }} />}
            {data.description && <p style={{ marginTop: 18 }}>{data.description}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>{(data.stack || []).map((s) => <span className="tag" key={s}>{s}</span>)}</div>
            <div className="cta-row">
              {data.liveUrl && <a className="btn btn-primary" href={data.liveUrl} target="_blank" rel="noopener noreferrer">View live site</a>}
              {data.repoUrl && <a className="btn btn-ghost" href={data.repoUrl} target="_blank" rel="noopener noreferrer">Source code</a>}
            </div>
          </article>
        )}
      </main>
      <Footer />
    </>
  );
}
