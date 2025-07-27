import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

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
      title: "Need To Know",
      artist: "Doja Cat",
      image: "/treacks/cart2.png",
    },
    {
      title: "Need To Know",
      artist: "Doja Cat",
      image: "/treacks/cart2.png",
    },
  ];

  return (
    // Outer container for centering and defining max width
    <div className="mx-auto flex max-w-7xl items-center justify-center md:px-6 lg:px-8">
      {/* Left Navigation Button */}
      <div className="hidden lg:block">
        {/* Hide on smaller screens, show on large */}
        <div className="swiper-button-prev-custom cursor-pointer rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70">
          <FiArrowLeftCircle className="h-6 w-6 font-bold text-white" />
        </div>
      </div>

      {/* Main Content Area (Header + Swiper) */}
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

            {/* Swiper Carousel */}
            <Swiper
              modules={[Navigation, Pagination]}
              // Responsive breakpoints
              breakpoints={{
                // When window width is >= 320px (mobile)
                320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                // When window width is >= 768px (tablet)
                768: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                // When window width is >= 1024px (desktop/large)
                1024: {
                  slidesPerView: 4.5,
                  spaceBetween: 20,
                },
              }}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination-custom",
              }}
              loop={true}
              className="relative w-full flex-1"
            >
              {releases.map((release, index) => (
                <SwiperSlide
                  key={index}
                  // Responsive slide dimensions
                  className="flex !h-auto !w-auto flex-col items-start justify-start gap-2.5"
                >
                  <img
                    className="h-auto max-h-[144px] w-full max-w-[144px] rounded object-cover sm:max-h-[160px] sm:max-w-[160px] md:max-h-[176px] md:max-w-[176px] lg:max-h-[176px] lg:max-w-[176px] xl:max-h-[176px] xl:max-w-[176px]"
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
        </div>
        {/* Pagination Dots */}
        <div className="mx-auto flex items-center justify-center py-1">
          <div className="swiper-pagination-custom mt-4 flex justify-center pb-2"></div>
        </div>
      </div>

      {/* Right Navigation Button */}
      <div className="hidden lg:block">
        {/* Hide on smaller screens, show on large */}
        <div className="swiper-button-next-custom cursor-pointer rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70">
          <FiArrowRightCircle className="h-6 w-6 font-bold text-white" />
        </div>
      </div>
    </div>
  );
};

export default TracksPageHeroSection;
