import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../featured/auth/AuthContext";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const {
    login,
    loading: authLoading,
    error: authError,
    success: authSuccess,
    setError: setAuthError,
    setSuccess: setAuthSuccess,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAuthError(null);
    setAuthSuccess(null);

    // --- Client-side Validation ---
    if (!email || !password) {
      setAuthError("Please enter your email and password.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setAuthError("Please enter a valid email address.");
      return;
    }

    try {
      const result = await login(email, password, rememberMe);

      if (result.success) {
        setEmail("");
        setPassword("");
        setRememberMe(false);

        navigate("/");
      } else {
        //
      }
    } catch (err) {
      console.error("Login error in LoginView:", err);
    } finally {
      //
    }
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-gradient-to-b from-black to-fuchsia-900">
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
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div
          className="bg z-30 mx-auto flex h-full w-full flex-col items-start justify-center gap-4 overflow-y-auto px-8 py-6 backdrop-blur-xl md:w-full md:px-10 md:py-12 lg:w-1/2 lg:gap-6 lg:px-28 lg:py-16"
          style={{
            backgroundColor: "rgba(243, 243, 243, 0.10)",
          }}
        >
          <div className="mx-auto flex justify-center">
            <div className="">
              <h2 className="bg-gradient-to-b from-[#F5DEB3] to-[#DAA520] bg-clip-text text-center text-3xl font-[700] text-transparent md:text-4xl lg:text-5xl">
                Get Started -
              </h2>
              <h2 className="pt-2 text-center text-3xl font-[700] text-[#DAA520] md:pt-3 md:text-4xl lg:text-5xl">
                It’s Free
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
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 outline-1 outline-offset-[-1px] md:h-12 md:px-4 md:py-3">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email here..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base"
                />
              </div>
            </div>
            {/* Password */}
            <div className="flex flex-col items-start justify-start gap-1 self-stretch md:gap-2">
              <label
                htmlFor="password"
                className="font-poppins text-sm font-normal text-white capitalize md:text-base"
              >
                Password
              </label>
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 py-2 outline-1 outline-offset-[-1px] md:h-12 md:px-4 md:py-3">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password here..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm text-neutral-700 focus:outline-none md:text-base"
                />
              </div>
            </div>
            {/* Remember / Forgot */}
            <div className="font-poppins flex w-full items-center justify-between text-sm md:text-base">
              <label className="flex cursor-pointer items-center gap-2 rounded p-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-2xl checked:bg-red-500"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="font-poppins text-sm font-normal text-white capitalize md:text-base">
                  Remember me
                </span>
              </label>
              <div className="font-poppins justify-start text-sm font-normal text-white capitalize md:text-base">
                Forget Password?
              </div>
            </div>

            {/* Error and Success messages from AuthProvider */}
            {authError && (
              <p className="font-poppins self-stretch text-center text-sm text-red-500">
                {authError}
              </p>
            )}
            {authSuccess && (
              <p className="font-poppins self-stretch text-center text-sm text-green-500">
                {authSuccess}
              </p>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              className="font-poppins h-10 w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 text-sm font-medium text-black capitalize hover:opacity-90 md:h-12 md:text-base"
              disabled={authLoading} // AuthProvider এর loading স্টেট ব্যবহার করুন
            >
              {authLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <h6 className="mx-auto flex items-center justify-center gap-2 text-center text-sm font-bold text-white">
            Don't have a account?{" "}
            <Link className="font-bold" to="/register">
              {" "}
              Sign Up now{" "}
            </Link>{" "}
          </h6>
          {/* Separator */}
          <div className="my-2 flex w-full items-center gap-2 md:my-4 md:gap-4">
            <div className="h-px flex-1 bg-neutral-200"></div>
            <span className="font-poppins text-sm text-neutral-200 md:text-base">
              Or Sign in with
            </span>
            <div className="h-px flex-1 bg-neutral-200"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex w-full flex-col gap-3 md:gap-4">
            <button className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border bg-white px-3 py-2 hover:bg-gray-50 md:h-12 md:px-4 md:py-3">
              <img
                src="/New folder/google.svg" // Ensure this path is correct
                className="h-5 w-5 md:h-6 md:w-6"
                alt="Google"
              />
              <span className="font-poppins text-sm text-neutral-700 md:text-base">
                Sign in With Google
              </span>
            </button>
            <button className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border bg-white px-3 py-2 hover:bg-gray-50 md:h-12 md:px-4 md:py-3">
              <img
                src="/New folder/apple.svg" // Ensure this path is correct
                className="h-5 w-5 md:h-6 md:w-6"
                alt="Apple"
              />
              <span className="font-poppins text-sm text-neutral-700 md:text-base">
                Sign in With Apple
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
