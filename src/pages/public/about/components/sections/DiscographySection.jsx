import { FiPlusCircle } from "react-icons/fi";
import { MdPlayArrow } from "react-icons/md";
import { RxBorderDotted } from "react-icons/rx";

const AboutDiscography = ({ album }) => {
  const { title, coverImage, backgroundColor, previewColor } = album;

  return (
    <div
      className="flex h-28 w-full overflow-hidden rounded-[10px] border shadow-lg sm:max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-md"
      style={{ backgroundColor: backgroundColor }}
    >
      {/* Image Section */}
      <div className="flex-shrink-0 px-2 pt-2">
        <img
          className="h-20 w-20 rounded object-cover sm:h-24 sm:w-24"
          src={coverImage}
          alt={`${title}`}
        />
      </div>

      {/* Content Section (title, Title, Preview, Icons) */}
      <div className="flex flex-grow flex-col p-3 pl-0">
        <div>
          <h1 className="truncate pr-2 text-base font-bold text-white capitalize">
            {title}
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
const DiscographySection = ({ songs }) => {
  return (
    <div className="bg-[#2B0232] pb-20 sm:py-8 md:py-16 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        <h1 className="mb-6 text-center text-2xl font-bold text-white sm:mb-8 sm:text-3xl md:text-4xl">
          Discography
        </h1>
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-3">
          {songs.map((item) => (
            <AboutDiscography key={item.id} album={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscographySection;
