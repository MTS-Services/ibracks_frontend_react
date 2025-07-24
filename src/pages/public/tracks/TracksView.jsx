import { useState } from "react";
import { LuSearch } from "react-icons/lu";
// Import icons for up/down arrows
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Availabestems from "../../../components/ProductsPage/Availabestems";
import { FaShareAlt, FaThumbsUp } from "react-icons/fa";
import TracksPageHeroSection from "../../../components/TracksPageHeroSection/TracksPageHeroSection";

const tracks = [
  {
    id: 1,
    title: "NOLSTAGIA",
    time: "02:59",
    bpm: "103",
    tags: ["Afrobeat", "Inspiring"],
    thumbnail: "/products/cart9.png",
  },
  {
    id: 2,
    title: "NOLSTAGIA",
    time: "02:59",
    bpm: "103",
    tags: ["Afrobeat", "Inspiring"],
    thumbnail: "/products/cart9.png",
  },
  {
    id: 2,
    title: "NOLSTAGIA",
    time: "02:59",
    bpm: "103",
    tags: ["Afrobeat", "Inspiring"],
    thumbnail: "/products/cart9.png",
  },
  {
    id: 2,
    title: "NOLSTAGIA",
    time: "02:59",
    bpm: "103",
    tags: ["Afrobeat", "Inspiring"],
    thumbnail: "/products/cart9.png",
  },
  {
    id: 2,
    title: "NOLSTAGIA",
    time: "02:59",
    bpm: "103",
    tags: ["Afrobeat", "Inspiring"],
    thumbnail: "/products/cart9.png",
  },
  {
    id: 2,
    title: "NOLSTAGIA",
    time: "02:59",
    bpm: "103",
    tags: ["Afrobeat", "Inspiring"],
    thumbnail: "/products/cart9.png",
  },
  {
    id: 2,
    title: "NOLSTAGIA",
    time: "02:59",
    bpm: "103",
    tags: ["Afrobeat", "Inspiring"],
    thumbnail: "/products/cart9.png",
  },
  {
    id: 2,
    title: "NOLSTAGIA",
    time: "02:59",
    bpm: "103",
    tags: ["Afrobeat", "Inspiring"],
    thumbnail: "/products/cart9.png",
  },
  // Repeat or map your tracks as needed...
];

const TracksPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // State for dropdown values
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [selectedBpm, setSelectedBpm] = useState("All Bpm");
  const [selectedMoods, setSelectedMoods] = useState("All Moods");
  const [selectedGenres, setSelectedGenres] = useState("All Genres");

  // State to manage dropdown open/close for custom arrow
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isBpmDropdownOpen, setIsBpmDropdownOpen] = useState(false);
  const [isMoodsDropdownOpen, setIsMoodsDropdownOpen] = useState(false);
  const [isGenresDropdownOpen, setIsGenresDropdownOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    console.log("Searching for: ", searchTerm);
  };

  const handleDropdownChange = (e, setSelectedValue, setDropdownOpenState) => {
    setSelectedValue(e.target.value);
    // When an option is selected, you might want to close the "custom" dropdown
    // For a native select, this is automatic, but for a custom one, you'd manage it.
    // setDropdownOpenState(false); // Uncomment if implementing a full custom dropdown
  };

  // Function to toggle dropdown state
  const toggleDropdown = (setDropdownOpenState) => {
    setDropdownOpenState((prevState) => !prevState);
  };

  return (
    <div
      className="min-h-screen bg-neutral-900 px-4 py-10 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
      }}
    >
      <div className="">
        <TracksPageHeroSection></TracksPageHeroSection>
      </div>
      <div className="py-10">
        <div className="flex justify-center pb-6 text-4xl font-[600] text-white capitalize">
          Tracks
        </div>
        <div className="mx-auto max-w-[900px] rounded-md bg-white/5 p-6">
          {/* Dropdown Filters */}

          <div className="mx-auto mb-6 flex justify-center space-x-10">
            {/* Custom Category Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) =>
                  handleDropdownChange(
                    e,
                    setSelectedCategory,
                    setIsCategoryDropdownOpen,
                  )
                }
                // Hide the default arrow (browser specific, might need more robust CSS)
                className="appearance-none rounded-md bg-white px-2 py-2 pr-8 text-black"
                onClick={() => toggleDropdown(setIsCategoryDropdownOpen)} // To visualize the arrow change with click
              >
                <option className="px-1 text-[16px] font-[400]">
                  All Category
                </option>
                <option className="px-1 text-[16px] font-[400]">
                  Category 1
                </option>
                <option className="px-1 text-[16px] font-[400]">
                  Category 2
                </option>
                <option className="px-1 text-[16px] font-[400]">
                  Category 3
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                {isCategoryDropdownOpen ? (
                  <FiChevronUp className="text-xl text-black" />
                ) : (
                  <FiChevronDown className="text-xl text-black" />
                )}
              </div>
            </div>

            {/* Custom BPM Dropdown */}
            <div className="relative">
              <select
                value={selectedBpm}
                onChange={(e) =>
                  handleDropdownChange(e, setSelectedBpm, setIsBpmDropdownOpen)
                }
                className="appearance-none rounded-md bg-white px-2 py-2 pr-8 pl-2 text-black"
                onClick={() => toggleDropdown(setIsBpmDropdownOpen)}
              >
                <option className="px-1 text-[16px] font-[400]">All Bpm</option>
                <option className="px-1 text-[16px] font-[400]">120 BPM</option>
                <option className="px-1 text-[16px] font-[400]">130 BPM</option>
                <option className="px-1 text-[16px] font-[400]">140 BPM</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                {isBpmDropdownOpen ? (
                  <FiChevronUp className="text-xl text-black" />
                ) : (
                  <FiChevronDown className="text-xl text-black" />
                )}
              </div>
            </div>

            {/* Custom Moods Dropdown */}
            <div className="relative">
              <select
                value={selectedMoods}
                onChange={(e) =>
                  handleDropdownChange(
                    e,
                    setSelectedMoods,
                    setIsMoodsDropdownOpen,
                  )
                }
                className="appearance-none rounded-md bg-white px-2 py-2 pr-8 pl-2 text-black"
                onClick={() => toggleDropdown(setIsMoodsDropdownOpen)}
              >
                <option className="px-1 text-[16px] font-[400]">
                  All Moods
                </option>
                <option className="px-1 text-[16px] font-[400]">Happy</option>
                <option className="px-1 text-[16px] font-[400]">Sad</option>
                <option className="px-1 text-[16px] font-[400]">
                  Energetic
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                {isMoodsDropdownOpen ? (
                  <FiChevronUp className="text-xl text-black" />
                ) : (
                  <FiChevronDown className="text-xl text-black" />
                )}
              </div>
            </div>

            {/* Custom Genres Dropdown */}
            <div className="relative">
              <select
                value={selectedGenres}
                onChange={(e) =>
                  handleDropdownChange(
                    e,
                    setSelectedGenres,
                    setIsGenresDropdownOpen,
                  )
                }
                className="appearance-none rounded-md bg-white px-4 py-2 pr-8 pl-2 text-black"
                onClick={() => toggleDropdown(setIsGenresDropdownOpen)}
              >
                <option className="px-1 text-[16px] font-[400]">
                  All Genres
                </option>
                <option className="px-1 text-[16px] font-[400]">Pop</option>
                <option className="px-1 text-[16px] font-[400]">Rock</option>
                <option className="px-1 text-[16px] font-[400]">Jazz</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                {isGenresDropdownOpen ? (
                  <FiChevronUp className="pl-1 text-xl text-black" />
                ) : (
                  <FiChevronDown className="text-xl text-black" />
                )}
              </div>
            </div>

            {/* Custom Genres Default Dropdown */}
            <div className="relative">
              <select
                value={selectedGenres}
                onChange={(e) =>
                  handleDropdownChange(
                    e,
                    setSelectedGenres,
                    setIsGenresDropdownOpen,
                  )
                }
                className="appearance-none rounded-md bg-white px-4 py-2 pr-8 pl-2 text-black"
                onClick={() => toggleDropdown(setIsGenresDropdownOpen)}
              >
                <option className="px-1 text-[16px] font-[400]">Default</option>
                <option className="px-1 text-[16px] font-[400]">Default</option>
                <option className="px-1 text-[16px] font-[400]">Default</option>
                <option className="px-1 text-[16px] font-[400]">Default</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                {isGenresDropdownOpen ? (
                  <FiChevronUp className="pl-1 text-xl text-black" />
                ) : (
                  <FiChevronDown className="text-xl text-black" />
                )}
              </div>
            </div>

            {/* Custom Genres Default Dropdown */}
            <div className="relative">
              <select
                value={selectedGenres}
                onChange={(e) =>
                  handleDropdownChange(
                    e,
                    setSelectedGenres,
                    setIsGenresDropdownOpen,
                  )
                }
                className="appearance-none rounded-md bg-white px-4 py-2 pr-8 pl-2 text-black"
                onClick={() => toggleDropdown(setIsGenresDropdownOpen)}
              >
                <option className="px-1 text-[16px] font-[400]">
                  {" "}
                  Default List
                </option>
                <option className="px-1 text-[16px] font-[400]">
                  {" "}
                  Default List
                </option>
                <option className="px-1 text-[16px] font-[400]">
                  {" "}
                  Default List
                </option>
                <option className="px-1 text-[16px] font-[400]">
                  {" "}
                  Default List
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                {isGenresDropdownOpen ? (
                  <FiChevronUp className="pl-1 text-xl text-black" />
                ) : (
                  <FiChevronDown className="text-xl text-black" />
                )}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mx-auto flex items-center justify-center">
            <div className="inline-flex w-[880px] items-center justify-between rounded-lg bg-white px-4 py-2">
              {/* Input box */}
              <input
                type="text"
                placeholder="What type of track are you looking for?"
                className="w-full bg-transparent font-['Poppins'] text-base font-normal text-black outline-none placeholder:text-black/60"
              />

              {/* Search icon */}
              <div className="ml-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-neutral-200 p-2.5">
                <LuSearch className="text-2xl text-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* tabale part   */}

      <section className="">
        <div className="mx-auto w-full max-w-7xl py-16">
          {/* Table Header */}
          <div className="mb-6 grid grid-cols-6 items-center gap-6 px-4 text-xl font-medium text-orange-200">
            <div className="col-span-2">
              <p className="text-center text-xl font-medium text-orange-200">
                Title
              </p>
            </div>
            <div>Time</div>
            <div>BPM</div>
            <div>Tags</div>
          </div>

          {/* Track List */}
          <div className="space-y-4">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="grid grid-cols-6 items-center gap-6 border-b border-gray-600 p-4"
              >
                {/* Cover + Title */}
                <div className="col-span-2 flex items-center gap-4">
                  <img
                    src={track.thumbnail}
                    alt="Album"
                    className="h-20 w-20 rounded-sm"
                  />
                  <p className="text-lg text-neutral-500">{track.title}</p>
                </div>

                {/* Time */}
                <p className="text-lg text-neutral-400">{track.time}</p>
                {/* BPM */}
                <p className="text-lg text-neutral-400">{track.bpm}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {track.tags.map((tag, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center justify-center gap-2.5 rounded-[50px] bg-black/20 px-3 py-2.5"
                    >
                      <p className="justify-center text-base font-normal text-gray-400 capitalize">
                        {tag}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <button className="rounded-lg bg-zinc-900 px-4">
                    <FaShareAlt className="text-white" />
                  </button>

                  <button className="flex items-center gap-2 rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-4 py-2 font-semibold text-black">
                    <span>$30.00</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TracksPage;
