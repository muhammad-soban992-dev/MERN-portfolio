export default function DataTable({ columns, rows, onEdit, onDelete, emptyText = 'Nothing here yet.' }) {
  if (!rows.length) return <p className="empty">{emptyText}</p>;
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="data">
        <thead><tr>{columns.map((c) => <th key={c.key}>{c.label}</th>)}<th>Actions</th></tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id}>
              {columns.map((c) => <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>)}
              <td style={{ whiteSpace: 'nowrap' }}>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => onEdit(row)}>Edit</button>{' '}
                <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(row)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
