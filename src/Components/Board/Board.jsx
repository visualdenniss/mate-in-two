import { useState } from 'react';
import ChessgroundBoard from '../../Components/Chessboard/ChessgroundBoard';
import useMediaQuery from '../../Hooks/useMediaQuery';
import './Board.css';
import Bookmark from '../Bookmark/Bookmark';
import Info from '../Info/Info';
import CopyClipBoard from '../CopyClipBoard/CopyClipBoard';
import Download from '../Download/Download';
import { Retry } from '../Retry/Retry';

const Board = ({ id, fen }) => {
  const isDesktop = useMediaQuery('(min-width: 800px)');
  const [resetKey, setResetKey] = useState(0);
  const [isMate, setIsMate] = useState(false);
  return (
    <li className="puzzle-item" id={id} key={id}>
      <div id="chessboard">
        <ChessgroundBoard
          fen={fen}
          width={isDesktop ? 300 : 200}
          resetKey={resetKey}
          setIsMate={setIsMate}
        />
      </div>
      <div className="puzzle-actions-icons">
        <Info id={id} />
        <CopyClipBoard id={id} />
        <Download fen={fen} id={id} />
        {isMate && (
          <Retry
            onRetry={() => {
              setResetKey((k) => k + 1);
              setIsMate(false);
            }}
          />
        )}
        <Bookmark id={id} />
      </div>
    </li>
  );
};

export default Board;
