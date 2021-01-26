import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { useSelectedSong } from "../context/selected-song.context";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  const { songs, setCurrentSong, setSongs } = useSelectedSong();
  const { audioRef } = useSelectedSong();

  useEffect(() => {
    const setSong = songs.map((el) => {
      if (el.id === currentSong.id) {
        el.active = true;
      } else {
        el.active = false;
      }
      return el;
    });
    setSongs(setSong);

    if (isPlaying) {
      const audioLoading = audioRef.current.play();
      audioLoading.then((audio) => {
        audioRef.current.play();
      });
    }
  }, [currentSong]);

  const playSong = () => {
    audioRef.current.volume = 0.1;
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const timeUpdate = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: Math.round((current / duration) * 100),
    });
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const [songInfo, setSongInfo] = useState({
    currentTime: null,
    duration: null,
    animationPercentage: 0,
  });
  console.log(songInfo.animationPercentage);

  const setSongTime = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    } else {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{songInfo.currentTime ? getTime(songInfo.currentTime) : "0:00"}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          {" "}
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime ? songInfo.currentTime : 0}
            onChange={setSongTime}
            type="range"
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : "-:-"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          onClick={playSong}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdate}
        onLoadedMetadata={timeUpdate}
        src={currentSong.audio}
        ref={audioRef}
      ></audio>
    </div>
  );
};

export default Player;
