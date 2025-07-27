// src/components/about/MusicCard.jsx
import React from "react";
import { FaMap } from "react-icons/fa";

const MusicCard = ({ imageSrc, bgColor, title, stats }) => {
  return (
    // Corrected: border-white is restored
    <div className="h-60 w-44 border border-gray-400">
      <div className={`relative w-full ${bgColor} p-3`}>
        <div className="absolute -top-1 -right-1 h-44 w-37 bg-[#2B0232]" />
        <img
          className="absolute -top-5 left-10 h-45 w-45 object-cover"
          src={imageSrc}
          alt={`${title} cover art`}
        />
        <div className="ml-7 bg-[#2B0232] pt-40 text-white">{title}</div>
        <div className="ml-7 flex items-center gap-2 text-white">
          <FaMap className="text-md rotate-90 transform" />
          {stats}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MusicCard);
