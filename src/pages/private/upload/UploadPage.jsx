import React, { useState, useRef } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { PiUploadSimpleBold } from "react-icons/pi";
import axios from "../../../utils/axiosInstance";
import ScheduleModal from "./components/ScheduleModal";
import toast from "react-hot-toast";
import { useSongStore } from "./components/songStore";

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const UploadPage = () => {
  const initialFormState = {
    songName: "",
    description: "",
    musicTag: "Inspiring",
    price: "",
    duration: "00:00",
    bpm: "",
    coverImage: null,
    audioFile: null,
  };
  const [formData, setFormData] = useState(initialFormState);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [musicFileName, setMusicFileName] = useState(
    "Click to upload MP3, WAV, etc.",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { songUploaded } = useSongStore();
  const coverImageRef = useRef(null);
  const musicFileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, coverImage: file });
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleMusicFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, audioFile: file }));
      setMusicFileName(file.name);
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      audio.onloadedmetadata = () => {
        setFormData((prev) => ({
          ...prev,
          duration: formatDuration(audio.duration),
        }));
      };
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDiscard = () => {
    setFormData(initialFormState);
    setCoverImagePreview(null);
    setMusicFileName("Click to upload MP3, WAV, etc.");
    if (coverImageRef.current) coverImageRef.current.value = "";
    if (musicFileRef.current) musicFileRef.current.value = "";
  };

  const handleSubmit = async (publishAt = null) => {
    if (!formData.songName || !formData.audioFile || !formData.coverImage) {
      toast.error("Please fill in song name, cover image, and music file.");
      return;
    }
    setIsSubmitting(true);

    const dataToSubmit = new FormData();
    dataToSubmit.append("title", formData.songName);
    dataToSubmit.append("description", formData.description);
    dataToSubmit.append("musicTag", formData.musicTag);
    dataToSubmit.append("price", formData.price);
    dataToSubmit.append("duration", formData.duration);
    dataToSubmit.append("bpm", formData.bpm);
    dataToSubmit.append("coverImage", formData.coverImage);
    dataToSubmit.append("audioFile", formData.audioFile);

    if (publishAt) {
      dataToSubmit.append("publishAt", publishAt);
    }

    try {
      const response = await axios.post("/songs", dataToSubmit);
      console.log("Server Response:", response.data);
      toast.success(
        `Song ${publishAt ? "scheduled" : "published"} successfully!`,
      );
      songUploaded();
      handleDiscard();
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please check the console for details.");
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  const handlePublish = () => handleSubmit(null);
  const handleScheduleClick = () => setIsModalOpen(true);
  const handleConfirmSchedule = (selectedDate) => handleSubmit(selectedDate);

  return (
    <>
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSchedule}
        isSubmitting={isSubmitting}
      />
      <div className="space-y-6 bg-gradient-to-b from-[#050306] to-[#5D006D] p-8 pr-8 pl-8 text-white">
        <div className="mb-12 text-center">
          <h2 className="mr-74 text-lg font-semibold text-white">
            Upload Song
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Your Left Column */}
          <div className="lg:col-span-1">
            <p className="mb-2 flex items-center gap-2 text-base font-normal text-white">
              <HiOutlinePhotograph className="text-xl" /> Upload Cover Image
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
                  accept="image/*"
                  ref={coverImageRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
                <button
                  onClick={() => coverImageRef.current.click()}
                  className="rounded bg-white px-4 py-1 text-sm text-black"
                >
                  {coverImagePreview ? "Replace" : "Upload"}
                </button>
              </div>
            </div>
          </div>
          {/* Your Right Column with all fields */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-base font-normal">
                Song Name/Title
              </label>
              <input
                type="text"
                name="songName"
                value={formData.songName}
                onChange={handleInputChange}
                placeholder="Type Here"
                className="w-full rounded bg-neutral-200/30 p-2.5 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
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
                placeholder="Type Here"
                rows="5"
                className="w-full rounded bg-neutral-200/30 p-2.5 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
              ></textarea>
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
                <option className="text-black">Inspiring</option>
                <option className="text-black">Chill</option>
                <option className="text-black">Upbeat</option>
                <option className="text-black">Melancholic</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-base font-normal">
                Pricing
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="$0.00"
                className="w-full rounded bg-neutral-200/30 p-2.5 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-base font-normal">
                Music Time Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="02:39"
                className="w-full rounded bg-neutral-200/30 p-2.5 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-base font-normal">
                Music BPM Set
              </label>
              <input
                type="number"
                name="bpm"
                value={formData.bpm}
                onChange={handleInputChange}
                placeholder="103"
                className="w-full rounded bg-neutral-200/30 p-2.5 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-base font-normal">
                Upload Music File
              </label>
              <input
                type="file"
                accept="audio/*"
                ref={musicFileRef}
                onChange={handleMusicFileChange}
                className="hidden"
              />
              <div
                onClick={() => musicFileRef.current.click()}
                className="w-full cursor-pointer truncate rounded bg-neutral-200/30 p-2.5 text-neutral-300 hover:text-white"
              >
                {musicFileName}
              </div>
            </div>
          </div>
        </div>
        {/* Your Action Buttons with updated logic */}
        <div className="ml-14 flex items-center justify-center gap-6 pt-4">
          <button
            onClick={handleDiscard}
            disabled={isSubmitting}
            className="rounded-lg border border-orange-200 px-10 py-2.5 font-semibold text-white transition-colors hover:bg-orange-200/10 disabled:opacity-50"
          >
            Discard
          </button>
          <button
            onClick={handleScheduleClick}
            disabled={isSubmitting}
            className="rounded-lg bg-neutral-200 px-10 py-2.5 font-semibold text-neutral-800 transition-colors hover:bg-neutral-300 disabled:opacity-50"
          >
            Schedule
          </button>
          <button
            onClick={handlePublish}
            disabled={isSubmitting}
            className="rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-10 py-2.5 font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadPage;
