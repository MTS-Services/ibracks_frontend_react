import React from "react";

const ContactView = () => {
  return (
    <div
      className="m-auto flex h-screen justify-center"
      style={{
        background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
      }}
    >
      <div className="m-auto inline-flex items-center justify-center gap-[30px] rounded-[20px] border border-[rgba(10,13,23,0.05)] bg-[rgba(255,255,255,0.08)] p-5 backdrop-blur-[190px]">
        {/* form part   */}
        <div className="rounded-[20px]outline-offset-[-2px] inline-flex w-full items-center justify-start gap-7 lg:w-auto">
          <div className="inline-flex w-full flex-col items-start justify-start gap-10 p-10">
            <div className="flex flex-col items-start justify-start gap-2 self-stretch">
              <div className="w-full justify-start font-['Inter'] text-3xl font-semibold text-white lg:w-48">
                Let’s connect
              </div>
              <div className="w-full justify-start font-['Poppins'] text-base font-normal text-white capitalize opacity-80 lg:w-96">
                Let's align our constellations! Reach out and let the magic of
                collaboration illuminate our skies.
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-3.5 self-stretch">
              <div className="flex flex-col items-start justify-start gap-3.5 self-stretch lg:flex-row">
                <div className="inline-flex w-full flex-1 flex-col items-start justify-center gap-2.5 rounded-[5px] bg-white/5 px-3.5 py-3 outline outline-1 outline-white/20">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full justify-start border-none bg-transparent font-['Poppins'] text-sm font-normal text-white/60 focus:outline-none"
                  />
                </div>
                <div className="inline-flex w-full flex-1 flex-col items-start justify-center gap-2.5 rounded-[5px] bg-white/5 px-3.5 py-3 outline outline-1 outline-white/20">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full justify-start border-none bg-transparent font-['Poppins'] text-sm font-normal text-white/60 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-2.5 self-stretch rounded-[5px] bg-white/5 px-3.5 py-3 outline outline-1 outline-white/20">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full justify-start border-none bg-transparent font-['Poppins'] text-xs font-normal text-white/60 capitalize focus:outline-none"
                />
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-2.5 self-stretch rounded-[5px] bg-white/5 px-3.5 py-3 outline outline-1 outline-white/20">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full justify-start border-none bg-transparent font-['Poppins'] text-xs font-normal text-white/60 capitalize focus:outline-none"
                />
              </div>
              <div className="flex h-28 w-full flex-col items-start justify-start gap-2.5 self-stretch rounded-[5px] bg-white/5 px-3.5 py-3 outline outline-1 outline-white/20">
                <textarea
                  placeholder="Message"
                  className="h-full w-full resize-none justify-start border-none bg-transparent font-['Poppins'] text-xs font-normal text-white/60 capitalize focus:outline-none"
                ></textarea>
              </div>
              <button
                data-property-1="Default"
                data-show-arrow-up-right="false"
                data-show-button="true"
                className="inline-flex w-full cursor-pointer items-center justify-center gap-1 self-stretch overflow-hidden rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-12 py-3"
              >
                <div className="justify-center text-center font-['Plus_Jakarta_Sans'] text-base leading-normal font-semibold text-gray-950 capitalize">
                  Send Message
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* cart part  */}
        <div>
          <div className="m-auto flex items-center justify-center rounded-xl bg-gradient-to-l pr-10">
            <img
              src="/contactpage/img1.jpg"
              alt=""
              className="h-[470px] w-[416px] rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
