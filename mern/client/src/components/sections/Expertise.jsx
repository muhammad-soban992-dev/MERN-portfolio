import { Skeleton, SectionError } from '../ui/Loader';
const ICONS = {
  code: 'M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16',
  mobile: 'M7 2.5h10a2.5 2.5 0 0 1 2.5 2.5v14A2.5 2.5 0 0 1 17 21.5H7A2.5 2.5 0 0 1 4.5 19V5A2.5 2.5 0 0 1 7 2.5zM11 18.5h2',
  design: 'M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM3 9h18M8 14h4',
  shield: 'M12 3 4.5 6v5.5c0 4.5 3.1 8 7.5 9.5 4.4-1.5 7.5-5 7.5-9.5V6zM9 12l2.2 2.2L15.5 10',
};
export default function Expertise({ items, loading, error, onRetry }) {
  if (loading) return <section id="expertise"><div className="wrap"><Skeleton lines={4} /></div></section>;
  if (error) return <section id="expertise"><div className="wrap"><SectionError message={error} onRetry={onRetry} /></div></section>;
  return (
    <section id="expertise">
      <div className="wrap">
        <div className="sec-head reveal in">
          <p className="kicker">What I Do</p>
          <h2>Expertise built on a solid engineering foundation</h2>
          <p>Hover or move across the cards — each one is a core strength from my professional skill set.</p>
        </div>
        <div className="cards">
          {(items || []).map((x, i) => (
            <article className="xcard tilt reveal in" key={x._id || x.title}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <div className="ic"><svg viewBox="0 0 24 24"><path d={ICONS[x.icon] || ICONS.code} /></svg></div>
              <h3>{x.title}</h3>
              <p>{x.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
