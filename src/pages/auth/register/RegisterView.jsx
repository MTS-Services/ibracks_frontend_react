import { useState } from "react";
import { useAuth } from "../../../featured/auth/AuthContext";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster

const RegisterView = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const { register, loading, error, setError, setSuccess } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    } else {
      setProfileImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);
    toast.dismiss(); // Dismiss any existing toasts

    // --- Client-side Validation ---
    if (!name || !phoneNumber || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      toast.error("Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }

    const registrationSuccessful = await register(
      name,
      phoneNumber,
      email,
      password,
      confirmPassword,
      profileImage,
    );

    if (registrationSuccessful) {
      toast.success("Registration successful! Redirecting to home...");
      setName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setProfileImage(null);
      // Redirect to home page after a short delay to show the toast
      setTimeout(() => {
        navigate("/"); // Adjust '/home' if your home route is different
      }, 2000);
    } else if (error) {
      toast.error(error); // Display error from the AuthContext
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-b from-black to-fuchsia-900">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Background Image Container - Hidden on md (tablet) and smaller screens */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden md:hidden lg:flex">
        <div
          className="relative flex items-center justify-end"
          style={{
            transform: "rotate(2deg)",
            transformOrigin: "center center",
          }}
        >
          <img
            src="/log/loginbg.png" // Ensure this path is correct relative to your public directory
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      {/* Content Overlay - This will contain your form and left/right sections */}
      <div className="relative z-10 m-0 flex h-screen w-full items-center justify-center overflow-hidden p-0">
        <div
          className="bg z-30 m-0 mx-auto flex h-full w-full flex-col items-start justify-center gap-4 overflow-auto p-0 px-8 backdrop-blur-xl md:w-full md:px-10 md:py-12 lg:w-1/2 lg:gap-6 lg:px-28 lg:py-16"
          style={{
            backgroundColor: "rgba(243, 243, 243, 0.10)",
          }}
        >
          <div className="mx-auto flex justify-center pt-12 sm:pt-0">
            <div className="">
              <h2 className="bg-gradient-to-b from-[#F5DEB3] to-[#DAA520] bg-clip-text text-center text-3xl font-[700] text-transparent md:text-4xl lg:text-5xl">
                {/* Smaller text for mobile/tablet */}
                Get Started -{" "}
                <span className="pt-2 text-center text-3xl font-[700] text-[#DAA520] md:pt-3 md:text-4xl lg:text-5xl">
                  {" "}
                  {/* Smaller text for mobile/tablet */}
                  It’s Free{" "}
                </span>
              </h2>

              <p className="font-poppins justify-start self-stretch pt-3 pt-12 text-center text-xs font-normal text-neutral-200 sm:pt-0 md:pt-4 md:text-sm lg:pt-5">
                {" "}
                {/* Smaller text for mobile/tablet */}
                Sign up in seconds and enjoy full access with zero commitment.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            className="flex flex-col items-start justify-start gap-4 self-stretch pb-6 sm:py-0 md:gap-5 lg:gap-6"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="flex flex-col items-start justify-start gap-1 self-stretch md:gap-2">
              <label
                htmlFor="Name"
                className="font-poppins text-sm font-[400] font-normal text-white capitalize md:text-base" // Smaller text for mobile/tablet
              >
                Name
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 outline outline-1 outline-offset-[-1px] md:h-12 md:px-4 md:py-3">
                {" "}
                {/* Smaller height and padding for mobile/tablet */}
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your Name here..."
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base" // Smaller text for mobile/tablet
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 self-stretch md:gap-2">
              <label
                htmlFor="tel"
                className="font-poppins text-sm font-normal text-white capitalize md:text-base" // Smaller text for mobile/tablet
              >
                Phone Number
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 outline outline-1 outline-offset-[-1px] md:h-12 md:px-4 md:py-3">
                {" "}
                {/* Smaller height and padding for mobile/tablet */}
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your number  here..."
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base" // Smaller text for mobile/tablet
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 self-stretch md:gap-2">
              <label
                htmlFor="email"
                className="font-poppins text-sm font-normal text-white capitalize md:text-base"
              >
                Email
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 outline outline-1 outline-offset-[-1px] md:h-12 md:px-4 md:py-3">
                {" "}
                {/* Smaller height and padding for mobile/tablet */}
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email here..."
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base" // Smaller text for mobile/tablet
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 self-stretch md:gap-2">
              <label
                htmlFor="password"
                className="font-poppins text-sm font-normal text-white capitalize md:text-base"
              >
                Password
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 outline outline-1 outline-offset-[-1px] md:h-12 md:px-4 md:py-3">
                {" "}
                {/* Smaller height and padding for mobile/tablet */}
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password here..."
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base" // Smaller text for mobile/tablet
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 self-stretch md:gap-2">
              <label
                htmlFor="conframpassword"
                className="font-poppins text-sm font-normal text-white capitalize md:text-base" // Smaller text for mobile/tablet
              >
                Confirm Password
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 outline outline-1 outline-offset-[-1px] md:h-12 md:px-4 md:py-3">
                {" "}
                {/* Smaller height and padding for mobile/tablet */}
                <input
                  type="password"
                  id="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your Confirm Password here..."
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base" // Smaller text for mobile/tablet
                />
              </div>
            </div>

            <div className="flex flex-col items-start justify-start gap-1 self-stretch md:gap-2">
              <label
                htmlFor="profileImage"
                className="font-poppins text-sm font-normal text-white capitalize md:text-base"
              >
                Profile Image (Optional)
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 outline outline-1 outline-offset-[-1px] md:h-12 md:px-4 md:py-3">
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base"
                />
              </div>
            </div>

            {/* Sign In Button */}
            <button
              className="font-poppins h-10 w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 text-sm font-medium text-black capitalize hover:opacity-90 md:h-12 md:text-base"
              disabled={loading}
            >
              {" "}
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>
        </div>
        {/* Right Part - Hidden on md (tablet) and smaller screens */}
        <div className="hidden w-1/2 lg:block"></div>
      </div>
    </div>
  );
};

export default RegisterView;
