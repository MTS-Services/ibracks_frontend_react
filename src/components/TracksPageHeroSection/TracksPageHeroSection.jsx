import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
      image: "/treacks/cart2.png",
    },
    {
      title: "Save Your Tear",
      artist: "The Weeknd",
      image: "/treacks/cart3.png",
    },
    {
      title: "Need To Know",
      artist: "Doja Cat",
      image: "/treacks/cart2.png",
    },
    {
      title: "Save Your Tear",
      artist: "The Weeknd",
      image: "/treacks/cart3.png",
    },
    {
      title: "Need To Know",
      artist: "Doja Cat",
      image: "/treacks/cart2.png",
    },
    {
      title: "Save Your Tear",
      artist: "The Weeknd",
      image: "/treacks/cart3.png",
    },
    {
      title: "Need To Know",
      artist: "Doja Cat",
      image: "/treacks/cart2.png",
    },
    {
      title: "Save Your Tear",
      artist: "The Weeknd",
      image: "/treacks/cart3.png",
    },
    {
      title: "Need To Know",
      artist: "Doja Cat",
      image: "/treacks/cart2.png",
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
      title: "Blinding Lights",
      artist: "The Weeknd",
      image: "/treacks/cart5.png",
    },
    {
      title: "Red (Taylor's Version)",
      artist: "Ca sĩ",
      image: "/treacks/cart1.png",
    },
    {
      title: "Save Your Tears",
      artist: "Weeknd",
      image: "/treacks/cart3.png",
    },
  ];

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
          <div className="inline-flex items-center justify-start gap-3 self-stretch">
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
              1024: { slidesPerView: 6, spaceBetween: 20 },
              1280: { slidesPerView: 6, spaceBetween: 20 },
            }}
            loop={false} // 🔒 loop off
            watchOverflow={true} // ✅ auto disables arrows if not scrollable
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
            {releases.map((release, index) => (
              <SwiperSlide
                key={index}
                className="flex !h-auto !w-auto flex-col items-start justify-start gap-2.5"
              >
                <img
                  className="h-auto max-h-[176px] w-full max-w-[176px] rounded object-cover"
                  src={release.image}
                  alt={release.title}
                />
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

        {/* Pagination Dots */}
        <div className="swiper-pagination-custom mt-4 flex justify-center pb-2"></div>
      </div>

      {/* Right Navigation */}
      <div className="hidden lg:block">
        <div className="swiper-button-next-custom cursor-pointer rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70">
          <FiArrowRightCircle className="h-6 w-6 font-bold text-white" />
        </div>
      </div>

      {/* Custom Styles */}
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
