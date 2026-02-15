import { useEffect, useRef, useState } from 'react';
import { Chessground } from 'chessground';
import { Chess } from 'chess.js';

const getLegalMoves = (chess) => {
  const dests = new Map();
  chess.moves({ verbose: true }).forEach((m) => {
    const ms = dests.get(m.from) || [];
    ms.push(m.to);
    dests.set(m.from, ms);
  });
  return dests;
};

const ChessgroundBoard = ({ fen, width }) => {
  const boardRef = useRef(null);
  const cgRef = useRef(null);
  const chessRef = useRef(new Chess());
  const engineRef = useRef(null);

  const [status, setStatus] = useState('White to move');
  // We use a Ref for the pending move to avoid closure staleness issues
  const pendingMoveRef = useRef(null);

  useEffect(() => {
    engineRef.current = new Worker('/stockfish.js');

    engineRef.current.onmessage = (e) => {
      const line = e.data;
      if (!line) return;

      if (line.startsWith('bestmove')) {
        const sfMove = line.split(' ')[1];
        handleEngineResponse(sfMove);
      }
    };

    engineRef.current.postMessage('uci');
    return () => engineRef.current?.terminate();
  }, []);

  useEffect(() => {
    if (!boardRef.current || !fen) return;
    const safeFen =
      fen.trim().split(' ').length === 1 ? `${fen} w - - 0 1` : fen;

    chessRef.current.load(safeFen);
    setStatus('White to move');
    pendingMoveRef.current = null;

    const config = {
      fen: safeFen,
      turnColor: 'white',
      movable: {
        free: false,
        color: 'white',
        dests: getLegalMoves(chessRef.current),
        events: { after: handleUserMove },
      },
    };

    if (!cgRef.current) {
      cgRef.current = Chessground(boardRef.current, config);
    } else {
      cgRef.current.set(config);
    }
  }, [fen]);

  // 1. User drops a piece
  function handleUserMove(orig, dest) {
    const moveUCI = orig + dest;
    const positionBeforeMove = chessRef.current.fen();

    setStatus('Analyzing move...');
    pendingMoveRef.current = moveUCI;

    // Ask SF: "What was the best move in the position I just moved from?"
    engineRef.current.postMessage('ucinewgame');
    engineRef.current.postMessage(`position fen ${positionBeforeMove}`);
    engineRef.current.postMessage('go depth 20');
  }

  // 2. SF replies with the best move for that position
  function handleEngineResponse(sfMove) {
    const chess = chessRef.current;
    const userMoveUCI = pendingMoveRef.current;

    // If it's White's turn, we are validating the user's move
    if (chess.turn() === 'w') {
      const isCorrect =
        userMoveUCI === sfMove ||
        (sfMove.startsWith(userMoveUCI) && sfMove.length === 5);

      if (isCorrect) {
        // Apply to logic
        chess.move({
          from: userMoveUCI.slice(0, 2),
          to: userMoveUCI.slice(2, 4),
          promotion: 'q',
        });
        setStatus('✅ Correct!');
        syncBoard();

        if (chess.isCheckmate()) {
          setStatus('🎉 Checkmate! You solved it!');
        } else {
          // Now ask engine to move for Black
          setTimeout(() => {
            setStatus('Engine is thinking...');
            engineRef.current.postMessage(`position fen ${chess.fen()}`);
            engineRef.current.postMessage('go depth 20');
          }, 500);
        }
      } else {
        setStatus('❌ Incorrect move. Taking back...');
        setTimeout(() => syncBoard(), 500);
      }
      pendingMoveRef.current = null;
    }
    // If it's Black's turn, the engine is playing its response
    else {
      applyBlackMove(sfMove);
    }
  }

  function applyBlackMove(uciMove) {
    const chess = chessRef.current;
    chess.move({
      from: uciMove.slice(0, 2),
      to: uciMove.slice(2, 4),
      promotion: 'q',
    });
    syncBoard();

    if (chess.isCheckmate()) {
      setStatus('💀 Checkmate! Black wins.');
    } else {
      setStatus('Your turn again!');
    }
  }

  function syncBoard() {
    const chess = chessRef.current;
    cgRef.current?.set({
      fen: chess.fen(),
      turnColor: chess.turn() === 'w' ? 'white' : 'black',
      movable: {
        color: chess.turn() === 'w' ? 'white' : 'black',
        dests: getLegalMoves(chess),
      },
    });
  }

  return (
    <div className="board-wrapper">
      <div
        className="status-text"
        style={{
          height: '30px',
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: 'white',
        }}
      >
        {status}
      </div>
      <div
        ref={boardRef}
        style={{ width: width || 400, height: width || 400 }}
      />
    </div>
  );
};

export default ChessgroundBoard;
