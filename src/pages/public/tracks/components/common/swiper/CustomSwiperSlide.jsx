// src/components/CustomSwiper/CustomSwiperSlide.jsx
import React from "react";

const CustomSwiperSlide = ({
  children,
  isActive,
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`flex-shrink-0 ${className}`} // Ensure slides don't shrink
      style={style}
      data-swiper-slide-index={isActive ? "active" : undefined} // Optional data attribute
    >
      {children}
    </div>
  );
};

export default CustomSwiperSlide;
