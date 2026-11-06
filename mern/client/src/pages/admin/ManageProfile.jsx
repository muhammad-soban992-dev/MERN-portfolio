import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from './AdminLayout';
import FormField from '../../components/admin/FormField';
import Toast from '../../components/ui/Toast';
import { profileApi } from '../../api';
import useFetch from '../../hooks/useFetch';
export default function ManageProfile() {
  const { data, loading } = useFetch(profileApi.get, []);
  const [form, setForm] = useState(null);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');
  useEffect(() => { if (data) setForm(data); }, [data]);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setSocial = (k) => (e) => setForm((f) => ({ ...f, social: { ...f.social, [k]: e.target.value } }));
  async function save(e) {
    e.preventDefault(); setError('');
    try { await profileApi.update(form); setToast('Profile saved.'); setTimeout(() => setToast(''), 3000); }
    catch (err) { setError(err.message); }
  }
  if (loading || !form) return <AdminLayout title="Manage Profile"><p>Loading…</p></AdminLayout>;
  return (
    <>
      <Helmet><title>Manage profile — Admin</title></Helmet>
      <AdminLayout title="Manage Profile">
        <form className="form admin-form" onSubmit={save} style={{ maxWidth: '100%' }}>
          <FormField label="Name" name="name" value={form.name} onChange={set('name')} />
          <FormField label="Headline" name="headline" value={form.headline} onChange={set('headline')} />
          <FormField label="Roles (comma separated)" name="roles" value={(form.roles || []).join(', ')} onChange={(e) => setForm((f) => ({ ...f, roles: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) }))} />
          <FormField label="Lead text" name="lead" value={form.lead} onChange={set('lead')} as="textarea" />
          <FormField label="Summary" name="summary" value={form.summary} onChange={set('summary')} as="textarea" rows={6} />
          <FormField label="Location" name="location" value={form.location} onChange={set('location')} />
          <FormField label="GitHub URL (leave empty if none)" name="github" value={form.social?.github || ''} onChange={setSocial('github')} />
          <FormField label="LinkedIn URL (leave empty if none)" name="linkedin" value={form.social?.linkedin || ''} onChange={setSocial('linkedin')} />
          <FormField label="Contact email (leave empty if none)" name="email" value={form.social?.email || ''} onChange={setSocial('email')} />
          <FormField label="Phone (leave empty if none)" name="phone" value={form.social?.phone || ''} onChange={setSocial('phone')} />
          {error && <p className="field-error">{error}</p>}
          <button className="btn btn-primary" type="submit">Save profile</button>
        </form>
        <Toast message={toast} />
      </AdminLayout>
    </>
  );
}
