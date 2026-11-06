export function Skeleton({ lines = 3 }) {
  return <div className="skeleton" role="status" aria-label="Loading" style={{ minHeight: lines * 34 }}>{' '}</div>;
}
export function SectionError({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <p>{message || 'Something went wrong loading this section.'}</p>
      {onRetry && <button type="button" className="btn btn-primary btn-sm" style={{ marginTop: 12 }} onClick={onRetry}>Try again</button>}
    </div>
  );
}
export default Skeleton;
