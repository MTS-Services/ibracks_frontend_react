const musicCards = [
  {
    id: 1,
    title: "Red (Taylor's Version)",
    artist: "Taylor Swift",
    image: "/aboutpage/cart4.png",
    alt: "Red (Taylor's Version)",
  },
  {
    id: 2,
    title: "Need to Know",
    artist: "Doja Cat",
    image: "/aboutpage/cart6.png",
    alt: "Need to Know",
  },
  {
    id: 3,
    title: "Save Your Tear",
    artist: "The Weeknd",
    image: "/aboutpage/cart1.png",
    alt: "Save Your Tear",
  },
];

const HeroSection = () => {
  return (
    <section
      className="mx-auto flex w-full items-center justify-center px-4 py-2 lg:px-0 lg:py-10"
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
              <h1 className="-mt-14 self-stretch text-3xl font-semibold text-white md:text-4xl lg:mt-4">
                About Us
              </h1>
              <p className="text-base text-gray-300 capitalize md:text-lg">
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
              </p>
            </div>
            <button className="inline-flex items-center justify-center gap-1 self-center overflow-hidden rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-12 py-3 transition-transform hover:scale-105 lg:self-start">
              <div className="text-center text-lg text-black capitalize">
                Browse Our Tracks
              </div>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {musicCards.map((item) => (
              <div key={item.id}>
                <div className="inline-flex flex-col items-start justify-start gap-2.5">
                  <img
                    className="h-44 w-44 rounded"
                    src="/aboutpage/cart4.png"
                    alt="Red (Taylor's Version)"
                  />
                  <h4 className="text-sm leading-none font-normal text-white">
                    Red (Taylor's Version)
                  </h4>
                  <p className="text-xs leading-none font-normal text-white">
                    Taylor Swift
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (on desktop) */}
        <div className="order-1 flex w-full justify-center lg:order-2 lg:w-auto">
          <img
            className="-mt-10 h-auto w-full lg:-mt-26 lg:w-[690px] lg:max-w-none"
            src="/aboutpage/cart7.png"
            alt="Abstract purple splash"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
