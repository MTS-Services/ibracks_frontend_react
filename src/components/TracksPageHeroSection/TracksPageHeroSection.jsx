import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// ===============code_by_shakil_munshi===================
// Import Swiper styles

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoPlayCircleOutline } from "react-icons/io5";

// ===============code_by_shakil_munshi===================
// Import icons
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { IoMdArrowDroprightCircle } from "react-icons/io";

// ===============code_by_shakil_munshi===================
// Assuming this is your custom axios instance

import { FaPlay } from "react-icons/fa";
import axios from "../../utils/axiosInstance";

const DEFAULT_COVER_IMAGE = "/treacks/cart2.png";

const TracksPageHeroSection = () => {
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===============code_by_shakil_munshi===================
  // Audio state
  // ==================================

  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await axios.get(`songs/new-releases`);
        const data = response.data;

        if (!data || !data.data) {
          throw new Error("Invalid data format received from API.");
        }

        // Filter out any invalid items (null, undefined, or missing key properties)
        const validReleases = data.data.filter(
          (item) => item && item.id && item.title,
        );

        const formattedReleases = validReleases.map((item) => {
          // Your existing logic for setting the cover image is good,
          // but let's make it even more robust.
          let imageUrl = item.coverImage;
          if (
            !imageUrl ||
            typeof imageUrl !== "string" ||
            imageUrl.trim() === ""
          ) {
            imageUrl = DEFAULT_COVER_IMAGE;
          }

          return {
            id: item.id,
            title: item.title,
            artist: item.user ? item.user.name : "Unknown Artist",
            image: imageUrl,
            audioUrl: item.audioFile,
          };
        });

        // Take the first 20 valid and formatted releases
        setNewReleases(formattedReleases.slice(0, 20));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewReleases();
  }, []);

  // ===============code_by_shakil_munshi===================
  // Function to handle playing a song
  // ==================================

  const handlePlaySong = (release) => {
    // ===============code_by_shakil_munshi===================
    // Stop the current song if one is playing
    // ==================================

    if (currentlyPlaying) {
      audioRef.current.pause();
    }
    // ===============code_by_shakil_munshi===================
    // Check if the clicked song is the same as the current one
    // ==================================

    if (currentlyPlaying && currentlyPlaying.id === release.id) {
      setCurrentlyPlaying(null);
    } else {
      // ===============code_by_shakil_munshi===================
      // If a new song is clicked, set the new source and play
      // ==================================

      audioRef.current.src = release.audioUrl;
      audioRef.current.play();
      setCurrentlyPlaying(release);
    }
  };

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="text-lg text-white">Loading new releases...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="text-lg text-red-500">
          Error loading releases: {error}
        </div>
      </div>
    );
  }

  if (newReleases.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="text-lg text-white">No new releases found.</div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-center md:px-6 lg:px-8">
      {/* Left Navigation */}
      <div className="hidden lg:block">
        <div className="swiper-button-prev-custom cursor-pointer rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70">
          <FiArrowLeftCircle className="h-6 w-6 font-bold text-white" />
        </div>
      </div>

      {/* Main Area */}
      <div className="w-full lg:w-[1200px]">
        <div className="mx-auto flex h-auto min-h-[288px] flex-col items-start justify-start gap-5 overflow-hidden rounded-lg bg-white/10 py-4 pr-2 font-sans md:min-h-[300px] md:pl-6 lg:min-h-72">
          <div className="inline-flex items-center justify-start gap-3 self-stretch px-3 md:px-0">
            <div className="-mt-2 text-xl font-semibold text-white md:text-2xl">
              New Releases
            </div>
            <IoMdArrowDroprightCircle className="h-6 w-6 text-white" />
          </div>

          {/* Swiper Carousel */}
          <Swiper
            modules={[Navigation, Pagination]}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 15 },
              1024: {
                slidesPerView: Math.min(newReleases.length, 6),
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: Math.min(newReleases.length, 6),
                spaceBetween: 20,
              },
            }}
            loop={false}
            watchOverflow={true}
            centeredSlides={false}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
            }}
            className="relative w-full flex-1"
          >
            {newReleases.map((release) => (
              <SwiperSlide
                key={release.id}
                className="flex !h-auto !w-auto flex-col items-start justify-start gap-2.5"
              >
                <div
                  className="relative h-[176px] w-[176px] cursor-pointer overflow-hidden rounded"
                  onClick={() => handlePlaySong(release)}
                >
                  <img
                    className="h-full w-full object-cover object-center"
                    src={release.image}
                    alt={release.title}
                    onError={(e) => {
                      e.target.src = DEFAULT_COVER_IMAGE;
                    }}
                  />
                  {/* Optional: Add a play icon overlay */}
                  {currentlyPlaying && currentlyPlaying.id === release.id && (
                    <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black/60">
                      <IoPlayCircleOutline className="h-12 w-12 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex w-full flex-col items-start justify-start gap-0.5 py-1">
                  <div className="self-stretch truncate text-sm font-semibold text-neutral-200 sm:text-base">
                    {release.title}
                  </div>
                  <div className="self-stretch truncate text-xs font-normal text-zinc-400 sm:text-sm">
                    {release.artist}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="swiper-pagination-custom mt-4 flex justify-center pb-2"></div>
      </div>

      <div className="hidden lg:block">
        <div className="swiper-button-next-custom cursor-pointer rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70">
          <FiArrowRightCircle className="h-6 w-6 font-bold text-white" />
        </div>
      </div>

      <style jsx="true">{`
        .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          background-color: rgba(255, 255, 255, 0.4) !important;
          border-radius: 50% !important;
          opacity: 1 !important;
          margin: 0 4px !important;
        }

        .swiper-pagination-bullet-active {
          background-color: white !important;
        }

        .swiper-button-prev,
        .swiper-button-next {
          display: none !important;
        }

        .swiper-button-prev-custom.swiper-button-disabled,
        .swiper-button-next-custom.swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
          pointer-events: none;
        }

        @media (max-width: 1023px) {
          .swiper-button-prev-custom,
          .swiper-button-next-custom {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TracksPageHeroSection;
