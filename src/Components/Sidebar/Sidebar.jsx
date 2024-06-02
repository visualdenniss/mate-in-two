import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa6";
import { FaCat } from "react-icons/fa";
import { RiMenu2Line, RiHistoryFill } from "react-icons/ri";
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
        <RiMenu2Line />
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
              <FaCat />
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">
            <div className="icon">
              <AiFillFire />
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/history">
            <div className="icon">
              <RiHistoryFill />
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/bookmarks">
            <div className="icon">
              <FaBookmark />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
