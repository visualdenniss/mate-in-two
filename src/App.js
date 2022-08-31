import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Sidebar from './Components/Sidebar/Sidebar'
import Home from './Pages/Home/Home'
import Cats from './Pages/Cats/Cats'
import About from './Pages/About/About'
import Theme from './Components/Theme/Theme'

import './App.css'
const App = () => {


    const [isLoading,setIsLoading] = useState(false)

    const [fen,setFen] = useState("2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50")
    const [puzzleId, setPuzzleId] = useState('')
    const [puzzleAuthor, setPuzzleAuthor] = useState([])
    const [puzzleSourceName, setPuzzleSourceName] = useState('')
    const [puzzleYear,setPuzzleYear] = useState('')

    const url = 'https://mate-in-two.herokuapp.com/'

    
    const getPuzzle = async () => {
        setIsLoading(true)
        const res = await axios.get(url)
        const puzzleFen = res.data.fen
        const id = res.data.puzzleId
        const source = res.data.puzzleSource.name
        const year = res.data.puzzleSource.date.year
        const author = res.data.puzzleAuthor

        console.log(source);

        setFen(puzzleFen)
        setPuzzleId(id)
        setPuzzleAuthor(author)
        setPuzzleSourceName(source)
        setPuzzleYear(year)
        setIsLoading(false)
    }

    const [darkMode, setDarkMode] = useState(true)
    const body = document.body 

    const darkTheme = () => {
        body.classList.remove('light')
        body.classList.add('dark')
        setDarkMode(true)
    }

    const lightTheme = () => {
        body.classList.remove('dark')
        body.classList.add('light')
        setDarkMode(false)
    }

    useEffect(()=>{
        getPuzzle()
    },[])


    return (



        <Router>
        <div className='app'>
            <Sidebar></Sidebar>
            <Theme
            darkTheme={darkTheme}
            lightTheme={lightTheme}
            ></Theme>
            <Routes>
            <Route exact path='/' 
            element={<Home 
            fen={fen} 
            setFen={setFen} 
            puzzleId={puzzleId} 
            setPuzzleId={setPuzzleId} 
            getPuzzle={getPuzzle} 
            puzzleAuthor={puzzleAuthor}
            puzzleSource={puzzleSourceName}
            puzzleYear={puzzleYear}
            isLoading={isLoading}></Home>}></Route>
            <Route path='/cats' element={ <Cats></Cats>}></Route>
            <Route path='/about' element={ <About
            darkMode={darkMode}
            ></About>}></Route>
            </Routes>
        </div>
        </Router>
    )
}

export default App
