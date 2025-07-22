// AdminPannel.js

import React, { useState, useEffect, useRef } from "react";

// --- ICONS ---
import {
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoPlay,
  IoPause,
  IoVolumeMedium,
  IoShuffle,
  IoRepeat,
  IoNotifications,
  IoHeadsetSharp,
} from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import {
  FaHeart,
  FaRegHeart,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaCrown,
} from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";
import { MdFileUpload } from "react-icons/md";
import { SlPlaylist } from "react-icons/sl";
import { BsPersonBoundingBox } from "react-icons/bs";
import { TfiBarChart } from "react-icons/tfi";
import { IoMdTime } from "react-icons/io";
import { PiDotsThreeOutline } from "react-icons/pi";

// --- MOCK DATA ---
const navLinksData = [
  { name: "Total Songs Uploaded", icon: <SlPlaylist /> },
  { name: "Total Sales (Amount)", icon: <TfiBarChart /> },
  { name: "User Admin", icon: <BsPersonBoundingBox /> },
];
const userRolesData = [
  { role: "Administrator", email: "roman@gmai.com", status: "active" },
  { role: "Editor", email: "jhon@gmai.com", status: "inactive" },
  { role: "Viewer", email: "rock@gmai.com", status: "inactive" },
];
const songsData = [
  {
    id: 1,
    title: "Shiver",
    artist: "Ed Sheeran",
    plays: "1,952,015,881",
    duration: "3:27",
    isLiked: false,
    likes: "8.9K",
    albumArt: "https://placehold.co/54x54/3498DB/FFFFFF?text=P",
  },
  {
    id: 2,
    title: "Perfect",
    artist: "Ed Sheeran",
    plays: "2,301,481,215",
    duration: "4:23",
    isLiked: true,
    likes: "12.1K",
    albumArt: "https://placehold.co/54x54/3498DB/FFFFFF?text=P",
  },
  {
    id: 3,
    title: "Shape of You",
    artist: "Ed Sheeran",
    plays: "3,562,012,817",
    duration: "3:53",
    isLiked: false,
    likes: "15.3K",
    albumArt: "https://placehold.co/54x54/2ECC71/FFFFFF?text=SOY",
  },
  {
    id: 4,
    title: "Roman Picisan",
    artist: "Hanin Dhiya",
    plays: "120,481,215",
    duration: "4:01",
    isLiked: false,
    likes: "4.2K",
    albumArt: "https://placehold.co/54x54/9B59B6/FFFFFF?text=RP",
  },
  {
    id: 5,
    title: "Tittle (Deluxe)",
    artist: "Meghan Trainor",
    plays: "890,115,312",
    duration: "2:54",
    isLiked: true,
    likes: "7.8K",
    albumArt: "https://placehold.co/54x54/E74C3C/FFFFFF?text=T",
  },
  {
    id: 6,
    title: "Bad Habits",
    artist: "Ed Sheeran",
    plays: "987,654,321",
    duration: "3:51",
    isLiked: false,
    likes: "9.1K",
    albumArt: "https://placehold.co/54x54/F1C40F/000000?text=BH",
  },
  {
    id: 7,
    title: "Blinding Lights",
    artist: "The Weeknd",
    plays: "2,800,000,000",
    duration: "3:20",
    isLiked: false,
    likes: "18.5K",
    albumArt: "https://placehold.co/54x54/E91E63/FFFFFF?text=BL",
  },
  {
    id: 8,
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    plays: "2,100,000,000",
    duration: "2:21",
    isLiked: true,
    likes: "14.2K",
    albumArt: "https://placehold.co/54x54/00BCD4/FFFFFF?text=S",
  },
  {
    id: 9,
    title: "Levitating",
    artist: "Dua Lipa",
    plays: "1,700,000,000",
    duration: "3:23",
    isLiked: false,
    likes: "11.9K",
    albumArt: "https://placehold.co/54x54/FF9800/FFFFFF?text=L",
  },
];

const recentUploadsData = [
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    time: "2min ago",
    albumArt: "https://placehold.co/44x44/3498DB/FFFFFF?text=P",
  },
  {
    title: "Roman Picisan",
    artist: "Hanin Dhiya",
    time: "8min ago",
    albumArt: "https://placehold.co/44x44/9B59B6/FFFFFF?text=RP",
  },
  {
    title: "Tittle (Deluxe)",
    artist: "Meghan Trainor",
    time: "2hr ago",
    albumArt: "https://placehold.co/44x44/E74C3C/FFFFFF?text=T",
  },
  {
    title: "Shiver",
    artist: "Ed Sheeran",
    time: "6hr ago",
    albumArt: "https://placehold.co/44x44/FFC107/000000?text=S",
  },
  {
    title: "Feel Something",
    artist: "Jaymes Young",
    time: "11hr ago",
    albumArt: "https://placehold.co/44x44/795548/FFFFFF?text=FS",
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    time: "14hr ago",
    albumArt: "https://placehold.co/44x44/2ECC71/FFFFFF?text=SOY",
  },
  {
    title: "Bad Habits",
    artist: "Ed Sheeran",
    time: "20hr ago",
    albumArt: "https://placehold.co/44x44/F1C40F/000000?text=BH",
  },
];

// AdminPannel.jsx

// =================================================================================
//  COMPONENT DEFINITIONS
// =================================================================================

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("Total Songs Uploaded");
  return (
    <aside className="hidden w-72 flex-shrink-0 flex-col space-y-4 bg-neutral-800 p-4 text-white md:flex">
      <div className="mt-4 flex h-32 w-32 items-start">
        <img src="/public/image/ibracks_logo.png" alt="Logo" />
      </div>
      <nav className="flex flex-col space-y-2">
        {navLinksData.map((link) => (
          <a
            key={link.name}
            href="#"
            onClick={() => setActiveLink(link.name)}
            // The parent link now only controls the text label's color
            className={`relative flex items-center gap-4 rounded-lg px-4 py-3 text-base font-normal capitalize transition-colors duration-200 ${activeLink === link.name ? "text-white" : "text-neutral-400 hover:text-white"}`}
          >
            {/* The active bar on the right remains the same */}
            {activeLink === link.name && (
              <div className="absolute top-0 -right-4 h-full w-1 rounded-tl-sm rounded-bl-sm bg-white"></div>
            )}

            {/* This span for the icon has its own conditional styling */}
            <span
              className={`rounded-lg p-2 transition-colors duration-200 ${
                activeLink === link.name
                  ? "bg-gradient-to-b from-orange-200 to-yellow-500 text-black" // Active State
                  : "bg-neutral-700 text-white" // Inactive State
              }`}
            >
              {link.icon}
            </span>

            {/* The whitespace-nowrap class is added here to keep the text on one line */}
            <span className="whitespace-nowrap">{link.name}</span>
          </a>
        ))}
      </nav>
      <div className="flex flex-col gap-4 rounded-lg bg-white/10 p-4">
        {userRolesData.map((user) => (
          <div key={user.role} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`h-2 w-2 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-amber-400"}`}
              ></div>
              <div>
                <p className="text-sm font-normal text-white capitalize">
                  {user.role}
                </p>
                <p className="text-xs text-green-500">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => alert(`Editing ${user.role}`)}
              className="text-amber-400 hover:text-amber-300"
            >
              <FiEdit />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

const TopBar = ({ searchTerm, setSearchTerm }) => (
  <header className="sticky top-0 z-10 flex flex-shrink-0 items-center justify-between gap-4 bg-black/30 p-2">
    <div className="ml-2 flex items-center gap-2">
      <button className="rounded-lg bg-neutral-800 p-4 text-white hover:bg-neutral-700">
        <FaChevronLeft />
      </button>
      <span className="text-neutral-400">Home</span>
      <FaChevronRight className="text-neutral-500" />
    </div>
    <div className="flex flex-1 justify-center px-4">
      <div className="relative w-full max-w-lg">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400">
          <FaSearch />
        </span>
        <input
          type="search"
          placeholder="Search music, artist, albums..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl bg-neutral-800 py-4 pr-4 pl-10 text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
        />
      </div>
    </div>
    <button className="mr-2 rounded-lg bg-neutral-800 p-4 text-xl text-white hover:bg-neutral-700">
      <IoNotifications />
    </button>
  </header>
);

const SongList = ({
  songs,
  currentSong,
  isPlaying,
  onPlayPause,
  onLikeToggle,
}) => (
  <div className="space-y-2 p-4">
    <h1 className="mb-4 text-2xl font-bold text-white">Total Songs</h1>
    {songs.map((song, index) => (
      <div
        key={song.id}
        className="group grid grid-cols-[30px_minmax(200px,_3fr)_2fr_2fr_auto] items-center gap-4 rounded-lg p-2 hover:bg-white/10"
      >
        <div className="relative flex h-full items-center justify-center text-center text-neutral-200">
          {currentSong?.id === song.id && isPlaying ? (
            <button
              onClick={() => onPlayPause(song)}
              className="text-xl text-white"
            >
              <IoPause />
            </button>
          ) : (
            <button
              onClick={() => onPlayPause(song)}
              className="absolute inset-0 flex items-center justify-center text-xl text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <IoPlay />
            </button>
          )}
          <span
            className={`transition-opacity ${currentSong?.id === song.id || "group-hover:opacity-0"}`}
          >
            {index + 1}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={song.albumArt}
            alt={song.title}
            className="h-14 w-14 rounded-lg"
          />
          <p className="truncate font-bold text-white">{song.title}</p>
        </div>
        <div className="flex items-center gap-3 text-neutral-200">
          <IoHeadsetSharp className="text-xl" />
          <span>{song.plays}</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-200">
          <IoMdTime className="rounded-full bg-neutral-700 text-xl" />
          <span>{song.duration}</span>
        </div>

        <div className="flex items-center justify-end gap-6 text-neutral-200">
          {/* Container for the heart button and likes text */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onLikeToggle(song.id)}
              className={`${song.isLiked ? "text-red-500" : "text-neutral-400"} text-xl hover:text-red-500`}
            >
              {song.isLiked ? <FaHeart /> : <FaRegHeart />}
            </button>
            <span className="w-20 text-sm">{song.likes} Likes</span>
          </div>

          {/* More options button */}
          <button className="hover:text-white">
            <PiDotsThreeOutline className="text-2xl" />
          </button>
        </div>
      </div>
    ))}
  </div>
);

const RightSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <aside className="hidden w-72 flex-shrink-0 flex-col space-y-8 bg-neutral-800 p-4 text-white lg:flex">
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-white/5"
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
                <span>Admin</span>
                <FaCrown className="text-amber-400" />
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
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Upload Song</h2>
        <div className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-xl bg-gradient-to-b from-orange-200 to-yellow-500 text-neutral-700 hover:opacity-90">
          <MdFileUpload className="text-5xl" />
          <p className="font-bold">Upload Here</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Recent Uploads</h2>
          <a href="#" className="text-sm text-green-500 hover:underline">
            See All
          </a>
        </div>
        <div className="space-y-3">
          {recentUploadsData.map((song) => (
            <div key={song.title} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={song.albumArt}
                  alt={song.title}
                  className="h-11 w-11 rounded-lg"
                />
                <div>
                  <p className="text-sm font-bold text-white">{song.title}</p>
                  <p className="text-xs text-neutral-400">{song.artist}</p>
                </div>
              </div>
              <p className="text-xs text-neutral-400">{song.time}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

const Player = ({ currentSong, isPlaying, onPlayPause, onLikeToggle }) => {
  if (!currentSong) return <div className="h-24 bg-neutral-900"></div>;
  return (
    <div className="grid h-full grid-cols-3 items-center bg-neutral-900/80 px-4 py-2 text-white backdrop-blur-md">
      <div className="flex items-center gap-4">
        <img
          src={currentSong.albumArt}
          alt={currentSong.title}
          className="h-16 w-16 rounded-lg"
        />
        <div>
          <p className="font-semibold text-white">{currentSong.title}</p>
          <p className="text-sm text-neutral-400">{currentSong.artist}</p>
        </div>
        <button
          onClick={() => onLikeToggle(currentSong.id)}
          className={`${currentSong.isLiked ? "text-red-500" : "text-neutral-400"} transition-colors hover:text-red-500`}
        >
          {currentSong.isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-6">
          <button className="text-neutral-400 hover:text-white">
            <IoShuffle className="text-xl" />
          </button>
          <button className="text-neutral-400 hover:text-white">
            <IoPlaySkipBack className="text-2xl" />
          </button>
          <button
            onClick={() => onPlayPause(currentSong)}
            className="rounded-full bg-white p-3 text-2xl text-black transition-transform hover:scale-105"
          >
            {isPlaying ? <IoPause /> : <IoPlay />}
          </button>
          <button className="text-neutral-400 hover:text-white">
            <IoPlaySkipForward className="text-2xl" />
          </button>
          <button className="text-neutral-400 hover:text-white">
            <IoRepeat className="text-xl" />
          </button>
        </div>
        <div className="mt-2 flex w-full items-center gap-2 text-xs">
          <span className="text-neutral-400">1:45</span>
          <input
            type="range"
            defaultValue="40"
            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-neutral-600 accent-white"
          />
          <span className="text-neutral-400">{currentSong.duration}</span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <IoVolumeMedium className="text-xl text-neutral-400" />
        <input
          type="range"
          defaultValue="80"
          className="h-1 w-24 cursor-pointer appearance-none rounded-lg bg-neutral-600 accent-white"
        />
        <RiPlayListFill className="text-xl text-neutral-400" />
      </div>
    </div>
  );
};

// =================================================================================
//  MAIN ADMIN PANNEL COMPONENT
// =================================================================================

const AdminPannel = () => {
  const [songs, setSongs] = useState(songsData);
  const [currentSong, setCurrentSong] = useState(songsData[2]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id) setIsPlaying(!isPlaying);
    else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };
  const handleLikeToggle = (songId) => {
    setSongs(
      songs.map((song) =>
        song.id === songId ? { ...song, isLiked: !song.isLiked } : song,
      ),
    );
  };
  useEffect(() => {
    if (currentSong) {
      const updatedCurrentSong = songs.find((s) => s.id === currentSong.id);
      setCurrentSong(updatedCurrentSong);
    }
  }, [songs, currentSong?.id]);

  return (
    <div className="mx-auto h-screen max-w-screen overflow-hidden bg-gradient-to-b from-black to-fuchsia-900 font-sans text-white">
      <div className="flex h-[calc(100%-6rem)]">
        {" "}
        {/* Main content area height = 100% - player height (h-24) */}
        <Sidebar />
        <main className="flex-1">
          <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SongList
            songs={filteredSongs}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onLikeToggle={handleLikeToggle}
          />
        </main>
        <RightSidebar />
      </div>
      <div className="h-24">
        {" "}
        {/* Player takes up the remaining 6rem (h-24 in Tailwind) */}
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onLikeToggle={handleLikeToggle}
        />
      </div>
    </div>
  );
};

export default AdminPannel;
