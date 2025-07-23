import { useState } from "react";
import { LuSearch } from "react-icons/lu";
// Import icons for up/down arrows
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

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
      <div className="flex justify-center text-4xl font-semibold text-white capitalize">
        Tracks
      </div>

      <div className="mx-auto max-w-[820px] rounded-md bg-white/5 p-6">
        {/* Dropdown Filters */}

        <div className="mx-auto mb-6 flex justify-center space-x-6">
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
              <option className="px-1 text-[16px] font-[400]">All Moods</option>
              <option className="px-1 text-[16px] font-[400]">Happy</option>
              <option className="px-1 text-[16px] font-[400]">Sad</option>
              <option className="px-1 text-[16px] font-[400]">Energetic</option>
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
          <div className="inline-flex w-[780px] items-center justify-between rounded-lg bg-white px-4 py-3">
            <div className="font-['Poppins'] text-base font-normal text-black capitalize">
              What type of track are you looking for?
            </div>
            <div className="flex h-9 w-9 items-center justify-center gap-2.5 rounded-full bg-neutral-200 p-2.5">
              <div data-size="48" className="">
                <LuSearch className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TracksPage;
