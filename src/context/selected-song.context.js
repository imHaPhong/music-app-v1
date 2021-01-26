import { createContext, useContext } from "react";

const SelectedSongContext = createContext();
export const SelectedSongProvider = ({
  audioRef,
  isPlaying,
  children,
  songs,
  setSongs,
  setCurrentSong,
}) => {
  return (
    <SelectedSongContext.Provider
      value={{ songs, setCurrentSong, setSongs, isPlaying, audioRef }}
    >
      {children}
    </SelectedSongContext.Provider>
  );
};

export const useSelectedSong = () => useContext(SelectedSongContext);
