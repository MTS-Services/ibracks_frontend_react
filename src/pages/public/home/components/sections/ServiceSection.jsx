import { useState } from "react";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const ServiceDetailsModal = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-lg border-2 border-[rgba(239,166,69,0.2)] bg-[#5D006D] p-4 shadow-lg md:max-w-lg lg:max-w-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-3xl bg-white p-2 text-3xl font-bold hover:text-gray-300"
        >
          <IoClose className="h-8 w-8 text-[#F2B600]" />
        </button>
        {/* Modal Content */}
        <div className="flex flex-col">
          <img
            className="mb-4 h-48 w-full rounded-lg object-cover"
            src={service.imageUrl}
            alt={service.title}
          />
          <h2 className="gap-1 bg-gradient-to-b from-orange-100 to-yellow-300 bg-clip-text text-2xl font-semibold text-transparent">
            {service.title}
          </h2>
          {service.subtitle && ( // Check if subtitle exists before rendering
            <p className="gap-1 bg-gradient-to-b from-orange-100 to-yellow-300 bg-clip-text text-lg font-semibold text-transparent">
              {service.subtitle}
            </p>
          )}

          <div className="w-full pt-1 text-white">
            <h3 className="mb-2 text-xl font-semibold text-white">
              Services Included:
            </h3>
            <ul className="mb-1 list-inside list-disc space-y-1 text-xs">
              {service.details.mixingServices.map((serviceItem, index) => (
                <li
                  key={index}
                  className="block border-b-1 border-[rgba(239,166,69,0.2)] px-4 py-2 text-sm font-[400] text-white transition-colors duration-200 hover:bg-purple-800"
                >
                  {serviceItem}
                </li>
              ))}
            </ul>

            <p className="block border-b-1 border-[rgba(239,166,69,0.2)] px-4 py-2 text-sm font-[400] text-white transition-colors duration-200 hover:bg-purple-800">
              <span className="font-semibold">Revisions:</span>{" "}
              {service.details.revisions}
            </p>
            <p className="block border-b-1 border-[rgba(239,166,69,0.2)] px-4 py-2 text-sm font-[500] text-white transition-colors duration-200 hover:bg-purple-800">
              <span className="font-semibold">Email Files To:</span>{" "}
              <a
                href={`mailto:${service.details.emailFilesTo}`}
                className="gap-1 bg-gradient-to-b from-orange-100 to-yellow-300 bg-clip-text text-sm font-semibold text-transparent"
              >
                {service.details.emailFilesTo}
              </a>
            </p>

            <Link to="/contact">
              <div className="pt-3">
                <div
                  className="inline-flex items-center justify-center gap-1 rounded-md p-[1px] shadow-2xl transition-all duration-300 ease-in-out"
                  style={{
                    background: "linear-gradient(to bottom, #F5DEB3, #DAA520)",
                    borderRadius: "8px",
                  }}
                >
                  <div className="inline-flex items-center justify-center gap-1 rounded-[7px] bg-[#43024F] px-4 py-[6px] transition-all duration-300 ease-in-out hover:bg-gradient-to-t hover:from-[#DAA520] hover:to-[#F5DEB3]">
                    <div className="flex cursor-pointer items-center gap-1 text-center text-sm leading-normal font-semibold text-white capitalize shadow-2xl">
                      <MdOutlineEmail className="h-4 w-4 font-bold text-white" />
                      GET A MESSAGE
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const kits = [
    {
      id: 1,
      title: "Mixing and Mastering",
      subtitle: "Complete production for your tracks.",
      amount: "20.01",
      imageUrl: "/image/service.jpg",
      details: {
        mixingServices: [
          "Full Track Production (Custom Beat + Vocals) = $500",
          "Instrumental Beat Creation = $200",
          "Vocal Recording Guidance = $100",
        ],
        revisions: "Up to 5",
        emailFilesTo: "gigzbeatz@gmail.com",
      },
    },
    {
      id: 2,
      title: "Mixing and Mastering",
      subtitle: "Professional vocal treatment.",
      amount: "20.01",
      imageUrl: "/image/service.jpg",
      details: {
        mixingServices: [
          "Vocal Tuning & Alignment = $100",
          "Lead & Backing Vocal Mixing = $120",
          "Vocal FX (Reverb, Delay, etc.) = $80",
        ],
        revisions: "Up to 3",
        emailFilesTo: "beatzvampire24@gmail.com",
      },
    },
    {
      id: 3,
      title: "Mixing and Mastering",
      subtitle: "Custom beats and instrumentals.",
      amount: "20.01",
      imageUrl: "/image/service.jpg",
      details: {
        mixingServices: [
          "Trap/Hip-Hop Custom Beat = $200",
          "Afrobeat Custom Beat = $220",
          "RnB/Soul Custom Beat = $250",
        ],
        revisions: "Up to 4",
        emailFilesTo: "gigzbeatz@gmail.com",
      },
    },
  ];

  const handleDetailsClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section className="bg-gradient-to-b from-[#150620] to-[#49055a] pb-15 text-center sm:py-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Service
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-base text-white/80 sm:text-base md:text-base">
          Your music deserves to be heard. We are here to help you craft your
          masterpiece, from raw recordings to a radio-ready track. Let's
          collaborate and make some magic happen.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {kits.map((kit) => (
            <div
              key={kit.id}
              className="overflow-hidden rounded-xl border border-neutral-700 bg-black shadow-lg transition-all duration-300 hover:border-neutral-500 hover:shadow-xl"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={kit.imageUrl}
                  alt={kit.title}
                  className="h-48 w-full object-cover sm:h-56 md:h-64"
                />
                <span className="absolute top-3 left-3 rounded bg-white px-2.5 py-1 text-xs font-medium text-black sm:text-sm">
                  Hot
                </span>
              </div>

              {/* Content Section */}
              <div className="flex flex-col gap-3 p-5 sm:p-6">
                <h3 className="text-left text-xl font-semibold text-white sm:text-2xl">
                  {kit.title}
                </h3>
                <p className="text-left text-base font-medium text-white/80 sm:text-lg">
                  $ {kit.amount}
                </p>

                <div className="mt-4 flex items-center justify-between pt-2">
                  <button
                    onClick={() => handleDetailsClick(kit)} // Correctly pass the `kit` object
                    className="w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:opacity-90 sm:w-auto sm:text-base"
                  >
                    GET A QUOTE
                  </button>
                  <FaHeartCirclePlus
                    size={20}
                    className="text-accent ml-3 flex-shrink-0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Service Details Modal */}
      <ServiceDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={selectedService}
      />
    </section>
  );
};

export default ServiceSection;
