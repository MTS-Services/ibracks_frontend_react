import { useEffect, useState } from "react";
import { IoPlay, IoPause, IoHeadsetSharp } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { PiDotsThreeOutline } from "react-icons/pi";
import BottomPlayer from "./components/BottomPlayer";
import { getAllSongs } from "../../../featured/song/trackService";

// Expanded dummy songs data (20+ items)

const TotalSongs = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllSongs();
        const limitedData = data.slice(0, 30);
        console.log(limitedData);
        setSongs(limitedData);
      } catch (err) {
        console.error(err, "Could not load songs");
      }
    })();
  }, []);

  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <section className="">
      <h1 className="px-10 py-4 text-xl font-bold text-white">Total Songs</h1>
      <div className="max-h-[650px] overflow-auto px-10">
        {songs.map((song, index) => (
          <div
            key={song.id}
            className="group grid grid-cols-[30px_minmax(200px,_3fr)_2fr_2fr_auto] items-center gap-4 rounded-lg p-2 hover:bg-white/10"
          >
            <div className="relative flex h-full items-center justify-center text-center text-neutral-200">
              {currentSong?.id === song.id && isPlaying ? (
                <button
                  onClick={() => handlePlayPause(song)}
                  className="text-xl text-white"
                >
                  <IoPause />
                </button>
              ) : (
                <button
                  onClick={() => handlePlayPause(song)}
                  className="absolute inset-0 flex items-center justify-center text-xl text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <IoPlay />
                </button>
              )}
              <span
                className={`transition-opacity ${
                  currentSong?.id === song.id || "group-hover:opacity-0"
                }`}
              >
                {index + 1}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={song.thumbnail}
                alt={song.title}
                className="h-14 w-14 rounded-lg"
              />
              <p className="truncate font-bold text-white">{song.title}</p>
            </div>
            <div className="flex items-center gap-3 text-neutral-200">
              <IoHeadsetSharp className="text-xl" />
              <span>{song.plays.toLocaleString()}</span>
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
                <span className="w-20 text-sm">{song.likes} Likes</span>
              </div>
              <button className="hover:text-white">
                <PiDotsThreeOutline className="text-2xl" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="">
        <BottomPlayer />
      </div>
    </section>
  );
};

export default TotalSongs;
