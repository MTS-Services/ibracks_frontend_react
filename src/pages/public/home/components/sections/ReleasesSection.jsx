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
    <section className="">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 overflow-hidden">
        {/* Title */}
        <div className="flex w-full items-center gap-5">
          <h2 className="text-2xl font-semibold text-white">New Releases</h2>
          <FiPlay className="flex h-7 w-7 items-center rounded-full bg-gray-200 p-1.5" />
        </div>

        {/* Song List */}
        <div className="flex items-center justify-between overflow-hidden">
          {songs.map((song, index) => (
            <div key={index} className="relative h-60 w-44">
              <div className="absolute top-0 left-0 flex flex-col gap-2.5">
                <img
                  src={song.image}
                  alt={song.title}
                  className="h-44 w-44 rounded"
                />
                <div className="w-44">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-base font-semibold text-neutral-200">
                      {song.title}
                    </p>
                    <p className="text-sm font-normal text-zinc-400">
                      {song.artist}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReleasesSection;
