import React from "react";
import ChessBoard from "chessboardjsx";
import useMediaQuery from "../../Hooks/useMediaQuery";
import "./Board.css";
import Bookmark from "../Bookmark/Bookmark";
import Info from "../Info/Info";
import CopyClipBoard from "../CopyClipBoard/CopyClipBoard";
import Download from "../Download/Download";

const Board = ({ id, fen }) => {
  const isDesktop = useMediaQuery("(min-width: 800px)");
  return (
    <li className="puzzle-item" id={id} key={id}>
      <div id="chessboard">
        <ChessBoard
          position={fen || "2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50"}
          width={isDesktop ? 300 : 200}
        />
      </div>
      <div className="puzzle-actions-icons">
        <Info id={id} />
        <CopyClipBoard id={id} />
        <Download fen={fen} />
        <Bookmark id={id} />
      </div>
    </li>
  );
};

export default Board;
