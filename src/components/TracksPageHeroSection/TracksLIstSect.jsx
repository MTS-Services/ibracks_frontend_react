import { FaShareAlt } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";

const TracksLIstSect = () => {
  const tracks = [
    {
      id: 1,
      title: "NOLSTAGIA",
      time: "02:59",
      bpm: "103",
      tags: ["Afrobeat", "Inspiring"],
      thumbnail: "/image/home/music3.png",
    },
    {
      id: 2,
      title: "NOLSTAGIA",
      time: "02:59",
      bpm: "103",
      tags: ["Afrobeat", "Inspiring"],
      thumbnail: "/image/home/music3.png",
    },
    {
      id: 3,
      title: "NOLSTAGIA",
      time: "02:59",
      bpm: "103",
      tags: ["Afrobeat", "Inspiring"],
      thumbnail: "/image/home/music3.png",
    },
    {
      id: 3,
      title: "NOLSTAGIA",
      time: "02:59",
      bpm: "103",
      tags: ["Afrobeat", "Inspiring"],
      thumbnail: "/image/home/music3.png",
    },
    {
      id: 3,
      title: "NOLSTAGIA",
      time: "02:59",
      bpm: "103",
      tags: ["Afrobeat", "Inspiring"],
      thumbnail: "/image/home/music3.png",
    },
    {
      id: 3,
      title: "NOLSTAGIA",
      time: "02:59",
      bpm: "103",
      tags: ["Afrobeat", "Inspiring"],
      thumbnail: "/image/home/music3.png",
    },
    {
      id: 3,
      title: "NOLSTAGIA",
      time: "02:59",
      bpm: "103",
      tags: ["Afrobeat", "Inspiring"],
      thumbnail: "/image/home/music3.png",
    },
    // Repeat or map your tracks as needed...
  ];

  return (
    <section className="sm:p-6 lg:p-8">
      {" "}
      {/* Added padding for smaller screens */}
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}

        {/* Table Container */}
        <div className="overflow-x-auto border-b border-gray-500">
          {" "}
          {/* Added overflow-x-auto for table scrolling on small screens */}
          <table className="min-w-full text-left text-xs text-white sm:text-sm md:text-base">
            {" "}
            {/* Adjusted base text size for smaller screens */}
            <thead className="text-sm text-orange-300 sm:text-base md:text-xl">
              {" "}
              {/* Adjusted header text size */}
              <tr>
                <th
                  className="px-2 py-3 text-center font-medium sm:px-4 sm:py-4"
                  colSpan={2}
                >
                  {" "}
                  {/* Reduced padding */}
                  Title
                </th>
                <th className="px-2 py-3 font-medium sm:px-4 sm:py-4">
                  Time
                </th>{" "}
                {/* Reduced padding */}
                <th className="px-2 py-3 font-medium sm:px-4 sm:py-4">
                  BPM
                </th>{" "}
                {/* Reduced padding */}
                <th className="py-3 font-medium sm:py-4 md:px-4">Tags</th>{" "}
                {/* Reduced padding */}
                <th className="py-3 font-medium md:px-4 md:py-4"></th>{" "}
                {/* Empty header for actions */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500">
              {tracks.map((track) => (
                <tr key={track.id} className="transition hover:bg-white/5">
                  {/* Thumbnail + Title */}
                  <td className="py-2 sm:py-4" colSpan={2}>
                    {" "}
                    {/* Reduced vertical padding */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      {" "}
                      {/* Reduced gap */}
                      <img
                        src={track.thumbnail}
                        alt="Album"
                        className="h-8 w-8 rounded-sm object-cover sm:h-14 sm:w-14 md:h-20 md:w-20" // Made image smaller for mobile
                      />
                      <span className="text-[10px] text-neutral-300 sm:text-sm md:text-base">
                        {" "}
                        {/* Made title text smaller for mobile */}
                        {track.title}
                      </span>
                    </div>
                  </td>
                  {/* Time */}
                  <td className="px-4 py-2 text-xs text-neutral-400 sm:py-4 sm:text-sm md:px-2">
                    {track.time}
                  </td>{" "}
                  {/* Reduced padding, adjusted text size */}
                  {/* BPM */}
                  <td className="py-2 text-xs text-neutral-400 sm:py-4 sm:text-sm md:px-4">
                    {track.bpm}
                  </td>{" "}
                  {/* Reduced padding, adjusted text size */}
                  {/* Tags */}
                  <td className="py-2 sm:px-4 sm:py-4">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {" "}
                      {/* Reduced gap for tags */}
                      {track.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-block rounded-full bg-black/20 py-0.5 text-xs text-gray-400 capitalize sm:px-3 sm:py-1" // Smaller tags
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  {/* Actions */}
                  <td className="py-2 sm:py-4">
                    <div className="flex justify-end gap-1 md:gap-2">
                      {" "}
                      {/* Reduced gap for buttons */}
                      <button className="rounded-md bg-zinc-800 p-1 transition hover:bg-zinc-700 sm:p-2">
                        {" "}
                        {/* Smaller padding for buttons */}
                        <FaShareAlt className="text-xs text-white sm:text-sm md:text-base" />{" "}
                        {/* Smaller icon */}
                      </button>
                      <button className="flex items-center gap-1 rounded-md bg-gradient-to-b from-orange-200 to-yellow-500 px-2 py-1 text-xs font-semibold text-black md:px-3 md:py-2">
                        {" "}
                        {/* Smaller button padding and text */}
                        <HiOutlineShoppingBag className="text-xs sm:text-sm" />{" "}
                        {/* Smaller icon */}
                        <span>$30.00</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TracksLIstSect;
