import { useState } from 'react';
import Doll2D from '../dolls/Doll2D';
import { messagesApi } from '../../api';
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' });
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  async function submit(e) {
    e.preventDefault(); setBusy(true); setStatus('');
    try { await messagesApi.send(form); setStatus('Thank you — your message has been received.'); setForm({ name: '', email: '', subject: '', body: '' }); }
    catch (err) { setStatus(err.message || 'Could not send your message. Please try again.'); }
    finally { setBusy(false); }
  }
  return (
    <section id="contact">
      <div className="wrap">
        <div className="contact reveal in">
          <div className="doll-slot doll-c1"><Doll2D hair="#3b2a20" dress="#f9a8d4" acc="bow" /></div>
          <div className="doll-slot doll-c2"><Doll2D hair="#e8b45a" dress="#a7f3d0" acc="cap" /></div>
          <h2>Let&apos;s build something lovely together ♡</h2>
          <p>I&apos;m looking for opportunities in software development, UI/UX and quality engineering. If you&apos;re building a product that deserves careful engineering — I&apos;d love to be part of it.</p>
          <div className="pills"><span>Web Engineering</span><span>Mobile Apps</span><span>UI / UX</span><span>Software Quality</span><span>Urdu · English</span><span>Pakistan</span></div>
          <form className="form" onSubmit={submit}>
            <label>Name<input required value={form.name} onChange={set('name')} placeholder="Your name" /></label>
            <label>Email<input required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" /></label>
            <label>Subject<input required value={form.subject} onChange={set('subject')} placeholder="What is this about?" /></label>
            <label>Message<textarea required rows={4} value={form.body} onChange={set('body')} placeholder="Write your message…" /></label>
            <button className="btn" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send Message'}</button>
            {status && <p className="form-note" role="status">{status}</p>}
          </form>
          <a className="btn" href="#top" style={{ marginTop: 28 }}>Back to Top ↑</a>
        </div>
      </div>
    </section>
  );
}
