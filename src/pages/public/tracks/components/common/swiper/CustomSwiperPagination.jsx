// src/components/CustomSwiper/CustomSwiperPagination.jsx
import React from "react";

const CustomSwiperPagination = ({ totalSlides, activeIndex, onClick }) => {
  return (
    <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onClick(index)}
          className={`h-3 w-3 rounded-full transition-all ${
            index === activeIndex ? "w-6 bg-white" : "bg-white/50"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CustomSwiperPagination;
