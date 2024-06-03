import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Pages/Home/Home";
import Cats from "./Pages/Cats/Cats";
import About from "./Pages/About/About";
import History from "./Pages/History/History";
import Composers from "./Pages/Composers/Composers";
import Theme from "./Components/Theme/Theme";

import "./App.css";
import Bookmarks from "./Pages/Bookmarks/Bookmarks";
import Puzzle from "./Pages/Puzzle/Puzzle";
import Composer from "./Pages/Composer/Composer";
const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const body = document.body;

  const darkTheme = () => {
    body.classList.remove("light");
    body.classList.add("dark");
    setDarkMode(true);
  };

  const lightTheme = () => {
    body.classList.remove("dark");
    body.classList.add("light");
    setDarkMode(false);
  };

  return (
    <Router>
      <div className="app">
        <Sidebar></Sidebar>
        <Theme darkTheme={darkTheme} lightTheme={lightTheme}></Theme>
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
          <Route exact path="/:id" element={<Puzzle></Puzzle>}></Route>
          <Route path="/cats" element={<Cats></Cats>}></Route>
          <Route path="/history" element={<History></History>}></Route>
          <Route path="/bookmarks" element={<Bookmarks></Bookmarks>}></Route>
          <Route
            path="/about"
            element={<About darkMode={darkMode}></About>}
          ></Route>
          <Route path="/composers" element={<Composers></Composers>}></Route>
          <Route path="/composers/:id" element={<Composer></Composer>}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
