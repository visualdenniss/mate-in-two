import { useRef, useState } from 'react';
import { Chess } from 'chess.js';
import { useStockfish } from './useStockfish';

const getLegalMoves = (chess) => {
  const dests = new Map();
  chess.moves({ verbose: true }).forEach((m) => {
    const ms = dests.get(m.from) || [];
    ms.push(m.to);
    dests.set(m.from, ms);
  });
  return dests;
};

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
    const positionBeforeMove = chessRef.current.fen();

    pendingMoveRef.current = { moveUCI, positionBeforeMove };
    setStatus('Analyzing move...');

    analyzePosition(positionBeforeMove);
  }

  function handleEngineMove(sfMove) {
    const chess = chessRef.current;

    if (chess.turn() === 'w') {
      const { moveUCI, positionBeforeMove } = pendingMoveRef.current;
      const isCorrect =
        moveUCI === sfMove ||
        (sfMove.startsWith(moveUCI) && sfMove.length === 5);

      if (!isCorrect) {
        chess.load(positionBeforeMove);
        setCurrentFen(positionBeforeMove);
        setDests(getLegalMoves(chess));
        setTurn(chess.turn() === 'w' ? 'white' : 'black');

        setCheckColor(
          chess.isCheck() ? (chess.turn() === 'w' ? 'white' : 'black') : false,
        );

        setStatus('❌ Incorrect move');
        return;
      }

      chess.move({
        from: moveUCI.slice(0, 2),
        to: moveUCI.slice(2, 4),
        promotion: 'q',
      });

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
        promotion: 'q',
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
  };
}
