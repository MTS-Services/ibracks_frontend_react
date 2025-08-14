import React, { useState, useRef, useEffect } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { PiUploadSimpleBold } from "react-icons/pi";
import { MdArrowBack } from "react-icons/md";
import axios from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useSongStore } from "../private/upload/components/songStore";

const EditSongPage = () => {
  const { songId } = useParams();
  const navigate = useNavigate();
  const { songs, setSongs } = useSongStore();

  const [formData, setFormData] = useState({
    songName: "",
    description: "",
    musicTag: "Inspiring",
    price: "",
    duration: "00:00",
    bpm: "",
    coverImage: null,
    audioFile: null,
  });

  const [originalSong, setOriginalSong] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [musicFileName, setMusicFileName] = useState("No file selected");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const coverImageRef = useRef(null);
  const musicFileRef = useRef(null);

  // Load song data when component mounts
  useEffect(() => {
    const loadSongData = async () => {
      try {
        // First try to find song in store
        let song = songs.find((s) => s.id === songId);

        // If not in store, fetch from API
        if (!song) {
          const response = await axios.get(`/songs/${songId}`);
          song = response.data;
        }

        if (song) {
          setOriginalSong(song);
          setFormData({
            songName: song.title || "",
            description: song.description || "",
            musicTag: song.musicTag || song.genre || "Inspiring",
            price: song.pricing?.toString() || song.price?.toString() || "", // Handle both "pricing" and "price"
            duration: song.duration || "00:00",
            bpm: song.bpm?.toString() || "",
            coverImage: null,
            audioFile: null,
          });

          // Set preview image if exists
          if (song.coverImage) {
            setCoverImagePreview(song.coverImage);
          }

          // Set audio file name if exists
          if (song.audioFile || song.title) {
            setMusicFileName(song.audioFile || `${song.title}.mp3`);
          }
        }
      } catch (error) {
        console.error("Error loading song data:", error);
        toast.error("Failed to load song data");
        navigate("/admin/songs");
      } finally {
        setIsLoading(false);
      }
    };

    if (songId) {
      loadSongData();
    }
  }, [songId, songs, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should not exceed 5MB");
        return;
      }

      setFormData({ ...formData, coverImage: file });
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleMusicFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("audio/")) {
        toast.error("Please select a valid audio file");
        return;
      }

      // Validate file size (50MB limit)
      if (file.size > 50 * 1024 * 1024) {
        toast.error("Audio file size should not exceed 50MB");
        return;
      }

      setFormData((prev) => ({ ...prev, audioFile: file }));
      setMusicFileName(file.name);

      // Calculate duration for new file
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      audio.onloadedmetadata = () => {
        const formatDuration = (seconds) => {
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = Math.floor(seconds % 60);
          return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
        };

        setFormData((prev) => ({
          ...prev,
          duration: formatDuration(audio.duration),
        }));

        // Clean up the object URL
        URL.revokeObjectURL(audio.src);
      };
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    // Validation
    if (!formData.songName.trim()) {
      toast.error("Song name is required");
      return;
    }

    if (formData.price && isNaN(parseFloat(formData.price))) {
      toast.error("Please enter a valid price");
      return;
    }

    if (
      formData.bpm &&
      (isNaN(parseInt(formData.bpm)) ||
        parseInt(formData.bpm) < 1 ||
        parseInt(formData.bpm) > 300)
    ) {
      toast.error("BPM must be between 1 and 300");
      return;
    }

    setIsSubmitting(true);

    try {
      const hasFileUploads = formData.coverImage || formData.audioFile;

      let requestConfig = {};
      let dataToSubmit;

      if (hasFileUploads) {
        dataToSubmit = new FormData();

        // Always send all fields, but format them as backend expects
        dataToSubmit.append("title", formData.songName.trim());
        dataToSubmit.append("description", formData.description.trim() || "");
        dataToSubmit.append(
          "musicTag",
          (formData.musicTag || "inspiring").toLowerCase(),
        );
        dataToSubmit.append(
          "pricing",
          formData.price ? parseFloat(formData.price) : "",
        );
        dataToSubmit.append("duration", formData.duration || "00:00");

        // Only send BPM if provided
        if (formData.bpm) {
          dataToSubmit.append("bpm", parseInt(formData.bpm));
        }

        // Add files if selected
        if (formData.coverImage) {
          dataToSubmit.append("coverImage", formData.coverImage);
        }
        if (formData.audioFile) {
          dataToSubmit.append("audioFile", formData.audioFile);
        }

        // Let browser set Content-Type for FormData
        requestConfig = {
          headers: {},
          timeout: 60000, // 60 second timeout for file uploads
        };
      } else {
        // JSON mode (no files) — send only valid values
        dataToSubmit = {
          title: formData.songName.trim(),
          description: formData.description.trim() || "",
          musicTag: (formData.musicTag || "inspiring").toLowerCase(),
          pricing: formData.price ? parseFloat(formData.price) : "",
          duration: formData.duration || "00:00",
          ...(formData.bpm && { bpm: parseInt(formData.bpm) }), // Only include BPM if provided
        };

        requestConfig = {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 30000, // 30 second timeout for JSON requests
        };
      }

      console.log(
        "Updating song with data:",
        hasFileUploads ? "FormData with files" : dataToSubmit,
      );

      // Make the API call with proper error handling
      const response = await axios.put(
        `/songs/${songId}`,
        dataToSubmit,
        requestConfig,
      );

      console.log("Update successful:", response.data);

      // Update song in store
      const updatedSongs = songs.map((song) =>
        song.id === songId
          ? {
              ...song,
              ...response.data,
              // Ensure we maintain the structure expected by the UI
              title:
                response.data.title || response.data.songName || song.title,
              coverImage: response.data.coverImage || song.coverImage,
              audioFile: response.data.audioFile || song.audioFile,
            }
          : song,
      );
      setSongs(updatedSongs);
      toast.success("Song updated successfully!");
      navigate("/admin/songs");
    } catch (error) {
      console.error("Update failed:", error);

      let errorMessage = "Failed to update song. Please try again.";

      if (error.response) {
        const { status, data } = error.response;
        console.error("Server response error:", { status, data });

        switch (status) {
          case 400:
            errorMessage =
              data?.message ||
              data?.error ||
              "Invalid data provided. Please check all fields.";
            break;
          case 401:
            errorMessage = "You are not authorized. Please log in again.";
            break;
          case 403:
            errorMessage =
              "Access forbidden. You don't have permission to edit this song.";
            break;
          case 404:
            errorMessage = "Song not found. It may have been deleted.";
            break;
          case 413:
            errorMessage = "File too large. Please use smaller files.";
            break;
          case 415:
            errorMessage =
              "Unsupported file type. Please check your file formats.";
            break;
          case 422:
            errorMessage =
              data?.message || "Invalid input data. Please check all fields.";
            break;
          case 500:
            errorMessage = "Server error. Please try again in a few moments.";
            break;
          default:
            errorMessage =
              data?.message || data?.error || `Server error (${status})`;
        }
      } else if (error.request) {
        if (error.code === "ECONNABORTED") {
          errorMessage =
            "Request timeout. Please check your connection and try again.";
        } else {
          errorMessage =
            "Network error. Please check your internet connection.";
        }
      } else if (error.code === "ERR_NETWORK") {
        errorMessage = "Network error. Please check your connection.";
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/songs");
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (coverImagePreview && coverImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(coverImagePreview);
      }
    };
  }, [coverImagePreview]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#050306] to-[#5D006D]">
        <div className="text-lg text-white">Loading song data...</div>
      </div>
    );
  }

  if (!originalSong) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#050306] to-[#5D006D]">
        <div className="text-center text-white">
          <h2 className="mb-4 text-xl">Song not found</h2>
          <button
            onClick={handleCancel}
            className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-700"
          >
            Back to Songs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 bg-gradient-to-b from-[#050306] to-[#5D006D] p-8 text-white">
      {/* Header with back button */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-white transition-colors hover:text-orange-200"
        >
          <MdArrowBack className="text-xl" />
          Back to Songs
        </button>
        <h2 className="text-2xl font-semibold text-white">
          Edit Song: {originalSong?.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Cover Image */}
        <div className="lg:col-span-1">
          <p className="mb-2 flex items-center gap-2 text-base font-normal text-white">
            <HiOutlinePhotograph className="text-xl" /> Cover Image
          </p>
          <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-200/30">
            {coverImagePreview ? (
              <img
                src={coverImagePreview}
                alt="Cover preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <PiUploadSimpleBold className="text-5xl text-neutral-400" />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-black/50 opacity-0 transition-opacity hover:opacity-100">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                ref={coverImageRef}
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                onClick={() => coverImageRef.current.click()}
                className="rounded bg-white px-4 py-1 text-sm text-black"
              >
                {coverImagePreview ? "Replace Image" : "Upload Image"}
              </button>
            </div>
          </div>
          <p className="mt-2 text-xs text-neutral-400">
            Leave unchanged to keep current image. Supported: JPG, PNG, WebP
            (Max: 5MB)
          </p>
        </div>

        {/* Right Column - Form Fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
          <div className="sm:col-span-2">
            <label className="mb-2 block text-base font-normal">
              Song Name/Title *
            </label>
            <input
              type="text"
              name="songName"
              value={formData.songName}
              onChange={handleInputChange}
              placeholder="Enter song title"
              className="w-full rounded bg-neutral-200/30 p-2.5 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
              required
              maxLength="100"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-base font-normal">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              rows="4"
              className="resize-vertical w-full rounded bg-neutral-200/30 p-2.5 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
              maxLength="500"
            />
          </div>

          <div>
            <label className="mb-2 block text-base font-normal">
              Music Tag
            </label>
            <select
              name="musicTag"
              value={formData.musicTag}
              onChange={handleInputChange}
              className="w-full rounded bg-neutral-200/30 p-2.5 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            >
              <option className="text-black" value="Inspiring">
                Inspiring
              </option>
              <option className="text-black" value="Chill">
                Chill
              </option>
              <option className="text-black" value="Upbeat">
                Upbeat
              </option>
              <option className="text-black" value="Melancholic">
                Melancholic
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-base font-normal">Pricing</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full rounded bg-neutral-200/30 p-2.5 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-base font-normal">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="02:39"
              pattern="[0-9]{2}:[0-9]{2}"
              className="w-full rounded bg-neutral-200/30 p-2.5 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-base font-normal">BPM</label>
            <input
              type="number"
              name="bpm"
              value={formData.bpm}
              onChange={handleInputChange}
              placeholder="120"
              min="1"
              max="300"
              className="w-full rounded bg-neutral-200/30 p-2.5 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-base font-normal">
              Audio File
            </label>
            <input
              type="file"
              accept="audio/mp3,audio/wav,audio/flac,audio/aac"
              ref={musicFileRef}
              onChange={handleMusicFileChange}
              className="hidden"
            />
            <div
              onClick={() => musicFileRef.current.click()}
              className="w-full cursor-pointer truncate rounded bg-neutral-200/30 p-2.5 text-neutral-300 transition-colors hover:text-white"
            >
              {musicFileName}
            </div>
            <p className="mt-2 text-xs text-neutral-400">
              Leave unchanged to keep current audio file. Supported: MP3, WAV,
              FLAC, AAC (Max: 50MB)
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-start justify-center gap-6 pt-4 pr-18">
        <button
          onClick={handleCancel}
          disabled={isSubmitting}
          className="rounded-lg border border-neutral-400 px-10 py-2.5 font-semibold text-white transition-colors hover:bg-neutral-400/10 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          disabled={isSubmitting}
          className="rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-10 py-2.5 font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Update Song"}
        </button>
      </div>
    </div>
  );
};

export default EditSongPage;
