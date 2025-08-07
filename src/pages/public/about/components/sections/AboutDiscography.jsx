import { useRef, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { MdPlayArrow, MdPause } from "react-icons/md";
import { RxBorderDotted } from "react-icons/rx";

// The component now accepts 'currentAudioPlaying' and 'onPlayClick'
const AboutDiscography = ({
  album,
  cardColor,
  currentAudioPlaying,
  onPlayClick,
}) => {
  const { title, coverImage, previewColor, audioFile } = album;

  // Check if this specific card's song is the one currently playing
  const isPlaying = currentAudioPlaying === audioFile;

  const audioRef = useRef(null);

  // Use useEffect to handle play/pause logic whenever the `isPlaying` state changes
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div
      className="flex h-28 w-full overflow-hidden rounded-[10px] border shadow-lg sm:max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-md"
      style={{ backgroundColor: cardColor }}
    >
      {/* Image Section */}
      <div className="flex-shrink-0 px-2 pt-2">
        <img
          className="h-20 w-20 rounded object-cover sm:h-24 sm:w-24"
          src={coverImage}
          alt={`${title}`}
        />
      </div>

      {/* Content Section (title, Title, Preview, Icons) */}
      <div className="flex flex-grow flex-col p-3 pl-0">
        <div>
          <h1 className="truncate pr-2 text-base font-bold text-white capitalize">
            {title}
          </h1>
          <div className="truncate pr-2 text-sm font-normal text-white">
            {album.user.name}
          </div>
        </div>
        {/* Preview Button and Icons Container */}
        <div className="flex items-center justify-between pt-5">
          <div
            className="inline-flex items-center justify-center gap-1.5 rounded px-2 py-1"
            style={{ backgroundColor: previewColor }}
          >
            <div className="text-[8px] font-normal text-white capitalize">
              Preview
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <FiPlusCircle className="size-6 text-white sm:text-lg" />
              <RxBorderDotted className="size-6 text-white" />
            </div>

            {/* The button now calls the parent's handler with its audio file */}
            <button
              onClick={() => onPlayClick(audioFile)}
              className="rounded-2xl bg-white"
            >
              {isPlaying ? (
                <MdPause className="size-6 p-1 text-base text-black sm:text-lg" />
              ) : (
                <MdPlayArrow className="size-6 p-1 text-base text-black sm:text-lg" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* The hidden audio element that plays the song */}
      <audio ref={audioRef} src={audioFile} />
    </div>
  );
};

export default AboutDiscography;
