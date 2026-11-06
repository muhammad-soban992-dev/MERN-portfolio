import { Helmet } from 'react-helmet-async';
import ManageList from './ManageList';
import { highlightsApi } from '../../api';
export default function ManageHighlights() {
  return (
    <>
      <Helmet><title>Manage highlights — Admin</title></Helmet>
      <ManageList
        title="Manage Highlights" api={highlightsApi}
        columns={[{ key: 'value', label: 'Value' }, { key: 'label', label: 'Label' }, { key: 'description', label: 'Description' }]}
        fields={[
          { key: 'label', label: 'Label' },
          { key: 'value', label: 'Value (e.g. 3.83, A+)' },
          { key: 'description', label: 'Description', as: 'textarea' },
          { key: 'order', label: 'Order', type: 'number' },
        ]}
        emptyForm={{ label: '', value: '', description: '', order: 0 }}
        emptyText="No highlights yet."
      />
    </>
  );
}
