import React, { useState, useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaHeart,
  FaDownload,
  FaRegHeart,
} from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from "../../../../utils/axiosInstance";
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
          // If success is false or data is not in the expected format
          throw new Error(
            response.data.message || "Could not retrieve orders.",
          );
        }
      } catch (err) {
        // Handle specific errors like 404 (Not Found)
        if (err.response && err.response.status === 404) {
          setError("You haven't placed any orders yet.");
          setOrders([]); // Ensure orders are empty
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
      // Cleanup audio on component unmount
      audio.pause();
      audio.src = "";
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
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg bg-neutral-800 p-6 shadow-lg"
          >
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
                </div>
              ))}
            </div>
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
                      </div>
                    </div>
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
    );
  };

  return (
    <div className="min-h-screen bg-neutral-900 p-4 text-white sm:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Order history</h1>
        {!loading && !error && (
          <p className="mb-8 text-gray-400">{orders.length} order(s)</p>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default OrderHistory;
