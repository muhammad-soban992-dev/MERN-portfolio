export default function FormField({ label, name, value, onChange, type = 'text', as, rows, options, placeholder }) {
  return (
    <label style={{ display: 'grid', gap: 6, fontWeight: 700, fontSize: '.88rem', color: 'var(--text-2)' }}>
      {label}
      {as === 'textarea' ? (
        <textarea name={name} value={value || ''} onChange={onChange} rows={rows || 4} placeholder={placeholder} />
      ) : as === 'select' ? (
        <select name={name} value={value || ''} onChange={onChange}>{options.map((o) => <option key={o} value={o}>{o}</option>)}</select>
      ) : (
        <input type={type} name={name} value={value ?? ''} onChange={onChange} placeholder={placeholder} />
      )}
    </label>
  );
}
