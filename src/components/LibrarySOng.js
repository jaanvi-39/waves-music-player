import React from "react";
// import { playAudio } from "./util";
const LibrarySOng = ({
  setSongs,
  songs,
  song,
  setCurrentSong,
  id,
  songRef,
  isPlaying,
}) => {
  const selectSongHandler = async () => {
    await setCurrentSong(song);
    const newSongActive = songs.map((song) => {
      if (song.id === id) {
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
    if (isPlaying) songRef.current.play();
  };
  return (
    <div
      onClick={selectSongHandler}
      className={`songLibrary ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-desc">
        <h2> {song.name} </h2>
        <h3>{song.artist}</h3>
      </div>
    </div>
  );
};

export default LibrarySOng;
