import React from "react";
import { HiDownload } from "react-icons/hi";

const Download = ({ fen, id }) => {
  const downloadFen = async () => {
    try {
      const response = await fetch("http://localhost:5000/fen", {
        method: "POST", // Use POST method for sending data
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
        },
        body: JSON.stringify({ fen }), // Send the FEN string in the request body
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${id}.png`; // Set the desired file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url); // Clean up the URL.createObjectURL
    } catch (error) {
      console.error("Failed to download the FEN image:", error);
    }
  };

  return (
    <button onClick={downloadFen}>
      <HiDownload />
    </button>
  );
};

export default Download;
