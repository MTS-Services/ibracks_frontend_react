import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaShareAlt } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";

import HeroSection from "./components/sections/HeroSection";
import { getAllSongs } from "../../../featured/song/trackService";
import { addItem } from "../../../featured/cart/cartSlice";
import LicensPlan from "../../../components/common/LicensPlan";
import Modal from "../../../components/ui/Modal";
import { getAllPlans } from "../../../featured/plans/planService";
import axios from "../../../utils/axiosInstance";

const TracksView = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [selectedBpm, setSelectedBpm] = useState("All Bpm");
  const [selectedMoods, setSelectedMoods] = useState("All Moods");
  const [selectedGenres, setSelectedGenres] = useState("All Genres");
  const [selectedSortOption, setSelectedSortOption] = useState("Default");
  const [selectedListView, setSelectedListView] = useState("Default List");

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isBpmDropdownOpen, setIsBpmDropdownOpen] = useState(false);
  const [isMoodsDropdownOpen, setIsMoodsDropdownOpen] = useState(false);
  const [isGenresDropdownOpen, setIsGenresDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isListViewDropdownOpen, setIsListViewDropdownOpen] = useState(false);

  const [songs, setSongs] = useState([]);
  const [plans, setPlans] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const cartItems = useSelector((state) => state.cart.items);

  // ==================================
  // API Call - for all songs
  // ==================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/songs/published?limit=6");
        console.log(res.data.data);
        setSongs(res.data.data);

        const ress = await axios.get("/licenses");
        console.log(ress.data.data);
        setPlans(ress.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // ==================================
  // Open License Modal
  // ==================================
  const handleToggle = (track) => {
    setSelectedSong(track);
    setIsOpen(true);
    console.log(track);
  };

  // Check if item is already in cart
  const isSongInCart = (songId) => {
    return cartItems.some((item) => item.songId === songId);
  };

  // ==================================
  // Handle Search Change - for Filter
  // ==================================
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  // ==================================
  // Handle Search - for Filter
  // ==================================
  const handleSearchClick = () => {
    console.log("Searching for: ", searchTerm);
  };
  // ==================================
  // Handle Change Dropdown - Filter
  // ==================================
  const handleDropdownChange = (e, setSelectedValue) => {
    setSelectedValue(e.target.value);
  };
  // ==================================
  // Handle Dropdown - for Filter
  // ==================================
  const toggleDropdown = (setDropdownOpenState) => {
    setDropdownOpenState((prevState) => !prevState);
  };

  const filteredTracks = songs.filter((track) => {
    const matchesSearch = track.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Category" ||
      track.tags.includes(selectedCategory);

    const matchesBpm =
      selectedBpm === "All Bpm" || track.bpm === selectedBpm.split(" ")[0];

    const matchesMood =
      selectedMoods === "All Moods" ||
      track.tags.some(
        (tag) => tag.toLowerCase() === selectedMoods.toLowerCase(),
      );

    const matchesGenre =
      selectedGenres === "All Genres" ||
      track.tags.some(
        (tag) => tag.toLowerCase() === selectedGenres.toLowerCase(),
      );

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBpm &&
      matchesMood &&
      matchesGenre
    );
  });

  return (
    <section
      className="bg-neutral-900 px-4 py-10 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
      }}
    >
      <HeroSection songs={songs} />

      <header className="">
        <h2 className="flex justify-center py-4 text-2xl font-[600] text-white capitalize md:py-10 md:text-3xl lg:text-4xl">
          Tracks
        </h2>
        <div className="mx-auto max-w-[950px] rounded-md bg-white/5 p-4 md:p-6">
          <div className="mx-auto mb-6 flex flex-wrap justify-center gap-2 md:gap-10">
            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) =>
                  handleDropdownChange(
                    e,
                    setSelectedCategory,
                    setIsCategoryDropdownOpen,
                  )
                }
                className="appearance-none rounded-md bg-white px-2 py-1 pr-6 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsCategoryDropdownOpen)}
              >
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  All Category
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Afrobeat
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Electronic
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Hip-hop
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-2">
                {isCategoryDropdownOpen ? (
                  <FiChevronUp className="text-base text-black md:text-xl" />
                ) : (
                  <FiChevronDown className="text-base text-black md:text-xl" />
                )}
              </div>
            </div>
            {/* BPM Dropdown */}
            <div className="relative">
              <select
                value={selectedBpm}
                onChange={(e) =>
                  handleDropdownChange(e, setSelectedBpm, setIsBpmDropdownOpen)
                }
                className="appearance-none rounded-md bg-white px-2 py-1 pr-6 pl-2 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsBpmDropdownOpen)}
              >
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  All Bpm
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  103 BPM
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  120 BPM
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  140 BPM
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-2">
                {isBpmDropdownOpen ? (
                  <FiChevronUp className="text-base text-black md:text-xl" />
                ) : (
                  <FiChevronDown className="text-base text-black md:text-xl" />
                )}
              </div>
            </div>

            {/* Moods Dropdown */}
            <div className="relative">
              <select
                value={selectedMoods}
                onChange={(e) =>
                  handleDropdownChange(
                    e,
                    setSelectedMoods,
                    setIsMoodsDropdownOpen,
                  )
                }
                className="appearance-none rounded-md bg-white px-2 py-1 pr-6 pl-2 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsMoodsDropdownOpen)}
              >
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  All Moods
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Happy
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Sad
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Energetic
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Chill
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Inspiring
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-2">
                {isMoodsDropdownOpen ? (
                  <FiChevronUp className="text-base text-black md:text-xl" />
                ) : (
                  <FiChevronDown className="text-base text-black md:text-xl" />
                )}
              </div>
            </div>

            {/* Genres Dropdown (first dropdown you highlighted) */}
            <div className="relative">
              <select
                value={selectedGenres}
                onChange={(e) =>
                  handleDropdownChange(
                    e,
                    setSelectedGenres,
                    setIsGenresDropdownOpen,
                  )
                }
                className="appearance-none rounded-md bg-white px-2 py-1 pr-6 pl-2 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsGenresDropdownOpen)}
              >
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  All Genres
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Pop
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Rock
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Jazz
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Hip-hop
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Electronic
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-3">
                {isGenresDropdownOpen ? (
                  <FiChevronUp className="pl-1 text-base text-black md:text-xl" />
                ) : (
                  <FiChevronDown className="text-base text-black md:text-xl" />
                )}
              </div>
            </div>
            {/* Sort Option Dropdown (second dropdown you highlighted) */}
            <div className="relative">
              <select
                value={selectedSortOption}
                onChange={(e) =>
                  handleDropdownChange(
                    e,
                    setSelectedSortOption,
                    setIsSortDropdownOpen,
                  )
                }
                className="appearance-none rounded-md bg-white px-2 py-1 pr-6 pl-2 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsSortDropdownOpen)}
              >
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Default
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  A-Z
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Newest
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Oldest
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-3">
                {isSortDropdownOpen ? (
                  <FiChevronUp className="pl-1 text-base text-black md:text-xl" />
                ) : (
                  <FiChevronDown className="text-base text-black md:text-xl" />
                )}
              </div>
            </div>
            {/* List View Dropdown (third dropdown you highlighted) */}
            <div className="relative">
              <select
                value={selectedListView}
                onChange={(e) =>
                  handleDropdownChange(
                    e,
                    setSelectedListView,
                    setIsListViewDropdownOpen,
                  )
                }
                className="appearance-none rounded-md bg-white px-2 py-1 pr-6 pl-2 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsListViewDropdownOpen)}
              >
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Default List
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Compact View
                </option>
                <option className="px-1 text-sm font-[400] md:text-[16px]">
                  Detailed View
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-3">
                {isListViewDropdownOpen ? (
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
                onChange={handleSearchChange}
                type="text"
                placeholder="What type of track are you looking for?"
                className="w-full bg-transparent text-sm font-normal text-black outline-none placeholder:text-black/60 md:text-base"
              />
              <div
                className="ml-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-neutral-200 p-1.5 md:ml-3 md:h-9 md:w-9 md:p-2.5"
                onClick={handleSearchClick}
              >
                <LuSearch className="text-lg text-black md:text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* table part */}
      <main className="sm:p-6 lg:py-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="overflow-x-auto border-b border-gray-500">
            <table className="min-w-full text-left text-xs text-white sm:text-sm md:text-base">
              <thead className="text-sm text-orange-300 sm:text-base md:text-xl">
                {/* Added the missing <tr> tag here */}
                <tr>
                  <th
                    className="px-2 py-3 text-center font-medium sm:px-4 sm:py-4"
                    colSpan={2}
                  >
                    Title
                  </th>
                  <th className="px-2 py-3 font-medium sm:px-4 sm:py-4">
                    Time
                  </th>
                  <th className="px-2 py-3 font-medium sm:px-4 sm:py-4">BPM</th>
                  <th className="py-3 font-medium md:px-4">Tags</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-500">
                {filteredTracks.length > 0 ? (
                  filteredTracks.map((track) => (
                    <tr key={track.id} className="transition hover:bg-white/5">
                      {/* Thumbnail + Title */}
                      <td className="py-2 sm:py-4" colSpan={2}>
                        <div className="flex items-center gap-2 sm:gap-4">
                          <img
                            src={track.coverImage}
                            alt={`${track.title} cover`}
                            className="h-8 w-8 rounded-sm object-cover sm:h-14 sm:w-14 md:h-20 md:w-20"
                          />
                          <span className="pr-3 text-[10px] text-neutral-300 sm:text-sm md:text-base">
                            {track.title}
                          </span>
                        </div>
                      </td>
                      {/* Time */}
                      <td className="px-4 py-2 text-xs font-[600] text-[#949494] sm:py-4 sm:text-sm md:px-2">
                        {track.duration}
                      </td>
                      {/* BPM */}
                      <td className="py-2 text-xs font-[600] text-[#949494] sm:py-4 sm:text-sm md:px-4">
                        {track.bpm}
                      </td>
                      {/* Tags */}
                      <td className="py-2 sm:px-4 sm:py-4">
                        <div className="flex flex-wrap gap-1 font-[400] sm:gap-2">
                          {track.tags}
                          {/* {track.tags.map((tag, i) => (
                            <span
                              key={`${track.id}-${i}`}
                              className="inline-block rounded-full bg-black/20 px-2 py-0.5 text-xs text-gray-400 capitalize sm:px-3 sm:py-1"
                            >
                              {tag}
                            </span>
                          ))} */}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-2 sm:py-4">
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
                          {/* Share button */}
                          <button
                            className="rounded-md bg-zinc-800 p-1 transition hover:bg-zinc-700 sm:p-2"
                            aria-label={`Share ${track.title}`}
                          >
                            <FaShareAlt className="text-xs text-white sm:text-sm md:text-base" />
                          </button>
                          {/* Cart button */}

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
