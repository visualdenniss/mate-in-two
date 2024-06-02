import React from "react";
import Board from "../../Components/Board/Board";
import { getColumnClass } from "../../lib/getColumnClass";
import { getLocalStorage } from "../../lib/localStorage";
import { Toaster } from "sonner";

const Bookmarks = () => {
  const bookmarkedIds = getLocalStorage("Bookmarks", []);
  const history = getLocalStorage("History", []);

  const bookmarkedPuzzles = history.filter((puzzle) =>
    bookmarkedIds.includes(puzzle.puzzleId),
  );

  return (
    <div className="page">
      <Toaster position="top-center" />
      {bookmarkedPuzzles.length > 0 ? (
        <ul
          className={`puzzles-grid ${getColumnClass(bookmarkedPuzzles.length)}`}
        >
          {bookmarkedPuzzles.map((puzzle) => (
            <Board
              key={puzzle.puzzleId}
              id={puzzle.puzzleId}
              fen={puzzle.fen}
            />
          ))}
        </ul>
      ) : (
        <div>No Bookmarks Found</div>
      )}
    </div>
  );
};

export default Bookmarks;
