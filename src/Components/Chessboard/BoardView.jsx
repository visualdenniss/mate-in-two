import { useEffect, useRef } from 'react';
import { Chessground } from 'chessground';

export default function BoardView({
  fen,
  width,
  dests,
  onMove,
  turn,
  checkColor,
}) {
  const boardRef = useRef(null);
  const cgRef = useRef(null);

  useEffect(() => {
    const config = {
      fen,
      turnColor: turn,
      check: checkColor,
      movable: {
        free: false,
        color: turn,
        dests,
        events: { after: onMove },
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
  }, [fen, dests, turn]);

  return (
    <div ref={boardRef} style={{ width: width || 400, height: width || 400 }} />
  );
}
