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

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const [likedSongs, setLikedSongs] = useState(new Set());

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/payments/orders/my-orders");
        if (response.data && response.data.success) {
          setOrders(response.data.orders);
        } else {
          throw new Error(
            response.data.message || "Could not retrieve orders.",
          );
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("You haven't placed any orders yet.");
          setOrders([]);
        } else {
          setError(err.message || "An unexpected error occurred.");
        }
        console.error("Failed to fetch order history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

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
    return () => {
      audio.pause();
    };
  }, [isPlaying, currentSong]);

  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      axios
        .post(`/songs/${song.id}/play`)
        .catch((e) => console.error("Failed to log play count:", e));
    }
  };

  const handleToggleLike = async (songId) => {
    const newLikedSongs = new Set(likedSongs);
    try {
      if (newLikedSongs.has(songId)) {
        await axios.delete(`/songs/${songId}/like`);
        newLikedSongs.delete(songId);
      } else {
        await axios.post(`/songs/${songId}/like`);
        newLikedSongs.add(songId);
      }
      setLikedSongs(newLikedSongs);
    } catch (err) {
      console.error("Failed to update like status:", err);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="p-10 text-center text-xl text-white">Loading...</div>
      );
    }
    if (error) {
      return (
        <div className="p-10 text-center text-xl text-yellow-400">{error}</div>
      );
    }
    if (orders.length === 0) {
      return (
        <div className="p-10 text-center text-xl text-white">
          You have no order history.
        </div>
      );
    }
    return (
      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="overflow-hidden rounded-xl bg-neutral-800 shadow-lg"
          >
            {/* --- Order Summary Header --- */}
            <div className="flex flex-col items-start justify-between gap-4 bg-neutral-700/50 p-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-400">ORDER PLACED</p>
                <p className="font-semibold text-white">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">TOTAL</p>
                <p className="font-semibold text-white">
                  ${order.amount.toFixed(2)}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">TRANSACTION ID</p>
                <p className="font-mono text-xs text-gray-300">
                  {order.transactionId}
                </p>
              </div>
            </div>

            {/* --- Purchased Items List --- */}
            <div className="p-4">
              <h3 className="mb-4 text-lg font-bold text-yellow-400">
                {order.items.length > 1
                  ? `${order.items.length} items purchased`
                  : "1 item purchased"}
              </h3>
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src={
                        item.song.coverImage ||
                        "https://placehold.co/100x100/000000/FFFFFF?text=No+Image"
                      }
                      alt={item.song.title}
                      className="mr-4 h-16 w-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-lg font-bold text-white">
                        {item.song.title}
                      </p>
                      {/* --- LICENSE NAME & ID FIXED --- */}
                      <p className="text-sm text-gray-300">
                        {item.licenseDetails.name}
                      </p>
                      <p className="mt-1 font-mono text-xs text-gray-500">
                        License ID: {item.licenseId}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- View Details Button --- */}
            <div className="border-t border-neutral-700 px-4 py-2 text-center">
              <button
                onClick={() =>
                  setExpandedOrderId(
                    expandedOrderId === order.id ? null : order.id,
                  )
                }
                className="flex w-full items-center justify-center p-2 font-semibold text-yellow-400 transition-colors hover:text-yellow-300"
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

            {/* --- Expanded Details View (Downloads & Actions) --- */}
            {expandedOrderId === order.id && (
              <div className="bg-neutral-900/50 p-4">
                <h3 className="mb-4 text-xl font-bold text-yellow-400">
                  Your Downloads & Actions
                </h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg bg-neutral-700 p-3"
                    >
                      <div className="flex items-center">
                        <img
                          src={
                            item.song.coverImage ||
                            "https://placehold.co/100x100/000000/FFFFFF?text=No+Image"
                          }
                          alt={item.song.title}
                          className="mr-4 h-16 w-16 rounded-md object-cover"
                        />
                        <div>
                          <p className="text-lg font-bold text-white">
                            {item.song.title}
                          </p>
                          <p className="text-sm text-gray-400">
                            {item.licenseDetails.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 sm:space-x-5">
                        <button
                          onClick={() => handleToggleLike(item.song.id)}
                          className="text-2xl text-gray-300 transition-transform hover:scale-110 hover:text-white"
                          title="Like/Unlike"
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
                          className="text-2xl text-gray-300 transition-transform hover:scale-110 hover:text-white"
                          title="Download"
                        >
                          <FaDownload />
                        </a>
                        <button
                          onClick={() => handlePlayPause(item.song)}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-xl text-black transition-colors hover:bg-yellow-400"
                          title={
                            isPlaying && currentSong?.id === item.song.id
                              ? "Pause"
                              : "Play"
                          }
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
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-900 p-4 text-white sm:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-4xl font-bold text-white">Order History</h1>
        {!loading && !error && (
          <p className="mb-8 text-gray-400">{orders.length} order(s) found</p>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default OrderHistory;
