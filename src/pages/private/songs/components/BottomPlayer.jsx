import React, { useRef } from "react";
import {
  FaRandom,
  FaStepBackward,
  FaStepForward,
  FaRedoAlt,
  FaVolumeUp,
} from "react-icons/fa";
import { IoPlay, IoPause } from "react-icons/io5";
import { TbRepeatOnce } from "react-icons/tb";
import { useSongStore } from "../../upload/components/songStore";

const formatTime = (time) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const BottomPlayer = () => {
  const {
    songs,
    currentSongIndex,
    isPlaying,
    isShuffle,
    repeatMode,
    currentTime,
    duration,
    volume,
    togglePlayPause,
    nextSong,
    prevSong,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
  } = useSongStore();

  const progressRef = useRef(null);
  const currentSong =
    currentSongIndex !== null ? songs[currentSongIndex] : null;

  const handleProgressClick = (e) => {
    if (!duration || !progressRef.current) return;
    const progressRect = progressRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - progressRect.left;
    const percentage = clickPosition / progressRect.width;
    seek(duration * percentage);
  };

  const getRepeatIcon = () => {
    if (repeatMode === "one")
      return <TbRepeatOnce size={24} className="text-green-500" />;
    return (
      <FaRedoAlt
        size={24}
        className={repeatMode === "all" ? "text-green-500" : "text-white"}
      />
    );
  };

  return (
    <div className="-mt-28 flex h-28 w-full flex-col overflow-hidden bg-neutral-900/60 backdrop-blur-2xl">
      <div
        ref={progressRef}
        onClick={handleProgressClick}
        className="h-1 w-full cursor-pointer bg-stone-500/50"
      >
        <div
          style={{
            width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
          }}
          className="h-full bg-white"
        />
      </div>
      <div className="flex flex-1 items-center justify-between px-16">
        <div className="flex w-72 items-center gap-4">
          <img
            src={
              currentSong?.coverImage ||
              "https://placehold.co/64x64/2a2a2a/444?text=-"
            }
            alt={currentSong?.title}
            className="h-16 w-16 rounded-xl object-cover"
          />
          <div>
            <h3 className="font-manrope text-lg font-semibold text-white">
              {currentSong?.title || "No Song Selected"}
            </h3>
            <p className="font-manrope text-sm font-normal text-neutral-400">
              {currentSong?.user?.name || "Select a song to play"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleShuffle}
            disabled={!currentSong}
            className="transition-colors hover:text-white/80 disabled:opacity-30"
          >
            <FaRandom
              size={24}
              className={isShuffle ? "text-green-500" : "text-white"}
            />
          </button>
          <button
            onClick={prevSong}
            disabled={!currentSong}
            className="text-white transition-colors hover:text-white/80 disabled:opacity-30"
          >
            <FaStepBackward size={24} />
          </button>
          <button
            onClick={togglePlayPause}
            disabled={!currentSong}
            className="text-white transition-transform hover:scale-110 disabled:opacity-30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
              {isPlaying ? (
                <IoPause size={24} className="text-black" />
              ) : (
                <IoPlay size={24} className="text-black" />
              )}
            </div>
          </button>
          <button
            onClick={nextSong}
            disabled={!currentSong}
            className="text-white transition-colors hover:text-white/80 disabled:opacity-30"
          >
            <FaStepForward size={24} />
          </button>
          <button
            onClick={toggleRepeat}
            disabled={!currentSong}
            className="transition-colors hover:text-white/80 disabled:opacity-30"
          >
            {getRepeatIcon()}
          </button>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-manrope text-base font-normal text-neutral-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <div className="flex items-center gap-3">
            <FaVolumeUp size={24} className="text-white" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={setVolume}
              className="h-1 w-24 accent-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;
