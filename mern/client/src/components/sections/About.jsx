import Doll2D from '../dolls/Doll2D';
import { Skeleton, SectionError } from '../ui/Loader';
export default function About({ profile, loading, error, onRetry }) {
  if (loading) return <section id="about"><div className="wrap"><Skeleton lines={4} /></div></section>;
  if (error || !profile) return <section id="about"><div className="wrap"><SectionError message={error} onRetry={onRetry} /></div></section>;
  return (
    <section id="about">
      <div className="wrap">
        <div className="doll-slot doll-about"><Doll2D hair="#2f2a4a" dress="#c4b5fd" acc="book" /></div>
        <div className="sec-head reveal in">
          <p className="kicker">About Me</p>
          <h2>Engineering discipline with a design eye</h2>
          <p>A detail-oriented graduate who plans software like a project and builds it with quality in mind.</p>
        </div>
        <div className="about-grid">
          <div className="panel reveal in">
            <h3>Professional Summary</h3>
            <p>{profile.summary}</p>
            <ul className="seek-list">
              <li>Web &amp; mobile application development</li>
              <li>UI/UX and human computer interaction</li>
              <li>Software quality engineering &amp; project management</li>
            </ul>
          </div>
          <div className="panel reveal in">
            <h3>Quick Facts</h3>
            <div className="fact-rows">
              {profile.facts?.map((f) => <div className="fact" key={f.label}><span>{f.label}</span><b>{f.value}</b></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
