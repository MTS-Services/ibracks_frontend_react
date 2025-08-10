// src/components/auth/PasswordResetModal.js

import React, { useEffect, useState } from "react";
import {
  getAuth,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from "firebase/auth";

const PasswordResetModal = ({ isOpen, onClose }) => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("send-link"); // or 'reset-password'
  const [oobCode, setOobCode] = useState("");

  const t = {
    invalidExpiredResetLink: "Invalid or expired password reset link.",
    passwordsDoNotMatch: "Passwords do not match.",
    passwordMinLength: "Password must be at least 6 characters long.",
    invalidResetCode: "Invalid or missing reset code.",
    errorResettingPassword: "Error resetting password: ",
    passwordResetSuccessfulMsg: "Your password has been successfully reset.",
    resetLinkSent: "Password reset link sent to your email.",
  };

  const getResetCodeFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("oobCode");
  };

  // Notify your backend after successful reset
  const notifyBackend = async (userEmail, newPasswordStr) => {
    if (!userEmail || !newPasswordStr) return;

    try {
      const response = await fetch("http://localhost:5174/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          newPassword: newPasswordStr,
        }),
      });

      if (!response.ok) {
        console.error(`Backend error. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to notify backend:", error);
    }
  };

  // On modal open, check for oobCode
  useEffect(() => {
    if (isOpen) {
      const code = getResetCodeFromURL();
      if (code) {
        setOobCode(code);
        setMode("reset-password");

        verifyPasswordResetCode(auth, code)
          .then((userEmail) => {
            setEmail(userEmail);
          })
          .catch(() => {
            setMessage(t.invalidExpiredResetLink);
          });
      } else {
        setMode("send-link");
      }
    }
  }, [isOpen]);

  // Send reset link to email
  const handleSendLink = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(t.resetLinkSent);
    } catch (error) {
      setMessage("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Confirm password reset and notify backend
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!oobCode) {
      setMessage(t.invalidResetCode);
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage(t.passwordsDoNotMatch);
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage(t.passwordMinLength);
      setLoading(false);
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage(t.passwordResetSuccessfulMsg);
      await notifyBackend(email, newPassword); // <-- Backend notify
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(t.errorResettingPassword + error.message);
    } finally {
      setLoading(false);
    }
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

        <h2 className="bg-gradient-to-b from-[#F5DEB3] to-[#DAA520] bg-clip-text text-center text-3xl font-bold text-transparent">
          {mode === "reset-password" ? "Reset Password" : "Forgot Password"}
        </h2>

        {mode === "send-link" ? (
          <>
            <p className="mt-2 mb-4 text-center text-white">
              Enter your email to receive a password reset link.
            </p>
            <form onSubmit={handleSendLink} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 w-full rounded-lg bg-white px-3 py-2 text-neutral-700"
                required
              />
              {message && (
                <p className="text-center text-sm text-white">{message}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="h-10 w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 text-sm font-medium text-black"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="mt-2 mb-4 text-center text-white">
              Enter a new password for <b>{email}</b>
            </p>
            <form
              onSubmit={handleResetPassword}
              className="flex flex-col gap-4"
            >
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-10 w-full rounded-lg bg-white px-3 py-2 text-neutral-700"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-10 w-full rounded-lg bg-white px-3 py-2 text-neutral-700"
                required
              />
              {message && (
                <p className="text-center text-sm text-white">{message}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="h-10 w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 text-sm font-medium text-black"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordResetModal;
