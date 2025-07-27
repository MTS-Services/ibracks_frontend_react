import React from "react";
import { FaShare, FaShareAlt, FaThumbsUp } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineArrowOutward } from "react-icons/md";

const TrackList = () => {
  const tracks = [
    {
      id: 1,
      title: "NOLSTAGIA",
      time: "02:59",
      bpm: "103",
      tags: ["Afrobeat", "Inspiring"],
      thumbnail: "/image/home/music3.png",
    },
    {
      id: 2,
      title: "NOLSTAGIA",
      time: "02:59",
      bpm: "103",
      tags: ["Afrobeat", "Inspiring"],
      thumbnail: "/image/home/music3.png",
    },
    {
      id: 3,
      title: "NOLSTAGIA",
      time: "02:59",
      bpm: "103",
      tags: ["Afrobeat", "Inspiring"],
      thumbnail: "/image/home/music3.png",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#100418] to-[#150618] lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        {/* Header */}
        <h2 className="mb-8 text-2xl font-semibold text-white capitalize sm:text-3xl md:text-4xl">
          Browse Tracks
        </h2>

        {/* Desktop Table View */}
        <div className="hidden border-b border-gray-500 md:block">
          <table className="min-w-full text-left text-sm text-white">
            <thead className="text-lg text-orange-300">
              <tr>
                <th className="px-4 py-4 text-center font-medium" colSpan={2}>
                  Title
                </th>
                <th className="px-4 py-4 font-medium">Time</th>
                <th className="px-4 py-4 font-medium">BPM</th>
                <th className="px-4 py-4 font-medium">Tags</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-500">
              {tracks.map((track) => (
                <tr key={track.id} className="transition hover:bg-white/5">
                  {/* Thumbnail + Title */}
                  <td className="py-4" colSpan={2}>
                    <div className="flex items-center gap-4">
                      <img
                        src={track.thumbnail}
                        alt="Album"
                        className="h-16 w-16 rounded-sm object-cover"
                      />
                      <span className="text-base text-neutral-300">
                        {track.title}
                      </span>
                    </div>
                  </td>

                  {/* Time */}
                  <td className="px-4 py-4 text-neutral-400">{track.time}</td>

                  {/* BPM */}
                  <td className="px-4 py-4 text-neutral-400">{track.bpm}</td>

                  {/* Tags */}
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {track.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-block rounded-full bg-black/20 px-3 py-1 text-xs text-gray-400 capitalize"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="rounded-md bg-zinc-800 p-2 transition hover:bg-zinc-700">
                        <FaShareAlt className="text-base text-white" />
                      </button>
                      <button className="flex items-center gap-2 rounded-md bg-gradient-to-b from-orange-200 to-yellow-500 px-3 py-2 text-sm font-semibold text-black">
                        <HiOutlineShoppingBag />
                        <span>$30.00</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="space-y-4 md:hidden">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="rounded-lg border border-gray-700 bg-black/20 p-2 transition hover:bg-white/5"
            >
              <div className="flex items-start gap-4">
                {/* Left: Image */}
                <img
                  src={track.thumbnail}
                  alt="Album"
                  className="h-40 w-40 flex-shrink-0 rounded-sm object-cover"
                />

                {/* Right: Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-medium text-white">
                    {track.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {track.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-block rounded-full bg-black/30 px-2 py-1 text-xs text-gray-300 capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-4 text-sm text-neutral-400">
                    <span>⏱ {track.time}</span>
                    <span>.bpm {track.bpm}</span>
                  </div>

                  <div className="mt-4 flex justify-start gap-2">
                    <button className="rounded-md bg-zinc-800 p-2 transition hover:bg-zinc-700">
                      <FaShareAlt className="text-base text-white" />
                    </button>
                    <button className="flex items-center gap-2 rounded-md bg-gradient-to-b from-orange-200 to-yellow-500 px-3 py-2 text-sm font-semibold text-black">
                      <HiOutlineShoppingBag className="text-sm" />
                      <span>$30.00</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browse All Button */}
        <div className="mt-10 flex justify-center">
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-6 py-3 font-medium text-black">
            Browse All Tracks
            <MdOutlineArrowOutward size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrackList;
