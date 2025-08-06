import React, { useState, useEffect, useRef } from "react";
import axios from "../../../../utils/axiosInstance";
import {
  FaPlay,
  FaPause,
  FaHeart,
  FaDownload,
  FaRegHeart,
} from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// This is the main component for the Order History page
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // --- Audio Player State ---
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  // --- Liked Songs State ---
  // In a real app, you might fetch initial liked status from a user profile API
  const [likedSongs, setLikedSongs] = useState(new Set());

  // Fetch order history from the backend when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace with your actual API endpoint if different
        const response = await axios.get("/payments/orders/my-orders");
        if (response.data && response.data.success) {
          setOrders(response.data.orders);
        } else {
          throw new Error(response.data.message || "Failed to fetch orders.");
        }
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch order history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Effect to handle audio playback
  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying && currentSong) {
      if (audio.src !== currentSong.audioFile) {
        audio.src = currentSong.audioFile;
      }
      audio.play().catch((e) => console.error("Audio play error:", e));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  // --- Handlers for extra features ---

  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id && isPlaying) {
      setIsPlaying(false); // Pause current song
    } else {
      setCurrentSong(song); // Set new song
      setIsPlaying(true); // Play new song
      // Notify backend about the play event
      axios
        .post(`/songs/${song.id}/play`)
        .catch((e) => console.error("Failed to log play count:", e));
    }
  };

  const handleToggleLike = async (songId) => {
    const isLiked = likedSongs.has(songId);
    const newLikedSongs = new Set(likedSongs);

    try {
      if (isLiked) {
        // Unlike the song
        await axios.delete(`/songs/${songId}/like`);
        newLikedSongs.delete(songId);
      } else {
        // Like the song
        await axios.post(`/songs/${songId}/like`);
        newLikedSongs.add(songId);
      }
      setLikedSongs(newLikedSongs);
    } catch (err) {
      console.error("Failed to update like status:", err);
      alert("Could not update like status. Please try again.");
    }
  };

  // --- Render Logic ---

  if (loading) {
    return (
      <div className="p-10 text-center text-white">
        Loading your order history...
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">Error: {error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="p-10 text-center text-white">
        You have not placed any orders yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 p-4 text-white sm:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Order history</h1>
        <p className="mb-8 text-gray-400">{orders.length} order(s)</p>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg bg-neutral-800 p-6 shadow-lg"
            >
              {/* --- Main Order Info (Your "Track Order" replacement) --- */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-400">Order Placed</p>
                  <p className="font-semibold">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Amount</p>
                  <p className="font-semibold">${order.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Transaction ID</p>
                  <p className="rounded bg-neutral-700 p-1 font-mono text-xs">
                    {order.transactionId}
                  </p>
                </div>
              </div>

              {/* --- Purchased Items List --- */}
              <div className="border-t border-neutral-700 pt-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="mb-2 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.song.coverImage}
                        alt={item.song.title}
                        className="mr-4 h-12 w-12 rounded-md"
                      />
                      <div>
                        <p className="font-semibold">{item.song.title}</p>
                        <p className="text-sm text-gray-400">
                          {item.licenseDetails.name}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">
                      License ID:{" "}
                      <span className="font-mono text-xs">
                        {item.licenseId}
                      </span>
                    </p>
                  </div>
                ))}
              </div>

              {/* --- View Details Button --- */}
              <div className="mt-4 text-center">
                <button
                  onClick={() =>
                    setExpandedOrderId(
                      expandedOrderId === order.id ? null : order.id,
                    )
                  }
                  className="flex w-full items-center justify-center p-2 font-semibold text-yellow-400 hover:text-yellow-300"
                >
                  {expandedOrderId === order.id
                    ? "Hide Details"
                    : "View Order Details"}
                  {expandedOrderId === order.id ? (
                    <IoIosArrowUp className="ml-2" />
                  ) : (
                    <IoIosArrowDown className="ml-2" />
                  )}
                </button>
              </div>

              {/* --- Expanded Details View (Your "Order Details") --- */}
              {expandedOrderId === order.id && (
                <div className="mt-6 space-y-4 border-t border-neutral-700 pt-6">
                  <h3 className="text-lg font-semibold">Your Downloads</h3>
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg bg-neutral-700 p-3"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.song.coverImage}
                          alt={item.song.title}
                          className="mr-4 h-16 w-16 rounded-md"
                        />
                        <div>
                          <p className="text-lg font-bold">{item.song.title}</p>
                          <p className="text-sm text-gray-300">
                            Premium License
                          </p>
                        </div>
                      </div>

                      {/* --- Action Buttons --- */}
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleToggleLike(item.song.id)}
                          className="text-2xl transition-transform hover:scale-110"
                        >
                          {likedSongs.has(item.song.id) ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FaRegHeart />
                          )}
                        </button>
                        <a
                          href={item.song.audioFile}
                          download={`${item.song.title}.mp3`}
                          className="text-2xl transition-transform hover:scale-110"
                        >
                          <FaDownload />
                        </a>
                        <button
                          onClick={() => handlePlayPause(item.song)}
                          className="rounded-full bg-yellow-500 p-3 text-2xl text-black transition-colors hover:bg-yellow-400"
                        >
                          {isPlaying && currentSong?.id === item.song.id ? (
                            <FaPause />
                          ) : (
                            <FaPlay />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
