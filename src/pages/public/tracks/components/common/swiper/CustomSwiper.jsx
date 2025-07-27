// src/components/CustomSwiper/CustomSwiper.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import CustomSwiperSlide from "./CustomSwiperSlide";
import CustomSwiperNavigation from "./CustomSwiperNavigation";
import CustomSwiperPagination from "./CustomSwiperPagination";

const CustomSwiper = ({
  slides = [],
  slidesPerView = 1, // Number of slides visible at once
  spaceBetween = 0, // Space between slides (px)
  loop = false,
  autoplay = false,
  autoplayDelay = 3000, // ms
  showPagination = true,
  showNavigation = true,
  onSlideChange = () => {},
  className = "",
  slideClassName = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false); // For autoplay pause
  const [startX, setStartX] = useState(0); // For touch/drag
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0); // Visual offset during drag

  const swiperRef = useRef(null);
  const autoplayRef = useRef(null);

  const totalSlides = slides.length;

  // --- Autoplay Logic ---
  const startAutoplay = useCallback(() => {
    if (autoplay && totalSlides > 1) {
      autoplayRef.current = setInterval(() => {
        if (!isHovering) {
          goToNextSlide();
        }
      }, autoplayDelay);
    }
  }, [autoplay, autoplayDelay, isHovering, totalSlides]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay(); // Cleanup on unmount
  }, [startAutoplay, stopAutoplay]);

  // --- Slide Navigation ---
  const goToSlide = useCallback(
    (index) => {
      stopAutoplay(); // Stop autoplay on manual interaction
      let newIndex = index;

      if (loop) {
        // Handle looping logic if needed (e.g., infinite loop)
        // This basic version just clamps or wraps
        if (newIndex >= totalSlides) newIndex = 0;
        else if (newIndex < 0) newIndex = totalSlides - 1;
      } else {
        // Clamp index within bounds
        newIndex = Math.max(0, Math.min(index, totalSlides - 1));
      }

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        onSlideChange(newIndex);
        startAutoplay(); // Restart autoplay after interaction
      }
    },
    [
      activeIndex,
      loop,
      onSlideChange,
      startAutoplay,
      stopAutoplay,
      totalSlides,
    ],
  );

  const goToNextSlide = () => {
    goToSlide(activeIndex + 1);
  };

  const goToPrevSlide = () => {
    goToSlide(activeIndex - 1);
  };

  // --- Touch/Mouse Drag Logic ---
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    stopAutoplay(); // Pause autoplay during drag
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    setCurrentX(clientX);
    const offset = clientX - startX;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const offset = currentX - startX;

    // Determine if swipe was significant enough
    const threshold = swiperRef.current?.offsetWidth * 0.2 || 50; // 20% of swiper width or 50px

    if (offset > threshold) {
      goToPrevSlide(); // Swiped right
    } else if (offset < -threshold) {
      goToNextSlide(); // Swiped left
    }
    // Reset drag offset for visual effect
    setDragOffset(0);
    startAutoplay(); // Resume autoplay
  };

  // Mouse Events
  const handleMouseDown = (e) => handleDragStart(e.clientX);
  const handleMouseMove = (e) => handleDragMove(e.clientX);
  const handleMouseUp = () => handleDragEnd();

  // Touch Events
  const handleTouchStart = (e) => handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX);
    // Prevent scrolling if dragging horizontally
    if (Math.abs(dragOffset) > 10) {
      e.preventDefault();
    }
  };
  const handleTouchEnd = () => handleDragEnd();

  // Keyboard Navigation (optional)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevSlide();
      } else if (e.key === "ArrowRight") {
        goToNextSlide();
      }
    };

    const swiperElement = swiperRef.current;
    if (swiperElement) {
      swiperElement.addEventListener("keydown", handleKeyDown);
      swiperElement.setAttribute("tabindex", "0"); // Make focusable
      return () => {
        swiperElement.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [goToNextSlide, goToPrevSlide]);

  // --- Calculate Transform ---
  // This calculates the translateX value for the slider track
  const calculateTransform = () => {
    // Base offset for the active slide
    let translateX = -(activeIndex * (100 / slidesPerView));
    // Add drag offset for visual feedback
    if (isDragging && swiperRef.current) {
      const containerWidth = swiperRef.current.offsetWidth;
      // Convert pixel drag to percentage
      const dragPercentage =
        (dragOffset / containerWidth) * (100 / slidesPerView);
      translateX += dragPercentage;
    }
    return `translateX(${translateX}%)`;
  };

  // --- Render Slides ---
  const renderSlides = () => {
    return slides.map((slide, index) => (
      <CustomSwiperSlide
        key={index} // Consider using a unique ID if available
        isActive={index === activeIndex}
        className={slideClassName}
        style={{
          flex: `0 0 ${100 / slidesPerView}%`, // Each slide takes up 1/slidesPerView percent
          // Apply spaceBetween as margin
          ...(spaceBetween > 0 && index !== slides.length - 1
            ? { marginRight: `${spaceBetween}px` }
            : {}),
        }}
      >
        {typeof slide === "string" ? (
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            className="h-auto w-full object-cover"
          />
        ) : (
          slide
        )}
      </CustomSwiperSlide>
    ));
  };

  // --- Determine Navigation Visibility ---
  const showNavButtons = showNavigation && totalSlides > slidesPerView;

  return (
    <div
      ref={swiperRef}
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: calculateTransform(),
          width: `${(slides.length * 100) / slidesPerView}%`, // Adjust total width
        }}
      >
        {renderSlides()}
      </div>

      {/* Navigation Arrows */}
      {showNavButtons && (
        <CustomSwiperNavigation
          onPrev={goToPrevSlide}
          onNext={goToNextSlide}
          disabledPrev={!loop && activeIndex === 0}
          disabledNext={!loop && activeIndex === totalSlides - 1}
        />
      )}

      {/* Pagination Dots */}
      {showPagination && totalSlides > 1 && (
        <CustomSwiperPagination
          totalSlides={totalSlides}
          activeIndex={activeIndex}
          onClick={(index) => goToSlide(index)}
        />
      )}
    </div>
  );
};

export default CustomSwiper;
