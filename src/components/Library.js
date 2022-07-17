import React from "react";
import LibrarySOng from "./LibrarySOng";

const Library = ({
  setSongs,
  songs,
  setCurrentSong,
  songRef,
  isPlaying,
  libraryStatus,
}) => {
  return (
    <div
      className={`library-container ${libraryStatus ? "active-library" : ""}`}
    >
      <h1>Library</h1>
      <div className="library-song">
        {songs.map((song) => (
          <LibrarySOng
            setSongs={setSongs}
            songs={songs}
            song={song}
            setCurrentSong={setCurrentSong}
            id={song.id}
            key={song.id}
            songRef={songRef}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
