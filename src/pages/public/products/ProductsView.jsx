import { useEffect, useRef, useState } from "react";

import Availabestems from "./components/sections/Availabestems";
import ProductsHero from "./components/sections/ProductsHero";
import ProductsHeroMobail from "./components/sections/ProductsHeroMobail";
import RelatedTracks from "./components/sections/Relatedtracks";

import { getAllSongs } from "../../../featured/song/trackService";
import { IoMdShare } from "react-icons/io";
import { MdEmojiFlags } from "react-icons/md";

const ProductsView = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllSongs();
        const limitedData = data.slice(0, 6);
        setSongs(limitedData);
      } catch (err) {
        console.error(err, "Could not load songs");
      }
    })();
  }, []);

  // ======song part====== code by shakil munshi =================
  const [isPlaying, setIsPlaying] = useState(false);
  const [playedBarsCount, setPlayedBarsCount] = useState(0);
  const animationFrameId = useRef(null);
  const barHeights = useRef([]); // To store initial random heights for each bar
  const totalBars = 75; // 30 yellow + 45 white from your code

  // Initialize bar heights only once when the component mounts
  useEffect(() => {
    if (barHeights.current.length === 0) {
      barHeights.current = Array.from({ length: totalBars }).map(() =>
        getRandomHeight(),
      );
    }
  }, []);

  // Function to generate a random height for the waveform bars
  const getRandomHeight = () => {
    return Math.floor(Math.random() * (24 - 8 + 1)) + 8; // Heights between 8px and 24px
  };

  // Animation loop for playing the "song" and animating bar heights
  useEffect(() => {
    let lastUpdateTime = 0;
    const updateInterval = 100; // Milliseconds to update bar colors and heights

    const animateBars = (currentTime) => {
      if (!lastUpdateTime) lastUpdateTime = currentTime;
      const deltaTime = currentTime - lastUpdateTime;

      if (deltaTime > updateInterval) {
        setPlayedBarsCount((prevCount) => {
          if (prevCount < totalBars) {
            // Update heights for all bars to create the "up and down" effect
            barHeights.current = barHeights.current.map(() =>
              getRandomHeight(),
            );
            lastUpdateTime = currentTime;
            return prevCount + 1; // Move to the next bar
          } else {
            // Song finished, stop playing and reset
            setIsPlaying(false);
            return 0; // Reset for next play
          }
        });
      }
      animationFrameId.current = requestAnimationFrame(animateBars);
    };

    if (isPlaying) {
      animationFrameId.current = requestAnimationFrame(animateBars);
    } else {
      cancelAnimationFrame(animationFrameId.current);
    }

    // Cleanup function
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isPlaying, totalBars]); // Depend on isPlaying and totalBars

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    // If starting to play and already at the end, reset played bars
    if (!isPlaying && playedBarsCount === totalBars) {
      setPlayedBarsCount(0);
      // Re-initialize heights if starting over
      barHeights.current = Array.from({ length: totalBars }).map(() =>
        getRandomHeight(),
      );
    }
  };

  // Generate all bars dynamically based on playedBarsCount and animated heights
  const allBars = Array.from({ length: totalBars }).map((_, index) => {
    const isPlayed = index < playedBarsCount;
    const barColorClass = isPlayed ? "bg-[#E2B64E]" : "bg-gray-300"; // Use your specific yellow color

    return (
      <div
        key={`bar-${index}`}
        className={`w-0.5 rounded-full ${barColorClass}`}
        style={{
          height: `${barHeights.current[index] || getRandomHeight()}px`,
        }} // Use stored height or generate if not available
      ></div>
    );
  });

  return (
    <div
      className="bg-neutral-900 py-10 lg:px-8"
      style={{
        background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
      }}
    >
      <div className="hidden lg:block">
        <div className="mx-auto flex items-center justify-center">
          <div className="inline-flex min-w-[1200px] items-end justify-start gap-16 px-5 py-5 font-[Poppins]">
            {/* Added px-5 py-5 for general padding around the card if needed, min-w based on total content width */}
            {/* Left Section: Image */}
            <div className="h-80 w-96 overflow-hidden rounded">
              {/*
          The image in the prompt is a placeholder. In a real application,
          you'd use a prop to pass the image source.
        */}
              <img
                className="h-full w-full object-cover"
                src="/products/cart01.jpg"
                alt="Album Art"
              />
            </div>
            {/* Middle Section: Song Details */}
            <div className="inline-flex w-[496px] flex-col items-start justify-start gap-12">
              <div className="flex w-56 flex-col items-start justify-start">
                <div className="self-stretch text-4xl font-semibold text-white capitalize">
                  Soul Power
                </div>
                <div className="self-stretch text-2xl font-normal text-white capitalize">
                  By Edwin Bocage
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-1.5 rounded-lg bg-gray-900 p-4">
                  {/* Play/Pause Button */}
                  <div
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-700"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      // Pause icon
                      <svg
                        className="h-4 w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      // Play icon
                      <svg
                        className="h-4 w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>

                  {/* Waveform Container */}
                  <div className="flex items-center space-x-0.5">
                    {allBars} {/* Render all bars here */}
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center justify-start gap-6">
                <button className="flex h-11 w-32 cursor-pointer items-center justify-center rounded-[30px] bg-gradient-to-b from-orange-200 to-yellow-500 px-2.5 text-base font-normal text-zinc-800 capitalize">
                  Buy now
                </button>
                <div className="w-24 text-lg font-semibold text-white capitalize">
                  $30.00
                </div>
                {/* Share Icon */}
                <div className="flex h-7 w-7 items-center justify-center rounded-[30px] bg-white/60">
                  {/* Using a simple div for the share icon, typically an SVG or library icon */}
                  <IoMdShare className="font-bold text-white" />
                </div>
                {/* flag Icon */}
                <div className="flex h-7 w-7 items-center justify-center rounded-[30px] bg-white/60">
                  {/* Using a simple div for the share icon, typically an SVG or library icon */}
                  <MdEmojiFlags className="font-bold text-white" />
                </div>
              </div>
            </div>
            {/* Grouping these to control their layout more effectively using flex-col */}
            <div className="inline-flex flex-col items-start justify-start gap-3">
              <div className="mx-auto flex items-center justify-center gap-9">
                <div className="flex flex-col items-start justify-start">
                  <div className="font-[Inter] text-xs font-[400] text-white">
                    YEAR
                  </div>
                  <div className="py-6 text-lg font-semibold text-white capitalize">
                    2020
                  </div>
                </div>
                {/* GENRES */}
                <div className="flex flex-col items-start justify-start">
                  <div className="font-[Inter] text-xs font-[400] text-white">
                    GENRES
                  </div>
                  <div className="py-6 text-lg font-semibold text-white capitalize">
                    Funk
                  </div>
                </div>
              </div>

              <div className="mx-auto flex items-center justify-center gap-9">
                <div className="flex flex-col items-start justify-start">
                  <div className="font-[Inter] text-xs font-[400] text-white">
                    BPM
                  </div>
                  <div className="py-6 text-lg font-semibold text-white capitalize">
                    120
                  </div>
                </div>
                {/* GENRES */}
                <div className="flex flex-col items-start justify-start">
                  <div className="font-[Inter] text-xs font-[400] text-white">
                    PLAYS
                  </div>
                  <div className="py-6 text-lg font-semibold text-white capitalize">
                    5.2k
                  </div>
                </div>
              </div>

              <div className="mx-auto flex items-center justify-center gap-9">
                <div className="flex flex-col items-start justify-start">
                  <div className="font-[Inter] text-xs font-[400] text-white">
                    KEY
                  </div>
                  <div className="py-6 text-lg font-semibold text-white capitalize">
                    AM
                  </div>
                </div>
                {/* GENRES */}
                <div className="flex flex-col items-start justify-start">
                  <div className="font-[Inter] text-xs font-[400] text-white">
                    LABEL
                  </div>
                  <div className="py-6 text-lg font-semibold text-white capitalize">
                    Hi-Tec
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <ProductsHeroMobail />
      </div>

      <Availabestems songs={songs} />
      <RelatedTracks />
    </div>
  );
};

export default ProductsView;
