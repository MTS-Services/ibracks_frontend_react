// src/components/WhatSetsUsApart.jsx
import React from "react";
import { FaMap, FaMusic } from "react-icons/fa"; // Example React Icon

const AboutWhatSets = () => {
  return (
    <section className="flex items-center justify-center px-8 py-16">
      <div className="flex w-full max-w-7xl flex-col items-center justify-between lg:flex-row">
        {/* Left Section: Text Content and Music Categories */}
        <div className="mb-12 flex w-full flex-col items-start justify-start gap-6 lg:mb-0 lg:w-[641px] lg:pr-16">
          {/* What Sets Us Apart Heading */}
          <div className="flex flex-col items-start justify-start gap-4 self-stretch">
            <h2 className="self-stretch font-['Poppins'] text-4xl leading-tight font-semibold text-white capitalize">
              What Sets Us Apart
            </h2>
            <p className="self-stretch font-['Poppins'] text-base leading-relaxed font-normal text-white capitalize">
              At Beatzingeez Music, we live and breathe music. Whether you're a
              passionate artist, content creator, or music enthusiast, our
              platform is built to fuel your sound journey. We provide
              high-quality, royalty-free music tracks that inspire, energize,
              and elevate every project.
              <br />
              <br />
              Our team of talented composers and producers are committed to
              delivering unique, studio-grade music across genres—from cinematic
              scores and lo-fi beats to electronic, pop, and hip-hop.
            </p>
          </div>

          {/* Music Categories */}

          <div className="mt-8 flex flex-col items-end justify-start gap-16 sm:flex-row">
            {/* Rap Music Card 1 */}
            <div className="flex flex-col items-start justify-start gap-2">
              <div>
                <div className="mr-10 h-60 w-48 border border-white object-cover">
                  <img
                    className="-mt-4 ml-6 h-44 w-58 bg-[#3F014A] object-cover pb-3 pl-3"
                    src="/aboutpage/cartsecent1.png" // Placeholder, as only one image was provided
                    alt="Rap Music Cover 2"
                  />
                  <div className="mx-auto flex gap-2 pt-1 pl-8">
                    <div>
                      <span className="font-['Inter'] text-base font-[600] text-white">
                        Rap Music
                      </span>
                      <span className="flex items-center gap-2 font-['Inter'] text-base font-normal text-white">
                        <FaMap className="px w-4 rotate-90 gap-2" />
                        <span className="pt-1 text-base"> 0.3234</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rap Music Card 2 (using placeholder image) */}
            <div className="flex flex-col items-start justify-start gap-2">
              <div>
                <div className="mr-10 h-60 w-48 border border-white object-cover">
                  <img
                    className="-mt-4 ml-6 h-44 w-58 bg-[#390143] object-cover pb-3 pl-3"
                    src="/aboutpage/cart2.png" // Placeholder, as only one image was provided
                    alt="Rap Music Cover 2"
                  />
                  <div className="mx-auto flex gap-2 pt-1 pl-8">
                    <div>
                      <span className="font-['Inter'] text-base font-[600] text-white">
                        Rap Music
                      </span>
                      <span className="flex items-center gap-2 font-['Inter'] text-base font-normal text-white">
                        <FaMap className="px w-4 rotate-90 gap-2" />
                        <span className="pt-1 text-base"> 0.3234</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="required: relative mt-8 flex h-[350px] w-[350px] flex-shrink-0 items-center justify-center lg:mt-0 lg:ml-auto lg:h-[500px] lg:w-[500px]">
          <div className="flex h-[450px] w-[400px] items-center justify-center border-1 border-white">
            <img
              className="absolute mt-20 -ml-90 flex h-[320px] w-full origin-center items-center justify-center bg-[#35013E] from-[#35013E] to-[#40014B] object-cover shadow-lg"
              style={{
                transform: "skewY(-10deg) rotate(15deg)",
              }}
              src={`/aboutpage/cart3.png`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWhatSets;
