import { Helmet } from 'react-helmet-async';
import AdminLayout from './AdminLayout';
import useFetch from '../../hooks/useFetch';
import { expertiseApi, skillsApi, highlightsApi, educationApi, projectsApi, messagesApi } from '../../api';
import { Skeleton } from '../../components/ui/Loader';
export default function Dashboard() {
  const expertise = useFetch(expertiseApi.list, []);
  const skills = useFetch(skillsApi.list, []);
  const highlights = useFetch(highlightsApi.list, []);
  const education = useFetch(educationApi.list, []);
  const projects = useFetch(projectsApi.list, []);
  const messages = useFetch(messagesApi.list, []);
  const stats = [
    ['Expertise', expertise.data?.length], ['Skills', skills.data?.length], ['Highlights', highlights.data?.length],
    ['Education entries', education.data?.length], ['Projects', projects.data?.length],
    ['Messages', messages.data?.length], ['Unread messages', messages.data?.filter((m) => m.status === 'new').length],
  ];
  return (
    <>
      <Helmet><title>Admin dashboard — Sheeza Ansar</title></Helmet>
      <AdminLayout title="Dashboard">
        <div className="admin-grid">
          {stats.map(([label, value]) => (
            <div className="admin-stat" key={label}><b>{value === undefined ? '…' : value}</b><span>{label}</span></div>
          ))}
        </div>
        <div className="admin-card">
          <h3>Content status</h3>
          <p style={{ color: 'var(--text-2)', marginTop: 8 }}>Projects start empty — the CV lists no projects. Add the first one from the Projects page; it will appear in the public Projects section automatically.</p>
          <p style={{ color: 'var(--text-2)', marginTop: 8 }}>Contact-form messages arrive here and, when SMTP is configured on the server, also by email.</p>
        </div>
        {(expertise.loading || skills.loading) && <Skeleton lines={2} />}
      </AdminLayout>
    </>
  );
}
