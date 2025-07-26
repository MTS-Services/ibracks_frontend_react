import { FiPlusCircle } from "react-icons/fi";
import { MdPlayArrow } from "react-icons/md";
import { RxBorderDotted } from "react-icons/rx";

const albumsData = [
  {
    id: 1,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#833F00",
    previewColor: "#581E00",
  },
  {
    id: 2,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#103870",
    previewColor: "#0B2E66",
  },
  {
    id: 3,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#932A31",
    previewColor: "#5C191D",
  },
  {
    id: 4,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#930077",
    previewColor: "#61004E",
  },
  {
    id: 5,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#535353",
    previewColor: "#3B3B3B",
  },
  {
    id: 6,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#9F0000",
    previewColor: "#570202",
  },
  {
    id: 7,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#005970",
    previewColor: "#00597D",
  },
  {
    id: 8,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#922D20",
    previewColor: "#581E00",
  },
  {
    id: 9,
    artist: "Atele",
    title: "Lasmid",
    imageUrl: "/aboutpage/cart1.png",
    backgroundColor: "#003058",
    previewColor: "#004C8B",
  },
];

const AboutDiscography = ({ album }) => {
  const { artist, title, imageUrl, backgroundColor, previewColor } = album;

  return (
    <div
      className="flex h-28 w-full overflow-hidden rounded-[10px] shadow-lg sm:max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-md"
      style={{ backgroundColor: backgroundColor }}
    >
      {/* Image Section */}
      <div className="flex-shrink-0 px-2 pt-2">
        <img
          className="h-20 w-20 rounded object-cover sm:h-24 sm:w-24"
          src={imageUrl}
          alt={`${artist} - ${title} album cover`}
        />
      </div>

      {/* Content Section (Artist, Title, Preview, Icons) */}
      <div className="flex flex-grow flex-col p-3 pl-0">
        <div>
          <h1 className="truncate pr-2 text-base font-bold text-white capitalize">
            {artist}
          </h1>
          <div className="truncate pr-2 text-sm font-normal text-white">
            {title}
          </div>
        </div>
        {/* Preview Button and Icons Container */}
        <div className="flex items-center justify-between pt-5">
          <div
            className="inline-flex items-center justify-center gap-1.5 rounded px-2 py-1"
            style={{ backgroundColor: previewColor }}
          >
            <div className="text-[8px] font-normal text-white capitalize">
              Preview
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <FiPlusCircle className="size-6 text-white sm:text-lg" />
              <RxBorderDotted className="size-6 text-white" />
            </div>
            <div className="rounded-2xl bg-white">
              <MdPlayArrow className="size-6 p-1 text-base text-black sm:text-lg" />
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
    <div className="bg-[#2B0232] pb-20 sm:py-8 md:py-16 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-white sm:mb-8 sm:text-3xl md:text-4xl">
          Discography
        </h1>
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-3">
          {albumsData.map((album) => (
            <AboutDiscography key={album.id} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscographyDisplay;
