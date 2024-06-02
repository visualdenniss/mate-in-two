import React from "react";

import { composers } from "../../data";
import "./Composers.css";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Composers = () => {
  return (
    <div className="composers">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 4, 1800: 6 }}>
        <Masonry gutter="20px">
          {composers.map((composer) => (
            <div className="img-container">
              <img className="composerImg" src={composer.composerImg}></img>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Composers;
