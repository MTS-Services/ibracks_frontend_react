import React from "react";

const LoginView = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-b from-black to-fuchsia-900">
      {/* Left Part */}
      <div className="mx-auto flex h-full w-1/2 flex-col items-start justify-center gap-6 bg-zinc-100/25 px-8 py-16 md:px-16 lg:px-28">
        <div className="mx-auto flex justify-center">
          <div className="">
            <h2 className="bg-gradient-to-b from-[#F5DEB3] to-[#DAA520] bg-clip-text text-center text-5xl font-[700] text-transparent">
              Get Started -
            </h2>
            <h2 className="pt-3 text-center text-5xl font-[700] text-[#DAA520]">
              It’s Free
            </h2>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col items-start justify-start gap-6 self-stretch">
          {/* Email */}
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <label
              htmlFor="email"
              className="font-poppins text-base font-[400] font-normal text-white capitalize"
            >
              Email
            </label>
            <div className="flex h-12 w-full items-center rounded-lg bg-white px-4 py-3 outline outline-1 outline-offset-[-1px]">
              <input
                type="email"
                id="email"
                placeholder="Enter your email here..."
                className="w-full bg-transparent text-base text-neutral-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <label
              htmlFor="password"
              className="font-poppins text-base font-normal text-white capitalize"
            >
              Password
            </label>
            <div className="flex h-12 w-full items-center rounded-lg bg-white px-4 py-3 outline outline-1 outline-offset-[-1px]">
              <input
                type="password"
                id="password"
                placeholder="Enter your password here..."
                className="w-full bg-transparent text-base text-neutral-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="font-poppins flex w-full items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2 rounded p-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded-2xl checked:bg-red-500"
              />
              <span className="font-poppins text-base font-normal text-white capitalize">
                Remember me
              </span>
            </label>

            <div className="font-poppins justify-start text-base font-normal text-white capitalize">
              Forget Password?
            </div>
          </div>

          {/* Sign In Button */}
          <button className="font-poppins h-12 w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 text-base font-medium text-black capitalize hover:opacity-90">
            Sign In
          </button>
        </div>

        {/* Separator */}
        <div className="my-4 flex w-full items-center gap-4">
          <div className="h-px flex-1 bg-neutral-200"></div>
          <span className="font-poppins text-base text-neutral-200">
            Or Sign in with
          </span>
          <div className="h-px flex-1 bg-neutral-200"></div>
        </div>

        {/* Social */}
        <div className="flex w-full flex-col gap-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border bg-white px-4 py-3 hover:bg-gray-50">
            <img
              src="/New folder/google.svg"
              className="h-6 w-6"
              alt="Google"
            />
            <span className="font-poppins text-base text-neutral-700">
              Sign up With Google
            </span>
          </button>
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border bg-white px-4 py-3 hover:bg-gray-50">
            <img src="/New folder/apple.svg" className="h-6 w-6" alt="Apple" />
            <span className="font-poppins text-base text-neutral-700">
              Sign up With Apple
            </span>
          </button>
        </div>
      </div>

      {/* Right Part */}
      <div
        className="flex h-full w-1/2 items-center justify-center"
        style={{
          background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
        }}
      >
        <img
          src="/New folder/bg.png"
          alt="Login illustration"
          className="h-full w-full rotate-150 object-cover"
        />
      </div>
    </div>
  );
};

export default LoginView;
