import React from "react";
import { useSelectedSong } from "../context/selected-song.context";

const LibarySong = ({ song }) => {
  const {
    songs,
    setSongs,
    isPlaying,
    setCurrentSong,
    audioRef,
  } = useSelectedSong();
  const songSelectHandle = async () => {
    setCurrentSong(song);
    const setSong = songs.map((el) => {
      if (el.id === song.id) {
        el.active = true;
      } else {
        el.active = false;
      }
      return el;
    });
    setSongs(setSong);
    if (isPlaying) {
      await audioRef.current.play();
      audioRef.current.play();
    }
  };
  return (
    <div
      onClick={songSelectHandle}
      className={`library-song ${song.active ? "active" : ""}`}
    >
      <img src={song.cover} alt="along" />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibarySong;
