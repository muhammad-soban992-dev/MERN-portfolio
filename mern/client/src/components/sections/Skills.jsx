import { useState } from 'react';
import { Skeleton, SectionError } from '../ui/Loader';
export default function Skills({ items, loading, error, onRetry }) {
  const [tab, setTab] = useState('Technical');
  if (loading) return <section id="skills"><div className="wrap"><Skeleton lines={4} /></div></section>;
  if (error) return <section id="skills"><div className="wrap"><SectionError message={error} onRetry={onRetry} /></div></section>;
  const shown = (items || []).filter((s) => s.category === tab);
  return (
    <section id="skills">
      <div className="wrap">
        <div className="sec-head reveal in">
          <p className="kicker">Skills Explorer</p>
          <h2>Technical and professional toolkit</h2>
          <p>Switch between the technical foundation from my Software Engineering degree and my professional strengths.</p>
        </div>
        <div className="tabs reveal in" role="tablist" aria-label="Skill categories">
          {['Technical', 'Professional'].map((t) => (
            <button key={t} type="button" className={`tab${tab === t ? ' active' : ''}`} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>
              {t === 'Technical' ? 'Technical Background' : 'Professional Strengths'}
            </button>
          ))}
        </div>
        <div className="skill-grid reveal in">
          {shown.map((s) => (
            <div className="skill" key={s._id || s.name}>
              <div className="row"><b>{s.name}</b><span className="lvl">{s.levelLabel}</span></div>
              <p>{s.description}</p>
              <div className="bar"><i style={{ width: `${s.level}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
