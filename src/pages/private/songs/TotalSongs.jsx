import React, { useEffect, useState } from "react";
import { IoPlay, IoPause, IoHeadsetSharp } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { PiDotsThreeOutline } from "react-icons/pi";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from "../../../utils/axiosInstance";
import { useSongStore } from "../upload/components/songStore";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const TotalSongs = () => {
  const {
    songs,
    setSongs,
    currentSongIndex,
    isPlaying,
    playSong,
    searchQuery,
  } = useSongStore();

  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  // For delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/songs/published?limit=10000");
        setSongs(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (songs.length === 0) {
      fetchData();
    }
  }, [setSongs, songs.length]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDropdownToggle = (songId, event) => {
    event.stopPropagation();
    setOpenDropdown(openDropdown === songId ? null : songId);
  };

  const handleEditClick = (song, event) => {
    event.stopPropagation();
    setOpenDropdown(null);
    navigate(`/admin/edit-song/${song.id}`);
  };

  const handleDeleteClick = (song, event) => {
    event.stopPropagation();
    setOpenDropdown(null);
    setSongToDelete(song);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteSong = async () => {
    if (!songToDelete) return;

    try {
      await axios.delete(`/songs/${songToDelete.id}`);
      setSongs(songs.filter((s) => s.id !== songToDelete.id));
      toast.success(`"${songToDelete.title}" deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete song");
      console.error(error);
    } finally {
      setIsDeleteModalOpen(false);
      setSongToDelete(null);
    }
  };

  return (
    <section className="h-full w-full">
      <h1 className="px-10 py-4 text-xl font-bold text-white">Total Songs</h1>

      <div className="px-6 pb-32">
        {filteredSongs.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-lg text-neutral-400">No songs found</p>
          </div>
        ) : (
          filteredSongs.map((song, index) => (
            <div
              key={song.id || `song-${index}`}
              onClick={() => playSong(index)}
              className="group grid cursor-pointer grid-cols-[30px_minmax(200px,_3fr)_2fr_2fr_auto] items-center gap-4 rounded-lg p-2 hover:bg-white/10"
            >
              <div className="relative flex h-full items-center justify-center text-center text-neutral-200">
                {currentSongIndex === index && isPlaying ? (
                  <IoPause className="text-xl text-white" />
                ) : (
                  <>
                    <IoPlay className="absolute inset-0 m-auto text-xl text-white opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="transition-opacity group-hover:opacity-0">
                      {index + 1}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={
                    song.coverImage ||
                    "https://placehold.co/56x56/222/fff?text=No+Img"
                  }
                  alt={song.title}
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <p className="truncate font-bold text-white">{song.title}</p>
              </div>

              <div className="flex items-center gap-3 text-neutral-200">
                <IoHeadsetSharp className="text-xl" />
                <span>{song.playCount || 0}</span>
              </div>

              <div className="flex items-center gap-2 text-neutral-200">
                <IoMdTime className="rounded-full text-xl" />
                <span>{song.duration || "00:00"}</span>
              </div>

              <div className="flex items-center justify-end gap-6 text-neutral-200">
                <div className="flex items-center gap-2">
                  <p className="text-white">
                    <FaRegHeart />
                  </p>
                  <span className="w-20 text-sm">
                    {song.likeCount || 0} Likes
                  </span>
                </div>

                {/* Dropdown Menu */}
                <div className="dropdown-container relative">
                  <button
                    className="hover:text-white focus:outline-none"
                    onClick={(e) => handleDropdownToggle(song.id, e)}
                    type="button"
                  >
                    <PiDotsThreeOutline className="text-2xl" />
                  </button>

                  {openDropdown === song.id && (
                    <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-lg border border-gray-700 bg-gray-800 shadow-lg">
                      <div className="py-2">
                        <button
                          onClick={(e) => handleEditClick(song, e)}
                          className="flex w-full items-center gap-3 px-4 py-2 text-left text-white transition-colors hover:bg-gray-700 focus:outline-none"
                          type="button"
                        >
                          <MdEdit className="text-lg" />
                          <span>Edit Song</span>
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(song, e)}
                          className="flex w-full items-center gap-3 px-4 py-2 text-left text-red-400 transition-colors hover:bg-gray-700 focus:outline-none"
                          type="button"
                        >
                          <MdDelete className="text-lg" />
                          <span>Delete Song</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-96 rounded-lg bg-gray-900 p-6 text-white shadow-lg">
            <h2 className="mb-2 items-center text-lg font-bold text-white">
              Delete Song
            </h2>
            <p className="text-gray-300">
              Are you sure you want to delete
              <span className="font-semibold">"{songToDelete?.title}"</span>?
            </p>
            <p className="mb-4 text-sm text-yellow-500">
              This action cannot be undone.
            </p>

            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded bg-gray-600 px-4 py-2 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteSong}
                className="rounded bg-red-600 px-4 py-2 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TotalSongs;
