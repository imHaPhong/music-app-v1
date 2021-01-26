import { useRef, useState } from "react";
import Player from "./components/Palyer";
import Song from "./components/Song";
import data from "./utils";

import "./styles/app.scss";
import Library from "./components/Library";
import { SelectedSongProvider } from "./context/selected-song.context";
import Nav from "./components/Nav";

function App() {
  const audioRef = useRef(null);

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`App ${isOpen ? `` : `library-active`}`}>
      <Nav setIsOpen={setIsOpen} />
      <SelectedSongProvider
        isPlaying={isPlaying}
        songs={songs}
        setSongs={setSongs}
        audioRef={audioRef}
        setCurrentSong={setCurrentSong}
      >
        <Song currentSong={currentSong} />
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <Library
          isOpen={isOpen}
          songs={songs}
          setCurrentSong={setCurrentSong}
        />
      </SelectedSongProvider>
    </div>
  );
}

export default App;
