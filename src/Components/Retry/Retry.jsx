import './Retry.css';
import { MdOutlineReplay } from 'react-icons/md';

export const Retry = ({ onRetry }) => {
  return (
    <div className="retry-component">
      <button onClick={onRetry} className="retry-btn">
        <MdOutlineReplay />
      </button>
    </div>
  );
};
