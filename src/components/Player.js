import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({
  isPlaying,
  setIsPlaying,
  currentSong,
  songRef,
  songInfo,
  setSongInfo,
  setCurrentSong,
  songs,
  setSongs,
}) => {
  const playSongHandler = () => {
    if (isPlaying) {
      // console.log(songRef);
      songRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      songRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const dragHandler = (e) => {
    songRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const timeFormat = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const setActiveHandler = (nextPrev) => {
    const newSongActive = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongActive);
  };

  const skipSongHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      setActiveHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        setActiveHandler(songs[songs.length - 1]);
        if (isPlaying) songRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      setActiveHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) songRef.current.play();
  };
  //State
  //animate
  const animateStyle = {
    transform: `translateX(${songInfo.animatePercentage}%)`,
  };
  return (
    <div className="player-container">
      <div className="time-control">
        <p>{timeFormat(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]} ) `,
          }}
          className="track"
        >
          <input
            onChange={dragHandler}
            min="0"
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
          ></input>
          <div style={animateStyle} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? timeFormat(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="player-control">
        <FontAwesomeIcon
          onClick={() => {
            skipSongHandler("skip-back");
          }}
          className="angleLeft"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => {
            skipSongHandler("skip-forward");
          }}
          className="angleRight"
          icon={faAngleRight}
          size="2x"
        />
      </div>
    </div>
  );
};

export default Player;
