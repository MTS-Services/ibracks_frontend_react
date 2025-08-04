import React, { useEffect } from "react";
import { IoPlay, IoPause, IoHeadsetSharp } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { PiDotsThreeOutline } from "react-icons/pi";
import axios from "../../../utils/axiosInstance";
import { useSongStore } from "../upload/components/songStore";

const TotalSongs = () => {
  const {
    songs,
    setSongs,
    currentSongIndex,
    isPlaying,
    playSong,
    searchQuery,
  } = useSongStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/songs/published?limit=10000");
        setSongs(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (songs.length === 0) {
      fetchData();
    }
  }, [setSongs, songs.length]);

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="h-full w-full">
      <h1 className="px-10 py-4 text-xl font-bold text-white">Total Songs</h1>
      <div className="px-6 pb-32">
        {filteredSongs.map((song, index) => (
          <div
            key={song.id}
            onClick={() => playSong(index)}
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
    </section>
  );
};

export default TotalSongs;
