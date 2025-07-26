const AboutMainSection = () => {
  return (
    <div
      className="mx-auto flex w-full items-center justify-center px-4 py-2 lg:px-8 lg:py-0"
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
      <div className="mt-8 flex w-full max-w-7xl flex-col items-center justify-center gap-12 lg:-mb-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Left Column (on desktop) */}
        <div className="order-2 flex w-full flex-col items-center justify-center gap-9 lg:order-1 lg:items-start">
          <div className="flex w-full flex-col items-center justify-start gap-9 text-center lg:items-start lg:text-left">
            <div className="flex flex-col items-start justify-start gap-4 self-stretch">
              <div className="-mt-14 self-stretch text-3xl font-semibold text-white md:text-4xl lg:mt-4">
                About Us
              </div>
              <div className="h-auto self-stretch text-base font-normal text-white capitalize">
                At Beatzingeez Music, We Live And Breathe Music. Whether You're
                A Passionate Artist, Content Creator, Or Music Enthusiast, Our
                Platform Is Built To Fuel Your Sound Journey. We Provide
                High-Quality, Royalty-Free Music Tracks That Inspire, Energize,
                And Elevate Every Project.
                <br />
                <br />
                Our Team Of Talented Composers And Producers Are Committed To
                Delivering Unique, Studio-Grade Music Across Genres—From
                Cinematic Scores And Lo-Fi Beats To Electronic, Pop, And
                Hip-Hop.
              </div>
            </div>
            <button className="inline-flex items-center justify-center gap-1 self-center overflow-hidden rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-12 py-3 transition-transform hover:scale-105 lg:self-start">
              <div className="text-center text-base leading-normal font-semibold text-black capitalize">
                Browse Our Tracks
              </div>
            </button>
          </div>
          <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:gap-6">
            {/* Card 1 */}
            <div>
              <div className="inline-flex flex-col items-start justify-start gap-2.5">
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
            {/* Card 2 */}
            <div>
              <div className="inline-flex flex-col items-start justify-start gap-2.5">
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
            {/* Card 3 */}
            <div>
              <div className="inline-flex flex-col items-start justify-start gap-2.5">
                <img
                  className="h-44 w-44 rounded"
                  src="/aboutpage/cart1.png"
                  alt="Save Your Tear"
                />
                <div className="text-sm leading-none font-normal text-white">
                  Save Your Tear
                </div>
                <div className="text-xs leading-none font-normal text-white">
                  The Weeknd
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column (on desktop) */}
        <div className="order-1 flex w-full justify-center lg:order-2 lg:w-auto">
          <img
            className="-mt-10 h-auto w-full lg:-mt-26 lg:w-[650px] lg:max-w-none"
            src="/aboutpage/cart7.png"
            alt="Abstract purple splash"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutMainSection;
