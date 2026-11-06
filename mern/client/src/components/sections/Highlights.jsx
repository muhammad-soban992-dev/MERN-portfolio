import { Skeleton, SectionError } from '../ui/Loader';
export default function Highlights({ items, loading, error, onRetry }) {
  if (loading) return <section id="highlights"><div className="wrap"><Skeleton lines={3} /></div></section>;
  if (error) return <section id="highlights"><div className="wrap"><SectionError message={error} onRetry={onRetry} /></div></section>;
  return (
    <section id="highlights">
      <div className="wrap">
        <div className="sec-head reveal in"><p className="kicker">Academic Highlights</p><h2>Results that speak for themselves</h2></div>
        <div className="hl">
          {(items || []).map((h) => (
            <div className="hl-card reveal in" key={h._id || h.label}>
              <p className="big">{h.value}</p><h3>{h.label}</h3><p>{h.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
