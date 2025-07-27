import MusicCard from "./MusicCard";
import { musicCards } from "./AboutPageData";

// Left Column: This component remains the same
const TextContent = () => (
  <div className="flex w-full flex-col gap-8 lg:max-w-[641px]">
    <div className="flex flex-col gap-4">
      <h2 className="text-4xl leading-tight font-semibold text-white capitalize">
        What Sets Us Apart
      </h2>
      <p className="text-base leading-relaxed font-normal text-white capitalize">
        At Beatzingeez Music, we live and breathe music. Whether you're a
        passionate artist, content creator, or music enthusiast, our platform is
        built to fuel your sound journey. We provide high-quality, royalty-free
        music tracks that inspire, energize, and elevate every project.
        <br />
        <br />
        Our team of talented composers and producers are committed to delivering
        unique, studio-grade music across genres—from cinematic scores and lo-fi
        beats to electronic, pop, and hip-hop.
      </p>
    </div>
    <div className="mt-4 flex flex-wrap justify-center gap-20 xl:justify-start">
      {musicCards.map((card) => (
        <MusicCard key={card.id} {...card} />
      ))}
    </div>
  </div>
);

// Right Column: This component has been reverted to your original design
const ImageDisplay = () => (
  <div className="relative w-full flex-shrink-0 lg:mt-0 lg:h-[500px] lg:w-[500px]">
    <div className="relative mx-auto mt-2 flex h-64 w-64 max-w-7xl items-center justify-center border-1 border-gray-400 xl:h-96 xl:w-full">
      <div className="absolute top-20 -left-2 h-50 w-30 bg-[#2B0232] lg:-left-2 lg:w-80 xl:top-50" />
      <img
        className="absolute mt-10 -ml-20 w-full origin-center object-cover md:w-full xl:mt-40 xl:-ml-40"
        // style={{ transform: "skewY(-10deg) rotate(20deg)" }}
        src="/aboutpage/cart3.png"
        alt="A collage of various music album covers"
      />
    </div>
  </div>
);

// The main, orchestrated component with the original flexbox layout
const WhatSetsUsApart = () => {
  return (
    <section className="bg-backdrop bg-[#2B0232] py-16 sm:py-8 lg:py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-4 sm:px-6 lg:flex-row lg:items-start lg:gap-16 lg:px-0">
        <TextContent />
        <ImageDisplay />
      </div>
    </section>
  );
};

export default WhatSetsUsApart;
