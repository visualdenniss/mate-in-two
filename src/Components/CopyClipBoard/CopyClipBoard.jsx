import React from "react";
import { LuLink } from "react-icons/lu";
import { toast } from "sonner";

const CopyClipBoard = ({ id }) => {
  const copyToClipBoard = () => {
    const url = `https://api-mate-in-two.onrender.com/${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast("Link copied to clipboard: " + url, {
          duration: 2000,
        });
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
        toast("Failed to copy link to clipboard. Please try again.", {
          duration: 2000,
        });
      });
  };

  return (
    <button onClick={copyToClipBoard}>
      <LuLink />
    </button>
  );
};

export default CopyClipBoard;
