import { FiPlusCircle } from "react-icons/fi";
import { MdPlayArrow } from "react-icons/md";
import { RxBorderDotted } from "react-icons/rx";

// It now accepts 'cardColor' as a prop
const AboutDiscography = ({ album, cardColor }) => {
  const { title, coverImage, previewColor } = album;

  return (
    <div
      className="flex h-28 w-full overflow-hidden rounded-[10px] border shadow-lg sm:max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-md"
      style={{ backgroundColor: cardColor }}
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

export default AboutDiscography;
