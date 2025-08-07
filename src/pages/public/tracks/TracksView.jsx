import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaShareAlt } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { Link, useSearchParams } from "react-router-dom";

import HeroSection from "./components/sections/HeroSection";
import LicensPlan from "../../../components/common/LicensPlan";
import Modal from "../../../components/ui/Modal";
import axios from "../../../utils/axiosInstance";
import TracksPageHeroSection from "../../../components/TracksPageHeroSection/TracksPageHeroSection";

const TracksView = () => {
  const [searchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get("search") || "";

  const [filterOptions, setFilterOptions] = useState({
    search: initialSearchTerm,
    musicTag: "All",
    bpm: "All",
    sort: "Newest",
    priceSort: "Default",
  });

  const [songs, setSongs] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dynamicTags, setDynamicTags] = useState([]);
  const [dynamicBpms, setDynamicBpms] = useState([]);

  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);
  const [isBpmDropdownOpen, setIsBpmDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const [copiedTrackId, setCopiedTrackId] = useState(null);

  const cartItems = useSelector((state) => state.cart.items);

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
          const ress = await axios.get("/licenses");
          setPlans(ress.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic filter options or plans: ", err);
      }
    };
    fetchDynamicOptions();
  }, []);

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("limit", 10);
        queryParams.append("page", 1);

        if (filterOptions.search) {
          queryParams.append("search", filterOptions.search);
        }
        if (filterOptions.musicTag !== "All") {
          queryParams.append("musicTag", filterOptions.musicTag.toLowerCase());
        }
        if (filterOptions.bpm !== "All") {
          queryParams.append("bpm", parseInt(filterOptions.bpm));
        }

        let sortParam = "";
        if (filterOptions.priceSort !== "Default") {
          sortParam =
            filterOptions.priceSort === "Low to High"
              ? "pricing:asc"
              : "pricing:desc";
        } else if (filterOptions.sort !== "Default") {
          switch (filterOptions.sort) {
            case "Newest":
              sortParam = "publishedAt:desc";
              break;
            case "Oldest":
              sortParam = "publishedAt:asc";
              break;
            case "A-Z":
              sortParam = "title:asc";
              break;
            case "Z-A":
              sortParam = "title:desc";
              break;
            default:
              sortParam = "";
          }
        }

        if (sortParam) {
          queryParams.append("sort", sortParam);
        }

        const queryString = queryParams.toString();
        const url = `/songs/published?${queryString}`;

        const res = await axios.get(url);
        setSongs(res.data.data);
      } catch (err) {
        console.error("Error fetching filtered data: ", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredData();
  }, [filterOptions]);

  const handleFilterChange = (key, value) => {
    setFilterOptions((prev) => ({ ...prev, [key]: value }));
  };

  const toggleDropdown = (setDropdownOpenState) => {
    setDropdownOpenState((prevState) => !prevState);
  };

  const handleToggle = (track) => {
    setSelectedSong(track);
    setIsOpen(true);
  };

  const isSongInCart = (songId) => {
    return cartItems.some((item) => item.songId === songId);
  };

  const handleShareClick = (trackId) => {
    const trackUrl = `${window.location.origin}/tracks/${trackId}`;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(trackUrl)
        .then(() => {
          setCopiedTrackId(trackId);
          setTimeout(() => setCopiedTrackId(null), 2000);
        })
        .catch((err) => console.error("Failed to copy text: ", err));
    } else {
      const el = document.createElement("textarea");
      el.value = trackUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopiedTrackId(trackId);
      setTimeout(() => setCopiedTrackId(null), 2000);
    }
  };

  return (
    <section
      className="bg-neutral-900 px-4 py-10 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
      }}
    >
      <TracksPageHeroSection />
      <header className="">
        <h2 className="flex justify-center py-4 text-2xl font-[600] text-white capitalize md:py-10 md:text-3xl lg:text-4xl">
          Tracks
        </h2>
        <div className="mx-auto max-w-[950px] rounded-md bg-white/5 p-4 md:p-6">
          <div className="mx-auto mb-6 flex flex-wrap justify-center gap-2 md:gap-10">
            <div className="relative w-full md:w-auto">
              <select
                value={filterOptions.musicTag}
                onChange={(e) => handleFilterChange("musicTag", e.target.value)}
                className="w-full appearance-none rounded-md bg-white px-2 py-1 pr-6 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsTagsDropdownOpen)}
              >
                {dynamicTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag === "All" ? "All Category" : tag}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-2">
                {isTagsDropdownOpen ? (
                  <FiChevronUp className="text-base text-black md:text-xl" />
                ) : (
                  <FiChevronDown className="text-base text-black md:text-xl" />
                )}
              </div>
            </div>

            <div className="relative w-full md:w-auto">
              <select
                value={filterOptions.bpm}
                onChange={(e) => handleFilterChange("bpm", e.target.value)}
                className="w-full appearance-none rounded-md bg-white px-2 py-1 pr-6 pl-2 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsBpmDropdownOpen)}
              >
                {dynamicBpms.map((bpm) => (
                  <option key={bpm} value={bpm}>
                    {bpm === "All" ? "All BPMs" : `${bpm} BPM`}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-2">
                {isBpmDropdownOpen ? (
                  <FiChevronUp className="text-base text-black md:text-xl" />
                ) : (
                  <FiChevronDown className="text-base text-black md:text-xl" />
                )}
              </div>
            </div>

            <div className="relative w-full md:w-auto">
              <select
                value={filterOptions.sort}
                onChange={(e) => {
                  handleFilterChange("sort", e.target.value);
                  handleFilterChange("priceSort", "Default");
                }}
                className="w-full appearance-none rounded-md bg-white px-2 py-1 pr-6 pl-2 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsSortDropdownOpen)}
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="A-Z">Title (A-Z)</option>
                <option value="Z-A">Title (Z-A)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-3">
                {isSortDropdownOpen ? (
                  <FiChevronUp className="pl-1 text-base text-black md:text-xl" />
                ) : (
                  <FiChevronDown className="text-base text-black md:text-xl" />
                )}
              </div>
            </div>

            <div className="relative w-full md:w-auto">
              <select
                value={filterOptions.priceSort}
                onChange={(e) => {
                  handleFilterChange("priceSort", e.target.value);
                  handleFilterChange("sort", "Default");
                }}
                className="w-full appearance-none rounded-md bg-white px-2 py-1 pr-6 pl-2 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsPriceDropdownOpen)}
              >
                <option value="Default">Price</option>
                <option value="Low to High">Low to High</option>
                <option value="High to Low">High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-3">
                {isPriceDropdownOpen ? (
                  <FiChevronUp className="pl-1 text-base text-black md:text-xl" />
                ) : (
                  <FiChevronDown className="text-base text-black md:text-xl" />
                )}
              </div>
            </div>
          </div>

          <div className="mx-auto flex items-center justify-center px-2">
            <div className="inline-flex w-full max-w-[880px] items-center justify-between rounded-lg bg-white px-3 py-1 md:px-4 md:py-2">
              <input
                onChange={(e) => handleFilterChange("search", e.target.value)}
                type="text"
                placeholder="What type of track are you looking for?"
                className="w-full bg-transparent text-sm font-normal text-black outline-none placeholder:text-black/60 md:text-base"
                value={filterOptions.search}
              />
              <div
                className="ml-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-neutral-200 p-1.5 md:ml-3 md:h-9 md:w-9 md:p-2.5"
                onClick={() => {}}
              >
                <LuSearch className="text-lg text-black md:text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </header>

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
                  <th className="hidden py-3 font-medium sm:table-cell">BPM</th>
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
                    <tr key={track.id} className="transition hover:bg-white/5">
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
                          <Modal
                            isOpen={isOpen && selectedSong?.id === track.id}
                            onClose={() => setIsOpen(false)}
                            title="Choose Your License"
                            size="lg"
                          >
                            <LicensPlan
                              selectedSong={selectedSong}
                              plans={plans}
                            />
                          </Modal>
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
    </section>
  );
};

export default TracksView;
