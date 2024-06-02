import React from "react";
import Board from "../../Components/Board/Board";
import { getColumnClass } from "../../lib/getColumnClass";
import { getLocalStorage } from "../../lib/localStorage";
import { Toaster } from "sonner";

const History = () => {
  const historyPuzzles = getLocalStorage("History", []);

  return (
    <div className="page">
      <Toaster position="top-center" />
      <ul className={`puzzles-grid ${getColumnClass(historyPuzzles.length)}`}>
        {historyPuzzles &&
          historyPuzzles.map((puzzle) => {
            return <Board id={puzzle.puzzleId} fen={puzzle.fen} />;
          })}
      </ul>
      {historyPuzzles.length === 0 && <div>No Puzzles Found</div>}
    </div>
  );
};

export default History;
