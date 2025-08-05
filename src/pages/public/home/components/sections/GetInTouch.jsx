import React from "react";

const GetInTouch = () => {
  return (
    <section className="bg-gradient-to-b from-[#150630] to-[#150620] px-4 py-10 sm:py-16 md:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Layered Background Style */}
        <div className="rounded-2xl border border-stone-500 bg-white/5 p-6 shadow backdrop-blur-[100px] sm:rounded-3xl sm:p-8 md:p-12 lg:p-16">
          {/* Form Content */}
          <div className="flex flex-col items-center">
            <h2 className="font-poppins mb-8 text-center text-2xl font-semibold text-white capitalize sm:mb-10 sm:text-3xl md:text-4xl">
              Get in touch
            </h2>

            <form className="flex w-full flex-col gap-5 sm:gap-6">
              {/* Name + Email */}
              <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
                <div className="flex-1 border-b border-neutral-400 px-2 pt-3 pb-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="font-poppins w-full bg-transparent text-base leading-relaxed font-normal text-white placeholder-white/70 outline-none sm:text-lg md:text-xl"
                  />
                </div>
                <div className="flex-1 border-b border-neutral-400 px-2 pt-3 pb-2">
                  <input
                    type="email"
                    placeholder="E-mail Address"
                    className="font-poppins w-full bg-transparent text-base leading-relaxed font-normal text-white placeholder-white/70 outline-none sm:text-lg md:text-xl"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="border-b border-neutral-400 px-2 pt-3 pb-2">
                <input
                  type="text"
                  placeholder="Subject"
                  className="font-poppins w-full bg-transparent text-base leading-relaxed font-normal text-white placeholder-white/70 outline-none sm:text-lg md:text-xl"
                />
              </div>

              {/* Message */}
              <div className="border-b border-neutral-400 px-2 pt-3 pb-2">
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="font-poppins w-full resize-none bg-transparent text-base leading-relaxed font-normal text-white placeholder-white/70 outline-none sm:text-lg md:text-xl"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-6 py-3 text-base font-semibold text-black capitalize transition hover:opacity-90 sm:w-auto sm:px-8 sm:text-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
