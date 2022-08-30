import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Sidebar from './Components/Sidebar/Sidebar'
import Home from './Pages/Home/Home'
import Cats from './Pages/Cats/Cats'
import About from './Pages/About/About'

import './App.css'
const App = () => {


    const [isLoading,setIsLoading] = useState(false)

    const [fen,setFen] = useState("2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50")
    const [puzzleId, setPuzzleId] = useState('')

    const url = 'https://mate-in-two.herokuapp.com/'

    
    const getPuzzle = async () => {
        setIsLoading(true)
        const res = await axios.get(url)
        const puzzleFen = res.data.fen
        const id = res.data.puzzleId
        console.log(res.data)
        setFen(puzzleFen)
        setPuzzleId(id)
        setIsLoading(false)
    }


    return (



        <Router>
        <div className='app'>
            <Sidebar></Sidebar>
            <Routes>
            <Route exact path='/' element={<Home fen={fen} setFen={setFen} puzzleId={puzzleId} setPuzzleId={setPuzzleId} getPuzzle={getPuzzle} isLoading={isLoading}></Home>}></Route>
            <Route path='/cats' element={ <Cats></Cats>}></Route>
            <Route path='/about' element={ <About></About>}></Route>
            </Routes>
        </div>
        </Router>
    )
}

export default App
