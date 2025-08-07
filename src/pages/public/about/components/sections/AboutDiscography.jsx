import { useRef, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { MdPlayArrow, MdPause } from "react-icons/md"; // Import both icons
import { RxBorderDotted } from "react-icons/rx";

// It now accepts 'album' as an object and 'cardColor' as a prop
const AboutDiscography = ({ album, cardColor }) => {
  // Destructure the necessary properties from the album object
  // Assuming 'audioFile' from your JSON data is the URL for the song.
  const { title, coverImage, previewColor, audioFile } = album;

  // Use state to track if the song is playing
  const [isPlaying, setIsPlaying] = useState(false);

  // Use a ref to access the audio element directly
  const audioRef = useRef(null);

  // Function to handle the play/pause toggle
  const togglePlay = () => {
    // If the audio element doesn't exist, exit the function
    if (!audioRef.current) return;

    if (isPlaying) {
      // If the song is playing, pause it
      audioRef.current.pause();
    } else {
      // If the song is paused, play it
      audioRef.current.play();
    }

    // Toggle the isPlaying state
    setIsPlaying(!isPlaying);
  };

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

            {/* The button now handles the play/pause toggle */}
            <button onClick={togglePlay} className="rounded-2xl bg-white">
              {/* Conditionally render the icon based on the state */}
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
