import React, { useState } from "react";
import Board from "../../Components/Board/Board";
import { getColumnClass } from "../../lib/getColumnClass";
import { getLocalStorage } from "../../lib/localStorage";
import { Toaster } from "sonner";
import Pagination from "../../Components/Pagination/Pagination";

const History = () => {
  const historyPuzzles = getLocalStorage("History", []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Get current puzzles
  const indexOfLastItem = Math.min(
    currentPage * itemsPerPage,
    historyPuzzles.length,
  ); // Ensure it does not exceed total items
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage; // Correct calculation for first item index
  const currentItems = historyPuzzles.slice(indexOfFirstItem, indexOfLastItem); // Slice the correct range of items

  // Change page
  const paginate = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > Math.ceil(historyPuzzles.length / itemsPerPage)
    )
      return;
    setCurrentPage(pageNumber);
  };

  console.log(indexOfFirstItem + 1, indexOfLastItem, historyPuzzles.length);

  return (
    <div className="page">
      <Toaster position="top-center" />
      {historyPuzzles.length !== 0 && (
        <Pagination
          itemsPerPage={itemsPerPage} // e.g. 6
          totalItems={historyPuzzles.length} // e.g. 90
          paginate={paginate} // function to add and decrease page number
          currentPage={currentPage} // current page number
        />
      )}
      <ul className={`puzzles-grid ${getColumnClass(currentItems.length)}`}>
        {currentItems.map((puzzle) => (
          <Board key={puzzle.puzzleId} id={puzzle.puzzleId} fen={puzzle.fen} />
        ))}
      </ul>
      {historyPuzzles.length === 0 && <div>Your Puzzle History is empty.</div>}
      {historyPuzzles.length > 0 && (
        <p style={{ fontSize: "18px", marginTop: "20px" }}>{`${
          indexOfFirstItem + 1
        } -  ${indexOfLastItem} of ${historyPuzzles.length}`}</p>
      )}
    </div>
  );
};

export default History;
