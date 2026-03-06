import { useEffect, useState } from 'react';
import BoardView from './BoardView';
import PromotionPicker from './PromotionPicker';
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
    isPromotionMove,
  } = usePuzzleEngine(setIsMate);

  const [promotionMove, setPromotionMove] = useState(null);
  const [lastMove, setLastMove] = useState(null);

  const cancelPromotion = () => {
    setPromotionMove(null);
    setLastMove(null); // remove highlight
  };

  useEffect(() => {
    if (!fen) return;
    loadPosition(fen);
  }, [fen, resetKey]);

  const handleMove = (orig, dest) => {
    setLastMove([orig, dest]); // highlight attempt

    if (isPromotionMove(orig, dest)) {
      setPromotionMove({ orig, dest });
      return;
    }

    userMove(orig + dest);
  };

  const handlePromotionSelect = (piece) => {
    const { orig, dest } = promotionMove;
    userMove(orig + dest + piece);
    setPromotionMove(null);
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
        lastMove={lastMove}
      />
      <PromotionPicker
        color={turn}
        square={promotionMove?.dest}
        onSelect={handlePromotionSelect}
        onCancel={cancelPromotion}
      />
    </div>
  );
};

export default ChessgroundBoard;
