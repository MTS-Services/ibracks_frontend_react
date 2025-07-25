import React from "react";

const AboutMainSection = () => {
  return (
    <div
      className="mx-auto flex min-h-screen w-full items-center justify-center"
      style={{
        background: `
      linear-gradient(
        to bottom right,
        #4B257A 20%,
        #2B0232 40%,
        #2B0232 0%,
        #2B0232 95%
      )
    `,
      }}
    >
      <div className="inline-flex items-center justify-start">
        <div className="inline-flex flex-col items-start justify-start gap-9">
          <div className="flex w-[641px] flex-col items-start justify-start gap-9">
            <div className="flex flex-col items-start justify-start gap-4 self-stretch">
              <div className="justify-center self-stretch text-4xl font-semibold text-white capitalize">
                About Us
              </div>
              <div className="h-40 justify-start self-stretch text-base font-normal text-white capitalize">
                At Beatzingeez Music, we live and breathe music. Whether you're
                a passionate artist, content creator, or music enthusiast, our
                platform is built to fuel your sound journey. We provide
                high-quality, royalty-free music tracks that inspire, energize,
                and elevate every project.
                <br />
                Our team of talented composers and producers are committed to
                delivering unique, studio-grade music across genres—from
                cinematic scores and lo-fi beats to electronic, pop, and
                hip-hop.
              </div>
            </div>
            <button
              data-property-1="Default"
              data-show-arrow-up-right="false"
              data-show-button="true"
              className="inline-flex items-center justify-center gap-1 overflow-hidden rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-12 py-3"
            >
              <div className="justify-center text-center text-base leading-normal font-semibold text-black capitalize">
                Browse our tracks
              </div>
            </button>
          </div>
          <div className="inline-flex h-60 flex-wrap content-center items-center justify-start gap-6 self-stretch overflow-hidden">
            <div className="relative h-60 w-44">
              <div className="absolute top-0 left-0 inline-flex flex-col items-start justify-start gap-2.5">
                <img
                  className="h-44 w-44 rounded"
                  src="/aboutpage/cart4.png"
                  alt="Red (Taylor's Version)"
                />
                <div className="text-sm leading-none font-normal text-white">
                  Red (Taylor's Version)
                </div>
                <div className="text-xs leading-none font-normal text-white">
                  Taylor Swift
                </div>
              </div>
            </div>
            <div className="relative h-60 w-44">
              <div className="absolute top-0 left-0 inline-flex flex-col items-start justify-start gap-2.5">
                <img
                  className="h-44 w-44 rounded"
                  src="/aboutpage/cart6.png"
                  alt="Need to Know"
                />
                <div className="text-sm leading-none font-normal text-white">
                  Need to Know
                </div>
                <div className="text-xs leading-none font-normal text-white">
                  Doja Cat
                </div>
              </div>
            </div>
            <div className="relative h-60 w-44">
              <div className="absolute top-0 left-0 inline-flex flex-col items-start justify-start gap-2.5">
                {/* This image was not provided, using a placeholder or assuming it's part of the first uploaded image but cropped */}
                <img
                  className="h-44 w-44 rounded"
                  src="/aboutpage/cart1.png"
                  alt="Save Your Tear"
                />
                <div className="text-sm leading-none font-normal text-white">
                  Save Your Tear
                </div>
                <div className="text-xs leading-none font-normal text-white">
                  The Weekend
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Assuming the abstract image on the right is a background or a separate component */}
        {/* For this example, I'm not including the abstract image as it seems to be a visual background element rather than part of the main content flow. */}
      </div>
      <div>
        <img
          className="h-[877.49px] w-[658.12px]"
          src="/aboutpage/cart7.png"
          alt="Placeholder Image"
        />
      </div>
    </div>
  );
};

export default AboutMainSection;
