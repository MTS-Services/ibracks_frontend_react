const RegisterView = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-b from-black to-fuchsia-900">
      {/* Background Image Container - Hidden on md (tablet) and smaller screens */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden md:hidden lg:flex" // Hide on md and smaller, show on lg and larger
      >
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
              <p className="font-poppins justify-start self-stretch pt-3 text-center text-xs font-normal text-neutral-200 md:pt-4 md:text-sm lg:pt-5">
                {" "}
                {/* Smaller text for mobile/tablet */}
                Sign up in seconds and enjoy full access with zero commitment.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col items-start justify-start gap-4 self-stretch md:gap-5 lg:gap-6">
            {" "}
            {/* Adjusted gap for responsiveness */}
            {/* Name */}
            <div className="flex flex-col items-start justify-start gap-1 self-stretch md:gap-2">
              {" "}
              {/* Adjusted gap for responsiveness */}
              <label
                htmlFor="Name"
                className="font-poppins text-sm font-[400] font-normal text-white capitalize md:text-base" // Smaller text for mobile/tablet
              >
                Name
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 outline outline-offset-[-1px] md:h-12 md:px-4 md:py-3">
                {" "}
                {/* Smaller height and padding for mobile/tablet */}
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your Name here..."
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base" // Smaller text for mobile/tablet
                />
              </div>
            </div>
            {/* Phone Number */}
            <div className="flex flex-col items-start justify-start gap-1 self-stretch md:gap-2">
              {" "}
              {/* Adjusted gap for responsiveness */}
              <label
                htmlFor="tel"
                className="font-poppins text-sm font-normal text-white capitalize md:text-base" // Smaller text for mobile/tablet
              >
                Phone Number
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 outline outline-offset-[-1px] md:h-12 md:px-4 md:py-3">
                {" "}
                {/* Smaller height and padding for mobile/tablet */}
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your number  here..."
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base" // Smaller text for mobile/tablet
                />
              </div>
            </div>
            {/* Email */}
            <div className="flex flex-col items-start justify-start gap-1 self-stretch md:gap-2">
              {" "}
              {/* Adjusted gap for responsiveness */}
              <label
                htmlFor="email"
                className="font-poppins text-sm font-normal text-white capitalize md:text-base" // Smaller text for mobile/tablet
              >
                Email
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 outline outline-offset-[-1px] md:h-12 md:px-4 md:py-3">
                {" "}
                {/* Smaller height and padding for mobile/tablet */}
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your Email here..."
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
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 outline outline-offset-[-1px] md:h-12 md:px-4 md:py-3">
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
            {/* Confirm Password */}
            <div className="flex flex-col items-start justify-start gap-1 self-stretch md:gap-2">
              {" "}
              {/* Adjusted gap for responsiveness */}
              <label
                htmlFor="conframpassword"
                className="font-poppins text-sm font-normal text-white capitalize md:text-base" // Smaller text for mobile/tablet
              >
                Confirm Password
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 outline outline-offset-[-1px] md:h-12 md:px-4 md:py-3">
                {" "}
                {/* Smaller height and padding for mobile/tablet */}
                <input
                  type="password"
                  id="Confirm Password"
                  placeholder="Enter your Confirm Password here..."
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base" // Smaller text for mobile/tablet
                />
              </div>
            </div>
            {/* Sign In Button */}
            <button className="font-poppins h-10 w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 text-sm font-medium text-black capitalize hover:opacity-90 md:h-12 md:text-base">
              {" "}
              {/* Smaller height and text for mobile/tablet */}
              Sign Up
            </button>
          </div>
        </div>
        {/* Right Part - Hidden on md (tablet) and smaller screens */}
        <div className="hidden w-1/2 lg:block"></div>
      </div>
    </div>
  );
};

export default RegisterView;
