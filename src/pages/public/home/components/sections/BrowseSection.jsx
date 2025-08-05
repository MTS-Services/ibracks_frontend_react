import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FaShareAlt } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineArrowOutward } from "react-icons/md";

import Modal from "../../../../../components/ui/Modal";
import LicensPlan from "../../../../../components/common/LicensPlan";

const BrowseSection = ({ songs, plans }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const cartItems = useSelector((state) => state.cart.items);

  // ========================================================
  // ✅ Check if ANY license for this song is in the cart
  // Uses `songId` field (not composite ID)
  // ========================================================
  const isSongInCart = (songId) => {
    return cartItems.some((item) => item.songId === songId);
  };

  // ==================================
  // Open License Modal
  // ==================================
  const handleToggle = (track) => {
    setSelectedSong(track);
    setIsOpen(true);
  };

  return (
    <section className="bg-gradient-to-b from-[#060207] to-[#150618]">
      <div className="mx-auto w-full max-w-7xl pt-40 pb-20">
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
              {songs.map((track) => (
                <tr key={track.id} className="transition hover:bg-white/5">
                  {/* Thumbnail + Title */}
                  <td className="py-4" colSpan={2}>
                    <div className="flex items-center gap-4">
                      <img
                        src={track.coverImage}
                        alt="Album"
                        className="h-16 w-16 rounded-sm object-cover"
                      />
                      <span className="text-base text-neutral-300">
                        {track.description}
                      </span>
                    </div>
                  </td>

                  {/* Time */}
                  <td className="px-4 py-4 text-neutral-400">
                    {track.duration}
                  </td>
                  {/* BPM */}
                  <td className="px-4 py-4 text-neutral-400">{track.bpm}</td>
                  {/* Tags */}
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {track.musicTag}
                      {/* {track.musicTag.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-block rounded-full bg-black/20 px-3 py-1 text-xs text-gray-400 capitalize"
                        >
                          {tag}
                        </span>
                      ))} */}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      {/* ================ Modal ===================== */}
                      <Modal
                        isOpen={isOpen && selectedSong?.id === track.id}
                        onClose={() => setIsOpen(false)}
                        title="Choose Your License"
                        size="lg"
                      >
                        <LicensPlan selectedSong={selectedSong} plans={plans} />
                      </Modal>
                      {/* ================ End ===================== */}
                      <button className="rounded-md bg-zinc-800 p-2 transition hover:bg-zinc-700">
                        <FaShareAlt className="text-base text-white" />
                      </button>

                      <button
                        onClick={() => handleToggle(track)}
                        disabled={isSongInCart(track.id)}
                        className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold md:px-3 md:py-2 ${
                          isSongInCart(track.id)
                            ? "cursor-not-allowed bg-gray-300 text-gray-500"
                            : "bg-gradient-to-b from-orange-200 to-yellow-500 text-black"
                        }`}
                        aria-label={
                          isSongInCart(track.id)
                            ? `${track.title} already in cart`
                            : `Add ${track.title} to cart for $${track.pricing.toFixed(2)}`
                        }
                      >
                        <HiOutlineShoppingBag className="text-xs sm:text-sm" />
                        <span>
                          {isSongInCart(track.id)
                            ? "Added"
                            : `$${track.pricing.toFixed(2)}`}
                        </span>
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
          {songs.map((track) => (
            <div
              key={track.id}
              className="rounded-lg border border-gray-700 bg-black/20 p-2 transition hover:bg-white/5"
            >
              <div className="flex items-start gap-4">
                {/* Left: Image */}
                <img
                  src={track.coverImage}
                  alt="Album"
                  className="h-40 w-40 flex-shrink-0 rounded-sm object-cover"
                />

                {/* Right: Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-medium text-white">
                    {track.description}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {/* {track.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-block rounded-full bg-black/30 px-2 py-1 text-xs text-gray-300 capitalize"
                      >
                        {tag}
                      </span>
                    ))} */}
                  </div>

                  <div className="mt-3 flex gap-4 text-sm text-neutral-400">
                    <span>⏱ {track.duration}</span>
                    <span>.bpm {track.bpm}</span>
                  </div>

                  <div className="mt-4 flex justify-start gap-2">
                    {/* Share button */}
                    <button className="rounded-md bg-zinc-800 p-2 transition hover:bg-zinc-700">
                      <FaShareAlt className="text-base text-white" />
                    </button>

                    {/* License Selection Button */}
                    <button
                      onClick={() => handleToggle(track)}
                      disabled={isSongInCart(track.id)}
                      className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold md:px-3 md:py-2 ${
                        isSongInCart(track.id)
                          ? "cursor-not-allowed bg-gray-300 text-gray-500"
                          : "bg-gradient-to-b from-orange-200 to-yellow-500 text-black"
                      }`}
                      aria-label={
                        isSongInCart(track.id)
                          ? `${track.title} already in cart`
                          : `Add ${track.title} to cart for $${track.pricing.toFixed(2)}`
                      }
                    >
                      <HiOutlineShoppingBag className="text-xs sm:text-sm" />
                      <span>
                        {isSongInCart(track.id)
                          ? "Added"
                          : `$${track.pricing.toFixed(2)}`}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browse All Button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/tracks"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-6 py-3 font-medium text-black"
          >
            Browse All Tracks
            <MdOutlineArrowOutward size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrowseSection;
