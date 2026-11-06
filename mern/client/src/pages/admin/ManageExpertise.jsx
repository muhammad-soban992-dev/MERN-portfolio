import { Helmet } from 'react-helmet-async';
import ManageList from './ManageList';
import { expertiseApi } from '../../api';
export default function ManageExpertise() {
  return (
    <>
      <Helmet><title>Manage expertise — Admin</title></Helmet>
      <ManageList
        title="Manage Expertise" api={expertiseApi}
        columns={[{ key: 'title', label: 'Title' }, { key: 'icon', label: 'Icon' }, { key: 'description', label: 'Description' }]}
        fields={[
          { key: 'title', label: 'Title' },
          { key: 'icon', label: 'Icon (code, mobile, design, shield)', },
          { key: 'description', label: 'Description', as: 'textarea' },
          { key: 'order', label: 'Order', type: 'number' },
        ]}
        emptyForm={{ title: '', icon: 'code', description: '', tags: [], order: 0 }}
        emptyText="No expertise entries yet."
      />
    </>
  );
}
