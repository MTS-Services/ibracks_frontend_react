import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";

import Availabestems from "./components/sections/Availabestems";

import ProductsHeroMobail from "./components/sections/ProductsHeroMobail";

import RelatedTracks from "./components/sections/Relatedtracks";

import Modal from "../../../components/ui/Modal";

import LicensPlan from "../../../components/common/LicensPlan";

import { getAllSongs } from "../../../featured/song/trackService";

import { IoMdShare } from "react-icons/io";

import { MdEmojiFlags } from "react-icons/md";

import axios from "../../../utils/axiosInstance";

const ProductsView = () => {
  const { id } = useParams();

  const [song, setSong] = useState(null);

  const [songs, setSongs] = useState([]);

  const [plans, setPlans] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

  const [isPlaying, setIsPlaying] = useState(false);

  const [playedBarsCount, setPlayedBarsCount] = useState(0);

  const animationFrameId = useRef(null);

  const barHeights = useRef([]);

  const totalBars = 75;

  const audioRef = useRef(null);

  // Initialize bar heights

  useEffect(() => {
    if (barHeights.current.length === 0) {
      barHeights.current = Array.from({ length: totalBars }).map(() =>
        getRandomHeight(),
      );
    }
  }, []);

  const getRandomHeight = () => {
    return Math.floor(Math.random() * (24 - 8 + 1)) + 8;
  };

  // Animation for bars

  useEffect(() => {
    let lastUpdateTime = 0;

    const updateInterval = 100;

    const animateBars = (currentTime) => {
      if (!lastUpdateTime) lastUpdateTime = currentTime;

      const deltaTime = currentTime - lastUpdateTime;

      if (deltaTime > updateInterval) {
        setPlayedBarsCount((prevCount) => {
          if (prevCount < totalBars) {
            barHeights.current = barHeights.current.map(() =>
              getRandomHeight(),
            );

            lastUpdateTime = currentTime;

            return prevCount + 1;
          } else {
            setIsPlaying(false);

            return 0;
          }
        });
      }

      animationFrameId.current = requestAnimationFrame(animateBars);
    };

    if (isPlaying) {
      animationFrameId.current = requestAnimationFrame(animateBars);
    } else {
      cancelAnimationFrame(animationFrameId.current);
    }

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isPlaying, totalBars]);

  // Toggle audio play/pause

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (!isPlaying) {
      audioRef.current.play();

      if (playedBarsCount === totalBars) {
        setPlayedBarsCount(0);

        barHeights.current = Array.from({ length: totalBars }).map(() =>
          getRandomHeight(),
        );
      }
    } else {
      audioRef.current.pause();
    }

    setIsPlaying((prev) => !prev);
  };

  // Handle song end

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);

      setPlayedBarsCount(0);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const allBars = Array.from({ length: totalBars }).map((_, index) => {
    const isPlayed = index < playedBarsCount;

    const barColorClass = isPlayed ? "bg-[#E2B64E]" : "bg-gray-300";

    return (
      <div
        key={`bar-${index}`}
        className={`w-0.5 rounded-full ${barColorClass}`}
        style={{
          height: `${barHeights.current[index] || getRandomHeight()}px`,
        }}
      ></div>
    );
  });

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const response = await getAllSongs();

        const allSongs = response.data;

        if (Array.isArray(allSongs)) {
          const limitedData = allSongs.slice(0, 6);

          setSongs(limitedData);

          const foundSong = allSongs.find((s) => s.id === id);

          setSong(foundSong);
        } else {
          console.error("API did not return an array in 'data' property.");
        }
      } catch (err) {
        console.error(err, "Could not load songs");
      }
    };

    // Fetch license plans here as well

    const fetchPlans = async () => {
      try {
        const res = await axios.get("/licenses");

        setPlans(res.data.data);
      } catch (err) {
        console.error("Failed to fetch plans: ", err);
      }
    };

    fetchSongData();

    fetchPlans();
  }, [id]);

  // Function to open the license modal

  const handleBuyNowClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className="bg-neutral-900 py-10 lg:px-8"
      style={{
        background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
      }}
    >
      {/* Audio player (hidden) */}

      <audio ref={audioRef} src={song?.audioFile} preload="auto" />

      <div className="hidden lg:block">
        <div className="mx-auto flex items-center justify-center">
          <div className="inline-flex min-w-[1200px] items-end justify-start gap-16 px-5 py-5 font-[Poppins]">
            {/* Left Section */}

            <div className="h-80 w-96 overflow-hidden rounded">
              <img
                className="h-full w-full object-cover"
                src={song?.coverImage || "/products/cart01.jpg"}
                alt="Album Art"
              />
            </div>

            {/* Middle Section */}

            <div className="inline-flex w-[496px] flex-col items-start justify-start gap-12">
              <div className="flex w-56 flex-col items-start justify-start">
                <div className="self-stretch text-4xl font-semibold text-white capitalize">
                  {song?.title || "Loading..."}
                </div>

                <div className="self-stretch text-2xl font-normal text-white capitalize">
                  By {song?.user?.name || "Unknown Artist"}
                </div>
              </div>

              {/* Waveform & Play */}

              <div>
                <div className="flex items-center space-x-1.5 rounded-lg bg-gray-900 p-4">
                  <div
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-700"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <svg
                        className="h-4 w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>

                  <div className="flex items-center space-x-0.5">{allBars}</div>
                </div>
              </div>

              {/* Buttons */}

              <div className="inline-flex items-center justify-start gap-6">
                <button
                  className="flex h-11 w-32 cursor-pointer items-center justify-center rounded-[30px] bg-gradient-to-b from-orange-200 to-yellow-500 px-2.5 text-base font-normal text-zinc-800 capitalize"
                  onClick={handleBuyNowClick}
                >
                  Buy now
                </button>

                <div className="w-24 text-lg font-semibold text-white capitalize">
                  ${song?.pricing || "0.00"}
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-[30px] bg-white/60">
                  <IoMdShare className="font-bold text-white" />
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-[30px] bg-white/60">
                  <MdEmojiFlags className="font-bold text-white" />
                </div>
              </div>
            </div>

            {/* Right Section */}

            <div className="inline-flex flex-col items-start justify-start gap-3">
              <div className="mx-auto flex items-center justify-center gap-9">
                <div className="flex flex-col items-start justify-start">
                  <div className="text-xs font-[400] text-white">YEAR</div>

                  <div className="py-6 text-lg font-semibold text-white capitalize">
                    {song?.publishedAt
                      ? new Date(song.publishedAt).getFullYear()
                      : "N/A"}
                  </div>
                </div>

                <div className="flex flex-col items-start justify-start">
                  <div className="text-xs font-[400] text-white">GENRES</div>

                  <div className="py-6 text-lg font-semibold text-white capitalize">
                    {song?.musicTag || "N/A"}
                  </div>
                </div>
              </div>

              <div className="mx-auto flex items-center justify-center gap-9">
                <div className="flex flex-col items-start justify-start">
                  <div className="text-xs font-[400] text-white">BPM</div>

                  <div className="py-6 text-lg font-semibold text-white capitalize">
                    {song?.bpm || "N/A"}
                  </div>
                </div>

                <div className="flex flex-col items-start justify-start">
                  <div className="text-xs font-[400] text-white">PLAYS</div>

                  <div className="py-6 text-lg font-semibold text-white capitalize">
                    {song?.playCount || "0"}
                  </div>
                </div>
              </div>

              <div className="mx-auto flex items-center justify-center gap-9">
                <div className="flex flex-col items-start justify-start">
                  <div className="text-xs font-[400] text-white">KEY</div>

                  <div className="py-6 text-lg font-semibold text-white capitalize">
                    AM
                  </div>
                </div>

                <div className="flex flex-col items-start justify-start">
                  <div className="text-xs font-[400] text-white">LABEL</div>

                  <div className="py-6 text-lg font-semibold text-white capitalize">
                    Hi-Tec
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:hidden">
        <ProductsHeroMobail />
      </div>

      <Availabestems songs={songs} />

      <RelatedTracks />

      {/** Modal for the "Buy now" button **/}

      {song && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Choose Your License"
          size="lg"
        >
          <LicensPlan selectedSong={song} plans={plans} />
        </Modal>
      )}
    </div>
  );
};

export default ProductsView;
