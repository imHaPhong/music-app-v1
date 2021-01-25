import React from "react";
import LibarySong from "./LibarySong";

const Library = ({ songs, setCurrentSong }) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((el) => {
          return <LibarySong song={el} setCurrentSong={setCurrentSong} />;
        })}
      </div>
    </div>
  );
};

export default Library;
