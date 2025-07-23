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
    <section className="py-16 text-center">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-4 text-3xl font-bold text-white">Service</h2>
        <p className="mx-auto mb-12 max-w-3xl text-lg text-white/80">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {kits.map((kit, index) => (
            <div
              key={index}
              className="w-full max-w-[300px] overflow-hidden rounded-xl border border-neutral-200 bg-black shadow-md"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={kit.imageUrl}
                  alt={kit.title}
                  className="h-64 w-full object-cover"
                />
                <span className="absolute top-2 left-2 rounded bg-white px-3 py-1 text-sm font-medium text-black">
                  Hot
                </span>
              </div>

              {/* Content Section */}
              <div className="flex flex-col gap-2 p-4">
                <h3 className="text-left text-2xl font-semibold text-white">
                  {kit.title}
                </h3>
                <p className="text-left text-sm leading-relaxed text-white/80">
                  $ {kit.amount}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <button className="rounded bg-gradient-to-b from-orange-200 to-yellow-500 px-4 py-2 text-sm text-black hover:opacity-90">
                    GET A QUOTE
                  </button>
                  <FaHeartCirclePlus className="text-accent" />
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
