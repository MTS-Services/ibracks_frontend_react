import React from "react";

const GetInTouch = () => {
  return (
    <section className="relative mx-auto mt-10 h-[544px] w-full max-w-[1200px]">
      {/* Background card with blur + border */}
      <div className="absolute inset-0 rounded-3xl border border-stone-300 bg-neutral-400/20 backdrop-blur-[100px]"></div>

      {/* Form content */}
      <div className="absolute inset-0 flex flex-col items-center px-6 py-10">
        <h2 className="font-poppins mb-12 text-center text-4xl font-semibold text-white capitalize">
          Get in touch
        </h2>

        <form className="flex w-[996px] flex-col gap-6">
          {/* Name + Email */}
          <div className="flex gap-12">
            <div className="flex-1 border-b border-neutral-400 px-2 pt-3 pb-2">
              <input
                type="text"
                placeholder="Your Name"
                className="font-poppins w-full bg-transparent text-xl leading-loose font-normal text-white capitalize placeholder-white/70 outline-none"
              />
            </div>
            <div className="flex-1 border-b border-neutral-400 px-2 pt-3 pb-2">
              <input
                type="email"
                placeholder="E-mail Address"
                className="font-poppins w-full bg-transparent text-xl leading-loose font-normal text-white capitalize placeholder-white/70 outline-none"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="border-b border-neutral-400 px-2 pt-3 pb-2">
            <input
              type="text"
              placeholder="Subject"
              className="font-poppins w-full bg-transparent text-xl leading-loose font-normal text-white capitalize placeholder-white/70 outline-none"
            />
          </div>

          {/* Message */}
          <div className="border-b border-neutral-400 px-2 pt-3 pb-2">
            <textarea
              placeholder="Message"
              rows="3"
              className="font-poppins w-full resize-none bg-transparent text-xl leading-loose font-normal text-white capitalize placeholder-white/70 outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-12 py-3 text-base font-semibold text-black capitalize transition hover:opacity-90"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default GetInTouch;
