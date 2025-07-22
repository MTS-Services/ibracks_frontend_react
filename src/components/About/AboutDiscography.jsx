import { FiPlusCircle } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdPlayArrow } from "react-icons/md";
import { RxBorderDotted } from "react-icons/rx";

const albumsData = [
  {
    id: 1,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#833F00", // Brown from the image
    previewColor: "#581E00",
  },
  {
    id: 2,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#103870", // Dark Blue from the image
    previewColor: "#002860",
  },
  {
    id: 3,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#932A31", // Dark Red from the image
    previewColor: "#5C191D",
  },
  {
    id: 4,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#930077", // Purple from the image
    previewColor: "#61004E",
  },
  {
    id: 5,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#535353", // Gray from the image
    previewColor: "#3B3B3B",
  },
  {
    id: 6,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#9F0000", // Bright Red from the image
    previewColor: "#570202",
  },
  {
    id: 7,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#005970", // Dark Green/Teal from the image
    previewColor: "#004253",
  },
  {
    id: 8,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#922D20", // Terracotta/Orange-Brown from the image
    previewColor: "#581E00",
  },
  {
    id: 9,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#003058", // Dark Teal/Blue from the image
    previewColor: "#004C8B",
  },
];

const AboutDiscography = ({ album }) => {
  const { artist, title, imageUrl, backgroundColor, previewColor } = album;

  return (
    <div
      className="flex h-28 w-full max-w-xs overflow-hidden rounded-[10px] shadow-lg sm:max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-md"
      style={{ backgroundColor: backgroundColor }}
    >
      {/* Image Section */}
      <div className="flex-shrink-0 px-2 pt-2">
        {" "}
        {/* Added padding directly to this container */}
        <img
          className="h-20 w-20 rounded object-cover sm:h-24 sm:w-24" // object-cover to ensure image fills area
          src={imageUrl}
          alt={`${artist} - ${title} album cover`}
        />
      </div>

      {/* Content Section (Artist, Title, Preview, Icons) */}
      <div className="flex flex-grow flex-col p-3 pl-0">
        {" "}
        {/* Use flex-grow to take available space */}
        {/* Artist and Title */}
        <div>
          <div className="truncate pr-2 font-['Poppins'] text-base font-bold text-white capitalize">
            {" "}
            {/* Added pr-2 for spacing from right edge */}
            {artist}
          </div>
          <div className="truncate pr-2 font-['Poppins'] text-sm font-normal text-white">
            {title}
          </div>
        </div>
        {/* Preview Button and Icons Container */}
        <div className="flex items-center justify-between pt-5">
          {" "}
          {/* justify-end pushes to the right */}
          {/* Preview Button */}
          <div
            className="inline-flex items-center justify-center gap-1.5 rounded px-2 py-1" // Consistent padding px-2 py-1
            style={{ backgroundColor: previewColor }}
          >
            <div className="font-['Poppins'] text-[8px] font-normal text-white capitalize">
              Preview
            </div>
          </div>
          <div className="flex items-center gap-5">
            {/* Plus icon */}
            <div className="flex items-center gap-1">
              <FiPlusCircle className="text-base text-white sm:text-lg" />
              {/* Three dots icon */}
              <RxBorderDotted className="text-[24px] text-white sm:text-xl" />
            </div>
            {/* Play Arrow icon */}
            <div className="rounded-2xl bg-white">
              <MdPlayArrow className="p-1 text-base text-black sm:text-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Discography Display Component
const DiscographyDisplay = () => {
  return (
    <div className="py-8 sm:py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-white sm:mb-8 sm:text-3xl md:text-4xl">
          Discography
        </h1>
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {albumsData.map((album) => (
            <AboutDiscography key={album.id} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscographyDisplay;
