import React, { useState } from "react";
import Board from "../../Components/Board/Board";
import { getColumnClass } from "../../lib/getColumnClass";
import { getLocalStorage } from "../../lib/localStorage";
import { Toaster } from "sonner";
import Pagination from "../../Components/Pagination/Pagination";

const Bookmarks = () => {
  const bookmarkedIds = getLocalStorage("Bookmarks", []);
  const history = getLocalStorage("History", []);

  const bookmarkedPuzzles = history.filter((puzzle) =>
    bookmarkedIds.includes(puzzle.puzzleId),
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Get current puzzles
  const indexOfLastItem = Math.min(
    currentPage * itemsPerPage,
    bookmarkedPuzzles.length,
  );
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = bookmarkedPuzzles.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // Change page
  const paginate = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > Math.ceil(bookmarkedPuzzles.length / itemsPerPage)
    )
      return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="page">
      <Toaster position="top-center" />
      {bookmarkedPuzzles.length !== 0 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={bookmarkedPuzzles.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
      <ul className={`puzzles-grid ${getColumnClass(currentItems.length)}`}>
        {currentItems.map((puzzle) => (
          <Board key={puzzle.puzzleId} id={puzzle.puzzleId} fen={puzzle.fen} />
        ))}
      </ul>
      {bookmarkedPuzzles.length === 0 && <div>No Bookmarks Found</div>}
      {bookmarkedPuzzles.length > 0 && (
        <p style={{ fontSize: "18px", marginTop: "20px" }}>{`${
          indexOfFirstItem + 1
        } -  ${indexOfLastItem} of ${bookmarkedPuzzles.length}`}</p>
      )}
    </div>
  );
};

export default Bookmarks;
