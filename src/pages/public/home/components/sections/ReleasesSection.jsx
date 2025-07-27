import { FiPlay } from "react-icons/fi";

const ReleasesSection = ({ songs }) => {
  return (
    <section className="bg-gradient-to-b from-[#000000] to-[#100418] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        {/* Title */}
        <div className="mb-8 flex items-center gap-4">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            New Releases
          </h2>
          <FiPlay className="h-6 w-6 rounded-full bg-white p-1 text-black" />
        </div>

        {/* Song Grid - Responsive */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {songs.map((song, index) => (
            <div key={index} className="flex flex-col">
              <div className="group relative">
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  className="aspect-square w-full rounded border border-gray-800 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Play button overlay (optional) */}
                <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center rounded bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <FiPlay className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="mt-3">
                <p className="truncate text-base font-semibold text-neutral-200">
                  {song.title}
                </p>
                <p className="truncate text-sm font-normal text-zinc-400">
                  {song.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReleasesSection;
