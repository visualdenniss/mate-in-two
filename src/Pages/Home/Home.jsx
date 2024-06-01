import React, { useState, useRef, useEffect } from "react";
import ChessBoard from "chessboardjsx";
import useMediaQuery from "../../Hooks/useMediaQuery";
import axios from "axios";
import "./Home.css";
import { AiOutlinePlus } from "react-icons/ai";
import Loading from "../../Components/Loading/Loading";

// LocalStorage Helpers
const getLocalStorage = (key, initialValue) => {
  const savedItem = localStorage.getItem(key);
  return savedItem ? JSON.parse(savedItem) : initialValue;
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const Home = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(() =>
    getLocalStorage("currentPuzzle", {}),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const url = "http://localhost:5000/";

  // Fetch New Puzzles
  const fetchNewPuzzles = async (showLoading = true) => {
    try {
      if (showLoading) {
        setIsLoading(true);
      }
      const res = await axios.get(url);
      const newPuzzles = res.data;
      const nextPuzzles = getLocalStorage("NextPuzzles", []);
      setLocalStorage("NextPuzzles", [...nextPuzzles, ...newPuzzles]);
    } catch (err) {
      console.error(err);
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
      setIsFetching(false);
    }
  };

  // Get Next Puzzle
  const getNextPuzzle = () => {
    const nextPuzzles = getLocalStorage("NextPuzzles", []);
    const history = getLocalStorage("History", []);

    if (nextPuzzles.length > 0) {
      const nextPuzzle = nextPuzzles.shift();
      setCurrentPuzzle(nextPuzzle);
      setLocalStorage("currentPuzzle", nextPuzzle);
      setLocalStorage("NextPuzzles", nextPuzzles);
      setLocalStorage("History", [...history, nextPuzzle]);

      if (nextPuzzles.length < 10 && !isFetching) {
        setIsFetching(true);
        fetchNewPuzzles(false);
      }
    } else {
      setIsFetching(true);
      fetchNewPuzzles(true).then(() => getNextPuzzle());
    }
  };

  // Initial Load
  useEffect(() => {
    const nextPuzzles = getLocalStorage("NextPuzzles", []);
    if (nextPuzzles.length === 0) {
      fetchNewPuzzles(true).then(() => getNextPuzzle());
    } else {
      getNextPuzzle();
    }
  }, []);

  const nextPuzzles = getLocalStorage("NextPuzzles", []);

  // Media
  const isDesktop = useMediaQuery("(min-width: 800px)");

  // Reveal Info / Solution
  const solutionRef = useRef();
  const infoRef = useRef();

  const displaySolution = () => {
    solutionRef.current.classList.toggle("solution-active");
  };

  const displayInfo = () => {
    infoRef.current.classList.toggle("info-data-active");
  };

  const fadeOut = () => {
    solutionRef.current.classList.remove("solution-active");
  };

  const fadeOutInfo = () => {
    infoRef.current.classList.remove("info-data-active");
  };

  return (
    <div className="home">
      <div className="title">#02</div>
      <div className="wrapper">
        <div className="info-component">
          <div
            className="info-content"
            onClick={() => displayInfo()}
            onMouseLeave={() => fadeOutInfo()}
          >
            <div ref={infoRef} className="info-data">
              {currentPuzzle && (
                <>
                  <p className="author">
                    <span>Author: </span>{" "}
                    {currentPuzzle.puzzleAuthor?.join(", ")}
                  </p>
                  <div className="puzzle-source">
                    <span>Source:</span> {currentPuzzle?.puzzleSource?.name},{" "}
                    {currentPuzzle?.puzzleSource?.date?.year}
                  </div>
                </>
              )}
            </div>
            <span className="info-text">Info</span>
            <span className="circle">
              <span className="info-icon">?</span>
            </span>
          </div>
        </div>
        <div className="board-component">
          {isLoading ? (
            <Loading />
          ) : (
            <ChessBoard
              position={
                currentPuzzle.fen ||
                "2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50"
              }
              width={isDesktop ? 400 : 300}
            />
          )}
        </div>
        <div className="solution-component">
          <div
            className="solution-content"
            onClick={() => displaySolution()}
            onMouseLeave={() => fadeOut()}
          >
            <div className="solution-data">
              <p ref={solutionRef} className="solution-data-text">
                {currentPuzzle && (
                  <a
                    className="puzzle-solution-link"
                    href={`https://yacpdb.org/#${currentPuzzle?.puzzleId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://yacpdb.org/#{currentPuzzle?.puzzleId}
                  </a>
                )}
              </p>
            </div>
            <span className="border">
              <span className="solution-icon">!</span>
            </span>
            <span className="solution-text">Solution</span>
          </div>
        </div>
      </div>

      <div className="centerBox">
        <div className="categoryWrapper">
          <button
            onClick={getNextPuzzle}
            disabled={isLoading || nextPuzzles.length === 0}
          >
            <h1>
              <AiOutlinePlus />
            </h1>
            <span>
              <span>
                <span>Want more?</span>
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
