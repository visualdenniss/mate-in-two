import './PromotionPicker.css';
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export default function PromotionPicker({ color, square, onSelect, onCancel }) {
  if (!square) return null;

  const file = files.indexOf(square[0]); // column
  const rank = 4; // row from top

  const left = `${file * 12.5}%`;
  const top = `${rank * 12.5}%`;

  return (
    <div className="picker-bg" onClick={onCancel}>
      <div
        className={`promotion-picker ${color}`}
        style={{ left, top }}
        onClick={(e) => e.stopPropagation()}
      >
        {['q', 'n', 'r', 'b'].map((p) => (
          <div key={p} className="piece" onClick={() => onSelect(p)}>
            <div className={`piece-icon ${color}-${p}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
