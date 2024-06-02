import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLocalStorage } from "../../lib/localStorage";
import Loading from "../Loading/Loading";
import axios from "axios";
import Chessboard from "chessboardjsx";
import useMediaQuery from "../../Hooks/useMediaQuery";
import "./Puzzle.css";

const Puzzle = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [puzzle, setPuzzle] = useState({});

  const url = `http://localhost:5000/${id}`;

  const getPuzzleFromDB = async () => {
    const res = await axios.get(url);
    return res.data;
  };

  const getPuzzle = async () => {
    try {
      setIsLoading(true);
      const history = getLocalStorage("History", []);
      if (history.find((puzzle) => puzzle.puzzleId === id)) {
        setPuzzle(history.find((puzzle) => puzzle.puzzleId === id));
      } else {
        const nextPuzzles = getLocalStorage("NextPuzzles", []);
        if (nextPuzzles.find((puzzle) => puzzle.puzzleId === id)) {
          setPuzzle(nextPuzzles.find((puzzle) => puzzle.puzzleId === id));
        } else {
          const puzzle = await getPuzzleFromDB();
          console.log(puzzle);
          if (!puzzle) throw new Error("Puzzle not Found");
          setPuzzle(puzzle);
        }
      }
    } catch (err) {
      console.log(err);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPuzzle();
  }, []);

  // Media
  const isDesktop = useMediaQuery("(min-width: 800px)");
  return (
    <div className="page">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {puzzle.fen && (
            <div className="puzzle-container">
              <div className="left">
                <Chessboard
                  position={
                    puzzle.fen ||
                    "2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50"
                  }
                  width={isDesktop ? 400 : 300}
                />
              </div>
              <div className="right">
                <p>{puzzle?.puzzleAuthor?.join(", ")} </p>
                <p>{puzzle?.puzzleSource?.date?.year} </p>
                <p>{puzzle?.puzzleSource?.name} </p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={` https://yacpdb.org/#${puzzle.puzzleId}`}
                >
                  See Solution
                </a>
              </div>
            </div>
          )}
          {!puzzle.fen && <p>Oopsie Doopsie! Puzzle not found</p>}
        </div>
      )}
    </div>
  );
};

export default Puzzle;
