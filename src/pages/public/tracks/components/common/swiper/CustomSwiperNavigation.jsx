// src/components/CustomSwiper/CustomSwiperNavigation.jsx
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Assuming you have react-icons

const CustomSwiperNavigation = ({
  onPrev,
  onNext,
  disabledPrev = false,
  disabledNext = false,
}) => {
  return (
    <>
      <button
        onClick={onPrev}
        disabled={disabledPrev}
        className={`absolute top-1/2 left-0 z-10 -translate-y-1/2 transform rounded-full bg-gray-500/30 p-2 text-white transition-opacity hover:bg-black/50 focus:ring-2 focus:ring-white focus:outline-none ${
          disabledPrev
            ? "cursor-not-allowed opacity-30"
            : "opacity-70 hover:opacity-100"
        }`}
        aria-label="Previous slide"
      >
        <FiChevronLeft size={20} />
      </button>
      <button
        onClick={onNext}
        disabled={disabledNext}
        className={`absolute top-1/2 right-2 z-10 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white transition-opacity hover:bg-black/50 focus:ring-2 focus:ring-white focus:outline-none ${
          disabledNext
            ? "cursor-not-allowed opacity-30"
            : "opacity-70 hover:opacity-100"
        }`}
        aria-label="Next slide"
      >
        <FiChevronRight size={20} />
      </button>
    </>
  );
};

export default CustomSwiperNavigation;
