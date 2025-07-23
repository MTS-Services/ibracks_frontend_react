import React from "react";
import { FaSearch } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="bg-[url('/image/home/hero-bg.jpg')] bg-cover bg-center py-20">
      <div className="absolute inset-0 bg-black opacity-40" />

      <div className="mx-auto max-w-7xl">
        {/* Search Bar - Absolute positioned */}
        <main className="flex flex-col justify-between md:flex-row">
          {/* Left side - Text content */}
          <article className="relative space-y-10 md:w-1/2">
            <h1 className="bg-gradient-to-t from-yellow-400 via-yellow-400 to-yellow-100 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              Feel the Sound. Own the Vibe.
            </h1>

            <p className="text-2xl font-normal text-white capitalize">
              Discover the magic of music with us. Our platform is your gateway
              to a world of melodies and emotions. Whether you're a passionate
              listener, a budding artist, or an industry professional, we have
              something special for you.
            </p>

            <div className="relative w-full">
              <input
                type="text"
                placeholder="What type of track are you looking for"
                className="h-20 w-full rounded-full border border-orange-200 bg-black/20 px-6 pr-40 text-white backdrop-blur-2xl focus:outline-none"
              />
              <button
                type="submit"
                className="absolute top-1/2 right-5 flex -translate-y-1/2 items-center gap-2 rounded-full bg-gradient-to-b from-orange-200 to-yellow-500 px-6 py-3 transition hover:opacity-90"
              >
                <FaSearch className="text-black" />
                <span className="text-base font-semibold text-black">
                  Search
                </span>
              </button>
            </div>
          </article>

          {/* Right side - Music player image */}
          <article className="relative space-y-6 text-center">
            <div>
              <p className="text-lg font-extrabold text-white uppercase">
                New Song: One of the girls
              </p>
              <p className="text-sm font-light text-white capitalize">
                The Weeknd, JENNIE & Lily Rose Depp
              </p>
            </div>

            <img src="/image/layer-music.png" alt="Music player" className="" />
          </article>
        </main>
      </div>
    </section>
  );
};

export default HeroSection;
