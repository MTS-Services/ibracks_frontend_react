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

      <div class="py-4 lg:py-10">
        <div class="flex justify-center pb-6 text-2xl font-[600] text-white capitalize md:text-3xl lg:text-4xl">
          Tracks
        </div>
        <div class="mx-auto max-w-[950px] rounded-md bg-white/5 p-4 md:p-6">
          <div class="mx-auto mb-6 flex flex-wrap justify-center gap-4 md:gap-10">
            <div class="relative">
              <select
                value={selectedCategory}
                onChange={(e) =>
                  handleDropdownChange(
                    e,
                    setSelectedCategory,
                    setIsCategoryDropdownOpen,
                  )
                }
                class="appearance-none rounded-md bg-white px-2 py-1 pr-6 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsCategoryDropdownOpen)}
              >
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  All Category
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Category 1
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Category 2
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Category 3
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-2">
                {isCategoryDropdownOpen ? (
                  <FiChevronUp class="text-base text-black md:text-xl" />
                ) : (
                  <FiChevronDown class="text-base text-black md:text-xl" />
                )}
              </div>
            </div>

            <div class="relative">
              <select
                value={selectedBpm}
                onChange={(e) =>
                  handleDropdownChange(e, setSelectedBpm, setIsBpmDropdownOpen)
                }
                class="appearance-none rounded-md bg-white px-2 py-1 pr-6 pl-2 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsBpmDropdownOpen)}
              >
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  All Bpm
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  120 BPM
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  130 BPM
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  140 BPM
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-2">
                {isBpmDropdownOpen ? (
                  <FiChevronUp class="text-base text-black md:text-xl" />
                ) : (
                  <FiChevronDown class="text-base text-black md:text-xl" />
                )}
              </div>
            </div>

            <div class="relative">
              <select
                value={selectedMoods}
                onChange={(e) =>
                  handleDropdownChange(
                    e,
                    setSelectedMoods,
                    setIsMoodsDropdownOpen,
                  )
                }
                class="appearance-none rounded-md bg-white px-2 py-1 pr-6 pl-2 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsMoodsDropdownOpen)}
              >
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  All Moods
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Happy
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Sad
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Energetic
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-2">
                {isMoodsDropdownOpen ? (
                  <FiChevronUp class="text-base text-black md:text-xl" />
                ) : (
                  <FiChevronDown class="text-base text-black md:text-xl" />
                )}
              </div>
            </div>

            <div class="relative">
              <select
                value={selectedGenres}
                onChange={(e) =>
                  handleDropdownChange(
                    e,
                    setSelectedGenres,
                    setIsGenresDropdownOpen,
                  )
                }
                class="appearance-none rounded-md bg-white px-2 py-1 pr-6 pl-2 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsGenresDropdownOpen)}
              >
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  All Genres
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Pop
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Rock
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Jazz
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-3">
                {isGenresDropdownOpen ? (
                  <FiChevronUp class="pl-1 text-base text-black md:text-xl" />
                ) : (
                  <FiChevronDown class="text-base text-black md:text-xl" />
                )}
              </div>
            </div>

            <div class="relative">
              <select
                value={selectedGenres}
                onChange={(e) =>
                  handleDropdownChange(
                    e,
                    setSelectedGenres,
                    setIsGenresDropdownOpen,
                  )
                }
                class="appearance-none rounded-md bg-white px-2 py-1 pr-6 pl-2 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsGenresDropdownOpen)}
              >
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Default
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Default
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Default
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Default
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-3">
                {isGenresDropdownOpen ? (
                  <FiChevronUp class="pl-1 text-base text-black md:text-xl" />
                ) : (
                  <FiChevronDown class="text-base text-black md:text-xl" />
                )}
              </div>
            </div>

            <div class="relative">
              <select
                value={selectedGenres}
                onChange={(e) =>
                  handleDropdownChange(
                    e,
                    setSelectedGenres,
                    setIsGenresDropdownOpen,
                  )
                }
                class="appearance-none rounded-md bg-white px-2 py-1 pr-6 pl-2 text-sm text-black md:py-2 md:pr-8 md:text-[16px]"
                onClick={() => toggleDropdown(setIsGenresDropdownOpen)}
              >
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Default List
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Default List
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Default List
                </option>
                <option class="px-1 text-sm font-[400] md:text-[16px]">
                  Default List
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-3">
                {isGenresDropdownOpen ? (
                  <FiChevronUp class="pl-1 text-base text-black md:text-xl" />
                ) : (
                  <FiChevronDown class="text-base text-black md:text-xl" />
                )}
              </div>
            </div>
          </div>

          <div class="mx-auto flex items-center justify-center px-2">
            <div class="inline-flex w-full max-w-[880px] items-center justify-between rounded-lg bg-white px-3 py-1 md:px-4 md:py-2">
              <input
                type="text"
                placeholder="What type of track are you looking for?"
                class="w-full bg-transparent font-['Poppins'] text-sm font-normal text-black outline-none placeholder:text-black/60 md:text-base"
              />

              <div class="ml-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-neutral-200 p-1.5 md:ml-3 md:h-9 md:w-9 md:p-2.5">
                <LuSearch class="text-lg text-black md:text-2xl" />
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
