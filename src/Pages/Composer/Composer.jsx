import React, { useState, useEffect } from "react";
import "./Composer.css";
import { useParams, Link } from "react-router-dom";
import { composers } from "../../data.js";
import { IoArrowBackOutline } from "react-icons/io5";

const Composer = () => {
  const { id } = useParams();
  const [composer, setComposer] = useState({});

  const getComposer = () => {
    setComposer(composers.find((comp) => comp.composerId === id));
  };

  useEffect(() => {
    getComposer();
  }, []);

  return (
    <div className="page">
      <Link className="back-link" to="/composers">
        <IoArrowBackOutline />
      </Link>
      <div className="composer">
        <img src={`../assets/composers/${composer?.composerImg}`} alt="" />
        <div className="composer-info">
          <h1>{composer?.composerName}</h1>
          <p>{composer?.composerInfo && composer.composerInfo}</p>
          {/* <p>Source: Wiki</p> */}
        </div>
      </div>
    </div>
  );
};

export default Composer;
