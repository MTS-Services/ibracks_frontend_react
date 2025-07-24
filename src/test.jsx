const RegisterView = () => {
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
        <p className="font-poppins justify-start self-stretch text-center text-sm font-normal text-neutral-200">
          Sign up in seconds and enjoy full access with zero commitment.
        </p>
        {/* Form */}
        <div className="flex flex-col items-start justify-start gap-6 self-stretch">
          {/* Email */}
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <label
              htmlFor="Name"
              className="font-poppins text-base font-[400] font-normal text-white capitalize"
            >
              Name
            </label>
            <div className="flex h-12 w-full items-center rounded-lg bg-white px-4 py-3 outline outline-1 outline-offset-[-1px]">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your Name here..."
                className="w-full bg-transparent text-base text-neutral-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <label
              htmlFor="tel"
              className="font-poppins text-base font-normal text-white capitalize"
            >
              Phone Number
            </label>
            <div className="flex h-12 w-full items-center rounded-lg bg-white px-4 py-3 outline outline-1 outline-offset-[-1px]">
              <input
                type="tel"
                id="phone"
                placeholder="Enter your number  here..."
                className="w-full bg-transparent text-base text-neutral-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <label
              htmlFor="email"
              className="font-poppins text-base font-normal text-white capitalize"
            >
              Email
            </label>
            <div className="flex h-12 w-full items-center rounded-lg bg-white px-4 py-3 outline outline-1 outline-offset-[-1px]">
              <input
                type="email"
                id="email"
                placeholder="Enter your Email here..."
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

          {/* Password */}
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <label
              htmlFor="conframpassword"
              className="font-poppins text-base font-normal text-white capitalize"
            >
              Confirm Password
            </label>
            <div className="flex h-12 w-full items-center rounded-lg bg-white px-4 py-3 outline outline-1 outline-offset-[-1px]">
              <input
                type="password"
                id="Confirm Password"
                placeholder="Enter your Confirm Password here..."
                className="w-full bg-transparent text-base text-neutral-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Sign In Button */}
          <button className="font-poppins h-12 w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 text-base font-medium text-black capitalize hover:opacity-90">
            Sign Up
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

export default RegisterView;
