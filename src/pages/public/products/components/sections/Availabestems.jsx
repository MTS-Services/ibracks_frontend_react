import { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import axios from "../../../../../utils/axiosInstance";
import { Link } from "react-router-dom";
import Modal from "../../../../../components/ui/Modal";
import LicensPlan from "../../../../../components/common/LicensPlan";

const Availabestems = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal control
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  // Plans for license modal
  const [plans, setPlans] = useState([]);

  // Dynamic filters
  const [dynamicTags, setDynamicTags] = useState([]);
  const [dynamicBpms, setDynamicBpms] = useState([]);

  // Copied share state
  const [copiedTrackId, setCopiedTrackId] = useState(null);

  // Dummy cart logic - replace with your actual cart logic
  const [cart, setCart] = useState([]);
  const isSongInCart = (id) => cart.some((track) => track.id === id);

  const handleToggle = (track) => {
    // Open modal for license selection instead of direct add to cart
    handleOpenModal(track);
  };

  const handleShareClick = (id) => {
    setCopiedTrackId(id);
    setTimeout(() => setCopiedTrackId(null), 2000);
  };

  const handleOpenModal = (song) => {
    setSelectedSong(song);
    setIsOpen(true);
  };

  // Fetch songs on mount
  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/songs/published?limit=10&page=1");
        setSongs(res.data.data);
      } catch (err) {
        console.error("Error fetching songs: ", err);
        setError("Failed to fetch songs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  // Fetch dynamic options and plans on mount
  useEffect(() => {
    const fetchDynamicOptions = async () => {
      try {
        const res = await axios.get("/songs/published?limit=100");
        const allSongs = res.data.data;

        const tags = [
          "All",
          ...new Set(allSongs.map((song) => song.musicTag).filter(Boolean)),
        ];
        setDynamicTags(tags);

        const bpms = [
          "All",
          ...new Set(
            allSongs
              .map((song) => song.bpm)
              .filter((bpm) => bpm !== null)
              .sort((a, b) => a - b),
          ),
        ];
        setDynamicBpms(bpms);

        if (plans.length === 0) {
          const resPlans = await axios.get("/licenses");
          setPlans(resPlans.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic filter options or plans: ", err);
      }
    };
    fetchDynamicOptions();
  }, [plans.length]);

  return (
    <section className="">
      <div className="mx-auto w-full max-w-7xl py-16">
        <div className="mb-4 flex items-center gap-3 px-4 sm:mb-9 sm:px-2">
          <h2 className="gap-12 font-['Poppins'] text-[24px] font-[600] text-white md:text-4xl lg:pr-13 lg:text-3xl">
            Available stems
          </h2>
          <button className="rounded-lg border border-white px-6 py-2 font-['Poppins'] text-white transition-colors hover:bg-white hover:text-[#2d005d] sm:text-[18px]">
            View All
          </button>
        </div>

        {/* Table Header */}
        <main className="sm:p-6 lg:py-14">
          <div className="mx-auto w-full max-w-7xl">
            <div className="overflow-x-auto border-b border-gray-500">
              <table className="min-w-full text-left text-xs text-white sm:text-sm md:text-base">
                <thead className="text-sm text-orange-300 sm:text-base md:text-xl">
                  <tr>
                    <th
                      className="py-3 pl-4 text-center font-medium md:pl-0"
                      colSpan={2}
                    >
                      <span className="-mt-3.5">Title</span>
                    </th>
                    <th className="hidden py-3 font-medium sm:table-cell">
                      Time
                    </th>
                    <th className="hidden py-3 font-medium sm:table-cell">
                      BPM
                    </th>
                    <th className="hidden py-3 font-medium sm:table-cell">
                      Tags
                    </th>
                    <th className="py-3 pr-4 text-right font-medium md:pr-0">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-500">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-4 text-center text-neutral-400"
                      >
                        Loading tracks...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="6" className="py-4 text-center text-red-400">
                        {error}
                      </td>
                    </tr>
                  ) : songs.length > 0 ? (
                    songs.map((track) => (
                      <tr
                        key={track.id}
                        className="transition hover:bg-white/5"
                      >
                        <td className="py-2 pl-4 sm:py-4 md:pl-0" colSpan={2}>
                          <Link to={`/products/${track.id}`}>
                            <div className="flex items-center gap-2 sm:gap-4">
                              <img
                                src={track.coverImage}
                                alt={`${track.title} cover`}
                                className="h-8 w-8 rounded-sm object-cover sm:h-14 sm:w-14 md:h-20 md:w-20"
                              />
                              <span className="pr-3 text-[16px] text-neutral-300 sm:text-lg md:text-base">
                                {track.title}
                              </span>
                            </div>
                          </Link>
                        </td>
                        <td className="hidden px-4 py-2 text-xs font-[600] text-[#949494] sm:table-cell sm:py-4 sm:text-sm md:px-2">
                          {track.duration}
                        </td>
                        <td className="hidden py-2 text-xs font-[600] text-[#949494] sm:table-cell sm:py-4 sm:text-sm md:px-4">
                          {track.bpm}
                        </td>
                        <td className="hidden py-2 sm:table-cell sm:px-4 sm:py-4">
                          <div className="flex flex-wrap gap-2 font-[400] sm:gap-2">
                            {track.musicTag ? (
                              <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-gray-200">
                                {track.musicTag}
                              </span>
                            ) : (
                              <span className="text-gray-500">
                                No tag available
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-2 pr-4 text-right sm:py-4 md:pr-0">
                          <div className="flex justify-end gap-1 md:gap-2">
                            <div className="relative hidden items-center sm:flex">
                              {copiedTrackId === track.id && (
                                <span className="absolute right-full mr-2 rounded-md bg-green-600 px-2 py-1 text-xs text-white shadow-lg transition-all duration-300">
                                  Copied!
                                </span>
                              )}
                              <button
                                onClick={() => handleShareClick(track.id)}
                                className="rounded-md bg-zinc-800 p-1 transition hover:bg-zinc-700 sm:p-2"
                                aria-label={`Share ${track.title}`}
                              >
                                <FaShareAlt className="text-xs text-white sm:text-sm md:text-base" />
                              </button>
                            </div>
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
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-4 text-center text-neutral-400"
                      >
                        No tracks found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Modal outside the map */}
      {selectedSong && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Choose Your License"
          size="lg"
        >
          <LicensPlan selectedSong={selectedSong} plans={plans} />
        </Modal>
      )}
    </section>
  );
};

export default Availabestems;
