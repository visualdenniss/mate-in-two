import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLocalStorage } from "../../lib/localStorage";
import Loading from "../../Components/Loading/Loading";
import axios from "axios";
import Chessboard from "chessboardjsx";
import useMediaQuery from "../../Hooks/useMediaQuery";
import "./Puzzle.css";

const Puzzle = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [puzzle, setPuzzle] = useState({});

  const url = `https://api-mate-in-two.onrender.com/${id}`;
  // const url = `http://localhost:5000/${id}`;``

  const getPuzzleFromDB = async () => {
    const res = await axios.get(url);
    return res.data;
  };

  const findPuzzleById = (puzzles, id) => {
    return puzzles.find((puzzle) => puzzle.puzzleId === id);
  };

  const getPuzzle = async () => {
    try {
      setIsLoading(true);
      const history = getLocalStorage("History", []);
      const nextPuzzles = getLocalStorage("NextPuzzles", []);

      let foundPuzzle =
        findPuzzleById(history, id) || findPuzzleById(nextPuzzles, id);

      if (!foundPuzzle) {
        foundPuzzle = await getPuzzleFromDB();
        if (!foundPuzzle) throw new Error("Puzzle not found");
      }

      setPuzzle(foundPuzzle);
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

  if (isLoading) {
    return (
      <div className="page">
        <Loading />
      </div>
    );
  }

  if (!puzzle.fen) {
    return (
      <div className="page">
        <p>Oopsie Doopsie! Puzzle not found</p>
      </div>
    );
  }
  return (
    <div className="page">
      {puzzle.fen && (
        <div className="puzzle-container">
          <Chessboard
            position={
              puzzle.fen || "2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50"
            }
            width={isDesktop ? 400 : 300}
          />
          <div className="puzzle-details">
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
    </div>
  );
};

export default Puzzle;
