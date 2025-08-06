import { useEffect, useState, useRef, useCallback } from "react";
import { FiPlay } from "react-icons/fi";
import SongCard from "./SongCard";
import PlayerControls from "./PlayerControls";
import { FaHeart } from "react-icons/fa";

// Import the service function
import ProgressBar from "./ProgressBar";
import { getAllSongs } from "../../../../../featured/song/trackService";

const ReleasesSectionTest = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPlayingSong, setCurrentPlayingSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // 'off', 'one', 'all'

  const audioRef = useRef(new Audio());
  const playNextSongRef = useRef();
  const playPreviousSongRef = useRef();
  const handlePlaySongRef = useRef();

  // ==================CODE BY SHAKIL MNSHI =====================
  // TIME CONTRORL
  // ==============================================================

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  const playNextSong = useCallback(() => {
    // ==================CODE BY SHAKIL MNSHI =====================
    // ... (Your existing playNextSong logic)
    // ==============================================================

    console.log(
      "playNextSong called. Current song:",
      currentPlayingSong?.title,
    );
    if (!currentPlayingSong || songs.length === 0) {
      console.log("No current song or no songs in list to play next.");
      return;
    }

    let nextSongIndex;
    const currentIndex = songs.findIndex((s) => s.id === currentPlayingSong.id);

    if (isShuffle) {
      if (songs.length <= 1) {
        nextSongIndex = currentIndex;
      } else {
        do {
          nextSongIndex = Math.floor(Math.random() * songs.length);
        } while (nextSongIndex === currentIndex);
      }
    } else {
      nextSongIndex = (currentIndex + 1) % songs.length;
    }

    if (
      repeatMode === "off" &&
      nextSongIndex === 0 &&
      currentIndex === songs.length - 1
    ) {
      console.log(
        "End of playlist reached (no repeat all). Stopping playback.",
      );
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentPlayingSong(null);
      setDuration(0);
      setCurrentTime(0);
    } else {
      console.log(
        "Playing next song at index:",
        nextSongIndex,
        "Title:",
        songs[nextSongIndex]?.title,
      );
      if (handlePlaySongRef.current) {
        handlePlaySongRef.current(songs[nextSongIndex]);
      }
    }
  }, [currentPlayingSong, songs, isShuffle, repeatMode]);

  const playPreviousSong = useCallback(() => {
    // ==================CODE BY SHAKIL MNSHI =====================
    // ... (Your existing playPreviousSong logic)
    // ==============================================================

    console.log(
      "playPreviousSong called. Current song:",
      currentPlayingSong?.title,
    );
    if (!currentPlayingSong || songs.length === 0) {
      console.log("No current song or no songs in list to play previous.");
      return;
    }

    let prevSongIndex;
    const currentIndex = songs.findIndex((s) => s.id === currentPlayingSong.id);

    if (isShuffle) {
      if (songs.length <= 1) {
        prevSongIndex = currentIndex;
      } else {
        do {
          prevSongIndex = Math.floor(Math.random() * songs.length);
        } while (prevSongIndex === currentIndex);
      }
    } else {
      prevSongIndex = (currentIndex - 1 + songs.length) % songs.length;
    }
    if (handlePlaySongRef.current) {
      console.log(
        "Playing previous song at index:",
        prevSongIndex,
        "Title:",
        songs[prevSongIndex]?.title,
      );
      handlePlaySongRef.current(songs[prevSongIndex]);
    }
  }, [currentPlayingSong, songs, isShuffle]);

  const handlePlaySong = useCallback(
    (song) => {
      // ==================CODE BY SHAKIL MNSHI =====================
      // ... (Your existing handlePlaySong logic)
      // ==============================================================

      console.log("handlePlaySong called for:", song.title);
      if (!song.audioUrl) {
        console.warn(`Song "${song.title}" has no audio URL available.`);
        return;
      }

      if (currentPlayingSong?.id === song.id) {
        console.log("Clicked current playing song. Toggling play/pause.");
        setIsPlaying((prev) => !prev);
        return;
      }

      console.log("Loading new song:", song.title, "URL:", song.audioUrl);
      audioRef.current.src = song.audioUrl;
      audioRef.current.load();
      setCurrentPlayingSong(song);
      setIsPlaying(true);
      audioRef.current.volume = volume;
    },
    [currentPlayingSong, volume],
  );

  useEffect(() => {
    // ==================CODE BY SHAKIL MNSHI =====================
    // ... (Your existing audio event listeners logic)
    // ==============================================================

    const audio = audioRef.current;
    console.log("Setting up audio event listeners...");

    const handleCanPlayThrough = () => {
      console.log(
        "Audio 'canplaythrough' event. Current isPlaying state:",
        isPlaying,
      );
      if (isPlaying && audio.paused) {
        audio.play().catch((e) => {
          console.error("Autoplay failed (from canplaythrough listener):", e);
          if (e.name === "NotAllowedError" || e.name === "AbortError") {
            console.warn(
              "Autoplay blocked by browser. User interaction required.",
            );
          }
          setIsPlaying(false);
        });
      }
    };

    const handleLoadedMetadata = () => {
      console.log("Audio 'loadedmetadata' event. Duration:", audio.duration);
      setDuration(audio.duration);
      setCurrentTime(0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleSongEnded = () => {
      console.log("Audio 'ended' event. Repeat Mode:", repeatMode);
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play().catch((e) => console.error("Error repeating song:", e));
      } else {
        if (playNextSongRef.current) {
          playNextSongRef.current();
        }
      }
    };

    const handleError = (e) => {
      console.error("Audio 'error' event:", e);
      setCurrentPlayingSong(null);
      setIsPlaying(false);
      setDuration(0);
      setCurrentTime(0);
    };

    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleSongEnded);
    audio.addEventListener("error", handleError);

    return () => {
      console.log("Cleaning up audio event listeners...");
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleSongEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [playNextSong, repeatMode, isPlaying]);

  useEffect(() => {
    // ==================CODE BY SHAKIL MNSHI =====================
    // ... (Your existing play/pause logic)
    // ==============================================================

    const audio = audioRef.current;
    console.log(
      "useEffect [isPlaying, currentPlayingSong] - isPlaying:",
      isPlaying,
      "currentSong:",
      currentPlayingSong?.title,
      "audio.src:",
      audio.src,
    );

    if (currentPlayingSong && audio.src) {
      if (isPlaying) {
        if (audio.paused) {
          console.log("Attempting to play audio...");
          audio.play().catch((e) => {
            console.error("Autoplay failed from isPlaying effect:", e);
            if (e.name === "NotAllowedError" || e.name === "AbortError") {
              console.warn(
                "Autoplay blocked by browser. User interaction required.",
              );
            }
            setIsPlaying(false);
          });
        } else {
          console.log("Audio is already playing.");
        }
      } else {
        if (!audio.paused) {
          console.log("Attempting to pause audio...");
          audio.pause();
        } else {
          console.log("Audio is already paused.");
        }
      }
    } else if (!currentPlayingSong) {
      console.log("No current song. Ensuring audio is paused and cleared.");
      audio.pause();
      audio.src = "";
      audio.load();
    }
  }, [isPlaying, currentPlayingSong]);

  useEffect(() => {
    // ==================CODE BY SHAKIL MNSHI =====================
    // ... (Your existing refs update logic)
    // ==============================================================

    playNextSongRef.current = playNextSong;
    playPreviousSongRef.current = playPreviousSong;
    handlePlaySongRef.current = handlePlaySong;
  }, [playNextSong, playPreviousSong, handlePlaySong]);
  // ==================CODE BY SHAKIL MNSHI =====================
  // Updated Data Fetching useEffect
  // ==============================================================

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const songsData = await getAllSongs({ limit: 20, published: true });

        // ==================CODE BY SHAKIL MNSHI =====================
        // Process the data to match your component's state structure
        // ==============================================================

        if (songsData && Array.isArray(songsData.data)) {
          const processedSongs = songsData.data.map((song) => ({
            ...song,
            id: song.id || song._id,
            image: song.coverImage || "/products/cart1.jpg",
            artist: song.user?.name || "Unknown Artist",
            audioUrl: song.audioFile || null,
          }));
          setSongs(processedSongs);
        } else {
          console.error(
            "API response from getAllSongs is not as expected:",
            songsData,
          );
          setError("Failed to load songs: Data format unexpected.");
          setSongs([]);
        }
      } catch (err) {
        console.error("Error fetching home data:", err);
        setError(`Error fetching data: ${err.message}`);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const togglePlayPause = () => {
    // ==================CODE BY SHAKIL MNSHI =====================
    // ... (Your existing togglePlayPause logic)
    // ==============================================================

    console.log("togglePlayPause clicked. Current state isPlaying:", isPlaying);
    if (!currentPlayingSong) {
      console.log("No song selected to play/pause. Cannot toggle.");
      return;
    }
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    // ==================CODE BY SHAKIL MNSHI =====================
    // ... (Your existing handleVolumeChange logic)
    // ==============================================================

    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressChange = (e) => {
    // ==================CODE BY SHAKIL MUNSHI =====================
    // ... (Your existing handleProgressChange logic)
    // ==============================================================

    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      if (audioRef.current.paused && newTime > 0 && !isPlaying) {
        console.log(
          "Seeking while paused. Attempting to play from new position.",
        );
        audioRef.current.play().catch((e) => {
          console.error("Autoplay after seek failed:", e);
          if (e.name === "NotAllowedError" || e.name === "AbortError") {
            console.warn(
              "Autoplay blocked by browser. User interaction required.",
            );
          }
        });
        setIsPlaying(true);
      }
    }
  };

  const toggleShuffle = () => {
    // ==================CODE BY SHAKIL MUNSHI =====================
    // ... (Your existing toggleShuffle logic)
    // ==============================================================

    setIsShuffle((prev) => !prev);
    if (!isShuffle && repeatMode === "one") {
      setRepeatMode("off");
    }
  };

  const toggleRepeat = () => {
    // ==================CODE BY SHAKIL MUNSHI =====================

    // ... (Your existing toggleRepeat logic)
    // ==============================================================

    setRepeatMode((prevMode) => {
      if (prevMode === "off") return "one";
      if (prevMode === "one") return "all";
      return "off";
    });
    if (repeatMode === "off" && isShuffle) {
      setIsShuffle(false);
    }
  };

  const displayedSongs = songs.slice(0, 6);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="relative mx-auto w-full max-w-7xl pt-10">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          New Releases
        </h2>
        <FiPlay className="h-6 w-6 rounded-full bg-white p-1 text-black" />
      </div>

      <div className="grid grid-cols-2 gap-2 py-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-6 xl:grid-cols-6">
        {error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : Array.isArray(displayedSongs) && displayedSongs.length > 0 ? (
          displayedSongs.map((song) => (
            <SongCard
              key={song.id || `${song.title}-${song.artist}`}
              song={song}
              currentPlayingSong={currentPlayingSong}
              isPlaying={isPlaying}
              handlePlaySong={handlePlaySong}
            />
          ))
        ) : (
          <p className="text-lg text-white">No new releases found.</p>
        )}
      </div>

      {currentPlayingSong && (
        <div className="fixed right-0 bottom-0 left-0 z-50 flex h-28 flex-col overflow-hidden bg-neutral-900/80 shadow-2xl backdrop-blur-2xl">
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            handleProgressChange={handleProgressChange}
            formatTime={formatTime}
          />

          <div className="flex flex-1 items-center justify-between px-4 sm:px-16">
            <div className="flex w-fit items-center gap-4 sm:w-72 sm:gap-8">
              <div className="flex items-center gap-2 sm:gap-4">
                <img
                  src={currentPlayingSong.image || "/products/cart1.jpg"}
                  alt="Album cover"
                  className="hidden h-14 w-14 rounded-lg object-cover sm:block sm:h-16 sm:w-16 sm:rounded-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/products/cart1.jpg";
                  }}
                />
                <div className="flex flex-col items-start gap-0.5 sm:gap-1">
                  <h3 className="font-manrope max-w-[120px] truncate text-base leading-tight font-semibold text-white sm:max-w-full sm:text-lg sm:leading-relaxed">
                    {currentPlayingSong.title}
                  </h3>
                  <p className="font-manrope max-w-[120px] truncate text-xs leading-none font-normal text-neutral-300 sm:max-w-full sm:text-sm">
                    {currentPlayingSong.artist}
                  </p>
                </div>
              </div>
              <button className="hidden text-white transition-colors hover:text-red-500 sm:block">
                <FaHeart size={20} />
              </button>
            </div>

            <PlayerControls
              currentPlayingSong={currentPlayingSong}
              isPlaying={isPlaying}
              togglePlayPause={togglePlayPause}
              playPreviousSong={playPreviousSong}
              playNextSong={playNextSong}
              volume={volume}
              handleVolumeChange={handleVolumeChange}
              isShuffle={isShuffle}
              toggleShuffle={toggleShuffle}
              repeatMode={repeatMode}
              toggleRepeat={toggleRepeat}
            />

            <span className="font-manrope hidden text-sm font-normal text-neutral-400 sm:block sm:text-base">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReleasesSectionTest;
