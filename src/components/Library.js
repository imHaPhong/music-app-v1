import React from "react";
import LibarySong from "./LibarySong";

const Library = ({ songs, setCurrentSong, isOpen }) => {
  return (
    <div className={`library ${isOpen ? ` ` : `active-library`}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((el) => {
          return (
            <LibarySong key={el.id} song={el} setCurrentSong={setCurrentSong} />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
