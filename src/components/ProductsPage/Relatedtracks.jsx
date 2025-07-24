import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

// Sample JSON data for tracks
const tracksData = [
  {
    id: 1,
    image: "/products/cart1.jpg",
    title: "Vision",
    producer: "ProducerB",
    bpm: "130 BPM",
    price: "$30.00",
  },
  {
    id: 2,
    image: "/products/cart2.jpg",
    title: "Vision",
    producer: "ProducerB",
    bpm: "130 BPM",
    price: "$30.00",
  },
  {
    id: 3,
    image: "/products/cart3.jpg",
    title: "Vision",
    producer: "ProducerB",
    bpm: "130 BPM",
    price: "$30.00",
  },
  {
    id: 4,
    image: "/products/cart4.jpg",
    title: "Vision",
    producer: "ProducerB",
    bpm: "130 BPM",
    price: "$30.00",
  },
  {
    id: 5,
    image: "/products/cart5.jpg",
    title: "Vision",
    producer: "ProducerB",
    bpm: "130 BPM",
    price: "$30.00",
  },
  {
    id: 6,
    image: "/products/cart6.jpg",
    title: "Vision",
    producer: "ProducerB",
    bpm: "130 BPM",
    price: "$30.00",
  },
  {
    id: 7,
    image: "/products/cart7.jpg",
    title: "Vision",
    producer: "ProducerB",
    bpm: "130 BPM",
    price: "$30.00",
  },
  {
    id: 8,
    image: "/products/cart8.jpg",
    title: "Vision",
    producer: "ProducerB",
    bpm: "130 BPM",
    price: "$30.00",
  },
];

const RelatedTracks = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setTracks(tracksData);
  }, []);

  return (
    <div>
      <dvi>
        <div className="mx-auto flex items-center justify-center">
          <div className="">
            <div className="mb-9 flex items-center">
              <h2 className="gap-12 font-['Poppins'] text-lg font-[600] text-white md:text-4xl lg:pr-13 lg:text-3xl">
                Related Tracks
              </h2>
              <button className="rounded-lg border border-white px-6 py-2 font-['Poppins'] text-[24px] text-white transition-colors hover:bg-white hover:text-[#2d005d]">
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="flex flex-col items-start justify-start gap-5"
                  style={{
                    background: "rgba(255, 255, 255, 0.10)",
                    borderRadius: "8px", // Added border-radius
                    width: "18rem", // Width set to match your previous design
                    padding: "5px", // Padding around the content
                    height: "24rem", // Height for the card container
                  }}
                >
                  <img
                    className="h-60 self-stretch rounded object-cover"
                    src={track.image}
                    alt={track.title}
                  />
                  <div className="flex flex-col items-start justify-start gap-[5px] self-stretch px-6">
                    <div className="flex w-full items-center justify-between">
                      <div className="h-5 w-20 justify-center text-center font-['Poppins'] text-2xl font-[600] text-orange-200 capitalize">
                        {track.title}
                      </div>
                      <div className="font-['Poppins'] text-base font-[400] text-orange-200 capitalize">
                        {track.bpm}
                      </div>
                    </div>

                    <div className="h-5 w-20 justify-start pt-1 text-center font-['Poppins'] text-sm font-[400] text-neutral-200">
                      {track.producer}
                    </div>
                  </div>
                  <div className="mt-auto flex w-full items-center justify-between px-6 pb-2">
                    <div className="font-['Poppins'] text-lg font-[600] text-white capitalize">
                      {track.price}
                    </div>
                    <button className="flex h-11 w-28 items-center justify-center rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 p-2.5 font-['Poppins'] text-lg font-[600] text-zinc-800 capitalize">
                      Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto flex items-center justify-center pt-10">
          <div
            className="inline-flex items-center justify-center gap-1 overflow-hidden rounded-2xl border-[1px] bg-[#43024F] px-12 py-3 shadow-2xl transition-all duration-300 ease-in-out hover:bg-gradient-to-t hover:from-[#DAA520] hover:to-[#F5DEB3]"
            style={{
              borderRadius: "8px",
              borderImage:
                "linear-gradient(to top, #DAA520 50%, #F5DEB3 50%) 1",
              borderColor: "transparent",
              outline: "none",
            }}
          >
            <div className="cursor-pointer rounded-4xl text-center font-['Plus_Jakarta_Sans'] text-base leading-normal font-semibold text-white capitalize shadow-2xl">
              Load more
            </div>
            <div data-size="48" className="h-6 w-6">
              <FaArrowRight className="rotate-[-60deg] font-bold text-white" />
            </div>
          </div>
        </div>
      </dvi>
    </div>
  );
};

export default RelatedTracks;
