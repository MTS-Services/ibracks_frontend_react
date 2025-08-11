import { useState } from "react";
import AboutDiscography from "./AboutDiscography";

const DiscographySection = ({ songs }) => {
  const cardColors = [
    "#833F00",
    "#103870",
    "#932A31",
    "#930077",
    "#535353",
    "#9F0000",
    "#005970",
    "#922D20",
    "#003058",
  ];

  // State to hold the audio file URL of the currently playing song
  const [currentAudio, setCurrentAudio] = useState(null);

  // A function to handle the play/pause logic
  const handlePlay = (audioFile) => {
    // If the same song is already playing, pause it.
    // Otherwise, set the new song to play.
    setCurrentAudio(currentAudio === audioFile ? null : audioFile);
  };

  return (
    <div className="bg-[#2B0232] pb-20 sm:py-8 md:py-16 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        <h1 className="mb-6 text-center text-2xl font-bold text-white sm:mb-8 sm:text-3xl md:text-4xl">
          Discography
        </h1>
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-3">
          {songs.map((item, index) => (
            <AboutDiscography
              key={item.id}
              album={item}
              cardColor={cardColors[index % cardColors.length]}
              // Pass the current state and the handler function to the child component
              currentAudioPlaying={currentAudio}
              onPlayClick={handlePlay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscographySection;
