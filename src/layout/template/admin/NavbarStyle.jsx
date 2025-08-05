import { FaSearch } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useSongStore } from "../../../pages/private/upload/components/songStore";

const NavbarStyle = () => {
  const { searchQuery, setSearchQuery } = useSongStore();

  return (
    <nav className="flex flex-shrink-0 items-center justify-between border-b border-gray-700 px-10 py-4">
      {/* Left Navigation */}
      <div className="flex items-center gap-2">
        <button className="rounded-lg bg-neutral-800 p-4 text-white hover:bg-neutral-700">
          <FaChevronLeft />
        </button>
        <span className="text-neutral-400">Home</span>
        <FaChevronRight className="text-neutral-500" />
      </div>
      {/* Search Input */}
      <div className="flex flex-1 justify-center px-4">
        <div className="relative w-full max-w-lg">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400">
            <FaSearch />
          </span>
          <input
            type="search"
            placeholder="Search songs by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-neutral-800 py-4 pr-4 pl-10 text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="w-[88px]"></div>
    </nav>
  );
};

export default NavbarStyle;
