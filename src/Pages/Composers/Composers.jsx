import React from "react";
import { Link } from "react-router-dom";

import { composers } from "../../data";
import "./Composers.css";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Composers = () => {
  return (
    <div className="composers">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 100: 1, 400: 2, 750: 4, 1800: 6 }}
      >
        <Masonry gutter="20px">
          {composers.map((composer) => (
            <Link to={`/composers/${composer.composerId}`}>
              <div className="composer-img-container">
                <img
                  className="composerImg"
                  src={`../assets/composers/${composer.composerImg}`}
                ></img>
                <div className="composer-details">{composer.composerName}</div>
              </div>
            </Link>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Composers;
