import { useRef, useState } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const HeroSection = ({ songs }) => {
  const audioRef = useRef(null);
  const [playingSongId, setPlayingSongId] = useState(null);

  const firstThreeSongs = songs.slice(0, 3);

  // =============================code by shakil  munshi=======================
  // For managing audio playback
  // Track currently playing song
  // Get only the first three songs
  // Function to toggle play/pause for a specific song
  // =============================code by shakil  munshi=======================
  const togglePlay = (songUrl, songId) => {
    if (!audioRef.current) return;

    // =============================code by shakil  munshi=======================
    // If the same song is playing, pause it
    // =============================code by shakil  munshi=======================
    if (playingSongId === songId) {
      audioRef.current.pause();
      setPlayingSongId(null);
    } else {
      // =============================code by shakil  munshi=======================
      // If a different song is clicked, play the new one
      // =============================code by shakil  munshi=======================
      audioRef.current.src = songUrl;
      audioRef.current.play();
      setPlayingSongId(songId);
    }
  };

  return (
    <section
      className="mx-auto flex w-full items-center justify-center px-4 py-2 lg:px-0 lg:py-10"
      style={{
        background: `
          linear-gradient(
            to bottom right,
            #4B257A 20%,
            #2B0232 40%,
            #2B0232 0%,
            #2B0232 95%
          )
        `,
      }}
    >
      <div className="mt-8 flex w-full max-w-7xl flex-col items-center justify-center gap-12 lg:-mb-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Left Column (on desktop) */}
        <div className="order-2 flex w-full flex-col items-center justify-center gap-9 lg:order-1 lg:items-start">
          <div className="flex w-full flex-col items-center justify-start gap-9 text-center lg:items-start lg:text-left">
            <div className="flex flex-col items-start justify-start gap-4 self-stretch">
              <h1 className="-mt-14 self-stretch text-3xl font-semibold text-white md:text-4xl lg:mt-4">
                About Us
              </h1>
              <p className="text-base text-gray-300 capitalize md:text-lg">
                At Beatzingeez Music, We Live And Breathe Music. Whether You're
                A Passionate Artist, Content Creator, Or Music Enthusiast, Our
                Platform Is Built To Fuel Your Sound Journey. We Provide
                High-Quality, Royalty-Free Music Tracks That Inspire, Energize,
                And Elevate Every Project.
                <br />
                <br />
                Our Team Of Talented Composers And Producers Are Committed To
                Delivering Unique, Studio-Grade Music Across Genres—From
                Cinematic Scores And Lo-Fi Beats To Electronic, Pop, And
                Hip-Hop.
              </p>
            </div>
            <Link
              className="inline-flex items-center justify-center gap-1 self-center overflow-hidden rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-12 py-3 transition-transform hover:scale-105 lg:self-start"
              to="/tracks"
            >
              <div className="text-center text-lg text-black capitalize">
                Browse Our Tracks
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {/* Map over the first three songs instead of the whole array */}
            {firstThreeSongs.map((item) => (
              <div key={item.id}>
                <div className="inline-flex flex-col items-start justify-start gap-2.5">
                  <div className="relative h-44 w-44">
                    <img
                      className="h-full w-full rounded object-cover"
                      src={item.coverImage}
                      alt="cover"
                    />
                    {/* The play/pause button is now a button overlay */}
                    <button
                      onClick={() => togglePlay(item.audioFile, item.id)}
                      className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white transition-colors duration-200 hover:bg-black/90"
                    >
                      {playingSongId === item.id ? (
                        <MdPause size={24} />
                      ) : (
                        <MdPlayArrow size={24} />
                      )}
                    </button>
                  </div>
                  <h4 className="text-sm leading-none font-normal text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs leading-none font-normal text-white">
                    {item.user.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (on desktop) */}
        <div className="order-1 flex w-full justify-center lg:order-2 lg:w-auto">
          <img
            className="-mt-10 h-auto w-full lg:-mt-26 lg:w-[690px] lg:max-w-none"
            src="/aboutpage/cart7.png"
            alt="Abstract purple splash"
          />
        </div>
      </div>
      {/* Audio element is now outside the loop so we only have one */}
      <audio ref={audioRef} />
    </section>
  );
};

export default HeroSection;
