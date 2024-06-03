import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { getLocalStorage, setLocalStorage } from "../../lib/localStorage";
import { toast } from "sonner";

const Bookmark = ({ id }) => {
  const [isBookmarked, setIsBookmarked] = useState(() =>
    getLocalStorage("Bookmarks", []).includes(id),
  );

  const handleBookmark = () => {
    const bookmarks = getLocalStorage("Bookmarks", []);
    const updatedBookmarks = isBookmarked
      ? bookmarks.filter((bookmark) => bookmark !== id)
      : [id, ...bookmarks];
    setLocalStorage("Bookmarks", updatedBookmarks);
    setIsBookmarked(!isBookmarked);
    isBookmarked
      ? toast("Removed bookmark", {
          duration: 1500,
        })
      : toast("Added bookmark", {
          duration: 1500,
        });
  };

  return (
    <button style={{ marginLeft: "auto" }} onClick={handleBookmark} key={id}>
      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
};

export default Bookmark;
