import React from "react";
import { FaMap, FaMusic } from "react-icons/fa";

const AboutWhatSets = () => {
  return (
    <section>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between px-4 lg:flex-row">
        <div className="flex w-full flex-col items-start justify-start gap-6 lg:mb-0 lg:w-[641px]">
          <div className="flex flex-col items-start justify-start gap-4 self-stretch">
            <h2 className="self-stretch text-4xl leading-tight font-semibold text-white capitalize">
              What Sets Us Apart
            </h2>
            <p className="self-stretch text-base leading-relaxed font-normal text-white capitalize">
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
                <div className="mr-10 h-60 w-48 border border-gray-400 object-cover">
                  <img
                    className="-mt-4 ml-6 h-44 w-58 bg-[#3F014A] object-cover pb-3 pl-3"
                    src="/aboutpage/cartsecent1.png"
                    alt="Rap Music Cover 1"
                  />
                  <div className="mx-auto flex gap-2 pt-1 pl-8">
                    <div>
                      <span className="font-['Inter'] text-base font-[600] text-white">
                        Rap Music
                      </span>
                      <span className="flex items-center gap-2 text-base font-normal text-white">
                        <FaMap className="px w-4 rotate-90 gap-2" />
                        <span className="pt-1 text-base"> 0.3234</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rap Music Card 2 */}
            <div className="flex flex-col items-start justify-start gap-2">
              <div>
                <div className="mr-10 h-60 w-48 border border-gray-400 object-cover">
                  <img
                    className="-mt-4 ml-6 h-44 w-58 bg-[#390143] object-cover pb-3 pl-3"
                    src="/aboutpage/cart2.png"
                    alt="Rap Music Cover 2"
                  />
                  <div className="mx-auto flex gap-2 pt-1 pl-8">
                    <div>
                      <span className="font-['Inter'] text-base font-[600] text-white">
                        Rap Music
                      </span>
                      <span className="flex items-center gap-2 text-base font-normal text-white">
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

        {/* Right Section: Image */}
        <div className="flexflex-shrink-0 relative mt-8 items-center justify-center pl-6 lg:mt-0 lg:ml-auto lg:h-[500px] lg:w-[500px]">
          <div className="flex h-96 w-[485px] items-center justify-center border-1 border-gray-400">
            <img
              className="absolute mt-40 -ml-40 flex h-[320px] w-full origin-center items-center justify-center bg-[#35013E] from-[#35013E] to-[#40014B] object-cover shadow-lg"
              style={{
                transform: "skewY(-10deg) rotate(15deg)",
              }}
              src={`/aboutpage/cart3.png`}
              alt="Music Collage"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWhatSets;
