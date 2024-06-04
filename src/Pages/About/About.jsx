import React from "react";
import { VscGithub } from "react-icons/vsc";

import "./About.css";
const About = ({ darkMode }) => {
  return (
    <div className="page">
      <div className="about-container">
        <p>
          Have you ever wished to lay on your couch and get some random Mate in
          Two problems with only one click? Probably not. Why would you?
        </p>
        <p>
          But i did, so i've built this mini puzzle app currently containing
          over 15.000 puzzles in its database. All puzzles are from
          <a href="https://yacpdb.org/#static/home" target="_blank">
            YACPDB.
          </a>
        </p>
        <ul className="contact-list">
          <li className="contact-item">
            <a
              href="https://github.com/visualdenniss/mate-in-two"
              target="_blank"
              className="contact-link"
            >
              <VscGithub className="contact-icon"></VscGithub>
            </a>
          </li>
          <li className="contact-item">
            <a
              href="https://lichess.org/@/visualdennis"
              target="_blank"
              className="contact-link"
            >
              {darkMode ? (
                <img src="lichess-dark.svg" alt="" />
              ) : (
                <img src="lichess.svg" alt="" />
              )}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
