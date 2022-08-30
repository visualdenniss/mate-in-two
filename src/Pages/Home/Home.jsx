import React, { useState, useRef, useEffect } from 'react'
import ChessBoard from 'chessboardjsx'

import { motion } from 'framer-motion'

import './Home.css'
import { AiOutlinePlus } from 'react-icons/ai'
import Loading from '../../Components/Loading/Loading'
const Home = ({fen, puzzleId, getPuzzle, isLoading}) => {

    const solutionRef = useRef()

    const displaySolution = () => {
        solutionRef.current.classList.toggle('solution-active')
    }

    const fadeOut = () => {
        solutionRef.current.classList.remove('solution-active')
    }


    return (
        <div className='home'>
            <div className="title">#02</div>
            <div className="wrapper">
                <div className="info-component">
                    <div className="info-content">
                        <span className='info-text'>
                            Info
                        </span>
                        <span className="circle">
                            <span className="info-icon">?</span>
                        </span>
                    </div>
                </div>
                <div className="board-component">
                    {
                        isLoading? <Loading></Loading>  : 
                        <ChessBoard position={fen} width={400} ></ChessBoard>
                    }
                </div>
                <div className="solution-component"
                >
                    <div className="solution-content" onClick={() => displaySolution()}
                        onMouseLeave={() => fadeOut()}
                    >
                        <div className='solution-data'>
                            <p ref={solutionRef} className='solution-data-text'>
                                <a className='puzzle-solution-link' href={`https://yacpdb.org/#${puzzleId}`} target='_blank'>
                                https://yacpdb.org/#{puzzleId}
                                </a>
                            </p>
                        </div>
                        <span className="border">
                            <span className='solution-icon'>!</span>
                        </span>
                        <span className="solution-text">
                            Solution
                        </span>
                    </div>
                </div>
            </div>

            <div class="centerBox">

                <div className="categoryWrapper">
                    <h1>
                        <AiOutlinePlus></AiOutlinePlus>
                    </h1>
                    <button>
                        <span onClick={()=>getPuzzle()}>
                            <span>
                                <span>
                                    Want more?
                                </span>
                            </span>
                        </span>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Home