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
    // Repeat or map your tracks as needed...
  ];

  return (
    <section className="bg-gradient-to-b from-[#060207] to-[#150618] pt-60">
      <div className="mx-auto w-full max-w-7xl pt-40 pb-20">
        {/* Header */}
        <h2 className="mb-12 text-2xl font-semibold text-white capitalize sm:text-3xl md:text-4xl">
          Browse Tracks
        </h2>

        {/* Table Container */}
        <div className="border-b border-gray-500">
          <table className="min-w-full text-left text-sm text-white sm:text-base">
            <thead className="text-xl text-orange-300">
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
                        className="h-14 w-14 rounded-sm object-cover sm:h-20 sm:w-20"
                      />
                      <span className="text-sm text-neutral-300 sm:text-base">
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
                          className="inline-block rounded-full bg-black/20 px-3 py-1 text-xs text-gray-400 capitalize sm:text-sm"
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
                        <FaShareAlt className="text-sm text-white sm:text-base" />
                      </button>
                      <button className="flex items-center gap-2 rounded-md bg-gradient-to-b from-orange-200 to-yellow-500 px-3 py-2 text-xs font-semibold text-black sm:text-sm">
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
