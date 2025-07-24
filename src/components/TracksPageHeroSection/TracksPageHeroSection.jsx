import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaPlay } from "react-icons/fa";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { IoMdArrowDroprightCircle } from "react-icons/io";

const TracksPageHeroSection = () => {
  const releases = [
    {
      title: "Red (Taylor's Version)",
      artist: "Taylor Swift",
      image: "/treacks/cart1.png",
    },
    {
      title: "Need To Know",
      artist: "Doja Cat",
      image: "/treacks/cart2.png ",
    },
    {
      title: "Save Your Tear",
      artist: "The Weeknd",
      image: "/treacks/cart3.png",
    },
    {
      title: "HIT MACHINE",
      artist: "Soundwave",
      image: "/treacks/cart4.png",
    },
    {
      title: "Red (Taylor's Version)",
      artist: "Ca sĩ", // Assuming "Ca sĩ" means "Singer" in Vietnamese
      image: "/treacks/cart1.png",
    },
    {
      title: "Need To Know",
      artist: "Doja Cat",
      image: "/treacks/cart2.png",
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      image: "/treacks/cart5.png",
    },
  ];

  return (
    <div className="mx-auto flex w-[1270px] items-center justify-center">
      <div>
        <div className="swiper-button-prev-custom cursor-pointer rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70">
          <FiArrowLeftCircle className="h-6 w-6 font-bold text-white" />
        </div>
      </div>
      {/* Header and Swiper Content Area */}
      <div>
        <div className="mx-auto flex h-72 w-[1200px] flex-col items-start justify-start gap-5 overflow-hidden rounded-lg bg-white/10 px-4.5 py-2 font-sans">
          <div>
            <div className="inline-flex items-center justify-start gap-3 self-stretch py-2 pb-3">
              <div className="-mt-2 text-[23px] font-semibold text-white">
                New Releases
              </div>
              <div className="">
                <IoMdArrowDroprightCircle className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Swiper Carousel */}
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={4.5} // Show 4.5 items at a time
              spaceBetween={20} // Space between slides
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination-custom", // Swiper will populate this element
              }}
              loop={true} // <--- THIS IS THE KEY CHANGE for infinite looping
              className="relative w-full flex-1" // Added relative for button positioning
            >
              {releases.map((release, index) => (
                <SwiperSlide
                  key={index}
                  className="flex !h-60 !w-44 flex-col items-start justify-start gap-2.5"
                >
                  <img
                    className="h-44 w-44 rounded object-cover"
                    src={release.image}
                    alt={release.title}
                  />
                  <div className="flex w-44 flex-col items-start justify-start gap-0.5 py-1">
                    <div className="self-stretch truncate text-base font-semibold text-neutral-200">
                      {release.title}
                    </div>
                    <div className="self-stretch truncate text-sm font-normal text-zinc-400">
                      {release.artist}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              {/* Note: The swiper-pagination-custom div is intentionally NOT inside Swiper here */}
            </Swiper>
          </div>
        </div>

        {/* HERE IS THE ONLY SIGNIFICANT CHANGE: */}
        {/* The pagination div is moved outside the Swiper, but still within the parent div */}
        <div className="mx-auto flex items-center justify-center py-1">
          {/* This is the container Swiper will use for pagination dots */}
          <div className="swiper-pagination-custom w mt-4 flex justify-center pb-2"></div>
        </div>
      </div>
      <div>
        <div className="swiper-button-next-custom top-1/2 right-0 z-10 cursor-pointer rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70">
          <FiArrowRightCircle className="h-6 w-6 font-bold text-white" />
        </div>
      </div>

      {/* IMPORTANT: These <style> tags are for overriding Swiper's default CSS directly
            within the component using Tailwind-like properties.
            For a larger project, consider a global CSS file or CSS modules for better maintainability.
       */}
      <style jsx="true">{`
        /* Custom pagination dots using Swiper's default classes */
        .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          background-color: rgba(
            255,
            255,
            255,
            0.4
          ) !important; /* Inactive dot color */
          border-radius: 50% !important;
          opacity: 1 !important; /* Override default Swiper opacity */
          transition: background-color 0.3s ease !important;
          margin: 0 4px !important; /* Add some margin between dots */
        }

        .swiper-pagination-bullet-active {
          background-color: white !important; /* Active dot color */
        }

        /* Hide default Swiper navigation arrows that might appear */
        .swiper-button-prev,
        .swiper-button-next {
          display: none !important;
        }

        /* Style for disabled navigation buttons */
        .swiper-button-prev-custom.swiper-button-disabled,
        .swiper-button-next-custom.swiper-button-disabled {
          opacity: 0.5; /* Tailwind's opacity-50 */
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default TracksPageHeroSection;
