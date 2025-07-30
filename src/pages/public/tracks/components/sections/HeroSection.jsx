import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { IoMdArrowDroprightCircle } from "react-icons/io";

const HeroSection = ({ songs }) => {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-center md:px-6 lg:px-8">
      {/* Left Navigation */}
      <div className="hidden lg:block">
        {/* Hide on smaller screens, show on large */}
        <div className="swiper-button-prev-custom cursor-pointer rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70">
          <FiArrowLeftCircle className="h-6 w-6 font-bold text-white" />
        </div>
      </div>

      {/* Main Area */}
      <div className="w-full lg:w-[1200px]">
        {/* Adjusted width for responsiveness */}
        <div className="mx-auto flex h-auto min-h-[288px] flex-col items-start justify-start gap-5 overflow-hidden rounded-lg bg-white/10 px-4 py-2 font-sans md:min-h-[300px] lg:min-h-72">
          <div>
            <div className="inline-flex items-center justify-start gap-3 self-stretch py-2 pb-3">
              <div className="-mt-2 text-xl font-semibold text-white md:text-2xl">
                New Releases
              </div>
              <div className="">
                <IoMdArrowDroprightCircle className="h-6 w-6 text-white" />
              </div>
            </div>
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
            {songs.map((release, index) => (
              <SwiperSlide
                key={index}
                className="flex !h-auto !w-auto flex-col items-start justify-start gap-2.5"
              >
                <img
                  className="h-auto max-h-[176px] w-full max-w-[176px] rounded object-cover"
                  src={release.thumbnail}
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
        {/* Hide on smaller screens, show on large */}
        <div className="swiper-button-next-custom cursor-pointer rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70">
          <FiArrowRightCircle className="h-6 w-6 font-bold text-white" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
