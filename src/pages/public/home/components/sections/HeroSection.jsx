import React, { useState, useEffect } from "react";
import { FaSearch, FaShareAlt } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";

// Dummy Modal Component (for demonstration purposes)
const Modal = ({ isOpen, onClose, title, children, size }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div
        className={`relative rounded-lg bg-zinc-900 p-6 shadow-lg ${size === "lg" ? "w-full max-w-2xl" : "w-full max-w-md"}`}
      >
        <div className="mb-4 flex items-center justify-between border-b border-gray-700 pb-3">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-200"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

// Dummy LicensPlan Component (for demonstration purposes)
const LicensPlan = ({ selectedSong, plans }) => {
  return (
    <div className="text-white">
      <h4 className="mb-4 text-lg font-bold">
        Licensing Plans for: {selectedSong?.title}
      </h4>
      <ul className="space-y-3">
        {plans.map((plan, index) => (
          <li
            key={index}
            className="flex items-center justify-between rounded-md bg-zinc-800 p-3"
          >
            <span>{plan.name}</span>
            <span className="font-semibold">${plan.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-gray-400">
        Choose the plan that best suits your needs.
      </p>
    </div>
  );
};

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allTracks, setAllTracks] = useState([]); // Stores all tracks fetched from "API"
  const [filteredTracks, setFilteredTracks] = useState([]); // Tracks currently displayed
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  // Dummy data for licensing plans
  const plans = [
    { name: "Standard License", price: 29.99 },
    { name: "Premium License", price: 59.99 },
    { name: "Exclusive License", price: 199.99 },
  ];

  // Dummy cart state (not persistent, just for demo)
  const [cartSongs, setCartSongs] = useState([]);

  const isSongInCart = (songId) => {
    return cartSongs.some((song) => song.id === songId);
  };

  const handleToggle = (track) => {
    if (isSongInCart(track.id)) {
      setCartSongs(cartSongs.filter((song) => song.id !== track.id));
    } else {
      setCartSongs([...cartSongs, track]);
    }
  };

  // Function to fetch tracks from the API
  const fetchTracks = async (searchQuery = "") => {
    setIsLoading(true);
    try {
      const baseUrl = "https://backend-ltracks.mtscorporate.com/api";
      const endpoint = "/songs/published";
      const params = new URLSearchParams({
        page: 1,
        limit: 10,
      });

      if (searchQuery) {
        params.append("search", searchQuery);
      }

      const apiUrl = `${baseUrl}${endpoint}?${params.toString()}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Assuming the API returns an array of tracks directly or within a 'data' property
      // Adjust this line based on your actual API response structure
      const tracksData = data.data || data; // Assuming 'data' property holds the array of tracks

      // Map API data to match component's expected structure if necessary
      const formattedTracks = tracksData.map((track) => ({
        id: track._id, // Assuming _id from MongoDB
        title: track.title,
        coverImage:
          track.coverImage ||
          "https://placehold.co/100x100/CCCCCC/000000?text=No+Image", // Use a placeholder if no image
        duration: track.duration || "N/A", // Assuming duration is a string like "3:45"
        bpm: track.bpm || "N/A",
        tags: Array.isArray(track.musicTag)
          ? track.musicTag.join(", ")
          : track.musicTag || "No Tags", // Assuming musicTag is an array or string
        pricing: track.pricing || 0.0, // Assuming pricing is a number
      }));

      setAllTracks(formattedTracks);
      setFilteredTracks(formattedTracks); // Display all tracks initially or search results
    } catch (error) {
      console.error("Error fetching tracks:", error);
      setAllTracks([]);
      setFilteredTracks([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch tracks on component mount
  useEffect(() => {
    fetchTracks();
  }, []); // Empty dependency array means this runs once on mount

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchTracks(searchTerm); // Call fetchTracks with the current search term
  };

  const openModal = (song) => {
    setSelectedSong(song);
    setIsOpen(true);
  };

  return (
    <section className="relative min-h-[700px] bg-[url('/image/home/hero-bg.jpg')] bg-cover bg-center px-4 py-10 md:py-20">
      <div className="absolute inset-0 bg-black opacity-50" />

      <div className="mx-auto max-w-7xl">
        <main className="flex flex-col justify-between md:flex-row">
          {/* Left side - Text content */}
          <article className="relative mb-4 space-y-4 md:w-1/2 md:space-y-10">
            <h1 className="bg-gradient-to-t from-yellow-400 via-yellow-400 to-yellow-100 bg-clip-text text-center text-4xl font-bold text-transparent md:text-left md:text-6xl">
              Feel the Sound. Own the Vibe.
            </h1>

            <p className="text-center text-lg font-normal text-white capitalize md:text-left md:text-2xl">
              Discover the magic of music with us. Our platform is your gateway
              to a world of melodies and emotions. Whether you're a passionate
              listener, a budding artist, or an industry professional, we have
              something special for you.
            </p>

            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="What type of track are you looking for"
                className="h-20 w-full rounded-full border border-orange-200 bg-black/20 px-6 pr-40 text-white backdrop-blur-2xl focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute top-1/2 right-5 flex -translate-y-1/2 items-center gap-2 rounded-full bg-gradient-to-b from-orange-200 to-yellow-500 px-6 py-3 transition hover:opacity-90"
              >
                <FaSearch className="text-black" />
                <span className="text-base font-semibold text-black">
                  Search
                </span>
              </button>
            </form>
          </article>

          {/* Right side - Music player image */}
          <article className="relative flex flex-col items-center justify-center space-y-6 text-center md:w-1/2">
            <div>
              <p className="text-lg font-extrabold text-white uppercase">
                New Song: One of the girls
              </p>
              <p className="text-sm font-light text-white capitalize">
                The Weeknd, JENNIE & Lily Rose Depp
              </p>
            </div>

            <img
              src="/image/layer-music.png"
              alt="Music player"
              className="w-115" // Restored original class name. Note: 'w-115' is not a standard Tailwind class and may require custom CSS.
            />
          </article>
        </main>
      </div>

      {/* --- */}
      {/* Table Part for Search Results */}
      {isLoading ? (
        <div className="mt-10 text-center text-xl text-white">
          Loading tracks...
        </div>
      ) : filteredTracks.length > 0 ? (
        <main className="mt-10 sm:p-6 lg:py-14">
          <div className="mx-auto w-full max-w-7xl">
            <div className="overflow-x-auto rounded-lg border-b border-gray-500">
              <table className="min-w-full text-left text-xs text-white sm:text-sm md:text-base">
                <thead className="text-sm text-orange-300 sm:text-base md:text-xl">
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
                    <th className="px-2 py-3 font-medium sm:px-4 sm:py-4">
                      BPM
                    </th>
                    <th className="py-3 font-medium md:px-4">Tags</th>
                    <th className="py-3 text-right font-medium md:px-4">
                      Actions
                    </th>{" "}
                    {/* Added Actions column header */}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-500">
                  {filteredTracks.map((track) => (
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
                          {/* Ensure tags are rendered correctly, assuming it's a comma-separated string */}
                          {track.tags.split(", ").map((tag, i) => (
                            <span
                              key={`${track.id}-${i}`}
                              className="inline-block rounded-full bg-black/20 px-2 py-0.5 text-xs text-gray-400 capitalize sm:px-3 sm:py-1"
                            >
                              {tag}
                            </span>
                          ))}
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
                          {/* Buy/License button - Added for demonstration */}
                          <button
                            onClick={() => openModal(track)}
                            className="flex items-center gap-1 rounded-md bg-blue-500 px-2 py-1 text-xs font-semibold text-white transition hover:bg-blue-600 md:px-3 md:py-2"
                          >
                            <span>License</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      ) : (
        !isLoading && (
          <div className="mt-10 text-center text-xl text-neutral-400">
            No tracks found matching your criteria.
          </div>
        )
      )}
    </section>
  );
};

export default HeroSection;
