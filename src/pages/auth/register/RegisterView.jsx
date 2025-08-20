// src/pages/auth/RegisterView.jsx
import { useState } from "react";
import { useAuth } from "../../../featured/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const RegisterView = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const { register, loading, error, setError, setSuccess, googleSignIn } =
    useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setProfileImage(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    toast.dismiss();

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

    const res = await register(
      name,
      phoneNumber,
      email,
      password,
      confirmPassword,
      profileImage,
    );

    if (res?.success) {
      toast.success(res.message || "Registration successful! Redirecting...");
      setName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setProfileImage(null);
      setTimeout(() => navigate("/auth/login"), 1500);
    } else {
      toast.error(res?.message || error || "Registration failed.");
    }
  };

  const handleGoogleSignIn = async () => {
    toast.dismiss();
    const response = await googleSignIn();
    if (response?.success) {
      toast.success(response.message || "Google sign-in successful!");
      setTimeout(() => navigate("/home"), 1200);
    } else {
      toast.error(response?.message || "Google sign-in failed.");
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-b from-black to-fuchsia-900">
      <Toaster position="top-center" reverseOrder={false} />
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

      <div className="relative z-10 m-0 flex h-screen w-full items-center justify-center overflow-hidden p-0">
        <div
          className="z-30 m-0 mx-auto flex h-full w-full flex-col items-start justify-center gap-4 overflow-auto px-8 backdrop-blur-xl md:w-full md:px-10 md:py-12 lg:w-1/2 lg:gap-6 lg:px-28 lg:py-16"
          style={{ backgroundColor: "rgba(243, 243, 243, 0.10)" }}
        >
          <div className="mx-auto flex justify-center pt-12 sm:pt-0">
            <div>
              <h2 className="bg-gradient-to-b from-[#F5DEB3] to-[#DAA520] bg-clip-text text-center text-3xl font-[700] text-transparent md:text-4xl lg:text-5xl">
                Get Started -{" "}
                <span className="pt-2 text-center text-3xl font-[700] text-[#DAA520] md:pt-3 md:text-4xl lg:text-5xl">
                  It’s Free{" "}
                </span>
              </h2>
              <p className="font-poppins pt-2 text-center text-xs text-neutral-200 md:pt-4 md:text-sm lg:pt-5">
                Sign up in seconds and enjoy full access with zero commitment.
              </p>
            </div>
          </div>

          <form
            className="flex flex-col gap-4 self-stretch pb-6 md:gap-5 lg:gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="font-poppins text-sm text-white md:text-base"
              >
                Name
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 md:h-12 md:px-4 md:py-3">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your Name here..."
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="phone"
                className="font-poppins text-sm text-white md:text-base"
              >
                Phone Number
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 md:h-12 md:px-4 md:py-3">
                <input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your number here..."
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="font-poppins text-sm text-white md:text-base"
              >
                Email
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 md:h-12 md:px-4 md:py-3">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email here..."
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="font-poppins text-sm text-white md:text-base"
              >
                Password
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 md:h-12 md:px-4 md:py-3">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password here..."
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirmPassword"
                className="font-poppins text-sm text-white md:text-base"
              >
                Confirm Password
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 md:h-12 md:px-4 md:py-3">
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your Confirm Password here..."
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="profileImage"
                className="font-poppins text-sm text-white md:text-base"
              >
                Profile Image (Optional)
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 md:h-12 md:px-4 md:py-3">
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base"
                />
              </div>
            </div>

            <button
              className="font-poppins h-10 w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 text-sm font-medium text-black hover:opacity-90 md:h-12 md:text-base"
              disabled={loading}
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="font-poppins h-10 w-full rounded-lg bg-white text-sm font-medium text-neutral-800 hover:opacity-90 md:h-12 md:text-base"
            >
              Continue with Google
            </button>
          </form>
        </div>
        <div className="hidden w-1/2 lg:block" />
      </div>
    </div>
  );
};

export default RegisterView;
