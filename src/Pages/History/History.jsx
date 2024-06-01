import React, { useState, useRef, useEffect } from "react";
import ChessBoard from "chessboardjsx";

import useMediaQuery from "../../Hooks/useMediaQuery";
import "./History.css";

// LocalStorage Helpers
const getLocalStorage = (key, initialValue) => {
  const savedItem = localStorage.getItem(key);
  return savedItem ? JSON.parse(savedItem) : initialValue;
};

const History = () => {
  const historyPuzzles = getLocalStorage("History", []);
  const isDesktop = useMediaQuery("(min-width: 800px)");

  const getColumnClass = (length) => {
    if (length === 1) return "one-column";
    if (length === 2) return "two-columns";
    return "three-columns";
  };

  return (
    <div className="history">
      <ul
        className={`history-puzzles-grid ${getColumnClass(
          historyPuzzles.length,
        )}`}
      >
        {historyPuzzles &&
          historyPuzzles.map((puzzle) => {
            return (
              <li className="history-puzzle-item" key={puzzle.puzzleId}>
                <ChessBoard
                  position={
                    puzzle.fen ||
                    "2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50"
                  }
                  width={isDesktop ? 300 : 200}
                />
                <p>{puzzle.puzzleAuthor?.join(", ")}</p>
              </li>
            );
          })}
      </ul>
      {historyPuzzles.length === 0 && <div>No Puzzles Found</div>}
    </div>
  );
};

export default History;
