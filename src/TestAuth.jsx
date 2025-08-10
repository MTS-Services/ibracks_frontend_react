import React, { useState, useEffect, useCallback } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from "firebase/auth";
import { FaEye, FaEyeSlash, FaSun, FaMoon } from "react-icons/fa";

// NOTE: Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbg-G_Nwc5kvS0QGjEGJNZiBpipDo-c_Y",
  authDomain: "beatzingees.firebaseapp.com",
  projectId: "beatzingees",
  storageBucket: "beatzingees.firebasestorage.app",
  messagingSenderId: "629054287399",
  appId: "1:629054287399:web:b2e38d8d109cd208cf2802",
  measurementId: "G-P6DKD3909J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Translations for internationalization
const translations = {
  en: {
    verifyingResetLink: "Verifying reset link...",
    passwordResetSuccessful: "Password Reset Successful!",
    passwordResetSuccessfulDesc: "Your password has been successfully reset.",
    invalidResetLink: "Invalid Reset Link",
    invalidResetLinkDesc: "This password reset link is invalid or has expired.",
    resetYourPassword: "Reset Your Password",
    enterNewPassword: "Enter your new password below",
    for: "for",
    newPassword: "New Password",
    enterNewPasswordPlaceholder: "Enter your new password",
    confirmNewPassword: "Confirm New Password",
    confirmNewPasswordPlaceholder: "Confirm your new password",
    resetPassword: "Reset Password",
    resettingPassword: "Resetting Password...",
    passwordsDoNotMatch: "Passwords do not match",
    passwordMinLength: "Password must be at least 6 characters long",
    invalidResetCode: "Invalid reset code",
    passwordResetSuccessfulMsg: "Password reset successful!",
    errorResettingPassword: "Error resetting password: ",
    invalidExpiredResetLink:
      "Invalid or expired reset link. Please request a new password reset.",
    invalidResetLinkRequest:
      "Invalid reset link. Please request a new password reset.",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    showPassword: "Show password",
    hidePassword: "Hide password",
  },
};

const ResetPasswordForm = () => {
  // State management
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [oobCode, setOobCode] = useState(null);
  const [email, setEmail] = useState("");
  const [isValidCode, setIsValidCode] = useState(null);
  const [resetSuccessful, setResetSuccessful] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Now directly using the English translations
  const t = translations.en;

  // Firebase verification function
  const verifyResetCode = useCallback(
    async (code) => {
      try {
        setIsVerifying(true);
        const userEmail = await verifyPasswordResetCode(auth, code);
        setEmail(userEmail);
        setIsValidCode(true);
        localStorage.setItem(`reset_code_${code}`, "valid");
      } catch (error) {
        console.log(error);
        setMessage(t.invalidExpiredResetLink);
        setIsValidCode(false);
        localStorage.setItem(`reset_code_${code}`, "invalid");
      } finally {
        setIsVerifying(false);
      }
    },
    [t.invalidExpiredResetLink],
  );

  // Initialize component and verify reset code
  useEffect(() => {
    // Load saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setIsDarkMode(true);

    // Handle reset code verification
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("oobCode");

    if (code) {
      setOobCode(code);
      const cachedResult = localStorage.getItem(`reset_code_${code}`);
      if (cachedResult === "invalid") {
        setIsValidCode(false);
        setMessage(t.invalidExpiredResetLink);
        setIsVerifying(false);
      } else {
        verifyResetCode(code);
      }
    } else {
      setMessage(t.invalidResetLinkRequest);
      setIsValidCode(false);
      setIsVerifying(false);
    }
  }, [t.invalidExpiredResetLink, t.invalidResetLinkRequest, verifyResetCode]);

  // UI Control Functions
  const handleThemeToggle = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Backend notification function
  const sendResetNotificationToBackend = async (userEmail, newPasswordStr) => {
    if (!userEmail) return;

    try {
      const response = await fetch(
        "https://backend.batteryqk.com/api/users/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            newPassword: newPasswordStr,
          }),
        },
      );

      if (!response.ok) {
        console.error(`Backend error. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to notify backend:", error);
    }
  };

  // Password reset handler
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validation
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

    if (!oobCode) {
      setMessage(t.invalidResetCode);
      setLoading(false);
      return;
    }

    // Reset password
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage(t.passwordResetSuccessfulMsg);
      setResetSuccessful(true);

      localStorage.removeItem(`reset_code_${oobCode}`);
      await sendResetNotificationToBackend(email, newPassword);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setMessage(t.errorResettingPassword + errorMessage);
    }
    setLoading(false);
  };

  // UI Components
  const EyeIcon = ({ show, onClick, title }) => (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 right-3 -translate-y-1/2 transform focus:outline-none ${
        isDarkMode
          ? "text-gray-400 hover:text-gray-300"
          : "text-gray-500 hover:text-gray-700"
      } transition-colors`}
      title={title}
    >
      {show ? (
        <FaEyeSlash className="h-5 w-5" />
      ) : (
        <FaEye className="h-5 w-5" />
      )}
    </button>
  );

  const Controls = () => (
    <div className="fixed top-4 right-4 z-10 flex items-center gap-2">
      <button
        onClick={handleThemeToggle}
        className={`rounded-lg border p-2 transition-colors duration-300 ${
          isDarkMode
            ? "border-gray-600 bg-gray-700 text-yellow-400 hover:bg-gray-600"
            : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
        }`}
        title={isDarkMode ? t.light : t.dark}
      >
        {isDarkMode ? (
          <FaSun className="h-5 w-5" />
        ) : (
          <FaMoon className="h-5 w-5" />
        )}
      </button>
    </div>
  );

  // Style classes
  const baseClasses = `min-h-screen transition-colors duration-300 ${
    isDarkMode
      ? "bg-gradient-to-br from-gray-900 to-gray-800"
      : "bg-gradient-to-br from-blue-50 to-indigo-100"
  } flex items-center justify-center p-4`;

  const cardClasses = `${
    isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
  } rounded-2xl shadow-xl p-8 w-full max-w-md transition-colors duration-300`;

  // Render states
  if (isVerifying) {
    return (
      <div className={baseClasses}>
        <Controls />
        <div className={`${cardClasses} text-center`}>
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
            {t.verifyingResetLink}
          </p>
        </div>
      </div>
    );
  }

  if (resetSuccessful) {
    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 to-gray-800"
            : "bg-gradient-to-br from-green-50 to-emerald-100"
        } flex items-center justify-center p-4`}
      >
        <Controls />
        <div className={`${cardClasses} text-center`}>
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold">
              {t.passwordResetSuccessful}
            </h2>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              {t.passwordResetSuccessfulDesc}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isValidCode === false) {
    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 to-gray-800"
            : "bg-gradient-to-br from-red-50 to-indigo-100"
        } flex items-center justify-center p-4`}
      >
        <Controls />
        <div className={`${cardClasses} text-center`}>
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 15.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold">{t.invalidResetLink}</h2>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              {t.invalidResetLinkDesc}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main form render
  return (
    <div className={baseClasses}>
      <Controls />
      <div className={cardClasses}>
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold">{t.resetYourPassword}</h2>
          <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
            {t.enterNewPassword}
          </p>
          {email && (
            <p className="mt-2 text-sm text-blue-600">
              {t.for} {email}
            </p>
          )}
        </div>

        <form onSubmit={handlePasswordReset} className="space-y-6">
          <div>
            <label
              className={`mb-2 block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              {t.newPassword}
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full rounded-lg border px-4 py-3 pr-12 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                    : "border-gray-300 bg-white text-gray-900"
                }`}
                placeholder={t.enterNewPasswordPlaceholder}
                required
                minLength={6}
              />
              <EyeIcon
                show={showNewPassword}
                onClick={() => setShowNewPassword(!showNewPassword)}
                title={showNewPassword ? t.hidePassword : t.showPassword}
              />
            </div>
          </div>

          <div>
            <label
              className={`mb-2 block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              {t.confirmNewPassword}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full rounded-lg border px-4 py-3 pr-12 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                    : "border-gray-300 bg-white text-gray-900"
                }`}
                placeholder={t.confirmNewPasswordPlaceholder}
                required
                minLength={6}
              />
              <EyeIcon
                show={showConfirmPassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                title={showConfirmPassword ? t.hidePassword : t.showPassword}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !isValidCode}
            className="w-full transform rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
          >
            {loading ? t.resettingPassword : t.resetPassword}
          </button>
        </form>

        {message && !resetSuccessful && (
          <div
            className={`mt-6 rounded-lg p-4 text-center transition-all ${
              message.includes("Error") ||
              message.includes("Invalid") ||
              message.includes("do not match")
                ? `${isDarkMode ? "border-red-800 bg-red-900 text-red-300" : "border-red-200 bg-red-50 text-red-600"} border`
                : `${isDarkMode ? "border-green-800 bg-green-900 text-green-300" : "border-green-200 bg-green-50 text-green-600"} border`
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
