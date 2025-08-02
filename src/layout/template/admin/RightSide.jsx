import React, { useEffect, useRef, useState } from "react";
import { FaChevronRight, FaCrown } from "react-icons/fa6";
import { PiUploadSimpleBold } from "react-icons/pi";
import axios from "../../../utils/axiosInstance";
import { Link } from "react-router-dom";

const RightSide = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [recentUploadsData, setRecentUploadsData] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/songs/new-releases?limit=7");
        setRecentUploadsData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <aside className="w-70 flex-shrink-0 flex-col space-y-6 p-4 text-white lg:flex">
      {/* User profile dropdown section */}
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex cursor-pointer items-center justify-between rounded-lg hover:bg-white/5"
        >
          <div className="flex items-center gap-3">
            <img
              src="https://placehold.co/48x48/ffffff/000?text=JR"
              alt="User Avatar"
              className="h-12 w-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-white">James Rodriguez</p>
              <div className="flex items-center gap-1 text-xs text-neutral-400">
                <span>Admin</span> <FaCrown className="text-amber-400" />
              </div>
            </div>
          </div>
          <FaChevronRight
            className={`transition-transform ${isDropdownOpen ? "rotate-90" : ""}`}
          />
        </div>

        {isDropdownOpen && (
          <div className="absolute top-full right-0 z-20 mt-2 w-48 rounded-lg bg-neutral-700 shadow-lg">
            <button
              onClick={() => alert("Logging out...")}
              className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-neutral-600"
            >
              Log Out
            </button>
          </div>
        )}
      </div>

      {/* Upload Song section */}
      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-bold text-white">Upload Song</h2>
        <Link
          to="/admin/upload"
          className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-xl bg-gradient-to-b from-orange-200 to-yellow-500 text-neutral-700 hover:opacity-90"
        >
          <PiUploadSimpleBold className="text-5xl" />
          <h4 className="font-semibold">Upload Here</h4>
        </Link>
      </div>

      {/* Recent Uploads section */}
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Recent Uploads</h2>
          <a href="#" className="text-sm text-green-500 hover:underline">
            See All
          </a>
        </div>
        <div className="space-y-4">
          {recentUploadsData.map((song) => (
            <div
              key={song.id}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3"
            >
              <img
                src={song.coverImage}
                alt={song.title}
                className="h-11 w-11 rounded-lg"
              />

              <div>
                <p className="text-sm font-bold text-white">{song.title}</p>
                {song.musicTag && (
                  <p className="text-xs text-neutral-400 capitalize">
                    {song.musicTag}
                  </p>
                )}
              </div>
              <p className="text-xs text-neutral-400">{song.publishedAgo}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSide;
