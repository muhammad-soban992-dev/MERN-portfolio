import { Skeleton, SectionError } from '../ui/Loader';
export default function Education({ items, loading, error, onRetry }) {
  if (loading) return <section id="education"><div className="wrap"><Skeleton lines={4} /></div></section>;
  if (error) return <section id="education"><div className="wrap"><SectionError message={error} onRetry={onRetry} /></div></section>;
  const courses = (items || []).flatMap((e) => e.courses || []);
  const pct = (grade) => { const m = String(grade || '').match(/([\d.]+)\s*\/\s*([\d.]+)/); if (!m) return 86; return Math.round((parseFloat(m[1]) / parseFloat(m[2])) * 100); };
  return (
    <section id="education">
      <div className="wrap">
        <div className="sec-head reveal in"><p className="kicker">Education</p><h2>My academic journey</h2></div>
        <div className="timeline">
          {(items || []).map((e) => (
            <div className="t-item reveal in" key={e._id || e.degree}>
              <h3>{e.degree}</h3>
              <p className="inst">{e.institute}</p>
              {e.description && <p>{e.description}</p>}
              {e.grade && <div className="score"><div className="bar"><i style={{ width: `${pct(e.grade)}%` }} /></div><b>{e.grade}</b></div>}
            </div>
          ))}
        </div>
        {courses.length > 0 && (
          <>
            <div className="sec-head reveal in" style={{ marginTop: 64 }}>
              <p className="kicker">Coursework &amp; Technical Grounding</p>
              <h2>What my degree covered</h2>
              <p>The engineering foundation of my degree — software, web and mobile development, plus management and communication.</p>
            </div>
            <div className="chip-cloud reveal in">{courses.map((c) => <span className="tag" key={c}>{c}</span>)}</div>
          </>
        )}
      </div>
    </section>
  );
}
