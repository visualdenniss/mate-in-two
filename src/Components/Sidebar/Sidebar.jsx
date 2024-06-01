import React, { useRef } from "react";
import { Link } from "react-router-dom";

import { FaCat } from "react-icons/fa";
import { RiMenu2Line, RiHistoryFill, RiBookmarkFill } from "react-icons/ri";
import { AiFillFire } from "react-icons/ai";

import "./Sidebar.css";
const Sidebar = () => {
  const LinksDisplayRef = useRef();

  const toggleNav = () => {
    LinksDisplayRef.current.classList.toggle("sidebar-active");
  };

  return (
    <div className="sidebar">
      <div className="toggle-icon" onClick={() => toggleNav()}>
        <RiMenu2Line></RiMenu2Line>
      </div>
      <ul ref={LinksDisplayRef} className="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <div className="icon">#02</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cats">
            <div className="icon">
              <FaCat></FaCat>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">
            <div className="icon">
              <AiFillFire></AiFillFire>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/history">
            <div className="icon">
              <RiHistoryFill></RiHistoryFill>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/history">
            <div className="icon">
              <RiBookmarkFill></RiBookmarkFill>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
