import ChessgroundBoard from '../../Components/Chessboard/ChessgroundBoard';
import useMediaQuery from '../../Hooks/useMediaQuery';
import './Board.css';
import Bookmark from '../Bookmark/Bookmark';
import Info from '../Info/Info';
import CopyClipBoard from '../CopyClipBoard/CopyClipBoard';
import Download from '../Download/Download';

const Board = ({ id, fen }) => {
  const isDesktop = useMediaQuery('(min-width: 800px)');
  return (
    <li className="puzzle-item" id={id} key={id}>
      <div id="chessboard">
        <ChessgroundBoard fen={fen} width={isDesktop ? 300 : 200} />
      </div>
      <div className="puzzle-actions-icons">
        <Info id={id} />
        <CopyClipBoard id={id} />
        <Download fen={fen} id={id} />
        <Bookmark id={id} />
      </div>
    </li>
  );
};

export default Board;
