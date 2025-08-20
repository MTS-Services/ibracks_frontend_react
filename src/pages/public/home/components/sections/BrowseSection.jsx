import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaShareAlt, FaCheckCircle } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineArrowOutward, MdEdit } from "react-icons/md";
import Modal from "../../../../../components/ui/Modal";
import LicensPlan from "../../../../../components/common/LicensPlan";

const BrowseSection = ({ songs = [], plans = [], orderHistory = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  // Redux state
  const cartItems = useSelector((state) => state.cart.items || []);
  const ownedSongIds = useSelector((state) => state.auth.ownedSongIds || []);
  const uploadedSongIds = useSelector(
    (state) => state.auth.uploadedSongIds || [],
  );

  // Status resolver
  const getSongStatus = (songId) => {
    if (uploadedSongIds.includes(songId)) return "uploaded";
    if (ownedSongIds.includes(songId)) return "purchased";
    if (cartItems.some((item) => item.songId === songId)) return "inCart";
    return "available";
  };

  const handleToggle = (track) => {
    setSelectedSong(track);
    setIsOpen(true);
  };

  // Buttons — uniform sizing/alignment
  const renderPurchaseButton = (track) => {
    const status = getSongStatus(track.id);
    const base =
      "inline-flex h-9 min-w-[108px] items-center justify-center gap-2 rounded-md px-3 text-xs font-semibold leading-none whitespace-nowrap";

    switch (status) {
      case "uploaded":
        return (
          <button
            disabled
            className={`${base} cursor-not-allowed bg-blue-500 text-white`}
          >
            <MdEdit className="text-sm" />
            <span>Your Track</span>
          </button>
        );

      case "purchased":
        return (
          <button
            disabled
            className={`${base} cursor-not-allowed bg-green-600 text-white`}
          >
            <FaCheckCircle className="text-sm" />
            <span>Purchased</span>
          </button>
        );

      case "inCart":
        return (
          <button
            disabled
            className={`${base} cursor-not-allowed border border-zinc-600 bg-zinc-800 text-zinc-300`}
          >
            <HiOutlineShoppingBag className="text-sm" />
            <span>Added</span>
          </button>
        );

      default: // available -> Buy Now (no price)
        return (
          <button
            onClick={() => handleToggle(track)}
            className={`${base} bg-gradient-to-b from-orange-200 to-yellow-500 text-black hover:brightness-[1.02] active:scale-[0.99]`}
          >
            <HiOutlineShoppingBag className="text-sm" />
            <span>Buy Now</span>
          </button>
        );
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#060207] to-[#150618]">
      <div className="mx-auto w-full max-w-7xl pt-30 pb-10 sm:pt-30 sm:pb-20">
        {/* Header */}
        <h2 className="mb-8 text-2xl font-semibold text-white capitalize sm:text-3xl md:text-4xl">
          Browse Tracks
        </h2>

        {/* Desktop Table View */}
        <div className="hidden border-b border-gray-500 md:block">
          <table className="min-w-full text-left text-sm text-white">
            <thead className="text-lg text-orange-300">
              <tr>
                <th className="px-4 py-4 text-left font-medium" colSpan={2}>
                  Title
                </th>
                <th className="px-4 py-4 font-medium">Time</th>
                <th className="px-4 py-4 font-medium">BPM</th>
                <th className="px-4 py-4 font-medium">Tags</th>
                <th className="px-4 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500">
              {songs.map((track) => (
                <tr key={track.id} className="transition hover:bg-white/5">
                  <td className="py-4" colSpan={2}>
                    <Link to={`/products/${track.id}`}>
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            track.coverImage ||
                            "https://placehold.co/160x160/000000/FFFFFF?text=..."
                          }
                          alt="Album"
                          className="h-16 w-16 rounded border border-gray-600 object-cover"
                        />
                        <span className="text-base text-neutral-300">
                          {track.description || track.title}
                        </span>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-neutral-400">
                    {track.duration}
                  </td>
                  <td className="px-4 py-4 text-neutral-400">{track.bpm}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(track.musicTag) ? (
                        track.musicTag.map((t) => (
                          <span
                            key={t}
                            className="rounded bg-white/10 px-2 py-0.5 text-xs text-neutral-300"
                          >
                            {t}
                          </span>
                        ))
                      ) : (
                        <span className="text-neutral-300">
                          {track.musicTag}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-zinc-800 transition hover:bg-zinc-700"
                        aria-label="Share"
                        type="button"
                      >
                        <FaShareAlt className="text-base text-white" />
                      </button>
                      {renderPurchaseButton(track)}
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
              className="rounded-lg border border-gray-700 bg-black/20 p-4 transition hover:bg-white/5"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    track.coverImage ||
                    "https://placehold.co/160x160/000000/FFFFFF?text=..."
                  }
                  alt="Album"
                  className="h-24 w-24 flex-shrink-0 rounded-sm object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-medium text-white">
                    {track.title}
                  </h3>
                  <div className="mt-3 flex gap-4 text-sm text-neutral-400">
                    <span>⏱ {track.duration}</span>
                    <span>BPM {track.bpm}</span>
                  </div>
                  <div className="mt-4 flex justify-start gap-2">
                    <button
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-zinc-800 transition hover:bg-zinc-700"
                      aria-label="Share"
                      type="button"
                    >
                      <FaShareAlt className="text-base text-white" />
                    </button>
                    {renderPurchaseButton(track)}
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

      {/* License Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Choose Your License"
        size="lg"
      >
        <LicensPlan selectedSong={selectedSong} plans={plans} />
      </Modal>
    </section>
  );
};

export default BrowseSection;
