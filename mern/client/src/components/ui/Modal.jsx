export default function Modal({ title, children, onClose }) {
  return (
    <div role="dialog" aria-modal="true" aria-label={title} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(10,0,20,.6)', display: 'grid', placeItems: 'center', padding: 20 }}>
      <div className="admin-card" style={{ width: 'min(560px, 94vw)', maxHeight: '88vh', overflow: 'auto', margin: 0 }}>
        <h3 style={{ marginBottom: 14 }}>{title}</h3>
        {children}
        <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: 14 }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
