import React from "react";

const LibarySong = ({ song, setCurrentSong }) => {
  const songSelectHandle = () => {};
  return (
    <div onClick={songSelectHandle} className="library-song">
      <img src={song.cover} alt="along" />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibarySong;
