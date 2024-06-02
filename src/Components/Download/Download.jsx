import React, { useState } from "react";
import { HiDownload } from "react-icons/hi";

const Download = ({ fen }) => {
  const downloadFen = () => {};

  return (
    <button onClick={downloadFen}>
      <HiDownload />
    </button>
  );
};

export default Download;
