import React from "react";

const ServicesView = () => {
  const musicCartData = [
    {
      id: 1,
      title: "Music Production",
      subtitle: "From Idea to Final Track",
      img: "/services/cart1.jpg",
    },
    {
      id: 2,
      title: "Music Production",
      subtitle: "From Idea to Final Track",
      img: "/services/cart2.jpg",
    },
    {
      id: 3,
      title: "Music Production",
      subtitle: "From Idea to Final Track",
      img: "/services/cart3.jpg",
    },
    {
      id: 4,
      title: "Music Production",
      subtitle: "From Idea to Final Track",
      img: "/services/cart4.jpg",
    },
    {
      id: 5,
      title: "Music Production",
      subtitle: "From Idea to Final Track",
      img: "/services/cart5.jpg",
    },
    {
      id: 6,
      title: "Music Production",
      subtitle: "From Idea to Final Track",
      img: "/services/cart6.jpg",
    },
  ];

  return (
    <div
      style={{
        background:
          "var(--dark-purple-color, linear-gradient(180deg, #050306 0%, #5D006D 100%))",
      }}
      // Adjusted padding for mobile (px-4 py-10) and larger screens (sm:px-6 md:px-8 lg:px-10)
      className="flex min-h-screen justify-center px-4 py-8 sm:px-6 md:px-8 md:py-20 lg:px-10"
    >
      <div
        // Default (mobile) grid: 1 column, gap-8
        // Small screens (sm): 2 columns, gap-10
        // Medium screens (md): 3 columns, gap-12
        // Large screens (lg): 3 columns, gap-14 (your original lg setting)
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-12 lg:gap-14"
      >
        {musicCartData.map((item) => (
          <div
            key={item.id}
            className="inline-flex flex-col items-start justify-start gap-5 overflow-hidden rounded-lg bg-white/10 pb-5 shadow-lg md:w-72"
          >
            {/* Image Section */}
            <img
              className="h-[237px] self-stretch rounded-t-lg object-cover"
              src={item.img}
              alt={item.title}
            />

            {/* Content Section */}
            <div className="flex flex-col items-center justify-start gap-3.5 self-stretch px-4">
              <div className="bg-gradient-to-b from-orange-100 to-yellow-300 bg-clip-text text-center font-['Poppins'] text-2xl font-[600] text-transparent capitalize">
                {item.title}
              </div>

              <div className="top-0 pb-1 text-center font-['Poppins'] text-sm font-[400] text-[#E0E0E0]">
                {item.subtitle}
              </div>
              <button className="inline-flex h-11 w-64 cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 p-2.5 transition-all duration-300 hover:from-orange-300 hover:to-yellow-600">
                <span className="flex-1 text-center font-['Poppins'] text-lg font-[600] text-zinc-800 capitalize">
                  DETAILS
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesView;
