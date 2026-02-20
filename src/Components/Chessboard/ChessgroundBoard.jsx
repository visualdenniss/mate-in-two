import { useEffect } from 'react';
import BoardView from './BoardView';
import { usePuzzleEngine } from './usePuzzleEngine';

import './ChessgroundBoard.css';

const ChessgroundBoard = ({ fen, width, resetKey, setIsMate }) => {
  const {
    status,
    currentFen,
    dests,
    turn,
    checkColor,
    loadPosition,
    userMove,
  } = usePuzzleEngine(setIsMate);

  useEffect(() => {
    if (!fen) return;
    loadPosition(fen);
  }, [fen, resetKey]);

  const handleMove = (orig, dest) => {
    userMove(orig + dest);
  };

  return (
    <div className="board-wrapper">
      <div className="status-text">{status}</div>
      <BoardView
        fen={currentFen}
        width={width}
        dests={dests}
        onMove={handleMove}
        turn={turn}
        checkColor={checkColor}
      />
    </div>
  );
};

export default ChessgroundBoard;
