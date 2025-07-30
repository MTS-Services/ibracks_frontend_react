import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPause, FaPlay } from "react-icons/fa";
import { FiPlay } from "react-icons/fi";
import {
  togglePlayback,
  stopPlayback,
} from "../../../../../featured/song/playingSlice";

const ReleasesSection = ({ songs }) => {
  const dispatch = useDispatch();

  const { currentlyPlaying, isPlaying } = useSelector(
    (state) => state.audioPlayer,
  );
  const audioRefs = useRef({});

  // Handle playback based on Redux state
  useEffect(() => {
    songs.forEach((song, index) => {
      const songId = song.id || index;
      const audio = audioRefs.current[songId];

      if (audio) {
        if (currentlyPlaying === songId && isPlaying) {
          audio.play().catch((error) => {
            console.log("Playback failed:", error);
          });
        } else {
          audio.pause();
        }
      }
    });
  }, [currentlyPlaying, isPlaying, songs]);

  // Handle audio ended event
  const handleAudioEnded = (songId) => {
    if (currentlyPlaying === songId) {
      dispatch(stopPlayback());
    }
  };

  // Handle individual song click
  const handleSongClick = (songId) => {
    dispatch(togglePlayback(songId));
  };

  return (
    <section className="bg-gradient-to-b from-[#000000] to-[#100418] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        {/* Title */}
        <div className="mb-8 flex items-center gap-4">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            New Releases
          </h2>
          <FiPlay className="h-6 w-6 rounded-full bg-white p-1 text-black" />
        </div>

        {/* Song Grid - Responsive */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {songs.map((song, index) => {
            const songId = song.id || index;
            const isCurrentSongPlaying =
              currentlyPlaying === songId && isPlaying;

            return (
              <div key={songId} className="flex flex-col">
                <div className="group relative">
                  <img
                    src={song.coverImage}
                    alt={song.title}
                    className="aspect-square w-full rounded border border-gray-800 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Play button overlay */}
                  <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center rounded bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button
                      onClick={() => handleSongClick(songId)}
                      className="rounded-full bg-black p-2 text-white"
                    >
                      {isCurrentSongPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                  </div>

                  {/* Audio element for each song */}
                  <audio
                    ref={(el) => (audioRefs.current[songId] = el)}
                    src={song.audioFile}
                    onEnded={() => handleAudioEnded(songId)}
                    onPause={() => {
                      // Don't dispatch pause if it's intentional
                    }}
                  />
                </div>

                <div className="mt-3">
                  <p className="truncate text-base font-semibold text-neutral-200">
                    {song.title}
                  </p>
                  <p className="truncate text-sm font-normal text-zinc-400">
                    {song.artist}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReleasesSection;
