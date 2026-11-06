import { useState } from 'react';
import AdminLayout from './AdminLayout';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/ui/Modal';
import Toast from '../../components/ui/Toast';
import useFetch from '../../hooks/useFetch';

/** Generic admin CRUD page: list + create/edit modal + delete. */
export default function ManageList({ title, api, columns, fields, emptyForm, emptyText }) {
  const { data, loading, error, retry } = useFetch(api.list, []);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [toast, setToast] = useState('');
  const [saveError, setSaveError] = useState('');
  const openNew = () => { setEditing(null); setForm(emptyForm); setSaveError(''); setOpen(true); };
  const openEdit = (row) => { setEditing(row); setForm({ ...emptyForm, ...row }); setSaveError(''); setOpen(true); };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }));
  async function save(e) {
    e.preventDefault();
    try {
      if (editing) await api.update(editing._id, form); else await api.create(form);
      setToast(editing ? 'Saved.' : 'Created.'); setEditing(null); setForm(emptyForm); setOpen(false); retry(); setTimeout(() => setToast(''), 3000);
    } catch (err) { setSaveError(err.message); }
  }
  async function remove(row) {
    if (!window.confirm(`Delete "${row.title || row.name || row.label || row.degree}"?`)) return;
    try { await api.remove(row._id); setToast('Deleted.'); retry(); setTimeout(() => setToast(''), 3000); }
    catch (err) { setToast(err.message); setTimeout(() => setToast(''), 4000); }
  }
  return (
    <AdminLayout title={title}>
      <button type="button" className="btn btn-primary btn-sm" style={{ marginBottom: 16 }} onClick={openNew}>+ Add new</button>
      {loading && <p>Loading…</p>}
      {error && <p className="field-error">{error} <button type="button" className="btn btn-ghost btn-sm" onClick={retry}>Retry</button></p>}
      {!loading && !error && <DataTable columns={columns} rows={data || []} onEdit={openEdit} onDelete={remove} emptyText={emptyText} />}
      {open && (
        <Modal title={editing ? `Edit — ${editing.title || editing.name || editing.label || editing.degree}` : `Add ${title.replace('Manage ', '')}`} onClose={() => { setEditing(null); setForm(emptyForm); setOpen(false); }}>
          <form className="form admin-form" onSubmit={save} style={{ maxWidth: '100%' }}>
            {fields.map((f) => {
              if (f.as === 'textarea') return <label key={f.key} style={{ display: 'grid', gap: 6 }}>{f.label}<textarea name={f.key} value={form[f.key] || ''} onChange={set(f.key)} rows={4} /></label>;
              if (f.as === 'select') return <label key={f.key} style={{ display: 'grid', gap: 6 }}>{f.label}<select name={f.key} value={form[f.key] || ''} onChange={set(f.key)}>{f.options.map((o) => <option key={o} value={o}>{o}</option>)}</select></label>;
              if (f.as === 'checkbox') return <label key={f.key} style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" checked={!!form[f.key]} onChange={(e) => setForm((x) => ({ ...x, [f.key]: e.target.checked }))} />{f.label}</label>;
              return <label key={f.key} style={{ display: 'grid', gap: 6 }}>{f.label}<input type={f.type || 'text'} name={f.key} value={form[f.key] ?? ''} onChange={set(f.key)} /></label>;
            })}
            {saveError && <p className="field-error">{saveError}</p>}
            <button className="btn btn-primary" type="submit">Save</button>
          </form>
        </Modal>
      )}
      <Toast message={toast} />
    </AdminLayout>
  );
}
