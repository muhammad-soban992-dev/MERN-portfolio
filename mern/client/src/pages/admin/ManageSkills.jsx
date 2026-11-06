import { Helmet } from 'react-helmet-async';
import ManageList from './ManageList';
import { skillsApi } from '../../api';
export default function ManageSkills() {
  return (
    <>
      <Helmet><title>Manage skills — Admin</title></Helmet>
      <ManageList
        title="Manage Skills" api={skillsApi}
        columns={[{ key: 'name', label: 'Name' }, { key: 'category', label: 'Category' }, { key: 'level', label: 'Level' }, { key: 'levelLabel', label: 'Label' }]}
        fields={[
          { key: 'name', label: 'Name' },
          { key: 'category', label: 'Category', as: 'select', options: ['Technical', 'Professional'] },
          { key: 'level', label: 'Level (0–100)', type: 'number' },
          { key: 'levelLabel', label: 'Level label (e.g. A+ Grade, Strong)' },
          { key: 'description', label: 'Description', as: 'textarea' },
          { key: 'order', label: 'Order', type: 'number' },
        ]}
        emptyForm={{ name: '', category: 'Technical', level: 80, levelLabel: 'Strong', description: '', order: 0 }}
        emptyText="No skills yet."
      />
    </>
  );
}
