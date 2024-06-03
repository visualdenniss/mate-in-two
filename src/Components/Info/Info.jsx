import React from "react";
import { Link } from "react-router-dom";
import { LuInfo } from "react-icons/lu";

const Info = ({ id }) => {
  return (
    <Link to={`/${id}`}>
      <LuInfo />
    </Link>
  );
};

export default Info;
