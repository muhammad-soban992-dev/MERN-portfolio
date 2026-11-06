import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from './AdminLayout';
import Toast from '../../components/ui/Toast';
import { formatDate } from '../../utils/format';
import { messagesApi } from '../../api';
import useFetch from '../../hooks/useFetch';
export default function Messages() {
  const { data, loading, error, retry } = useFetch(messagesApi.list, []);
  const [toast, setToast] = useState('');
  async function setStatus(m, status) {
    try { await messagesApi.updateStatus(m._id, status); retry(); } catch (err) { setToast(err.message); setTimeout(() => setToast(''), 4000); }
  }
  async function remove(m) {
    if (!window.confirm(`Delete the message from ${m.name}?`)) return;
    try { await messagesApi.remove(m._id); setToast('Message deleted.'); retry(); setTimeout(() => setToast(''), 3000); }
    catch (err) { setToast(err.message); setTimeout(() => setToast(''), 4000); }
  }
  return (
    <>
      <Helmet><title>Messages — Admin</title></Helmet>
      <AdminLayout title="Messages">
        {loading && <p>Loading…</p>}
        {error && <p className="field-error">{error} <button type="button" className="btn btn-ghost btn-sm" onClick={retry}>Retry</button></p>}
        {!loading && !error && !(data || []).length && <p className="empty">No messages yet.</p>}
        {(data || []).map((m) => (
          <div className="admin-card" key={m._id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div><b>{m.name}</b> · {m.email}<br /><span style={{ color: 'var(--muted)', fontSize: '.85rem' }}>{formatDate(m.createdAt)} · Status: {m.status}</span></div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStatus(m, 'read')}>Mark read</button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStatus(m, 'replied')}>Mark replied</button>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => remove(m)}>Delete</button>
              </div>
            </div>
            <p style={{ marginTop: 10 }}><b>{m.subject}</b></p>
            <p style={{ color: 'var(--text-2)', marginTop: 6, whiteSpace: 'pre-wrap' }}>{m.body}</p>
          </div>
        ))}
        <Toast message={toast} />
      </AdminLayout>
    </>
  );
}
