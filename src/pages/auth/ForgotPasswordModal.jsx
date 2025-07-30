import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../featured/auth/AuthContext";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const { forgotPassword, loading, error, success, setError, setSuccess } =
    useContext(AuthContext);

  // Clear states when modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setError(null);
      setSuccess(null);
    }
  }, [isOpen, setError, setSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const result = await forgotPassword(email);

    if (result.success) {
      // If success, you might want to automatically close the modal or keep it open with the success message
      // For now, let's just keep it open to show the success message.
    }
    // Errors/success messages are handled by AuthContext and will be displayed.
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-lg border border-fuchsia-700 bg-gradient-to-br from-purple-800 to-black p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl font-bold text-white hover:text-gray-300"
        >
          &times;
        </button>
        <h2 className="bg-gradient-to-b from-[#F5DEB3] to-[#DAA520] bg-clip-text text-center text-3xl font-[700] text-transparent md:text-4xl">
          Forgot Password
        </h2>
        <p className="mt-2 mb-4 text-center text-white">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="modal-email"
              className="font-poppins text-sm font-normal text-white capitalize"
            >
              Email
            </label>
            <input
              type="email"
              id="modal-email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 h-10 w-full rounded-lg bg-white px-3 py-2 text-neutral-700 focus:outline-none"
              required
            />
          </div>

          {error && (
            <p className="font-poppins text-center text-sm text-red-400">
              {error}
            </p>
          )}
          {success && (
            <p className="font-poppins text-center text-sm text-green-400">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="font-poppins h-10 w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 text-sm font-medium text-black capitalize transition-all duration-200 hover:opacity-90"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white">
          A reset link will be sent to your email.
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
