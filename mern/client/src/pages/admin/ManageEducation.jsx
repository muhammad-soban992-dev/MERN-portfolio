import { Helmet } from 'react-helmet-async';
import ManageList from './ManageList';
import { educationApi } from '../../api';
export default function ManageEducation() {
  return (
    <>
      <Helmet><title>Manage education — Admin</title></Helmet>
      <ManageList
        title="Manage Education" api={educationApi}
        columns={[{ key: 'degree', label: 'Degree' }, { key: 'institute', label: 'Institute' }, { key: 'grade', label: 'Grade' }]}
        fields={[
          { key: 'degree', label: 'Degree' },
          { key: 'institute', label: 'Institute' },
          { key: 'grade', label: 'Grade (e.g. CGPA 3.45 / 4.00)' },
          { key: 'description', label: 'Description', as: 'textarea' },
          { key: 'order', label: 'Order', type: 'number' },
        ]}
        emptyForm={{ degree: '', institute: '', grade: '', description: '', courses: [], order: 0 }}
        emptyText="No education entries yet."
      />
    </>
  );
}
