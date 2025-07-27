import React from "react";
import { FaHeartCirclePlus } from "react-icons/fa6";

const ServiceSection = () => {
  const kits = [
    {
      id: 1,
      title: "Mixing and Mastering",
      amount: "20.01",
      imageUrl: "/image/service.jpg",
    },
    {
      id: 2,
      title: "Mixing and Mastering",
      amount: "20.01",
      imageUrl: "/image/service.jpg",
    },
    {
      id: 3,
      title: "Mixing and Mastering",
      amount: "20.01",
      imageUrl: "/image/service.jpg",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#150620] to-[#49055a] pb-15 text-center sm:py-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Service
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-base text-white/80 sm:text-lg md:text-xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {kits.map((kit) => (
            <div
              key={kit.id}
              className="overflow-hidden rounded-xl border border-neutral-700 bg-black shadow-lg transition-all duration-300 hover:border-neutral-500 hover:shadow-xl"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={kit.imageUrl}
                  alt={kit.title}
                  className="h-48 w-full object-cover sm:h-56 md:h-64"
                />
                <span className="absolute top-3 left-3 rounded bg-white px-2.5 py-1 text-xs font-medium text-black sm:text-sm">
                  Hot
                </span>
              </div>

              {/* Content Section */}
              <div className="flex flex-col gap-3 p-5 sm:p-6">
                <h3 className="text-left text-xl font-semibold text-white sm:text-2xl">
                  {kit.title}
                </h3>
                <p className="text-left text-base font-medium text-white/80 sm:text-lg">
                  $ {kit.amount}
                </p>

                <div className="mt-4 flex items-center justify-between pt-2">
                  <button className="w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:opacity-90 sm:w-auto sm:text-base">
                    GET A QUOTE
                  </button>
                  <FaHeartCirclePlus
                    size={20}
                    className="text-accent ml-3 flex-shrink-0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
