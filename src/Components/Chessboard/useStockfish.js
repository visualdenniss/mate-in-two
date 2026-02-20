import { useEffect, useRef } from 'react';

export function useStockfish(onBestMove) {
  const engineRef = useRef(null);

  useEffect(() => {
    engineRef.current = new Worker('/stockfish.js');

    engineRef.current.onmessage = (e) => {
      const line = e.data;
      if (!line) return;

      if (line.startsWith('bestmove')) {
        const move = line.split(' ')[1];
        onBestMove(move);
      }
    };

    engineRef.current.postMessage('uci');

    return () => engineRef.current?.terminate();
  }, []);

  function analyzePosition(fen) {
    engineRef.current.postMessage('ucinewgame');
    engineRef.current.postMessage(`position fen ${fen}`);
    engineRef.current.postMessage('go depth 27');
  }

  return { analyzePosition };
}
