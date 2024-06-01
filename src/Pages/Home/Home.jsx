import React, { useState, useRef, useEffect } from "react";
import ChessBoard from "chessboardjsx";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { motion } from "framer-motion";

import "./Home.css";
import { AiOutlinePlus } from "react-icons/ai";
import Loading from "../../Components/Loading/Loading";
const Home = ({
  fen,
  puzzleId,
  getPuzzle,
  puzzleAuthor,
  puzzleSource,
  puzzleYear,
  isLoading,
}) => {
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
              <p className="author">
                <span>Author: </span> {puzzleAuthor.map((author) => author)}
              </p>
              <div className="puzzle-source">
                <span>Source:</span> {puzzleSource}, {puzzleYear}
              </div>
            </div>
            <span className="info-text">Info</span>
            <span className="circle">
              <span className="info-icon">?</span>
            </span>
          </div>
        </div>
        <div className="board-component">
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <ChessBoard
              position={fen}
              width={isDesktop ? 400 : 300}
            ></ChessBoard>
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
                <a
                  className="puzzle-solution-link"
                  href={`https://yacpdb.org/#${puzzleId}`}
                  target="_blank"
                >
                  https://yacpdb.org/#{puzzleId}
                </a>
              </p>
            </div>
            <span className="border">
              <span className="solution-icon">!</span>
            </span>
            <span className="solution-text">Solution</span>
          </div>
        </div>
      </div>

      <div class="centerBox">
        <div className="categoryWrapper">
          <h1>
            <AiOutlinePlus></AiOutlinePlus>
          </h1>
          <button>
            <span onClick={() => getPuzzle()}>
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
