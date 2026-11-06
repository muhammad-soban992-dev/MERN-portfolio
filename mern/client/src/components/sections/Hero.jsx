import { useEffect, useRef, useState } from 'react';
import Doll2D from '../dolls/Doll2D';
import { Skeleton, SectionError } from '../ui/Loader';

const STICKERS = { heart: "M12 21s-8-5.2-9.6-10C1.2 7.4 3.4 4.5 6.5 4.5c2 0 3.6 1.1 5.5 3.2 1.9-2.1 3.5-3.2 5.5-3.2 3.1 0 5.3 2.9 4.1 6.5C20 15.8 12 21 12 21z", star: "M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z", book: "M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2zM7 18h10V6H7z", pencil: "M4 20l1-4L16.5 4.5l3 3L8 19z" };
const MARQUEE = ['Web Engineering', 'Mobile App Development', 'UI / UX Design', 'Software Quality', 'Project Management', 'Database Systems', 'Object Oriented Programming', 'Data Structures & Algorithms', 'Business Process Engineering', 'Technical Writing'];

function useTyping(roles) {
  const [text, setText] = useState(roles[0] || 'Software Engineer');
  useEffect(() => {
    if (!roles.length) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setText(roles[0]); return undefined; }
    let ri = 0; let ci = roles[0].length; let deleting = false; let timer;
    const tick = () => {
      const word = roles[ri];
      if (!deleting) { ci += 1; setText(word.slice(0, ci)); if (ci === word.length) { deleting = true; timer = setTimeout(tick, 1700); return; } timer = setTimeout(tick, 65); }
      else { ci -= 1; setText(word.slice(0, ci)); if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; timer = setTimeout(tick, 320); return; } timer = setTimeout(tick, 34); }
    };
    timer = setTimeout(tick, 1800);
    return () => clearTimeout(timer);
  }, [roles]);
  return text;
}

function Stat({ label, value }) {
  const [shown, setShown] = useState('0');
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return undefined;
    const target = parseFloat(value); const dec = value.includes('.') ? 2 : 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      const start = performance.now();
      const step = (ts) => { const p = Math.min((ts - start) / 1400, 1); const eased = 1 - Math.pow(1 - p, 3); setShown((target * eased).toFixed(dec)); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step); io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <div className="stat" ref={ref}><b>{shown}</b><span>{label}</span></div>;
}

export default function Hero({ profile, loading, error, onRetry }) {
  const roles = profile?.roles || [];
  const role = useTyping(roles);
  const cardRef = useRef(null);
  const onTilt = (e) => {
    const el = cardRef.current; if (!el || document.body.getAttribute('data-mode') !== '3d') return;
    const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
  };
  if (loading) return <header id="top"><div className="wrap"><Skeleton lines={6} /></div></header>;
  if (error || !profile) return <header id="top"><div className="wrap"><SectionError message={error} onRetry={onRetry} /></div></header>;
  const half = MARQUEE.map((w) => <span key={w}>{w} ✦</span>);
  return (
    <>
      <header id="top">
        <div className="veil" />
        <div className="stickers" aria-hidden="true">
          {['heart', 'star', 'book', 'pencil', 'heart', 'star'].map((k, i) => (
            <span key={i} className={`stk s${i + 1}`}><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d={STICKERS[k]} /></svg></span>
          ))}
        </div>
        <div className="wrap hero">
          <div>
            <span className="eyebrow"><span className="dot" /> Fresh graduate · Open to opportunities</span>
            <h1>Sheeza <span className="grad">Ansar</span></h1>
            <p className="role-line">I am a <span id="role">{role}</span></p>
            <p className="lead">{profile.lead}</p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#expertise">Explore My Expertise ↓</a>
              <a className="btn btn-ghost" href="#education">My Education</a>
            </div>
            <div className="stats">{profile.stats?.map((s) => <Stat key={s.label} label={s.label} value={s.value} />)}</div>
          </div>
          <div className="stage">
            <div className="speech">
              <p className="hi">Hi, I&apos;m Sheeza ✿</p>
              <p>Fresh Software Engineering graduate who loves clean, cute and user-friendly design.</p>
              <div className="tags"><span className="tag">Web</span><span className="tag">Mobile</span><span className="tag">UI / UX</span><span className="tag">Quality</span></div>
            </div>
            <div className="doll-slot doll-hero"><Doll2D hair="#4a2c2a" dress="#f9a8d4" acc="cap" /></div>
            <div className="pcard" id="pcard" ref={cardRef} onPointerMove={onTilt} onPointerLeave={() => { if (cardRef.current) cardRef.current.style.transform = ''; }}>
              <div className="avatar"><span className="doll-slot"><Doll2D hair="#4a2c2a" dress="#f9a8d4" acc="cap" face /></span></div>
              <h3>{profile.name}</h3>
              <p className="sub">{profile.headline}</p>
              <div className="tags"><span className="tag">Web Engineering</span><span className="tag">Mobile Apps</span><span className="tag">UI / UX</span><span className="tag">Software Quality</span></div>
              <div className="foot"><span>📍 {profile.location}</span><span>Urdu · English</span></div>
            </div>
          </div>
        </div>
      </header>
      <div className="marquee" aria-hidden="true"><div className="track">{half}{half}</div></div>
    </>
  );
}
