import {
  FaRandom,
  FaStepBackward,
  FaStepForward,
  FaRedoAlt,
  FaVolumeUp,
} from "react-icons/fa";
import { IoPlay, IoPause } from "react-icons/io5";
import { TbRepeatOnce } from "react-icons/tb";

const formatTime = (time) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const BottomPlayer = ({
  song,
  isPlaying,
  isShuffle,
  repeatMode,
  onPlayPause,
  onNext,
  onPrev,
  onToggleShuffle,
  onToggleRepeat,
  currentTime,
  duration,
  volume,
  onVolumeChange,
}) => {
  const displayTitle = song ? song.title : "No Song Selected";
  const displayArtist = song
    ? song.user
      ? song.user.name
      : "Unknown Artist"
    : "Select a song to play";
  const coverImage = song
    ? song.coverImage
    : "https://placehold.co/64x64/2a2a2a/444?text=-";
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

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
    <div className="flex h-28 w-full flex-col overflow-hidden bg-neutral-900/60 backdrop-blur-2xl">
      <div className="h-1 w-full bg-stone-500/50">
        <div
          style={{ width: `${progressPercentage}%` }}
          className="h-full bg-white"
        />
      </div>
      <div className="flex flex-1 items-center justify-between px-8">
        <div className="flex w-72 items-center gap-4">
          <img
            src={coverImage}
            alt={displayTitle}
            className="h-16 w-16 rounded-xl object-cover"
          />
          <div>
            <h3 className="font-manrope text-lg font-semibold text-white">
              {displayTitle}
            </h3>
            <p className="font-manrope text-sm font-normal text-neutral-400">
              {displayArtist}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={onToggleShuffle}
            disabled={!song}
            className="transition-colors hover:text-white/80 disabled:opacity-30"
          >
            <FaRandom
              size={24}
              className={isShuffle ? "text-green-500" : "text-white"}
            />
          </button>
          <button
            onClick={onPrev}
            disabled={!song}
            className="text-white transition-colors hover:text-white/80 disabled:opacity-30"
          >
            <FaStepBackward size={24} />
          </button>
          <button
            onClick={onPlayPause}
            disabled={!song}
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
            onClick={onNext}
            disabled={!song}
            className="text-white transition-colors hover:text-white/80 disabled:opacity-30"
          >
            <FaStepForward size={24} />
          </button>
          <button
            onClick={onToggleRepeat}
            disabled={!song}
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
              onChange={onVolumeChange}
              className="h-1 w-24 accent-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;
