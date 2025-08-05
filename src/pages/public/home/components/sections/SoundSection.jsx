import React from "react";

const SoundSection = () => {
  const kits = [
    {
      title: "Free Afrobeat Drum Kits",
      description:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s.",
      imageUrl: "/image/sound.png",
    },
    {
      title: "Free Afrobeat Drum Kits",
      description:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s.",
      imageUrl: "/image/sound.png",
    },
    {
      title: "Free Afrobeat Drum Kits",
      description:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s.",
      imageUrl: "/image/sound.png",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#150620] to-[#150630] px-4 text-center lg:py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Sound Kits
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-base text-white/80 sm:text-lg">
          Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
          Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever
          Since The 1500s, When An Unknown Printer Took A Galley Of Type And
          Scrambled It To Make A Type Specimen Book.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {kits.map((kit, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-neutral-700 bg-black shadow-lg transition-all duration-300 hover:border-neutral-500 hover:shadow-xl"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={kit.imageUrl}
                  alt={kit.title}
                  className="h-48 w-full object-cover sm:h-56 md:h-64"
                />
                <span className="absolute top-3 left-3 rounded bg-white px-3 py-1 text-xs font-medium text-black sm:text-sm">
                  Free
                </span>
              </div>

              {/* Content Section */}
              <div className="flex flex-col gap-3 p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-white uppercase sm:text-xl">
                  {kit.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/80 sm:text-base">
                  {kit.description}
                </p>

                <button className="mt-4 w-full self-center rounded bg-gradient-to-b from-orange-200 to-yellow-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:opacity-90 sm:w-40 sm:self-start">
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoundSection;
