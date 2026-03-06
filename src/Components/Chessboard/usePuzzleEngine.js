import { useRef, useState } from 'react';
import { Chess } from 'chess.js';
import { useStockfish } from './useStockfish';

export const getLegalMoves = (chess) => {
  const dests = new Map();
  chess.moves({ verbose: true }).forEach((m) => {
    const ms = dests.get(m.from) || [];
    ms.push(m.to);
    dests.set(m.from, ms);
  });
  return dests;
};

export const isPromotionMoveForChess = (chess, orig, dest) =>
  chess
    .moves({ verbose: true })
    .some(
      (move) =>
        move.from === orig && move.to === dest && Boolean(move.promotion),
    );

export function usePuzzleEngine(setIsMate) {
  const chessRef = useRef(new Chess());
  const pendingMoveRef = useRef(null);

  const [status, setStatus] = useState('White to move');
  const [currentFen, setCurrentFen] = useState('');
  const [dests, setDests] = useState(new Map());
  const [turn, setTurn] = useState('white');
  const [checkColor, setCheckColor] = useState(false);

  const { analyzePosition } = useStockfish(handleEngineMove);

  function loadPosition(fen) {
    const safeFen =
      fen.trim().split(' ').length === 1 ? `${fen} w - - 0 1` : fen;

    chessRef.current.load(safeFen);
    const chess = chessRef.current;

    setCurrentFen(safeFen);
    setDests(getLegalMoves(chess));
    setTurn(chess.turn() === 'w' ? 'white' : 'black');
    setStatus('White to move');

    setCheckColor(
      chess.isCheck() ? (chess.turn() === 'w' ? 'white' : 'black') : false,
    );
  }

  function userMove(moveUCI) {
    const chess = chessRef.current;
    const positionBeforeMove = chess.fen();

    let move;
    try {
      move = chess.move({
        from: moveUCI.slice(0, 2),
        to: moveUCI.slice(2, 4),
        promotion: moveUCI[4],
      });
    } catch {
      return;
    }

    if (!move) return;

    // update board immediately
    setCurrentFen(chess.fen());
    setDests(getLegalMoves(chess));
    setTurn(chess.turn() === 'w' ? 'white' : 'black');
    setCheckColor(
      chess.isCheck() ? (chess.turn() === 'w' ? 'white' : 'black') : false,
    );

    pendingMoveRef.current = { moveUCI, positionBeforeMove };

    setStatus('Analyzing move...');
    analyzePosition(positionBeforeMove);
  }

  function isPromotionMove(orig, dest) {
    return isPromotionMoveForChess(chessRef.current, orig, dest);
  }

  function handleEngineMove(sfMove) {
    const chess = chessRef.current;

    if (pendingMoveRef.current) {
      const { moveUCI, positionBeforeMove } = pendingMoveRef.current;
      let normalizedMove = moveUCI;

      if (moveUCI.length === 4 && sfMove.length === 5) {
        normalizedMove = moveUCI + sfMove[4];
      }

      const isCorrect = normalizedMove === sfMove;

      console.log('engine move', sfMove);
      console.log('user move', moveUCI);

      if (!isCorrect) {
        chess.load(positionBeforeMove);
        setCurrentFen(positionBeforeMove);
        setDests(getLegalMoves(chess));
        setTurn(chess.turn() === 'w' ? 'white' : 'black');

        setCheckColor(
          chess.isCheck() ? (chess.turn() === 'w' ? 'white' : 'black') : false,
        );
        pendingMoveRef.current = null; // <-- clear it here!
        setStatus('❌ Incorrect move');
        return;
      }

      setCurrentFen(chess.fen());
      setDests(getLegalMoves(chess));
      setTurn(chess.turn() === 'w' ? 'white' : 'black');
      setCheckColor(
        chess.isCheck() ? (chess.turn() === 'w' ? 'white' : 'black') : false,
      );

      if (chess.isCheckmate()) {
        setStatus('🎉 Puzzle solved');
        setIsMate?.(true);
        return;
      }

      setStatus('Engine thinking...');
      analyzePosition(chess.fen());
      pendingMoveRef.current = null;
    } else {
      chess.move({
        from: sfMove.slice(0, 2),
        to: sfMove.slice(2, 4),
        promotion: sfMove.length > 4 ? sfMove[4] : undefined,
      });

      setCurrentFen(chess.fen());
      setDests(getLegalMoves(chess));
      setTurn(chess.turn() === 'w' ? 'white' : 'black');

      setCheckColor(
        chess.isCheck() ? (chess.turn() === 'w' ? 'white' : 'black') : false,
      );

      setStatus('Your move');
    }
  }

  return {
    status,
    currentFen,
    dests,
    turn,
    checkColor,
    loadPosition,
    userMove,
    isPromotionMove,
  };
}
