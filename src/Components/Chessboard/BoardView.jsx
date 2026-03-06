import { useEffect, useRef } from 'react';
import { Chessground } from 'chessground';

export default function BoardView({
  fen,
  width,
  dests,
  onMove,
  turn,
  checkColor,
  lastMove,
}) {
  const boardRef = useRef(null);
  const cgRef = useRef(null);

  useEffect(() => {
    const config = {
      fen,
      turnColor: turn,
      check: checkColor,
      lastMove,
      coordinates: false,
      movable: {
        free: false,
        color: turn,
        dests,
        showDests: true,
        events: { after: onMove },

        promotion: {
          enabled: true,
        },
      },

      highlight: {
        check: true,
        lastMove: true,
      },
    };

    if (!cgRef.current) {
      cgRef.current = Chessground(boardRef.current, config);
    } else {
      cgRef.current.set(config);
    }
  }, [fen, dests, turn, checkColor, onMove, lastMove]);

  return (
    <div ref={boardRef} style={{ width: width || 400, height: width || 400 }} />
  );
}
