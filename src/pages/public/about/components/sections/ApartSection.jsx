import MusicCard from "../common/MusicCard";

const musicCards = [
  {
    id: "card-1",
    imageSrc: "/aboutpage/cartsecent1.png",
    bgColor: "bg-[#2B0232] ",
    title: "Rap Music",
    stats: "0.3234",
  },
  {
    id: "card-2",
    imageSrc: "/aboutpage/cart2.png",
    bgColor: "bg-[#2B0232] ",
    title: "Rap Music",
    stats: "0.3234",
  },
];

// Left Column: This component remains the same
const TextContent = () => (
  <div className="flex w-full flex-col gap-8 lg:max-w-[641px]">
    <div className="flex flex-col gap-4">
      <h2 className="text-4xl leading-tight font-semibold text-white capitalize">
        What Sets Us Apart
      </h2>
      <p className="text-base text-gray-300 capitalize md:text-lg">
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
  <div className="">
    <div className="h-90 w-90 rounded-full bg-[#30107088] blur-3xl" />
    <img
      className="absolute top-[1100px] right-0 md:top-0 md:w-[600px]"
      src="/aboutpage/cans.png"
      alt="A collage of various music album covers"
    />
  </div>
);

// The main, orchestrated component with the original flexbox layout
const WhatSetsUsApart = () => {
  return (
    <section className="bg-backdrop bg-[#2B0232] py-16 sm:py-8 lg:py-20">
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-4 sm:px-6 lg:flex-row lg:items-start lg:gap-16 lg:px-0">
        <TextContent />
        <ImageDisplay />
      </div>
    </section>
  );
};

export default WhatSetsUsApart;
