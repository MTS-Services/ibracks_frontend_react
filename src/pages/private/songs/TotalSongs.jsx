import React, { useEffect, useState, useRef, useCallback } from "react";
import { IoPlay, IoPause, IoHeadsetSharp } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { PiDotsThreeOutline } from "react-icons/pi";
import BottomPlayer from "./components/BottomPlayer";
import axios from "../../../utils/axiosInstance";
import { useSongStore } from "../upload/components/songStore";

const TotalSongs = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // 'off', 'all', 'one'
  const { searchQuery } = useSongStore();

  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/songs/published");
        setSongs(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleNextSong = useCallback(() => {
    if (songs.length === 0) return;
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = (currentSongIndex + 1) % songs.length;
    }
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  }, [currentSongIndex, songs, isShuffle]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleSongEnd = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNextSong();
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleSongEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [repeatMode, handleNextSong]);

  // Main Part: The play/pause logic is now handled directly here to fix playback
  const handlePlayPause = (index) => {
    const audio = audioRef.current;

    if (currentSongIndex === index) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentSongIndex(index);
      audio.src = songs[index].audioFile;
      audio.play().catch((e) => console.error("Error playing audio:", e));
      setIsPlaying(true);
    }
  };

  const handlePrevSong = () => {
    if (songs.length === 0) return;
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleShuffle = () => setIsShuffle(!isShuffle);

  const toggleRepeat = () => {
    setRepeatMode((prev) => {
      if (prev === "off") return "all";
      if (prev === "all") return "one";
      return "off";
    });
  };

  const currentSong =
    currentSongIndex !== null ? songs[currentSongIndex] : null;
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="h-full w-full">
      <h1 className="px-10 py-4 text-xl font-bold text-white">Total Songs</h1>
      <div className="max-h-[calc(100vh_-_250px)] overflow-auto px-10">
        {filteredSongs.map((song, index) => (
          <div
            key={song.id}
            onClick={() => handlePlayPause(index)}
            className="group grid cursor-pointer grid-cols-[30px_minmax(200px,_3fr)_2fr_2fr_auto] items-center gap-4 rounded-lg p-2 hover:bg-white/10"
          >
            <div className="relative flex h-full items-center justify-center text-center text-neutral-200">
              {currentSongIndex === index && isPlaying ? (
                <IoPause className="text-xl text-white" />
              ) : (
                <>
                  <IoPlay className="absolute inset-0 m-auto text-xl text-white opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="transition-opacity group-hover:opacity-0">
                    {index + 1}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-4">
              <img
                src={
                  song.coverImage ||
                  "https://placehold.co/56x56/222/fff?text=No+Img"
                }
                alt={song.title}
                className="h-14 w-14 rounded-lg object-cover"
              />
              <p className="truncate font-bold text-white">{song.title}</p>
            </div>
            <div className="flex items-center gap-3 text-neutral-200">
              <IoHeadsetSharp className="text-xl" />
              <span>{song.playCount}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-200">
              <IoMdTime className="rounded-full text-xl" />
              <span>{song.duration}</span>
            </div>
            <div className="flex items-center justify-end gap-6 text-neutral-200">
              <div className="flex items-center gap-2">
                <p className="text-white">
                  <FaRegHeart />
                </p>
                <span className="w-20 text-sm">{song.likeCount} Likes</span>
              </div>
              <button className="hover:text-white">
                <PiDotsThreeOutline className="text-2xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full">
        <BottomPlayer
          song={currentSong}
          isPlaying={isPlaying}
          isShuffle={isShuffle}
          repeatMode={repeatMode}
          onPlayPause={() => handlePlayPause(currentSongIndex)}
          onNext={handleNextSong}
          onPrev={handlePrevSong}
          onToggleShuffle={toggleShuffle}
          onToggleRepeat={toggleRepeat}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />
      </div>
    </section>
  );
};

export default TotalSongs;
