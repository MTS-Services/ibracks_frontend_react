import { useEffect, useState } from "react";
import { IoPlay, IoPause, IoHeadsetSharp } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { PiDotsThreeOutline } from "react-icons/pi";
import BottomPlayer from "./components/BottomPlayer";
import axios from "../../../utils/axiosInstance";
import { useSongStore } from "../upload/components/songStore";

const TotalSongs = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);

  // Main Part: Get the search query from the GLOBAL store
  const { searchQuery } = useSongStore();

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

  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  // Main Part: Filter the songs based on the global search query
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="h-full w-full">
      <h1 className="px-10 py-4 text-xl font-bold text-white">Total Songs</h1>
      <div className="max-h-[650px] overflow-auto px-10">
        {filteredSongs.map((song, index) => {
          const fullImageUrl = song.coverImage
            ? song.coverImage
            : "https://placehold.co/56x56/222/fff?text=No+Img";

          return (
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
                  <>
                    <button
                      onClick={() => handlePlayPause(song)}
                      className="absolute inset-0 flex items-center justify-center text-xl text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <IoPlay />
                    </button>
                    <span className="transition-opacity group-hover:opacity-0">
                      {index + 1}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={fullImageUrl}
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
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 w-full">
        <BottomPlayer />
      </div>
    </section>
  );
};

export default TotalSongs;
