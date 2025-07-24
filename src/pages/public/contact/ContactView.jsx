import React from "react";

const ContactView = () => {
  return (
    <div
      className="m-auto flex h-screen w-screen items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
      }}
    >
      <div className="m-auto inline-flex flex-col items-center justify-center gap-[30px] rounded-[20px] border border-[rgba(10,13,23,0.05)] bg-[rgba(255,255,255,0.08)] py-8 backdrop-blur-[190px] md:flex-row">
        {/*
          Image Part (Moved to appear first on mobile/tablet)
          Order changed using flex order utilities:
          - 'order-first' makes it appear first by default (mobile/tablet)
          - 'md:order-last' makes it appear last on medium screens and up (desktop)
        */}
        <div className="order-first md:order-last">
          <div className="m-auto flex items-center justify-center rounded-xl bg-gradient-to-l pr-0 md:pr-10">
            <img
              src="/contactpage/img1.jpg"
              alt=""
              className="h-[300px] w-[350px] rounded-xl object-cover md:h-[470px] md:w-[416px]" // Smaller image for mobile/tablet
            />
          </div>
        </div>

        {/*
          Form Part
          Order changed using flex order utilities:
          - 'order-last' makes it appear last by default (mobile/tablet)
          - 'md:order-first' makes it appear first on medium screens and up (desktop)
        */}
        <div className="order-last inline-flex w-full items-center justify-start gap-7 rounded-[20px] outline-offset-[-2px] md:order-first lg:w-auto">
          {/*
            *** KEY CHANGE HERE: py-[50px] for mobile vertical padding ***
            We explicitly set py-[50px] for mobile and then override with md:p-10
          */}
          <div className="**py-[50px]** inline-flex w-full flex-col items-start justify-start gap-5 px-5 md:gap-10 md:p-10">
            <div className="flex flex-col items-start justify-start gap-2 self-stretch">
              <div className="w-full justify-start font-['Inter'] text-2xl font-[600] text-white md:text-3xl">
                Let’s connect
              </div>
              <div className="w-full justify-start font-['Poppins'] text-sm font-[400] text-white capitalize opacity-80 md:w-96 md:text-base">
                Let's align our constellations! Reach out and let the magic of
                collaboration illuminate our skies.
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-3 self-stretch pt-4 md:gap-3.5 md:pt-1">
              <div className="flex w-full flex-col items-start justify-start gap-3 self-stretch md:flex-row md:gap-3.5">
                {/* Form Fields - maintaining h-[44px] for mobile */}
                <div className="inline-flex h-[44px] w-full flex-1 flex-col items-start justify-center gap-2 rounded-[5px] bg-white/5 px-3 py-2 outline outline-1 outline-white/20 md:h-[52px] md:gap-2.5 md:px-3.5 md:py-3">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full justify-start border-none bg-transparent font-['Poppins'] text-xs font-[400] text-white/60 focus:outline-none md:text-sm"
                  />
                </div>
                <div className="inline-flex h-[44px] w-full flex-1 flex-col items-start justify-center gap-2 rounded-[5px] bg-white/5 px-3 py-2 outline outline-1 outline-white/20 md:h-[52px] md:gap-2.5 md:px-3.5 md:py-3">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full justify-start border-none bg-transparent font-['Poppins'] text-xs font-[400] text-white/60 focus:outline-none md:text-sm"
                  />
                </div>
              </div>
              <div className="flex h-[44px] w-full flex-col items-start justify-center gap-2 self-stretch rounded-[5px] bg-white/5 px-3 py-2 outline outline-1 outline-white/20 md:h-[52px] md:gap-2.5 md:px-3.5 md:py-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full justify-start border-none bg-transparent font-['Poppins'] text-xs font-[400] text-white/60 capitalize focus:outline-none"
                />
              </div>
              <div className="flex h-[44px] w-full flex-col items-start justify-center gap-2 self-stretch rounded-[5px] bg-white/5 px-3 py-2 outline outline-1 outline-white/20 md:h-[52px] md:gap-2.5 md:px-3.5 md:py-3">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full justify-start border-none bg-transparent font-['Poppins'] text-xs font-[400] text-white/60 capitalize focus:outline-none"
                />
              </div>
              <div className="flex h-24 w-full flex-col items-start justify-start gap-2 self-stretch rounded-[5px] bg-white/5 px-3 py-2 outline outline-1 outline-white/20 md:h-28 md:gap-2.5 md:px-3.5 md:py-3">
                <textarea
                  placeholder="Message"
                  className="h-full w-full resize-none justify-start border-none bg-transparent font-['Poppins'] text-xs font-[400] text-white/60 capitalize focus:outline-none"
                ></textarea>
              </div>
              <button
                data-property-1="Default"
                data-show-arrow-up-right="false"
                data-show-button="true"
                className="inline-flex w-full cursor-pointer items-center justify-center gap-1 self-stretch overflow-hidden rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-8 py-2 md:px-12 md:py-3"
              >
                <div className="justify-center text-center font-['Plus_Jakarta_Sans'] text-sm leading-normal font-[600] text-gray-950 capitalize md:text-base">
                  Send Message
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
