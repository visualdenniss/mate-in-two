import React from "react";
import { Link } from "react-router-dom";
import { RiInformationLine } from "react-icons/ri";

const Info = ({ id }) => {
  return (
    <Link to={`/${id}`}>
      <RiInformationLine />
    </Link>
  );
};

export default Info;
