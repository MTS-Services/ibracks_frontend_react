import React from "react";

const LoginView = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-b from-black to-fuchsia-900">
      {/* Background Image Container - Hidden on md (tablet) and smaller screens */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden md:hidden lg:flex" // Hide on md and smaller, show on lg and larger
      >
        {/*
          Create a larger container for the image to prevent cropping after rotation.
          We'll make it slightly larger than the screen dimensions.
        */}
        <div
          className="relative flex items-center justify-end" // Adjust these values as needed
          style={{
            transform: "rotate(2deg)", // আপনার ইচ্ছামতো ডিগ্রি দিন
            transformOrigin: "center center", // রোটেট মাঝখান থেকে হবে
          }}
        >
          <img
            src="/log/loginbg.png"
            alt="Background"
            className="h-full w-full object-cover" // Ensure image covers this larger div
          />
        </div>
      </div>

      {/* Content Overlay - This will contain your form and left/right sections */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {/* Left Part - Occupies full width on md and smaller, half width on lg and larger */}
        <div
          className="bg z-30 mx-auto flex h-full w-full flex-col items-start justify-center gap-4 px-8 py-6 backdrop-blur-xl md:w-full md:px-10 md:py-12 lg:w-1/2 lg:gap-6 lg:px-28 lg:py-16" // Adjusted padding and gap for responsiveness
          style={{
            backgroundColor: "rgba(243, 243, 243, 0.10)",
          }}
        >
          <div className="mx-auto flex justify-center">
            <div className="">
              <h2 className="bg-gradient-to-b from-[#F5DEB3] to-[#DAA520] bg-clip-text text-center text-3xl font-[700] text-transparent md:text-4xl lg:text-5xl">
                {" "}
                {/* Smaller text for mobile/tablet */}
                Get Started -
              </h2>
              <h2 className="pt-2 text-center text-3xl font-[700] text-[#DAA520] md:pt-3 md:text-4xl lg:text-5xl">
                {" "}
                {/* Smaller text for mobile/tablet */}
                It’s Free
              </h2>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col items-start justify-start gap-4 self-stretch md:gap-5 lg:gap-6">
            {" "}
            {/* Adjusted gap for responsiveness */}
            {/* Email */}
            <div className="flex flex-col items-start justify-start gap-1 self-stretch md:gap-2">
              {" "}
              {/* Adjusted gap for responsiveness */}
              <label
                htmlFor="email"
                className="font-poppins text-sm font-[400] font-normal text-white capitalize md:text-base" // Smaller text for mobile/tablet
              >
                Email
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 outline outline-1 outline-offset-[-1px] md:h-12 md:px-4 md:py-3">
                {" "}
                {/* Smaller height and padding for mobile/tablet */}
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email here..."
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base" // Smaller text for mobile/tablet
                />
              </div>
            </div>
            {/* Password */}
            <div className="flex flex-col items-start justify-start gap-1 self-stretch md:gap-2">
              {" "}
              {/* Adjusted gap for responsiveness */}
              <label
                htmlFor="password"
                className="font-poppins text-sm font-normal text-white capitalize md:text-base" // Smaller text for mobile/tablet
              >
                Password
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 outline outline-1 outline-offset-[-1px] md:h-12 md:px-4 md:py-3">
                {" "}
                {/* Smaller height and padding for mobile/tablet */}
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password here..."
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base" // Smaller text for mobile/tablet
                />
              </div>
            </div>
            {/* Remember / Forgot */}
            <div className="font-poppins flex w-full items-center justify-between text-sm md:text-base">
              {" "}
              {/* Smaller text for mobile/tablet */}
              <label className="flex cursor-pointer items-center gap-2 rounded p-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-2xl checked:bg-red-500"
                />
                <span className="font-poppins text-sm font-normal text-white capitalize md:text-base">
                  {" "}
                  {/* Smaller text for mobile/tablet */}
                  Remember me
                </span>
              </label>
              <div className="font-poppins justify-start text-sm font-normal text-white capitalize md:text-base">
                {" "}
                {/* Smaller text for mobile/tablet */}
                Forget Password?
              </div>
            </div>
            {/* Sign In Button */}
            <button className="font-poppins h-10 w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 text-sm font-medium text-black capitalize hover:opacity-90 md:h-12 md:text-base">
              {" "}
              {/* Smaller height and text for mobile/tablet */}
              Sign In
            </button>
          </div>

          {/* Separator */}
          <div className="my-2 flex w-full items-center gap-2 md:my-4 md:gap-4">
            {" "}
            {/* Adjusted margin and gap for responsiveness */}
            <div className="h-px flex-1 bg-neutral-200"></div>
            <span className="font-poppins text-sm text-neutral-200 md:text-base">
              {" "}
              {/* Smaller text for mobile/tablet */}
              Or Sign in with
            </span>
            <div className="h-px flex-1 bg-neutral-200"></div>
          </div>

          {/* Social */}
          <div className="flex w-full flex-col gap-3 md:gap-4">
            {" "}
            {/* Adjusted gap for responsiveness */}
            <button className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border bg-white px-3 py-2 hover:bg-gray-50 md:h-12 md:px-4 md:py-3">
              {" "}
              {/* Smaller height and padding for mobile/tablet */}
              <img
                src="/New folder/google.svg"
                className="h-5 w-5 md:h-6 md:w-6" // Smaller icon for mobile/tablet
                alt="Google"
              />
              <span className="font-poppins text-sm text-neutral-700 md:text-base">
                {" "}
                {/* Smaller text for mobile/tablet */}
                Sign up With Google
              </span>
            </button>
            <button className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border bg-white px-3 py-2 hover:bg-gray-50 md:h-12 md:px-4 md:py-3">
              {" "}
              {/* Smaller height and padding for mobile/tablet */}
              <img
                src="/New folder/apple.svg"
                className="h-5 w-5 md:h-6 md:w-6" // Smaller icon for mobile/tablet
                alt="Apple"
              />
              <span className="font-poppins text-sm text-neutral-700 md:text-base">
                {" "}
                {/* Smaller text for mobile/tablet */}
                Sign up With Apple
              </span>
            </button>
          </div>
        </div>
        {/* Right Part - Hidden on md (tablet) and smaller screens */}
        <div className="hidden w-1/2 lg:block"></div>
      </div>
    </div>
  );
};

export default LoginView;
