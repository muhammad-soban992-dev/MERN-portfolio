export default function Hud({ label, progress }) {
  return (
    <div className="hud" aria-hidden="true">
      <span>{label}</span>
      <span className="hud-track"><i style={{ transform: `scaleX(${progress})` }} /></span>
    </div>
  );
}
