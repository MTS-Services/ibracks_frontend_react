import React from "react";
import { FiPlay } from "react-icons/fi";

const ReleasesSection = () => {
  const songs = [
    {
      title: "Red (Taylor’s Version)",
      artist: "Taylor Swift",
      image: "/image/home/music1.png",
    },
    {
      title: "Need To Know",
      artist: "Doja Cat",
      image: "/image/home/music2.png",
    },
    {
      title: "Save Your Tear",
      artist: "The Weeknd",
      image: "/image/home/music3.png",
    },
    {
      title: "HIT MACHINE",
      artist: "Soundwave",
      image: "/image/home/music4.png",
    },
    {
      title: "Red (Taylor’s Version)",
      artist: "Ca sĩ",
      image: "/image/home/music2.png",
    },
    {
      title: "Need To Know",
      artist: "Doja Cat",
      image: "/image/home/music3.png",
    },
  ];

  return (
    <section className="absolute">
      {/* Title */}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          New Releases
        </h2>
        <FiPlay className="h-6 w-6 rounded-full bg-white p-1 text-black" />
      </div>

      {/* Song List */}
      <div className="flex flex-wrap justify-center gap-6 py-10">
        {songs.map((song, index) => (
          <div key={index} className="w-48">
            <img src={song.image} alt={song.title} className="w-48 rounded" />
            <div className="mt-2">
              <p className="truncate text-base font-semibold text-neutral-200">
                {song.title}
              </p>
              <p className="truncate text-sm font-normal text-zinc-400">
                {song.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReleasesSection;
