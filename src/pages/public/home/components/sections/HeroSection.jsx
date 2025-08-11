import React, { useState, useEffect } from "react";
import { FaSearch, FaShareAlt } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate } from "react-router-dom"; // useNavigate import করতে হবে

// Dummy Modal Component (for demonstration purposes)
const Modal = ({ isOpen, onClose, title, children, size }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div
        className={`relative rounded-lg bg-zinc-900 p-6 shadow-lg ${
          size === "lg" ? "w-full max-w-2xl" : "w-full max-w-md"
        }`}
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
  const navigate = useNavigate(); // useNavigate hook ব্যবহার করুন

  // ... (অন্যান্য state এবং functions যেমন আছে তেমন থাকবে)
  const [allTracks, setAllTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const plans = [
    { name: "Standard License", price: 29.99 },
    { name: "Premium License", price: 59.99 },
    { name: "Exclusive License", price: 199.99 },
  ];
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
      const tracksData = data.data || data;

      const formattedTracks = tracksData.map((track) => ({
        id: track._id,
        title: track.title,
        coverImage:
          track.coverImage ||
          "https://placehold.co/100x100/CCCCCC/000000?text=No+Image",
        duration: track.duration || "N/A",
        bpm: track.bpm || "N/A",
        tags: Array.isArray(track.musicTag)
          ? track.musicTag.join(", ")
          : track.musicTag || "No Tags",
        pricing: track.pricing || 0.0,
      }));

      setAllTracks(formattedTracks);
      setFilteredTracks(formattedTracks);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      setAllTracks([]);
      setFilteredTracks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  // এই ফাংশনটি পরিবর্তন করা হয়েছে
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/tracks?search=${encodeURIComponent(searchTerm)}`); // নতুন রুটে নেভিগেট করুন
    } else {
      navigate(`/tracks`);
    }
  };

  const openModal = (song) => {
    setSelectedSong(song);
    setIsOpen(true);
  };

  return (
    <section className="relative min-h-[700px] bg-[url('/image/home/hero-bg.jpg')] bg-cover bg-center px-4 py-10 md:py-20">
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="mx-auto max-w-7xl">
        {/* ... (বাকি কোড যেমন আছে তেমনই থাকবে) */}
        <main className="flex flex-col justify-between md:flex-row">
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
              className="w-115"
            />
          </article>
        </main>
      </div>
      {/* ... (বাকি কোড যেমন আছে তেমনই থাকবে) */}
    </section>
  );
};

export default HeroSection;
