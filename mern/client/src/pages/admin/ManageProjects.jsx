import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ManageList from './ManageList';
import ImageUploader from '../../components/admin/ImageUploader';
import { projectsApi } from '../../api';
// Extra image handling lives beside the generic list: the list form below
// is wrapped so the uploader can append an image URL to the project.
export default function ManageProjects() {
  const [image, setImage] = useState('');
  return (
    <>
      <Helmet><title>Manage projects — Admin</title></Helmet>
      <div className="admin wrap" style={{ paddingBottom: 0 }}>
        <p style={{ color: 'var(--text-2)' }}>Upload a project image first (optional), then add the project — the uploaded image URL is used as its first image. Image upload needs Cloudinary configured on the server; otherwise it fails with a clear message.</p>
        <ImageUploader value={image} onUploaded={setImage} />
        {image && <p style={{ wordBreak: 'break-all', fontSize: '.85rem' }}>Image URL: {image}</p>}
      </div>
      <ManageList
        title="Manage Projects" api={projectsApi}
        columns={[{ key: 'title', label: 'Title' }, { key: 'slug', label: 'Slug' }, { key: 'featured', label: 'Featured', render: (r) => (r.featured ? 'Yes' : 'No') }]}
        fields={[
          { key: 'title', label: 'Title' },
          { key: 'slug', label: 'Slug (leave empty to auto-generate from title)' },
          { key: 'summary', label: 'Summary', as: 'textarea' },
          { key: 'description', label: 'Description', as: 'textarea' },
          { key: 'liveUrl', label: 'Live URL (optional)' },
          { key: 'repoUrl', label: 'Repository URL (optional)' },
          { key: 'featured', label: 'Featured', as: 'checkbox' },
          { key: 'order', label: 'Order', type: 'number' },
        ]}
        emptyForm={{ title: '', slug: '', summary: '', description: '', stack: [], images: image ? [image] : [], liveUrl: '', repoUrl: '', featured: false, order: 0 }}
        emptyText="No projects yet — the CV lists no projects, so this starts empty."
      />
    </>
  );
}
