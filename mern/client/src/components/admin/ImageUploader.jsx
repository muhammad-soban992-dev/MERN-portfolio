import { useState } from 'react';
import { uploadApi } from '../../api';
export default function ImageUploader({ value, onUploaded }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function handle(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setBusy(true); setError('');
    try { const url = await uploadApi.image(file); onUploaded(url); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return (
    <div>
      <label style={{ display: 'grid', gap: 6, fontWeight: 700, fontSize: '.88rem', color: 'var(--text-2)' }}>
        Project image
        <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handle} disabled={busy} />
      </label>
      {busy && <p>Uploading…</p>}
      {error && <p className="field-error">{error}</p>}
      {value && <img src={value} alt="Uploaded project preview" style={{ width: 180, borderRadius: 12, marginTop: 10 }} />}
      <p style={{ color: 'var(--muted)', fontSize: '.85rem' }}>Uploads go to Cloudinary. If Cloudinary is not configured on the server, the upload fails with a clear message instead of crashing.</p>
    </div>
  );
}
