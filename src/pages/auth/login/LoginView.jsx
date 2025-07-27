import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginView = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChanges = (e) => {
    const { name } = e.target.value;
    console.log(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log("Submit");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-b from-black to-fuchsia-900">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden md:hidden lg:flex">
        <div
          className="relative flex items-center justify-end"
          style={{
            transform: "rotate(2deg)",
            transformOrigin: "center center",
          }}
        >
          <img
            src="/log/loginbg.png"
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div
          className="bg z-30 mx-auto flex h-full w-full flex-col items-start justify-center gap-4 px-8 py-6 backdrop-blur-xl md:w-full md:px-10 md:py-12 lg:w-1/2 lg:gap-6 lg:px-28 lg:py-16"
          style={{
            backgroundColor: "rgba(243, 243, 243, 0.10)",
          }}
        >
          <Link to="/" className="flex cursor-pointer items-center text-white">
            {"< "} Back{" "}
          </Link>
          <div className="mx-auto flex justify-center">
            <div className="">
              <h2 className="bg-gradient-to-b from-[#F5DEB3] to-[#DAA520] bg-clip-text text-center text-3xl font-[700] text-transparent md:text-4xl lg:text-5xl">
                Get Started -{" "}
                <span className="pt-2 text-center text-3xl font-[700] text-[#DAA520] md:pt-3 md:text-4xl lg:text-5xl">
                  It’s Free
                </span>
              </h2>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start justify-start gap-4 self-stretch md:gap-5 lg:gap-6"
          >
            {/* Email */}
            <div className="flex flex-col items-start justify-start gap-1 self-stretch md:gap-2">
              <label
                htmlFor="email"
                className="font-poppins text-sm font-[400] font-normal text-white capitalize md:text-base"
              >
                Email
              </label>
              <div className="w-full">
                {/* Smaller height and padding for mobile/tablet */}
                <input
                  type="email"
                  id="email"
                  onChange={handleChanges}
                  placeholder="Enter your email here..."
                  className="w-full rounded-lg bg-white px-3 py-2.5 text-sm text-neutral-700 focus:outline-none md:text-base"
                />
              </div>
            </div>
            {/* Password */}
            <div className="flex flex-col items-start justify-start gap-1 self-stretch md:gap-2">
              {/* Adjusted gap for responsiveness */}
              <label
                htmlFor="password"
                className="text-sm font-normal text-white capitalize md:text-base"
              >
                Password
              </label>

              <div className="w-full">
                {/* Smaller height and padding for mobile/tablet */}
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password here..."
                  className="w-full rounded-lg bg-white px-3 py-2.5 text-sm text-neutral-700 focus:outline-none md:text-base"
                />
              </div>
            </div>
            {/* Remember / Forgot */}
            <div className="font-poppins flex w-full items-center justify-between text-sm md:text-base">
              {/* Smaller text for mobile/tablet */}
              <label className="flex cursor-pointer items-center gap-2 rounded p-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-2xl checked:bg-red-500"
                />
                <span className="font-poppins text-sm font-normal text-white capitalize md:text-base">
                  {/* Smaller text for mobile/tablet */}
                  Remember me
                </span>
              </label>
              <div className="font-poppins justify-start text-sm font-normal text-white capitalize md:text-base">
                {/* Smaller text for mobile/tablet */}
                Forget Password?
              </div>
            </div>
            {/* Sign In Button */}
            <button
              type="submit"
              className="font-poppins h-10 w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 text-sm font-medium text-black capitalize hover:opacity-90 md:h-12 md:text-base"
            >
              {/* Smaller height and text for mobile/tablet */}
              Sign In
            </button>
          </form>

          <h6 className="mx-auto flex items-center justify-center gap-2 text-center text-sm font-bold text-white">
            Don't have a account?{" "}
            <Link className="font-bold text-yellow-200" to="/auth/register">
              Sign Up now
            </Link>
          </h6>
          {/* Separator */}
          <div className="my-2 flex w-full items-center gap-2 md:my-4 md:gap-4">
            {/* Adjusted margin and gap for responsiveness */}
            <div className="h-px flex-1 bg-neutral-200"></div>
            <span className="font-poppins text-sm text-yellow-200 md:text-base">
              {/* Smaller text for mobile/tablet */}
              Or Sign in with
            </span>
            <div className="h-px flex-1 bg-neutral-200"></div>
          </div>

          {/* Social */}
          <div className="flex w-full flex-col gap-3 md:gap-4">
            {/* Adjusted gap for responsiveness */}
            <button className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 hover:bg-gray-50 md:h-12 md:px-4 md:py-3">
              {/* Smaller height and padding for mobile/tablet */}
              <img
                src="/New folder/google.svg"
                className="h-5 w-5 md:h-6 md:w-6" // Smaller icon for mobile/tablet
                alt="Google"
              />
              <span className="font-poppins text-sm text-neutral-700 md:text-base">
                {/* Smaller text for mobile/tablet */}
                Sign up With Google
              </span>
            </button>
            <button className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 hover:bg-gray-50 md:h-12 md:px-4 md:py-3">
              {/* Smaller height and padding for mobile/tablet */}
              <img
                src="/New folder/apple.svg"
                className="h-5 w-5 md:h-6 md:w-6" // Smaller icon for mobile/tablet
                alt="Apple"
              />
              <span className="font-poppins text-sm text-neutral-700 md:text-base">
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
